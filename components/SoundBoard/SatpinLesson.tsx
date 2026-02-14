
import React, { useState, useRef, useEffect } from 'react';
import { Mic, Volume2, RotateCcw, Play, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { getLetterImage, highlightWord } from '../../utils/letterImages';

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

const SatpinLesson: React.FC<{ stage?: 'pure-sounds' | 'letters', onComplete?: (foundationData?: { lessonType: 'sounds' | 'letters', masteredItems: string[], totalItems: number }) => void, onBack?: () => void }> = ({ stage = 'pure-sounds', onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [userAudioUrl, setUserAudioUrl] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [masteredItems, setMasteredItems] = useState<string[]>([]);

  const currentItem = LESSON_DATA[currentIndex];
  const letterImage = getLetterImage(currentItem.letter);
  
  // Debug logging
  console.log('Current stage:', stage);
  console.log('Current letter:', currentItem.letter);
  console.log('Letter image found:', !!letterImage);
  if (letterImage) {
    console.log('Image URL:', letterImage.imageUrl);
  }
  
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
              // Add to mastered items
              setMasteredItems(prev => [...prev, currentItem.letter]);
              new Audio('/assets/audio/success.mp3').play().catch(() => {}); 
              setTimeout(() => {
                  handleNext();
              }, 1500);
          } else {
              setVerificationResult('needs-practice');
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
    setMasteredItems([]); // Clear mastered items when stage changes
  }, [stage]);

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
        <div className="w-full max-w-md mx-auto bg-white rounded-[3rem] shadow-2xl p-8 text-center animate-fade-in-up border-8 border-[#e7effc]">
            <div className="mb-8 flex justify-center">
                <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-xl animate-bounce">
                    <CheckCircle size={48} />
                </div>
            </div>
            <h2 className="text-3xl font-black text-[#022d62] mb-4 font-outfit">
                {stage === 'pure-sounds' ? 'Great Progress!' : 'Amazing Work!'}
            </h2>
            <p className="text-[#022d62]/60 mb-8 font-bold text-lg leading-relaxed">
                {stage === 'pure-sounds' 
                    ? 'You explored all the sounds! Ready to see the letters?' 
                    : 'You connected sounds to letters! You\'re building your reading foundation!'}
            </p>
            
            <div className="mb-8 p-4 bg-[#e7effc] rounded-2xl">
                <p className="text-[#022d62] font-bold">
                    🌟 You completed this learning adventure!
                </p>
            </div>
            
            <button 
                onClick={() => {
                    if (onComplete) {
                        // For pure sounds, assume all are mastered as they just listened
                        // For letters, use the actually tracked mastered items
                        const items = stage === 'pure-sounds' 
                            ? LESSON_DATA.map(d => d.letter) 
                            : [...masteredItems, currentItem.letter];
                            
                        onComplete({
                            lessonType: stage === 'pure-sounds' ? 'sounds' : 'letters',
                            masteredItems: items,
                            totalItems: LESSON_DATA.length
                        });
                    }
                }}
                className="w-full py-5 bg-[#fb9610] text-white rounded-[2rem] text-xl font-black shadow-2xl shadow-orange-500/30 hover:scale-[1.05] active:scale-95 transition-all flex items-center justify-center gap-4 border-b-8 border-orange-700"
            >
                {stage === 'pure-sounds' ? (
                    <>Continue Learning <ArrowRight size={28} /></>
                ) : (
                    <>Continue to Next Lesson <ArrowRight size={28} /></>
                )}
            </button>
            
            <button 
                onClick={() => {
                    // Reset all state to restart the lesson
                    setIsLessonComplete(false);
                    setCurrentIndex(0);
                    setMasteredItems([]);
                }}
                className="w-full mt-4 py-3 bg-white text-[#022d62] border-2 border-[#022d62] rounded-full font-bold hover:bg-[#022d62] hover:text-white transition-all"
            >
                Practice Again
            </button>
        </div>
      );
  }

  return (
    <div 
      className="h-full flex flex-col items-center justify-center text-center py-4 px-2"
    >
      
      {/* Counter: X of X */}
      <div className="mb-2 text-[#fb9610] font-black text-lg font-outfit animate-bounce">
          {currentIndex + 1} of {LESSON_DATA.length}
      </div>

      {/* Swipe Hint */}
      <div className="mb-2 text-slate-400 font-bold text-[8px] uppercase tracking-widest flex items-center gap-1">
          <span>←</span> Swipe <span>→</span>
      </div>

      {/* Speaker Icon - The Phonics App Style */}
      <button 
        onClick={playReference}
        className="mb-3 text-slate-800 hover:scale-110 transition-transform active:scale-95 p-2 rounded-full"
        aria-label="Play sound"
      >
        <Volume2 size={40} strokeWidth={1.5} />
      </button>

      {/* Image Display Section - Only show in letters mode, not pure sounds */}
      {stage === 'letters' && letterImage && (
        <div className="mb-2 w-full max-w-[100px]"> {/* Reduced from 120px to 100px */}
          <div className="comic-image-container w-full aspect-square">
            <img 
              src={letterImage.imageUrl} 
              alt={letterImage.description}
              className="comic-image object-cover"
              loading="lazy"
              onLoad={() => console.log('Image loaded successfully:', letterImage.imageUrl)}
              onError={(e) => {
                console.log('Image failed to load:', letterImage.imageUrl);
                // Fallback to a placeholder or handle the error
                e.currentTarget.src = 'https://placehold.co/100x100/022d62/ffffff?text=' + letterImage.letter.toUpperCase();
              }}
            />
          </div>
          
          {/* Word with highlighted letter - Make it smaller */}
          <div className="speech-bubble mt-1 text-sm"> {/* Added text-sm to make text smaller */}
            <div 
              dangerouslySetInnerHTML={{ 
                __html: highlightWord(letterImage.word, letterImage.highlightPositions) 
              }} 
            />
          </div>
          
          <p className="text-slate-500 text-[8px] font-bold text-center mt-0"> {/* Even smaller text, reduced margin */}
            {letterImage.description}
          </p>
        </div>
      )}

      {/* Massive Text Section - Make it smaller to save space */}
      <div className="flex flex-col items-center gap-2"> {/* Reduced gap from 3 to 2 */}
        <div className="relative">
            <h2 
                className="text-4xl font-black leading-none font-outfit text-slate-900 tracking-tight cursor-pointer hover:scale-105 transition-transform"
                style={{ fontWeight: 900 }}
                onClick={playReference}
            >
                {stage === 'pure-sounds' ? '?' : currentItem.letter}
            </h2>
            {/* Sound hint tooltip */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-slate-400 text-xs font-bold opacity-0 hover:opacity-100 transition-opacity">
                Tap to hear
            </div>
        </div>

        {/* Phoneme Dots - Visual indicator */}
        <div className="flex gap-2">
            <div className={`w-2 h-2 rounded-full transition-colors ${stage === 'pure-sounds' ? 'bg-[#fb9610]' : 'bg-slate-900'}`} />
            {stage === 'letters' && <div className="w-2 h-2 bg-slate-900/10 rounded-full" />}
        </div>
        
        {/* Stage indicator */}
        <p className="text-slate-400 text-[8px] font-bold uppercase tracking-widest"> {/* Made text smaller */}
            {stage === 'pure-sounds' ? 'Listen' : 'Learn'}
        </p>
      </div>

      {/* Recording Section with Explanation */}
      <div className="mt-4 w-full max-w-[250px] px-2">
           {/* Explanation text */}
           <p className="text-slate-400 text-[8px] font-bold uppercase tracking-wider mb-2 text-center">
                Hold & say the sound
           </p>
           
           {!showCompare ? (
                <button 
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    onMouseLeave={stopRecording}
                    onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
                    onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }}
                    className={`
                        w-full py-2 rounded-full font-black text-base shadow-md transition-all border-b-2
                        ${isRecording 
                            ? 'bg-rose-500 text-white border-rose-800 translate-y-1' 
                            : 'bg-[#fb9610] text-white border-[#b36a0b] active:translate-y-1'
                        }
                    `}
                    aria-label={isRecording ? 'Recording...' : 'Hold and speak'}
                >
                    {isRecording ? '🎤 Listening...' : 'Hold & Talk 🎤'}
                </button>
           ) : (
                <div className="flex flex-col gap-2 animate-fade-in">
                    {verificationResult === 'correct' ? (
                        <button 
                            onClick={handleNext}
                            className="w-full py-2 bg-emerald-500 text-white rounded-full font-black text-base shadow-md border-b-2 border-emerald-800 animate-bounce"
                        >
                            Great! Keep Going 🎈
                        </button>
                    ) : (
                        <div className="flex gap-1">
                            <button 
                                onClick={playUserAudio}
                                className="flex-1 py-1.5 bg-slate-100 rounded-lg font-black text-slate-600 border-b-2 border-slate-200 text-[10px]"
                            >
                                🔊 Listen
                            </button>
                            <button 
                                onClick={() => setShowCompare(false)}
                                className="flex-1 py-1.5 bg-white border-2 border-[#fb9610] rounded-lg font-black text-[#fb9610] text-[10px]"
                            >
                                🔄 Try Again
                            </button>
                        </div>
                    )}
                </div>
           )}
      </div>

      {/* Visual Navigation Buttons - Toddler Friendly */}
      <div className="mt-4 flex gap-2 justify-center">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0 && !onBack}
          className={`px-3 py-1.5 rounded-lg font-black text-xs flex items-center gap-1 transition-all ${
            (currentIndex > 0 || onBack)
              ? 'bg-white text-[#022d62] border border-[#022d62] hover:scale-105 active:scale-95'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          ← Prev
        </button>
        
        <button
          onClick={handleNext}
          className={`px-3 py-1.5 rounded-lg font-black text-xs flex items-center gap-1 transition-all ${
            currentIndex < LESSON_DATA.length - 1
              ? 'bg-[#fb9610] text-white border border-orange-700 hover:scale-105 active:scale-95'
              : 'bg-emerald-500 text-white border border-emerald-700 hover:scale-105 active:scale-95'
          }`}
        >
          {currentIndex === LESSON_DATA.length - 1 ? 'Finish! 🎉' : 'Next →'}
        </button>
      </div>

    </div>
  );
};

export default SatpinLesson;
