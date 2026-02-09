import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';


interface TextHighlighterProps {
  title: string;
  text: string;
  initialSpeed?: number;
  privacyMode?: boolean;
}


const TextHighlighter: React.FC<TextHighlighterProps> = ({ title, text, initialSpeed = 1.0, privacyMode = false }) => {
  const [words, setWords] = useState<string[]>([]);
  const [wordOffsets, setWordOffsets] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);
  
  // No longer need refs for audio/animation
  
  useEffect(() => {
    const w = text.split(' ');
    setWords(w);
    
    let current = 0;
    const offsets = w.map(word => {
        const start = current;
        current += word.length + 1; // +1 for space
        return start;
    });
    setWordOffsets(offsets);

    return () => stopAudio();
  }, [text]);

  const stopAudio = () => {
      ElevenLabsService.stop();
      setIsPlaying(false);
      setActiveIndex(-1);
  };

  const handlePlay = async () => {
    if (isPlaying) {
      stopAudio();
    } else {
      setIsPlaying(true);
      setActiveIndex(-1);

      try {
          await ElevenLabsService.play(text, {
              rate: speed,
              onBoundary: (e) => {
                  // e is simulated word boundary event
                  // We use e.textOffset to match our word offsets
                  // Simple exact match or closest previous
                  // Note: ElevenLabs simulation gives approximate char offset.
                  // We iterate to find the range it belongs to.
                  const offset = e.textOffset;
                  
                  // Find the word index corresponding to this offset
                  // A word i is active if offset >= wordOffsets[i] && offset < wordOffsets[i+1]
                  const idx = wordOffsets.findIndex((start, i) => {
                      const nextStart = wordOffsets[i + 1] ?? Infinity;
                      return offset >= start && offset < nextStart;
                  });

                  if (idx !== -1) {
                      setActiveIndex(idx);
                  }
              },
              onComplete: () => {
                  setIsPlaying(false);
                  setActiveIndex(-1);
              }
          });
      } catch (e) {
          console.error("Playback failed", e);
          setIsPlaying(false);
      }
    }
  };

  const handleStop = stopAudio;

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(e.target.value);
    setSpeed(newSpeed);
    // Note: Can't update speed of running Azure stream dynamically without restart
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-xl border border-[#022d62]/5">
      <div className="flex items-center justify-between mb-6">
         <h3 className="text-xl font-bold font-outfit text-[#022d62]">{title}</h3>
         
         {/* Controls */}
         <div className="flex items-center gap-4">
             {/* Speed Slider */}
             <div className="flex items-center gap-2 bg-[#e7effc] px-3 py-1 rounded-full">
              <span className="text-xs font-bold text-[#022d62]/40">Slow</span>
              <input 
                 type="range" 
                 min="0.5" 
                 max="1.5" 
                 step="0.1" 
                 value={speed} 
                 onChange={handleSpeedChange} 
                 className="w-20 accent-[#fb9610] cursor-pointer"
              />
              <span className="text-xs font-bold text-[#022d62]/40">Fast</span>
            </div>

            <button 
              onClick={handlePlay}
              className={`w-12 h-12 flex items-center justify-center rounded-full transition-all shadow-lg ${isPlaying ? 'bg-[#fb9610] text-white' : 'bg-[#022d62] text-white hover:scale-110 active:scale-95'}`}
            >
              {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
            </button>
            
            <button
               onClick={handleStop}
               className="w-10 h-10 flex items-center justify-center rounded-full bg-[#e7effc] text-[#022d62]/40 hover:text-red-500 transition-colors"
            >
               <RotateCcw size={20} />
            </button>
         </div>
      </div>

      <div className={`text-2xl sm:text-3xl font-lexend leading-relaxed text-[#022d62]/20 transition-all duration-500 ${privacyMode && !isPlaying ? 'blur-md select-none hover:blur-none' : ''}`}>
        {words.map((word, i) => (
          <span 
             key={i} 
             className={`inline-block mr-2 transition-colors duration-200 ${
               i === activeIndex 
                 ? 'text-[#fb9610] font-bold scale-105 transform' 
                 : i < activeIndex 
                    ? 'text-[#022d62]' 
                    : ''
             }`}
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TextHighlighter;
