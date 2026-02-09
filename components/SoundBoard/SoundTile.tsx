
import React, { useState } from 'react';
import { Volume2, Mic, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { getPhoneticSound } from '../../utils/phoneticMap';
import useSpeechAssessment from '../../hooks/useSpeechAssessment';

interface SoundTileProps {
  grapheme: string;
  phoneme: string;
  audioSrc?: string;
  color?: string;
}

const SoundTile: React.FC<SoundTileProps> = ({ grapheme, phoneme, color = 'bg-blue-600' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playSound = async (e: React.MouseEvent) => {
      e.stopPropagation();
      if (isPlaying) return;
      setIsPlaying(true);
      
      try {
          await ElevenLabsService.play(grapheme, {
              onComplete: () => setIsPlaying(false)
          });
      } catch (e) {
          console.error("Audio playback failed", e);
          setIsPlaying(false);
      }
  };

  return (
    <button
      onClick={playSound}
      className={`
        relative w-16 h-16 sm:w-20 sm:h-20 rounded-full ${color} text-white 
        shadow-lg flex flex-col items-center justify-center transition-all 
        hover:scale-110 active:scale-95 border-b-4 border-black/10
        ${isPlaying ? 'ring-4 ring-white shadow-xl rotate-3' : ''}
      `}
    >
      <span className="text-2xl sm:text-3xl font-black font-outfit leading-none mb-0.5">{grapheme}</span>
      <span className="text-[8px] font-bold opacity-70 uppercase tracking-tighter">{phoneme}</span>
      
      {isPlaying && (
        <div className="absolute -top-1 -right-1 bg-white rounded-full p-1 text-slate-800 shadow-sm animate-bounce">
            <Volume2 size={12} />
        </div>
      )}
    </button>
  );
};

export default SoundTile;
