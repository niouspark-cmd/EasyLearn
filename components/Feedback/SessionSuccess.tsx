import React, { useEffect, useState } from 'react';
import { CheckCircle, Award, Calendar, ArrowRight, Home } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SessionSuccessProps {
  soundsMastered: number;
  wordsBuilt: number;
  streakDays: number;
  onContinue: () => void;
  onExit: () => void;
}

const SessionSuccess: React.FC<SessionSuccessProps> = ({ 
  soundsMastered, 
  wordsBuilt, 
  streakDays, 
  onContinue, 
  onExit 
}) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    setShowContent(true);
    
    // Fire confetti for "Success Haptics" visual equivalent
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#2dd4bf', '#818cf8', '#ffffff'] // Teal, Indigo, White
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#2dd4bf', '#818cf8', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-sm animate-fade-in text-white font-lexend">
      <div 
        className={`w-full max-w-md p-8 rounded-3xl bg-indigo-950 border border-indigo-800 shadow-2xl transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Header / Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-teal-500 blur-xl opacity-40 rounded-full animate-pulse"></div>
            <div className="relative bg-teal-500/20 p-4 rounded-full border border-teal-500/50">
               <CheckCircle size={48} className="text-teal-400" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 text-white font-outfit">Session Complete!</h2>
        <p className="text-center text-indigo-200 mb-8 text-lg">You're making great progress.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
           <div className="bg-indigo-900/50 p-4 rounded-2xl flex flex-col items-center border border-indigo-800 hover:border-teal-500/50 transition-colors">
              <div className="bg-indigo-800/50 p-2 rounded-full mb-2">
                 <CheckCircle size={20} className="text-teal-400" />
              </div>
              <span className="text-2xl font-bold text-white mb-1">{soundsMastered}</span>
              <span className="text-xs text-indigo-300 font-medium">Sounds</span>
           </div>

           <div className="bg-indigo-900/50 p-4 rounded-2xl flex flex-col items-center border border-indigo-800 hover:border-teal-500/50 transition-colors">
              <div className="bg-indigo-800/50 p-2 rounded-full mb-2">
                 <Award size={20} className="text-purple-400" />
              </div>
              <span className="text-2xl font-bold text-white mb-1">{wordsBuilt}</span>
              <span className="text-xs text-indigo-300 font-medium">Words</span>
           </div>

           <div className="bg-indigo-900/50 p-4 rounded-2xl flex flex-col items-center border border-indigo-800 hover:border-teal-500/50 transition-colors">
              <div className="bg-indigo-800/50 p-2 rounded-full mb-2">
                 <Calendar size={20} className="text-amber-400" />
              </div>
              <span className="text-2xl font-bold text-white mb-1">{streakDays}</span>
              <span className="text-xs text-indigo-300 font-medium">Day Streak</span>
           </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
           <button 
             onClick={onContinue}
             className="w-full bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold py-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(45,212,191,0.3)] hover:shadow-[0_0_30px_rgba(45,212,191,0.5)] active:scale-95"
           >
             <span>Continue Journey</span>
             <ArrowRight size={20} />
           </button>

           <button 
             onClick={onExit}
             className="w-full bg-transparent hover:bg-indigo-900/50 text-indigo-300 font-medium py-3 rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border border-transparent hover:border-indigo-800"
           >
             <Home size={18} />
             <span>Back to Dashboard</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default SessionSuccess;
