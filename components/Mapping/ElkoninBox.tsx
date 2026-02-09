
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

const ElkoninBox: React.FC<ElkoninBoxProps> = ({ word, segments, showDots = true }) => {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [isPlayingFull, setIsPlayingFull] = useState(false);

  const handlePlaySegment = async (index: number, text: string) => {
    setActiveSegment(index);
    try {
        await ElevenLabsService.play(text);
    } catch (e) {
        console.error("Segment playback failed", e);
    }
    setTimeout(() => setActiveSegment(null), 500);
  };

  const handlePlayWord = async () => {
    if (isPlayingFull) return;
    setIsPlayingFull(true);

    // 1. Slow sequence of individual sounds
    for (let i = 0; i < segments.length; i++) {
        setActiveSegment(i);
        await ElevenLabsService.play(segments[i].text);
        await new Promise(r => setTimeout(r, 400)); // Pause between sounds for blending practice
    }
    
    // 2. Clear highlights for a tiny beat
    setActiveSegment(null);
    await new Promise(r => setTimeout(r, 300));

    // 3. Highlight everything and play full word
    setActiveSegment(-1); // Special state for "all active"
    try {
        await ElevenLabsService.play(word);
    } catch (e) {
        console.error("Word playback failed", e);
    }
    
    await new Promise(r => setTimeout(r, 600));
    setActiveSegment(null);
    setIsPlayingFull(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8">
      
      {/* 1. Speaker Icon - Plays Full Word */}
      <button 
        onClick={handlePlayWord}
        disabled={isPlayingFull || activeSegment !== null}
        className="mb-16 text-slate-800 dark:text-slate-200 hover:scale-110 transition-transform active:scale-95 disabled:opacity-50"
      >
        <Volume2 size={80} strokeWidth={1.5} className={isPlayingFull ? 'animate-pulse' : ''} />
      </button>

      {/* 2. Massive Word Display */}
      <div className="relative group">
        <div className="flex items-end justify-center">
            {segments.map((seg, index) => {
                const isActive = activeSegment === index || activeSegment === -1;
                return (
                    <div key={index} className="flex flex-col items-center">
                        <span 
                            className={`
                                text-[10rem] font-black font-outfit leading-none select-none transition-all duration-300
                                ${isActive ? 'text-black dark:text-white scale-105' : 'text-slate-300 dark:text-slate-700'}
                            `}
                        >
                            {seg.text}
                        </span>
                        
                        {/* 3. The Mapping Dots */}
                        <button
                            onClick={() => handlePlaySegment(index, seg.text)}
                            className={`
                                mt-12 w-6 h-6 rounded-full transition-all duration-500
                                ${isActive ? 'bg-black dark:bg-white scale-125' : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700'}
                            `}
                        />
                    </div>
                );
            })}
        </div>
      </div>

      {/* 4. Instructions */}
      <p className="mt-20 text-slate-400 dark:text-slate-500 font-bold uppercase tracking-[0.3em] text-sm animate-pulse">
        Tap the dots to hear sounds
      </p>
    </div>
  );
};

export default ElkoninBox;
