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
}

const PhonicLesson: React.FC<PhonicLessonProps> = ({ lessonId, title, data, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stage, setStage] = useState<'sound' | 'word'>('sound');
  const [isRecording, setIsRecording] = useState(false);
  const [showCompare, setShowCompare] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [transcription, setTranscription] = useState("");
  const [analysisMode, setAnalysisMode] = useState<'online' | 'offline' | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [masteredItems, setMasteredItems] = useState<string[]>([]);

  const currentItem = data[currentIndex] || data[0];
  const currentWord = currentItem.words[0] || currentItem.grapheme; // Use first word as example
  
  // Use local offline image if available, falling back to letter image for single letters
  const wordImage = getWordImage(currentWord);
  const letterImage = getLetterImage(currentItem.grapheme);

  useEffect(() => {
    setCurrentIndex(0);
    setStage('sound');
    setMasteredItems([]);
    setShowCompare(false);
    
    // Warm up offline STT
    SpeechRecognitionService.initialize();

    return () => {
      if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
      ElevenLabsService.stop();
    };
  }, [lessonId]);

  const playSound = async () => {
    try {
      if (stage === 'sound') {
        // Try to play just the phoneme sound
        await ElevenLabsService.play(currentItem.grapheme); 
      } else {
        await ElevenLabsService.play(currentWord);
      }
    } catch (e) {
      console.error("Audio playback error", e);
    }
  };

  const checkPronunciation = (target: string, transcription: string): boolean => {
    const t = target.toLowerCase().trim();
    const r = transcription.toLowerCase().trim().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "");
    
    if (!r) return false;
    
    // 1. Literal Check
    if (r.includes(t)) return true;
    
    // 2. Fuzzy Phonetic Check (Expanded for children)
    const phonemeMap: Record<string, string[]> = {
        's': ['s', 'ess', 'sss', 'snake', 'sea', 'sun'],
        'a': ['a', 'ah', 'apple', 'at', 'ant'],
        't': ['t', 'tuh', 'tea', 'tent', 'to', 'top'],
        'p': ['p', 'puh', 'pig', 'pea', 'pin'],
        'i': ['i', 'ih', 'eye', 'igloo', 'ice'],
        'n': ['n', 'nnn', 'en', 'nest', 'net'],
        'sh': ['sh', 'ship', 'she', 'shoe'],
        'ch': ['ch', 'chip', 'chair', 'chick'],
        'th': ['th', 'thumb', 'the', 'this'],
        'igh': ['i', 'eye', 'high', 'night', 'light', 'ice'],
        'ie': ['i', 'eye', 'pie', 'tie', 'ice'],
        'air': ['air', 'hair', 'ear', 'bear', 'fair'],
        'ear': ['ear', 'hear', 'here', 'near', 'deer'],
        'ure': ['ur', 'pure', 'sure', 'cure', 'your'],
        'or': ['or', 'fork', 'corn', 'horn']
    };
    
    if (phonemeMap[t]) {
        return phonemeMap[t].some(p => r.includes(p));
    }
    
    return false;
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        
        // Analyze Pronunciation
        setIsAnalyzing(true);
        setShowCompare(true); 
        
        try {
            const target = stage === 'sound' ? currentItem.grapheme : currentWord;
            let transcript = "";
            let mode: 'online' | 'offline' = 'offline';
            
            // HYBRID LOGIC:
            if (navigator.onLine) {
                console.log("[STT] Online detected. Using Groq Smart Analysis...");
                try {
                    transcript = await GroqService.transcribeAudio(audioBlob, target);
                    mode = 'online';
                } catch (e) {
                    console.warn("[STT] Online failed, switching to local backup.");
                    transcript = await SpeechRecognitionService.transcribe(audioBlob);
                    mode = 'offline';
                }
            } else {
                console.log("[STT] Offline detected. Using Local Browser Analysis...");
                transcript = await SpeechRecognitionService.transcribe(audioBlob);
                mode = 'offline';
            }
            
            setAnalysisMode(mode);
            setTranscription(transcript);
            const correct = checkPronunciation(target, transcript);
            setIsCorrect(correct);
            
        } catch (err) {
            console.error("Transcription error:", err);
        } finally {
            setIsAnalyzing(false);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const playUserAudio = () => {
    if (userAudioUrl) {
      const audio = new Audio(userAudioUrl);
      audio.play();
    }
  };

  const handleNext = () => {
    setShowCompare(false);
    setUserAudioUrl(null);
    setIsCorrect(null);
    setTranscription("");
    setIsAnalyzing(false);
    
    if (stage === 'sound') {
        setStage('word');
        // Auto-play the word when switching to word mode
        if (playTimeoutRef.current) clearTimeout(playTimeoutRef.current);
        playTimeoutRef.current = setTimeout(() => {
            ElevenLabsService.play(currentWord);
            playTimeoutRef.current = null;
        }, 500);
    } else {
        if (currentIndex < data.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setStage('sound');
        } else {
            // Lesson Complete
            onComplete({
                totalQuestions: data.length,
                correctAnswers: data.length // Assuming completion = success for now
            });
        }
    }
  };

  const handlePrev = () => {
      if (stage === 'word') {
          setStage('sound');
      } else if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          setStage('word');
      } else if (onBack) {
          onBack();
      }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-4 px-2 animate-fade-in">
      
      {/* Title / Counter */}
      <h3 className="mb-2 text-[#fb9610] font-black text-lg font-outfit">
          {title} ({currentIndex + 1}/{data.length})
      </h3>

      {/* Main Display */}
      <div className="mb-6 flex flex-col items-center">
          <button 
            onClick={playSound}
            className="mb-4 bg-white border-4 border-[#e7effc] rounded-3xl p-8 shadow-xl active:scale-95 transition-all group"
          >
            {stage === 'sound' ? (
                <div className="text-6xl sm:text-8xl font-black text-[#022d62] group-hover:scale-110 transition-transform">
                    {currentItem.grapheme}
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    {wordImage && (
                        <div className="w-40 h-40 mb-4 rounded-xl overflow-hidden border-2 border-[#fb9610] bg-white p-2">
                             <img 
                                src={wordImage} 
                                onError={(e) => {
                                    // Hide the entire container if image fails
                                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                                }}
                                alt={currentWord} 
                                className="w-full h-full object-contain" 
                             />
                        </div>
                    )}
                    
                    <div className="text-3xl sm:text-4xl font-black text-[#022d62]">
                        {currentWord}
                    </div>
                </div>
            )}
          </button>
          
          <button onClick={playSound} className="flex items-center gap-2 text-slate-400 font-bold text-sm hover:text-[#fb9610]">
              <Volume2 size={16} /> Tap to hear
          </button>
      </div>

      {/* Interactive Section */}
      <div className="w-full max-w-xs px-4">
        {!showCompare ? (
             <button 
                 onMouseDown={startRecording}
                 onMouseUp={stopRecording}
                 onMouseLeave={stopRecording}
                 onTouchStart={startRecording}
                 onTouchEnd={stopRecording}
                 className={`
                     w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all border-b-4 select-none touch-none
                     ${isRecording 
                         ? 'bg-rose-500 text-white border-rose-700 translate-y-1' 
                         : 'bg-[#fb9610] text-white border-orange-700 active:translate-y-1 hover:brightness-110'
                     }
                 `}
             >
                 {isRecording ? 'Listening...' : stage === 'sound' ? 'Hold & Say the Sound 🎤' : 'Hold & Say the Word 🎤'}
             </button>
        ) : (
             <div className="flex flex-col gap-3 animate-fade-in-up">
                 {/* Analysis Status */}
                 <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-2">
                    {isAnalyzing ? (
                        <div className="flex flex-col items-center gap-2 py-2">
                            <Loader2 className="animate-spin text-[#fb9610]" size={32} />
                            <p className="text-sm font-bold text-slate-400">Checking...</p>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-1">
                            {isCorrect ? (
                                <>
                                    <div className="flex items-center gap-2 text-emerald-500">
                                        <CheckCircle size={28} fill="currentColor" className="text-white" />
                                        <span className="text-xl font-black italic">Perfect!</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 text-rose-500">
                                        <XCircle size={28} fill="currentColor" className="text-white" />
                                        <span className="text-xl font-black italic">Almost there...</span>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                 </div>

                 <div className="flex gap-2">
                     <button 
                         onClick={playUserAudio}
                         className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600 border-b-4 border-slate-200 active:translate-y-px"
                     >
                         🔊 Your Voice
                     </button>
                     <button 
                         onClick={() => {
                             setShowCompare(false);
                             setIsCorrect(null);
                             setTranscription("");
                         }}
                         className="flex-1 py-3 bg-white border-2 border-[#fb9610] rounded-xl font-bold text-[#fb9610] active:scale-95 transition-all"
                     >
                         Try Again
                     </button>
                 </div>
                 
                 <button 
                     onClick={handleNext}
                     className={`
                        w-full py-3 rounded-xl font-black text-lg shadow-md border-b-4 transition-all
                        ${isCorrect 
                            ? 'bg-emerald-500 text-white border-emerald-700 hover:brightness-110 active:translate-y-1' 
                            : 'bg-slate-200 text-slate-400 border-slate-300 hover:bg-[#fb9610] hover:text-white hover:border-orange-700'
                        }
                     `}
                 >
                     {isCorrect ? 'Great! Next ➜' : 'Skip to Next ➜'}
                 </button>
             </div>
        )}
      </div>
      
      {/* Navigation */}
      <div className="mt-8 flex gap-4">
            <button onClick={handlePrev} className="text-slate-300 hover:text-slate-500">
                <ArrowLeft size={24} />
            </button>
            <div className="flex gap-1 items-center">
                {data.map((_, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === currentIndex ? 'bg-[#022d62]' : 'bg-slate-200'}`} />
                ))}
            </div>
            <button onClick={handleNext} className="text-slate-300 hover:text-slate-500">
                <ArrowRight size={24} />
            </button>
      </div>

    </div>
  );
};

export default PhonicLesson;
