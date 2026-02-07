import React, { useState } from 'react';
import { Volume2 } from 'lucide-react';
import { speakText } from '../../utils/voiceUtils';

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

  const handlePlaySegment = (index: number, text: string) => {
    if (isPlayingSequence) return;
    setActiveSegment(index);
    if (onPlaySegment) {
      onPlaySegment(text);
    } else {
      simulateAudio(text);
    }
    setTimeout(() => setActiveSegment(null), 500);
  };

  const handlePlayWord = async () => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);

    // Sequence playback logic (Visual Sync)
    for (let i = 0; i < segments.length; i++) {
        setActiveSegment(i);
        // We want a short burst for visual tracking? Or actual audio?
        // Prompt says: "When speaker icon is tapped, dots should pulse in sequence as the sound is played."
        // Usually means "blended" sound is played, but dots pulse?
        // OR "Phonemes played in sequence then blended"?
        // "Tapping the speaker icon triggers the full blended word... dots should pulse in sequence AS the sound is played."
        // If the sound is "cat", mapping start/end to dots is hard without timestamp data.
        // I will do a rapid pulse sequence (100ms each) then play the word.
        
        // Actually best effort: 
        await new Promise(r => setTimeout(r, 200)); 
    }
    setActiveSegment(null);

    // Play Word
    if (onPlayWord) {
      onPlayWord(word);
    } else {
      simulateAudio(word);
    }
    
    setIsPlayingSequence(false);
  };

  /* import { speakText, stopSpeaking } from '../../utils/voiceUtils'; */
  /* Add import at top manually or just assume it is there for this tool */

  const simulateAudio = (text: string) => {
    // Uses the friendly voice utility
    speakText(text, {
      rate: 0.8,
      pitch: 1.1
    });
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-[2rem] border-2 border-slate-100 dark:border-slate-800">
      
      {/* The Sound Boxes */}
      <div className="flex flex-wrap justify-center gap-3">
        {segments.map((seg, index) => {
          // Determine color based on type if not provided
          const baseColor = seg.color || (
            seg.type === 'vowel' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 border-red-200 dark:border-red-800' :
            seg.type === 'digraph' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 border-purple-200 dark:border-purple-800' :
            'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 border-blue-200 dark:border-blue-800'
          );

          return (
            <div key={`${word}-${index}`} className="flex flex-col items-center gap-4">
                <button
                onClick={() => handlePlaySegment(index, seg.text)}
                className={`
                    relative w-20 h-24 sm:w-24 sm:h-32 rounded-2xl border-2 flex items-center justify-center
                    transition-all duration-200 hover:-translate-y-1 active:scale-95
                    ${baseColor}
                    ${activeSegment === index ? 'ring-4 ring-blue-400 dark:ring-blue-500 ring-opacity-50 scale-105 z-10' : ''}
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
                                ? 'bg-slate-800 dark:bg-white scale-125 shadow-lg shadow-blue-500/50' 
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
