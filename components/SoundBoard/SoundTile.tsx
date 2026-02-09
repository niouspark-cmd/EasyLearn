
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
  const [showMic, setShowMic] = useState(false);
  
  // Assessment Hook
  const { startListening, isListening, isLoading, score, transcript } = useSpeechAssessment(grapheme); // Match against grapheme for now, ideally phonetic representation

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

  const handleMicClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isListening && !isLoading) {
          startListening();
      }
  };

  return (
    <div
      className={`relative group aspect-square rounded-[2rem] ${color} text-white shadow-lg shadow-blue-900/20 transition-all duration-150 flex flex-col items-center justify-center overflow-hidden cursor-pointer user-select-none`}
      onMouseEnter={() => setShowMic(true)}
      onMouseLeave={() => setShowMic(false)}
      onClick={playSound}
    >
      <div className={`absolute inset-0 bg-white/20 blur-xl rounded-full scale-0 group-hover:scale-150 transition-transform duration-500`} />
      
      {/* Pulse Effect */}
      {isPlaying && (
        <span className="absolute inset-0 rounded-[2rem] border-4 border-white/50 animate-ping" />
      )}

      {/* Mic/Feedback Overlay */}
      <div className={`absolute top-2 right-2 z-20 transition-all duration-300 ${showMic || isListening || isLoading || score > 0 ? 'opacity-100' : 'opacity-0'}`}>
         <button 
            onClick={handleMicClick}
            className={`p-2 rounded-full backdrop-blur-md transition-colors ${
                isListening ? 'bg-red-500/80 text-white animate-pulse' :
                isLoading ? 'bg-yellow-500/80 text-white' :
                score > 70 ? 'bg-green-500/80 text-white' : 
                'bg-white/20 text-white hover:bg-white/30'
            }`}
         >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : 
             score > 70 ? <CheckCircle size={16} /> :
             score > 0 && score <= 70 ? <XCircle size={16} /> :
             <Mic size={16} />
            }
         </button>
      </div>
      
      {/* Transcript Feedback (Temporary) */}
      {(score > 0 || transcript) && (
          <div className="absolute bottom-2 left-0 right-0 text-center">
             <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${score > 70 ? 'bg-green-500/40' : 'bg-red-500/40'}`}>
                {transcript || (score > 70 ? 'Good!' : 'Retry')}
             </span>
          </div>
      )}

      <span className="relative z-10 text-4xl sm:text-5xl font-bold font-lexend mb-2 pointer-events-none">{grapheme}</span>
      <span className="relative z-10 text-xs sm:text-sm font-medium opacity-80 uppercase tracking-widest pointer-events-none">{phoneme}</span>
      
      <div className={`absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity ${isPlaying ? 'opacity-100' : ''}`}>
        <Volume2 size={20} className="text-white/80" />
      </div>
    </div>
  );
};

export default SoundTile;
