import React, { useState, useEffect } from 'react';
import { Volume2, ArrowRight, ArrowLeft } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

interface TrickyWordSet {
  grapheme: string; // e.g. "Set A"
  words: string[];
}

interface TrickyWordsLessonProps {
  data: TrickyWordSet[];
  onComplete: () => void;
  onBack?: () => void;
}

const TrickyWordsLesson: React.FC<TrickyWordsLessonProps> = ({ data, onComplete, onBack }) => {
  const [currentSetIndex, setCurrentSetIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentSet = data[currentSetIndex];
  const currentWord = currentSet.words[currentWordIndex];

  useEffect(() => {
    setIsFlipped(false);
  }, [currentWord]);

  const playWord = () => {
    ElevenLabsService.play(currentWord);
  };

  const handleNext = () => {
    setIsFlipped(false);
    if (currentWordIndex < currentSet.words.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
    } else if (currentSetIndex < data.length - 1) {
      setCurrentSetIndex(prev => prev + 1);
      setCurrentWordIndex(0);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
      if (currentWordIndex > 0) {
          setCurrentWordIndex(prev => prev - 1);
      } else if (currentSetIndex > 0) {
          setCurrentSetIndex(prev => prev - 1);
          setCurrentWordIndex(data[currentSetIndex - 1].words.length - 1);
      } else if (onBack) {
          onBack();
      }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 animate-fade-in">
      
      <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-[#fb9610] font-outfit mb-2">Tricky Words!</h2>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">These words break the rules</p>
      </div>

      <div className="relative perspective-1000 w-full max-w-sm h-64 cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                
                {/* Front Side */}
                <div className="absolute inset-0 backface-hidden bg-white rounded-3xl shadow-xl border-b-8 border-[#e7effc] flex flex-col items-center justify-center p-8 group hover:scale-[1.02] transition-transform">
                    <span className="text-sm font-black text-slate-300 uppercase tracking-widest absolute top-6">{currentSet.grapheme}</span>
                    <h3 className="text-6xl sm:text-7xl font-black text-[#022d62]">{currentWord}</h3>
                    <p className="mt-8 text-slate-400 text-xs font-bold flex items-center gap-2">
                        <Volume2 size={14} /> Tap to see & hear
                    </p>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 backface-hidden bg-[#022d62] rounded-3xl shadow-xl rotate-y-180 flex flex-col items-center justify-center p-8 text-white">
                    <button 
                        onClick={(e) => { e.stopPropagation(); playWord(); }}
                        className="w-20 h-20 bg-[#fb9610] rounded-full flex items-center justify-center shadow-lg animate-pulse mb-4 hover:scale-110 transition-transform"
                    >
                        <Volume2 size={40} />
                    </button>
                    <h3 className="text-4xl font-black">{currentWord}</h3>
                    <p className="mt-4 text-white/60 text-xs font-bold">Say it loud!</p>
                </div>
            </div>
      </div>

      <div className="mt-12 flex gap-4 w-full max-w-xs px-4">
          <button 
                onClick={handlePrev}
                className="flex-1 py-4 bg-slate-100 text-slate-400 rounded-2xl font-black hover:bg-slate-200 transition-colors"
          >
              <ArrowLeft className="mx-auto" />
          </button>
          
          <button 
                onClick={handleNext}
                className="flex-[3] py-4 bg-[#fb9610] text-white rounded-2xl font-black shadow-lg shadow-orange-500/20 active:scale-95 transition-all text-xl"
          >
                Next Word →
          </button>
      </div>

    </div>
  );
};

export default TrickyWordsLesson;
