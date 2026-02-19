
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
    setActiveSegment(-1); // Highlight all during blend
    
    try {
        await ElevenLabsService.playWithPhonemes(word);
    } catch (e) {
        console.error("Word playback failed", e);
    }
    
    setActiveSegment(null);
    setIsPlayingFull(false);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-4">
      
      {/* 1. Full Word Speaker Button - Enhanced Visual Design */}
      <div className="mb-8 w-full max-w-xs">
        <button 
          onClick={handlePlayWord}
          disabled={isPlayingFull || activeSegment !== null}
          className="relative w-full h-32 bg-gradient-to-br from-[#022d62] to-[#0a3a7a] rounded-[2rem] mx-auto flex flex-col items-center justify-center shadow-xl active:scale-95 transition-all group outline-none border-4 border-white/20 hover:shadow-2xl disabled:opacity-50"
        >
          <div className="text-white">
            <span className="text-3xl font-black font-outfit tracking-tight">{word}</span>
          </div>
          
          {/* Play icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity">
            <Volume2 size={28} className="text-white" />
          </div>
          
          {/* Visual indicator when playing */}
          {isPlayingFull && (
            <div className="absolute -top-2 -right-2 bg-[#fb9610] rounded-full p-2 animate-bounce shadow-md">
              <Volume2 size={16} className="text-white" />
            </div>
          )}
        </button>
      </div>

      {/* 2. Phoneme Segments with Enhanced Visual Feedback */}
      <div className="flex justify-center gap-6 mb-8 w-full">
        {segments && segments.length > 0 ? segments.map((seg, index) => {
          const isActive = activeSegment === index || activeSegment === -1;
          const bgColor = seg.color || (seg.type === 'vowel' ? 'bg-[#fb9610]' : 'bg-[#022d62]');
          
          return (
            <div key={index} className="flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
              <button
                onClick={() => handlePlaySegment(index, seg.text)}
                className={`w-16 h-16 rounded-full ${bgColor} text-white flex items-center justify-center transition-all shadow-lg border-4 border-white ${
                  isActive 
                    ? 'ring-4 ring-[#fb9610]/50 scale-110' 
                    : 'hover:scale-105 active:scale-95'
                }`}
              >
                <span className="text-2xl font-black font-outfit pb-1">{seg.text}</span>
              </button>
              
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                isActive ? 'bg-[#fb9610] scale-125' : 'bg-slate-200'
              }`} />
              
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {seg.type}
              </span>
            </div>
          );
        }) : <div className="text-red-500">No segments data</div>}
      </div>

      {/* 3. Progress Visualization */}
      <div className="flex gap-2 mb-4">
        {segments.map((_, index) => {
          const isActive = activeSegment === index || activeSegment === -1;
          return (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                isActive ? 'bg-[#fb9610] scale-125' : 'bg-slate-200'
              }`}
            />
          );
        })}
      </div>

      {/* 4. Clear Instructions with Visual Cues */}
      <div className="text-center animate-pulse">
        <div className="flex items-center justify-center gap-1 mb-1">
          <div className="w-2 h-2 bg-[#fb9610] rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#022d62] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-[#fb9610] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
          Tap the circles to hear sounds
        </p>
      </div>
    </div>
  );
};

export default ElkoninBox;
