import React, { useState, useRef, useEffect } from 'react';
import { Volume2, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { getLetterImage, highlightWord } from '../../utils/letterImages';

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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [masteredItems, setMasteredItems] = useState<string[]>([]);

  const currentItem = data[currentIndex] || data[0];
  const currentWord = currentItem.words[0] || currentItem.grapheme; // Use first word as example
  const letterImage = getLetterImage(currentItem.grapheme);

  useEffect(() => {
    setCurrentIndex(0);
    setStage('sound');
    setMasteredItems([]);
    setShowCompare(false);
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

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setUserAudioUrl(url);
        setShowCompare(true);
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
    
    if (stage === 'sound') {
        setStage('word');
        // Auto-play the word when switching to word mode
        setTimeout(() => ElevenLabsService.play(currentWord), 500);
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
                    {/* Image if available, otherwise large text */}
                    {letterImage ? (
                        <div className="w-40 h-40 mb-4 rounded-xl overflow-hidden border-2 border-[#fb9610]">
                            <img src={letterImage.imageUrl} alt={currentWord} className="w-full h-full object-cover" />
                        </div>
                    ) : (
                        // Fallback icon or just text
                        <div className="text-4xl mb-4">🖼️</div>
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
                 onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                 onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }}
                 className={`
                     w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all border-b-4
                     ${isRecording 
                         ? 'bg-rose-500 text-white border-rose-700 translate-y-1' 
                         : 'bg-[#fb9610] text-white border-orange-700 active:translate-y-1 hover:brightness-110'
                     }
                 `}
             >
                 {isRecording ? 'Listening...' : stage === 'sound' ? 'Say the Sound 🎤' : 'Say the Word 🎤'}
             </button>
        ) : (
             <div className="flex flex-col gap-3 animate-fade-in-up">
                 <div className="flex gap-2">
                     <button 
                         onClick={playUserAudio}
                         className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600 border-b-4 border-slate-200"
                     >
                         🔊 Your Voice
                     </button>
                     <button 
                         onClick={() => setShowCompare(false)}
                         className="flex-1 py-3 bg-white border-2 border-[#fb9610] rounded-xl font-bold text-[#fb9610]"
                     >
                         Try Again
                     </button>
                 </div>
                 <button 
                     onClick={handleNext}
                     className="w-full py-3 bg-emerald-500 text-white rounded-xl font-black text-lg shadow-md border-b-4 border-emerald-700 animate-bounce"
                 >
                     Great! Next ➜
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
