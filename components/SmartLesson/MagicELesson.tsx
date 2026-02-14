import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

interface MagicPair {
  short: string; // e.g. "hop"
  long: string;  // e.g. "hope"
  vowel: string; // e.g. "o"
}

interface MagicELessonProps {
  data: MagicPair[];
  onComplete: () => void;
  onBack?: () => void;
}

const MagicELesson: React.FC<MagicELessonProps> = ({ data, onComplete, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMagic, setHasMagic] = useState(false);

  const currentPair = data[currentIndex];

  const playSound = (isLong: boolean) => {
    ElevenLabsService.play(isLong ? currentPair.long : currentPair.short);
  };

  const toggleMagic = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const newMagicState = !hasMagic;
    setHasMagic(newMagicState);
    
    // Play the appropriate sound after a tiny delay for visual transition
    setTimeout(() => {
        playSound(newMagicState);
    }, 200);
  };

  const handleNext = () => {
    setHasMagic(false);
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
      if (currentIndex > 0) {
          setHasMagic(false);
          setCurrentIndex(prev => prev - 1);
      } else if (onBack) {
          onBack();
      }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 animate-fade-in bg-gradient-to-b from-[#e7effc] to-white">
      
      <div className="mb-4 text-center">
          <h2 className="text-3xl font-black text-[#ec4899] font-outfit mb-2 flex items-center justify-center gap-2">
            <Sparkles className="animate-spin-slow" /> Magic E!
          </h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Make the vowel say its name</p>
      </div>

      <div className="flex-1 w-full flex flex-col items-center justify-center">
        
        {/* Magic Wand Interactive Area */}
        <div className="relative mb-12 group flex items-center">
            {/* The Word - Tapping this plays the current sound */}
            <div 
                onClick={() => playSound(hasMagic)}
                className={`
                    text-7xl sm:text-9xl font-black font-outfit tracking-widest transition-all duration-500 cursor-pointer
                    ${hasMagic ? 'text-[#ec4899] scale-110 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]' : 'text-[#022d62]'}
                `}
            >
                {hasMagic ? currentPair.long : currentPair.short}
            </div>
            
            {/* The Magic E Button/Indicator - Tapping this toggles the state */}
            <button 
                onClick={toggleMagic}
                className={`
                    ml-4 w-16 h-16 rounded-full flex items-center justify-center shadow-xl border-4 transition-all duration-500
                    ${hasMagic ? 'bg-[#ec4899] border-white scale-125 rotate-12' : 'bg-white border-slate-200 hover:scale-110'}
                `}
            >
                <span className={`text-4xl font-black transition-colors ${hasMagic ? 'text-white' : 'text-slate-300'}`}>e</span>
                {hasMagic && <Sparkles className="absolute -top-2 -right-2 text-yellow-300 w-8 h-8 animate-bounce" />}
            </button>
            
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-12 text-center w-full">
                <p className="text-sm font-bold text-slate-400">
                    {hasMagic ? "✨ Tap the word to hear it! ✨" : "Tap the 'e' to add magic!"}
                </p>
            </div>
        </div>

      </div>

      <div className="flex gap-4 w-full max-w-sm px-4">
          <button 
                onClick={handlePrev}
                className="p-4 bg-slate-100 text-slate-400 rounded-full font-black hover:bg-slate-200 transition-colors"
          >
              <ArrowLeft />
          </button>
          
          <button 
                onClick={handleNext}
                className={`
                    flex-1 flex items-center justify-center gap-2 py-4 rounded-full font-black text-white shadow-lg transition-all text-xl
                    ${hasMagic ? 'bg-[#ec4899] shadow-pink-500/30 animate-pulse' : 'bg-slate-300 cursor-not-allowed'}
                `}
                disabled={!hasMagic}
          >
                {currentIndex === data.length - 1 ? 'Finish!' : 'Next Word'} <ArrowRight />
          </button>
      </div>

    </div>
  );
};

export default MagicELesson;
