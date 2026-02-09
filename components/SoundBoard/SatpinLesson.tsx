
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
  /* Restoring missing logic */
  const [showCompare, setShowCompare] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentItem = LESSON_DATA[currentIndex];
  const progress = ((currentIndex + 1) / LESSON_DATA.length) * 100;
  
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState<'correct' | 'incorrect' | null>(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);

  useEffect(() => {
    // Reset state on step change
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

          // Simple containment check (case insensitive)
          // e.g. Target "s", transcribed "Yes" or "S" or "Es"
          // We check if the target letter appears in the transcription or generic close matches
          const target = currentItem.letter.toLowerCase();
          const spoken = text.toLowerCase();
          
          let isMatch = spoken.includes(target);
          
          // Heuristic: If transcription is empty but blob was sent, it might be quiet.
          if (!text) isMatch = false;

          if (isMatch) {
              // Auto-advance after success
              setVerificationResult('correct');
              setShowCompare(true); // Ensure UI shows success state
              
              // Play a happy sound effect (optional, using Web Audio API or just visual for now)
              new Audio('/assets/audio/success.mp3').play().catch(() => {}); // Optimistic play

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
        
        // Trigger verification
        verifyPronunciation(audioBlob);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert("Please allow microphone access to record.");
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
    // Reset EVERYTHING when the stage changes (Level 1 -> Level 2)
    setCurrentIndex(0);
    setIsLessonComplete(false);
    setIsRecording(false);
    setShowCompare(false);
    setUserAudioUrl(null);
    setVerificationResult(null);
    setTranscribedText(null);
  }, [stage]);

  // ... (keep playReference, verifyPronunciation, startRecording, stopRecording, playUserAudio) ...

  const handleNext = () => {
    if (currentIndex < LESSON_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Show completion screen instead of immediate exit
      setIsLessonComplete(true);
      // Play success sound
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
        <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 p-8 text-center animate-fade-in-up">
            <div className="mb-6 flex justify-center">
                <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <CheckCircle size={48} />
                </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {stage === 'pure-sounds' ? 'Level 1 Completed!' : 'Level 2 Completed!'}
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                {stage === 'pure-sounds' 
                    ? 'You have mastered the pure sounds. Now let\'s connect them to letters.' 
                    : 'You strictly matched sounds to letters! The full chart is unlocked.'}
            </p>
            
            <button 
                onClick={onComplete}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
                {stage === 'pure-sounds' ? (
                    <>Start Level 2: Sounds & Letters <ArrowRight size={20} /></>
                ) : (
                    <>Unlock Full Chart <ArrowRight size={20} /></>
                )}
            </button>
        </div>
      );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800 relative">
      
      {/* Header & Progress */}
      <div className="p-8 pb-0">
        <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">
                {stage === 'pure-sounds' ? 'Pure Sounds (SATPIN)' : 'Sounds & Letters'}
            </span>
            <div className="flex gap-1">
                {LESSON_DATA.map((_, i) => (
                    <div key={i} className={`h-1.5 w-4 rounded-full transition-colors ${i <= currentIndex ? 'bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`} />
                ))}
            </div>
        </div>
      </div>
      {/* ... rest of render ... */}

      {/* Main Content */}
      <div className="p-8 text-center">
        <p className="text-slate-400 text-sm font-medium mb-8 uppercase tracking-wider">
            {stage === 'pure-sounds' ? 'Listen & Repeat' : 'Match the Sound'}
        </p>

        {/* Big Letter Card */}
        <button 
            onClick={playReference}
            className="relative w-48 h-48 mx-auto bg-slate-900 dark:bg-black rounded-[3rem] flex flex-col items-center justify-center shadow-2xl active:scale-95 transition-all mb-10 group outline-none ring-4 ring-transparent active:ring-indigo-100"
        >
            {stage === 'pure-sounds' ? (
                // Level 1: Hidden Letter (Pure Sound Focus)
                <Volume2 size={80} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
            ) : (
                // Level 2: Visible Letter
                <span className="text-7xl font-black text-white group-hover:scale-110 transition-transform duration-300">
                    {currentItem.letter.toUpperCase()}
                </span>
            )}
            
            <div className="mt-4 flex items-center gap-2 text-indigo-300 opacity-60 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-black uppercase tracking-widest">
                    {stage === 'pure-sounds' ? 'Tap to listen' : 'Listen'}
                </span>
            </div>
        </button>

        {/* Recording Visualizer / Controls */}
        <div className="space-y-4 min-h-[140px]">
            {!showCompare ? (
                <div className="animate-fade-in">
                    <button 
                        onMouseDown={startRecording}
                        onMouseUp={stopRecording}
                        onMouseLeave={stopRecording}
                        onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                        onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }}
                        className={`
                            w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl transition-all select-none
                            ${isRecording 
                                ? 'bg-rose-500 text-white scale-95 shadow-rose-500/30' 
                                : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-500/30'
                            }
                        `}
                    >
                        <Mic size={24} className={isRecording ? 'animate-pulse' : ''} />
                        <span>{isRecording ? 'Listening...' : 'Hold to Record'}</span>
                    </button>
                    <p className="text-[10px] text-slate-400 mt-3 uppercase font-bold tracking-widest">Release to stop</p>
                </div>
            ) : isVerifying ? (
                <div className="flex flex-col items-center justify-center py-4 animate-fade-in">
                    <div className="w-6 h-6 border-2 border-indigo-500 border-t-white rounded-full animate-spin mb-2" />
                    <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Checking pronunciation...</p>
                </div>
            ) : (
                <div className="animate-fade-in-up grid grid-cols-2 gap-3">
                    {/* Only show retry/play controls if NOT correct yet */}
                    {verificationResult !== 'correct' && (
                        <>
                            <button 
                                onClick={playUserAudio}
                                className="py-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-100 dark:border-emerald-800/30 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
                            >
                                <Play size={20} fill="currentColor" />
                                My Sound
                            </button>
                            <button 
                                onClick={() => setShowCompare(false)}
                                className="py-4 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-2 border-slate-100 dark:border-slate-700 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors"
                            >
                                <RotateCcw size={20} />
                                Retry
                            </button>
                        </>
                    )}
                    
                    <div className={`col-span-2 text-center p-4 rounded-xl border-2 transition-all duration-300 ${
                        verificationResult === 'correct' 
                            ? 'bg-emerald-50 border-emerald-100 text-emerald-700 scale-105 shadow-lg' 
                            : verificationResult === 'incorrect'
                            ? 'bg-amber-50 border-amber-100 text-amber-700'
                            : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}>
                        {verificationResult === 'correct' ? (
                            <div className="flex flex-col items-center animate-bounce-in">
                                <span className="text-3xl mb-2">🎉</span>
                                <span className="text-sm font-black uppercase tracking-widest">Perfect!</span>
                                <span className="text-[10px] font-medium opacity-60 mt-1">Next sound in 1s...</span>
                            </div>
                        ) : verificationResult === 'incorrect' ? (
                             <div className="flex flex-col items-center">
                                <span className="text-xl mb-1">🤔</span>
                                {transcribedText ? (
                                    <>
                                        <span className="text-xs font-bold">I heard "{transcribedText}"</span>
                                        <span className="text-[10px] uppercase tracking-widest opacity-70">Try again!</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-xs font-bold text-rose-500">Could not hear you</span>
                                        <span className="text-[10px] uppercase tracking-widest opacity-70">Speak louder & closer</span>
                                    </>
                                )}
                            </div>
                        ) : (
                            <span className="text-[10px] font-bold uppercase tracking-widest">Recording Saved</span>
                        )}
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
        <button 
            onClick={handlePrev}
            className={`text-indigo-600 dark:text-indigo-400 font-black px-4 py-2 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-colors flex items-center gap-2 ${currentIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
        >
            <ArrowLeft size={16} /> Back
        </button>

        <button 
            onClick={handleNext}
            className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-8 py-3 rounded-xl font-black shadow-lg hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-wider flex items-center gap-2"
        >
            {currentIndex === LESSON_DATA.length - 1 ? 'Finish' : 'Next'} <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};

export default SatpinLesson;
