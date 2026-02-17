import React, { useState, useRef, useEffect } from 'react';
import { Volume2, CheckCircle, ArrowRight, ArrowLeft, XCircle, Loader2, WifiOff, Zap } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { GroqService } from '../../utils/GroqService';
import { SpeechRecognitionService } from '../../utils/SpeechRecognitionService';
import { getLetterImage, getWordImage, highlightWord } from '../../utils/letterImages';

interface PhonicLessonProps {
  lessonId: number;
  title: string;
  data: { grapheme: string; words: string[] }[];
  onComplete: (stats: { totalQuestions: number; correctAnswers: number }) => void;
  onBack?: () => void;
  initialStage?: 'sound' | 'letter' | 'blending';
}

const PhonicLesson: React.FC<PhonicLessonProps> = ({ lessonId, title, data, onComplete, onBack, initialStage = 'sound' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'sound' | 'letter' | 'blending'>(initialStage);
  const [isRecording, setIsRecording] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [transcription, setTranscription] = useState("");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentItem = data[currentIndex] || data[0];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const currentWord = currentItem.words[currentWordIndex] || currentItem.words[0];
  
  const wordImage = getWordImage(currentWord);

  useEffect(() => {
    setCurrentIndex(0);
    setActiveTab(initialStage);
    setCurrentWordIndex(0);
    setShowCompare(false);
    SpeechRecognitionService.initialize();

    return () => {
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
      ElevenLabsService.stop();
    };
  }, [lessonId, initialStage]);

  const playSound = async () => {
    try {
      if (activeTab === 'blending') {
        await ElevenLabsService.play(currentWord);
      } else {
        await ElevenLabsService.play(currentItem.grapheme); 
      }
    } catch (e) {
      console.error("Audio playback error", e);
    }
  };

  const checkPronunciation = (target: string, transcription: string): boolean => {
    const t = target.toLowerCase().trim();
    const r = transcription.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    if (!r) return false;
    if (r.includes(t)) return true;
    
    const phonemeMap: Record<string, string[]> = {
        's': ['s', 'ess', 'sss'], 'a': ['a', 'ah'], 't': ['t', 'tuh'], 
        'p': ['p', 'puh'], 'i': ['i', 'ih'], 'n': ['n', 'nnn']
    };
    if (phonemeMap[t]) return phonemeMap[t].some(p => r.includes(p));
    return false;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      mediaRecorder.ondataavailable = (event) => { if (event.data.size > 0) audioChunksRef.current.push(event.data); };
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        setIsAnalyzing(true);
        setShowCompare(true); 
        try {
            const target = activeTab === 'blending' ? currentWord : currentItem.grapheme;
            let transcript = await (navigator.onLine ? GroqService.transcribeAudio(audioBlob, target) : SpeechRecognitionService.transcribe(audioBlob));
            setTranscription(transcript);
            setIsCorrect(checkPronunciation(target, transcript));
        } catch (err) { console.error(err); } finally { setIsAnalyzing(false); }
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) { console.error(err); }
  };

  const stopRecording = () => { if (mediaRecorderRef.current && isRecording) { mediaRecorderRef.current.stop(); setIsRecording(false); } };

  const handleNext = () => {
    setShowCompare(false);
    setUserAudioUrl(null);
    setIsCorrect(null);
    
    // Systematic Navigation: Complete the current stage for ALL letters first
    if (activeTab === 'sound') {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Stage Complete! Move to Letter stage for the whole set
            setActiveTab('letter');
            setCurrentIndex(0);
        }
    } else if (activeTab === 'letter') {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Stage Complete! Move to Blending
            setActiveTab('blending');
            setCurrentIndex(0);
            setCurrentWordIndex(0);
        }
    } else {
        // Blending logic
        if (currentWordIndex < currentItem.words.length - 1) {
            setCurrentWordIndex(prev => prev + 1);
        } else if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setCurrentWordIndex(0);
        } else {
            onComplete({ totalQuestions: data.length, correctAnswers: data.length });
        }
    }
  };

  const handlePrev = () => {
      setShowCompare(false);
      setUserAudioUrl(null);
      setIsCorrect(null);

      if (activeTab === 'blending' && currentWordIndex > 0) {
          setCurrentWordIndex(prev => prev - 1);
      } else if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          if (activeTab === 'blending') {
              // When going back to previous item in blending, set to last word of that item
              setCurrentWordIndex(data[currentIndex - 1].words.length - 1);
          }
      } else if (activeTab === 'letter') {
          setActiveTab('sound');
          setCurrentIndex(data.length - 1); // Go to the last item of the previous stage
      } else if (activeTab === 'blending') {
          setActiveTab('letter');
          setCurrentIndex(data.length - 1); // Go to the last item of the previous stage
      } else if (onBack) {
          onBack();
      }
  };

  return (
    <div className="h-full flex flex-col items-center bg-[#fdfaf5] font-outfit">
      
      {/* Simple Stage Header */}
      <div className="w-full bg-white border-b-2 border-[#e7effc] px-6 py-4 flex items-center justify-between shadow-sm">
        <button onClick={onBack} className="p-2 text-slate-400 hover:text-[#fb9610]"><ArrowLeft size={24} /></button>
        <div className="text-center">
            <p className="text-[10px] font-black text-[#fb9610] uppercase tracking-widest">{activeTab === 'sound' ? 'Stage 1' : activeTab === 'letter' ? 'Stage 2' : 'Stage 3'}</p>
            <h2 className="text-lg font-black text-[#022d62]">
                {activeTab === 'sound' ? 'Hear the Sounds' : activeTab === 'letter' ? 'Learn the Letters' : 'Blending Words'}
            </h2>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center px-4 max-w-md">
        <div className="mb-4 text-[#022d62] font-black opacity-30 uppercase tracking-widest text-xs">
            {title} • {currentIndex + 1}/{data.length}
        </div>

        {/* Action Board */}
        <div className="w-full aspect-square bg-white border-4 border-[#e7effc] rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-8 mb-8 relative group overflow-hidden">
            {activeTab === 'sound' && (
                <button onClick={playSound} className="flex flex-col items-center gap-6 animate-zoom-in">
                    <div className="w-40 h-40 bg-[#fb961015] rounded-full flex items-center justify-center border-4 border-dashed border-[#fb9610] animate-pulse">
                        <Volume2 size={80} className="text-[#fb9610]" />
                    </div>
                    <span className="text-xl font-black text-[#022d62]">Tap to hear the sound</span>
                </button>
            )}

            {activeTab === 'letter' && (
                <button onClick={playSound} className="flex flex-col items-center gap-2 animate-zoom-in">
                    <div className="text-[12rem] font-black text-[#022d62] leading-none select-none">
                        {currentItem.grapheme}
                    </div>
                    <span className="text-slate-400 font-bold">The letter is '{currentItem.grapheme}'</span>
                </button>
            )}

            {activeTab === 'blending' && (
                <div className="flex flex-col items-center gap-4 animate-zoom-in w-full text-center">
                    {wordImage && (
                        <div className="w-48 h-48 bg-slate-50 rounded-3xl p-4 border-2 border-[#fb961033] shadow-inner mb-2">
                             <img src={wordImage} alt={currentWord} className="w-full h-full object-contain" />
                        </div>
                    )}
                    <button onClick={playSound} className="flex flex-col items-center gap-1 active:scale-95 transition-transform">
                        <div className="text-6xl font-black text-[#022d62] tracking-wider uppercase">
                            {currentWord}
                        </div>
                        <div className="flex items-center gap-2 text-[#fb9610] font-bold text-sm">
                            <Volume2 size={16} /> Tap to blend
                        </div>
                    </button>
                </div>
            )}
        </div>

        {/* AI Interaction - Simplified */}
        <div className="w-full">
            {!showCompare ? (
                 <button 
                     onMouseDown={startRecording} onMouseUp={stopRecording} onMouseLeave={stopRecording}
                     onTouchStart={startRecording} onTouchEnd={stopRecording}
                     className={`w-full py-5 rounded-2xl font-black text-xl shadow-lg transition-all border-b-4 select-none touch-none ${isRecording ? 'bg-rose-500 text-white border-rose-700 translate-y-1' : 'bg-[#fb9610] text-white border-[#e68a00] active:translate-y-1 hover:brightness-105'}`}
                 >
                     {isRecording ? 'Listening...' : activeTab === 'sound' ? 'Repeat the Sound 🎤' : activeTab === 'letter' ? 'Say the Letter 🎤' : 'Say the Word 🎤'}
                 </button>
            ) : (
                 <div className="flex flex-col gap-3 animate-fade-in-up">
                    <div className={`p-4 rounded-2xl text-center font-black text-lg ${isCorrect ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                        {isCorrect ? '🌟 Spot on!' : 'Try again!'}
                    </div>
                    <button onClick={handleNext} className="w-full py-4 bg-[#022d62] text-white rounded-2xl font-black text-lg shadow-lg border-b-4 border-[#011a3b] active:translate-y-1">
                        {activeTab === 'blending' && currentWordIndex === currentItem.words.length -1 ? 'Next Sound ➜' : 'Next ➜'}
                    </button>
                    <button onClick={() => setShowCompare(false)} className="text-slate-400 font-bold text-sm">Cancel</button>
                 </div>
            )}
        </div>
      </div>

      {/* Basic Dots Progress */}
      <div className="p-6 flex items-center justify-between w-full max-w-md">
           <button onClick={handlePrev} className="p-3 text-slate-300 hover:text-slate-500 transition-all"><ArrowLeft size={24} /></button>
           <div className="flex gap-2">
               {data.map((_, i) => (
                   <div key={i} className={`h-2 rounded-full transition-all ${i === currentIndex ? 'w-8 bg-[#022d62]' : 'w-2 bg-slate-200'}`} />
               ))}
           </div>
           <button onClick={handleNext} className="p-3 text-slate-300 hover:text-slate-500 transition-all"><ArrowRight size={24} /></button>
      </div>

    </div>
  );
};

export default PhonicLesson;
