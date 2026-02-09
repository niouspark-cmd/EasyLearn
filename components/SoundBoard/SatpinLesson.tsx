
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, RotateCcw, Play, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

// Level 1: SATPIN Data
// Using the "grapheme" keys that map to our static _phonic.mp3 files in phoneticMap.ts
const LESSON_DATA = [
  { letter: 's', sound: 'sss' },
  { letter: 'a', sound: 'ah' },
  { letter: 't', sound: 'tuh' },
  { letter: 'p', sound: 'puh' },
  { letter: 'i', sound: 'ih' },
  { letter: 'n', sound: 'nnn' }
];

const SatpinLesson: React.FC<{ stage?: 'pure-sounds' | 'letters', onComplete?: () => void, onBack?: () => void }> = ({ stage = 'pure-sounds', onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentItem = LESSON_DATA[currentIndex];
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'correct' | 'incorrect' | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);

  useEffect(() => {
    setShowCompare(false);
    setUserAudioUrl(null);
    setVerificationResult(null);
    setTranscribedText(null);
  }, [currentIndex]);
  
  const playReference = async () => {
    try {
        await ElevenLabsService.play(currentItem.letter);
    } catch (e) {
        console.error("Audio playback error", e);
    }
  };

  const verifyPronunciation = async (blob: Blob) => {
      setIsVerifying(true);
      try {
          const { GroqService } = await import('../../utils/GroqService');
          const text = await GroqService.transcribeAudio(blob);
          setTranscribedText(text);

          const target = currentItem.letter.toLowerCase();
          const spoken = text.toLowerCase();
          
          let isMatch = spoken.includes(target);
          if (!text) isMatch = false;

          if (isMatch) {
              setVerificationResult('correct');
              setShowCompare(true);
              new Audio('/assets/audio/success.mp3').play().catch(() => {}); 
              setTimeout(() => {
                  handleNext();
              }, 1500);
          } else {
              setVerificationResult('incorrect');
          }
      } catch (e) {
          console.error("Verification failed", e);
      } finally {
          setIsVerifying(false);
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
        verifyPronunciation(audioBlob);
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

  const [isLessonComplete, setIsLessonComplete] = useState(false);

  useEffect(() => {
    setCurrentIndex(0);
    setIsLessonComplete(false);
    setIsRecording(false);
    setShowCompare(false);
    setUserAudioUrl(null);
    setVerificationResult(null);
    setTranscribedText(null);
  }, [stage]);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleNext = () => {
    if (currentIndex < LESSON_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsLessonComplete(true);
      new Audio('/assets/audio/level-complete.mp3').play().catch(() => {});
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else if (onBack) {
        onBack();
    }
  };

  if (isLessonComplete) {
      return (
        <div className="w-full max-w-md mx-auto bg-white rounded-[3rem] shadow-2xl p-10 text-center animate-fade-in-up border-8 border-[#e7effc]">
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                    <CheckCircle size={48} />
                </div>
            </div>
            <h2 className="text-3xl font-black text-[#022d62] mb-4 font-outfit">
                {stage === 'pure-sounds' ? 'You Did It!' : 'Amazing Job!'}
            </h2>
            <p className="text-[#022d62]/60 mb-10 font-bold text-lg leading-relaxed">
                {stage === 'pure-sounds' 
                    ? 'You learned all the sounds! Now let\'s see the letters.' 
                    : 'You strictly matched sounds to letters! You unlocked the chart!'}
            </p>
            
            <button 
                onClick={onComplete}
                className="w-full py-6 bg-[#fb9610] text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-orange-500/30 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-orange-700"
            >
                {stage === 'pure-sounds' ? (
                    <>Next Level <ArrowRight size={28} /></>
                ) : (
                    <>See All Sounds <ArrowRight size={28} /></>
                )}
            </button>
        </div>
      );
  }

  return (
    <div 
      className="h-full flex flex-col items-center justify-center text-center py-12 select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      
      {/* Counter: X of X */}
      <div className="mb-8 text-[#fb9610] font-black text-3xl font-outfit animate-bounce">
          {currentIndex + 1} of {LESSON_DATA.length}
      </div>

      {/* Speaker Icon - The Phonics App Style */}
      <button 
        onClick={playReference}
        className="mb-20 text-slate-800 hover:scale-110 transition-transform active:scale-95 p-4 rounded-full"
      >
        <Volume2 size={80} strokeWidth={1.5} />
      </button>

      {/* Massive Text Section */}
      <div className="flex flex-col items-center gap-12">
        <h2 className="text-[12rem] font-black leading-none font-outfit text-slate-900 tracking-tight" style={{ fontWeight: 900 }}>
            {stage === 'pure-sounds' ? '?' : currentItem.letter}
        </h2>

        {/* Phoneme Dots */}
        <div className="flex gap-8">
            <div className="w-5 h-5 bg-black rounded-full" />
            {stage === 'letters' && <div className="w-5 h-5 bg-black/10 rounded-full" />}
        </div>
      </div>

      {/* Simplified Recording Experience */}
      <div className="mt-24 w-full max-w-xs">
           {!showCompare ? (
                <button 
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                    onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }}
                    className={`
                        w-full py-6 rounded-full font-black text-2xl shadow-xl transition-all border-b-8
                        ${isRecording 
                            ? 'bg-rose-500 text-white border-rose-800 translate-y-2' 
                            : 'bg-[#fb9610] text-white border-[#b36a0b] active:translate-y-2'
                        }
                    `}
                >
                    {isRecording ? 'Listening...' : 'Hold & Talk'}
                </button>
           ) : (
                <div className="flex flex-col gap-4 animate-fade-in">
                    {verificationResult === 'correct' ? (
                        <button 
                            onClick={handleNext}
                            className="w-full py-6 bg-emerald-500 text-white rounded-full font-black text-2xl shadow-xl border-b-8 border-emerald-800 animate-bounce"
                        >
                            Next Sound! 🎈
                        </button>
                    ) : (
                        <div className="flex gap-4">
                            <button 
                                onClick={playUserAudio}
                                className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-slate-600 border-b-4 border-slate-200"
                            >
                                Hear Me
                            </button>
                            <button 
                                onClick={() => setShowCompare(false)}
                                className="flex-1 py-4 bg-white border-4 border-[#fb9610] rounded-2xl font-black text-[#fb9610]"
                            >
                                Retry
                            </button>
                        </div>
                    )}
                </div>
           )}
      </div>

    </div>
  );
};

export default SatpinLesson;
