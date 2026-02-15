import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { getWordImage } from '../../utils/letterImages';

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
  const currentWord = hasMagic ? currentPair.long : currentPair.short;
  
  // Get image for the CURRENT state (short or long word) if available
  const currentImage = getWordImage(currentWord);

  useEffect(() => {
    setHasMagic(false);
  }, [currentIndex]);

  const playSound = (word: string) => {
    ElevenLabsService.play(word);
  };

  const toggleMagic = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    const newMagicState = !hasMagic;
    setHasMagic(newMagicState);
    
    // Play the appropriate sound after a tiny delay for visual transition
    setTimeout(() => {
        playSound(newMagicState ? currentPair.long : currentPair.short);
    }, 150);
  };

  const handleNext = () => {
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
    <div className="h-full flex flex-col pt-4 pb-6 px-4 animate-fade-in bg-[#f0f9ff]">
      
      {/* 1. Header: Simple Progress */}
      <div className="flex justify-between items-center mb-6 px-2">
          <button onClick={handlePrev} className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
              <ArrowLeft size={24} />
          </button>
          
          <div className="flex flex-col items-center">
             <h2 className="text-sm font-black text-[#ec4899] uppercase tracking-widest font-outfit flex items-center gap-1">
                <Sparkles size={14} /> Level 6: Magic E
             </h2>
             <div className="flex gap-1 mt-1">
                {data.map((_, i) => (
                    <div key={i} className={`h-1.5 w-6 rounded-full transition-colors ${i === currentIndex ? 'bg-[#ec4899]' : 'bg-slate-200'}`} />
                ))}
             </div>
          </div>

          <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        
        {/* Main Card */}
        <div 
            onClick={toggleMagic} // Clicking anywhere on card toggles magic
            className={`
                relative w-full max-w-sm aspect-square bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-6
                transition-all duration-500 cursor-pointer overflow-hidden border-4
                ${hasMagic ? 'border-[#ec4899] shadow-pink-200 scale-105' : 'border-transparent shadow-slate-200'}
            `}
        >
            {/* Word Image (if available) */}
            <div className="w-32 h-32 mb-6 relative z-10">
                 <img 
                    key={currentWord} // Force re-render/fade when word changes
                    src={currentImage}
                    onError={(e) => e.currentTarget.style.display = 'none'} // Hide if broken
                    alt={currentWord}
                    className="w-full h-full object-contain animate-fade-in-up"
                 />
            </div>

            {/* The Word Display */}
            <div className="text-center z-10 flex items-center justify-center">
                <span className="text-6xl sm:text-7xl font-black font-outfit text-[#022d62] transition-all">
                    {/* Render the base word part (e.g. "hop") */}
                    {hasMagic ? currentPair.long.slice(0, -1) : currentPair.short}
                </span>
                
                {/* The Magic E: Ghost vs Real */}
                <span className={`
                    text-6xl sm:text-7xl font-black font-outfit ml-1 transition-all duration-500
                    ${hasMagic 
                        ? 'text-[#ec4899] opacity-100 translate-y-0 rotate-0' 
                        : 'text-slate-200 opacity-50 translate-y-2 rotate-12'
                    }
                `}>
                    e
                </span>
            </div>
            
            {/* Helper Text */}
             <p className={`mt-6 text-sm font-bold transition-colors ${hasMagic ? 'text-[#ec4899]' : 'text-slate-400'}`}>
                {hasMagic ? "✨ Magic!" : "Tap to add magic"}
             </p>
        </div>

      </div>


      {/* 3. Bottom Action Bar */}
      <div className="mt-8 w-full max-w-sm mx-auto">
          <button 
                onClick={handleNext}
                disabled={!hasMagic} 
                className={`
                    w-full py-4 rounded-2xl font-black text-xl shadow-lg transition-all flex items-center justify-center gap-2
                    ${hasMagic 
                        ? 'bg-[#ec4899] text-white shadow-pink-500/30 hover:scale-105 active:scale-95 animate-bounce-subtle' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }
                `}
          >
              {currentIndex === data.length - 1 ? 'Finish!' : 'Next Word'}
              <ArrowRight strokeWidth={3} size={22} />
          </button>
      </div>

    </div>
  );
};

export default MagicELesson;

