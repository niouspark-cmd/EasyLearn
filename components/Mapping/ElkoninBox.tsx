
import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { getPhoneticSound } from '../../utils/phoneticMap';

export interface PhonemeSegment {
  text: string;
  type: 'consonant' | 'vowel' | 'digraph' | 'blend';
  color?: string; // Optional override
}

interface ElkoninBoxProps {
  word: string;
  segments: PhonemeSegment[];
  onPlaySegment?: (segment: string) => void;
  onPlayWord?: (word: string) => void;
  showDots?: boolean;
}

const ElkoninBox: React.FC<ElkoninBoxProps> = ({ word, segments, onPlaySegment, onPlayWord, showDots = true }) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);

  const handlePlaySegment = async (index: number, text: string) => {
    setActiveSegment(index);
    
    // Play sound from Azure (using phonetic mapping)
    try {
        await ElevenLabsService.play(text);
    } catch (e) {
        console.error("Segment playback failed", e);
    }

    setTimeout(() => setActiveSegment(null), 500);
  };

  const handlePlayWord = async () => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);

    // Visual Pulse Sequence (Fast)
    for (let i = 0; i < segments.length; i++) {
        setActiveSegment(i);
        await new Promise(r => setTimeout(r, 150)); 
    }
    setActiveSegment(null);

    // Play Full Word
    try {
        // Use ElevenLabs AI for the full word
        await ElevenLabsService.play(word);
    } catch (e) {
        console.error("Word playback failed", e);
    }
    
    setIsPlayingSequence(false);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800">
      
      {/* The Sound Boxes */}
      <div className="flex flex-wrap justify-center gap-3">
        {segments.map((seg, index) => {
          // Determine color based on type if not provided
          const baseColor = seg.color || (
            seg.type === 'vowel' ? 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800' :
            seg.type === 'digraph' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700' :
            'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
          );

          return (
            <div key={`${word}-${index}`} className="flex flex-col items-center gap-4">
                <button
                onClick={() => handlePlaySegment(index, seg.text)}
                className={`
                    relative w-20 h-24 sm:w-24 sm:h-32 rounded-2xl border-2 flex items-center justify-center
                    transition-all duration-200 hover:-translate-y-1 active:scale-95
                    ${baseColor}
                    ${activeSegment === index ? 'ring-4 ring-teal-400 dark:ring-teal-500 ring-opacity-50 scale-105 z-10' : ''}
                `}
                >
                <span className="text-3xl sm:text-4xl font-bold font-lexend">{seg.text}</span>
                
                {/* Type Indicator */}
                <span className="absolute bottom-2 text-[10px] uppercase tracking-wider font-bold opacity-50">
                    {seg.type}
                </span>
                </button>

                {/* Sound Dot */}
                {showDots && (
                    <button
                        onClick={() => handlePlaySegment(index, seg.text)}
                        className={`
                            w-6 h-6 rounded-full transition-all duration-300
                            ${activeSegment === index 
                                ? 'bg-indigo-600 dark:bg-white scale-125 shadow-lg shadow-teal-500/50' 
                                : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                            }
                        `}
                    />
                )}
            </div>
          );
        })}
      </div>

      {/* Full Word Control */}
      <button 
        onClick={handlePlayWord}
        className="flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
      >
        <Volume2 size={20} className="text-slate-600 dark:text-slate-400" />
        <span className="text-lg font-bold text-slate-900 dark:text-white font-lexend tracking-wide">
          {word}
        </span>
      </button>
    </div>
  );
};

export default ElkoninBox;
