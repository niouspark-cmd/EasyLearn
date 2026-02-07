import React, { useState, useRef, useEffect } from 'react';
import { Volume2 } from 'lucide-react';
import { speakText } from '../../utils/voiceUtils';

interface SoundTileProps {
  grapheme: string;
  phoneme: string;
  audioSrc?: string; // Optional for now, assuming we might synthesize or play local files
  color?: string; // e.g., 'bg-blue-500', 'bg-red-500'
}

const SoundTile: React.FC<SoundTileProps> = ({ grapheme, phoneme, audioSrc, color = 'bg-blue-600' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

const playSound = () => {
    setIsPlaying(true);
    
    // Use Voice Utils for consistent sound
    speakText(grapheme, {
      rate: 0.8,
      pitch: 1.1, // Slightly higher for friendly effect
      onEnd: () => setIsPlaying(false)
    });

    // Visual feedback timeout safely clears
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <button
      onClick={playSound}
      className={`relative group aspect-square rounded-[2rem] ${color} text-white shadow-lg shadow-blue-900/20 active:scale-95 transition-all duration-150 flex flex-col items-center justify-center overflow-hidden`}
    >
      <div className={`absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500`} />
      
      {/* Pulse Effect */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-[2rem] border-4 border-white/50 animate-ping" />
      )}

      <span className="relative z-10 text-4xl sm:text-5xl font-bold font-lexend mb-2">{grapheme}</span>
      <span className="relative z-10 text-xs sm:text-sm font-medium opacity-80 uppercase tracking-widest">{phoneme}</span>
      
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <Volume2 size={20} className="text-white/80" />
      </div>

      {audioSrc && <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} hidden />}
    </button>
  );
};

export default SoundTile;
