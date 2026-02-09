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
        colors: ['#fb9610', '#022d62', '#ffffff'] // Orange, Navy, White
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#fb9610', '#022d62', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#022d62]/90 backdrop-blur-sm animate-fade-in text-[#022d62] font-lexend">
      <div 
        className={`w-full max-w-md p-8 rounded-3xl bg-[#e7effc] border border-white/20 shadow-2xl transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Header / Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#fb9610] blur-xl opacity-40 rounded-full animate-pulse"></div>
            <div className="relative bg-[#fb9610]/20 p-4 rounded-full border border-[#fb9610]/50">
               <CheckCircle size={48} className="text-[#fb9610]" />
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-black text-center mb-2 text-[#022d62] font-outfit">Session Complete!</h2>
        <p className="text-center text-[#022d62]/60 mb-8 text-lg font-medium">You're making great progress.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
           <div className="bg-white p-4 rounded-2xl flex flex-col items-center border border-[#022d62]/5 hover:border-[#fb9610]/50 transition-colors shadow-sm">
              <div className="bg-[#fb9610]/10 p-2 rounded-full mb-2">
                 <CheckCircle size={20} className="text-[#fb9610]" />
              </div>
              <span className="text-2xl font-black text-[#022d62] mb-1">{soundsMastered}</span>
              <span className="text-xs text-[#022d62]/40 font-black uppercase tracking-widest">Sounds</span>
           </div>

           <div className="bg-white p-4 rounded-2xl flex flex-col items-center border border-[#022d62]/5 hover:border-[#fb9610]/50 transition-colors shadow-sm">
              <div className="bg-[#fb9610]/10 p-2 rounded-full mb-2">
                 <Award size={20} className="text-[#fb9610]" />
              </div>
              <span className="text-2xl font-black text-[#022d62] mb-1">{wordsBuilt}</span>
              <span className="text-xs text-[#022d62]/40 font-black uppercase tracking-widest">Words</span>
           </div>

           <div className="bg-white p-4 rounded-2xl flex flex-col items-center border border-[#022d62]/5 hover:border-[#fb9610]/50 transition-colors shadow-sm">
              <div className="bg-[#fb9610]/10 p-2 rounded-full mb-2">
                 <Calendar size={20} className="text-[#fb9610]" />
              </div>
              <span className="text-2xl font-black text-[#022d62] mb-1">{streakDays}</span>
              <span className="text-xs text-[#022d62]/40 font-black uppercase tracking-widest">Day Streak</span>
           </div>
        </div>

        {/* Actions */}
         <div className="space-y-3">
            <button 
              onClick={onContinue}
              className="w-full bg-[#fb9610] hover:bg-[#e88a0e] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95"
            >
              <span>Continue Journey</span>
              <ArrowRight size={20} />
            </button>

            <button 
              onClick={onExit}
              className="w-full bg-white hover:bg-[#e7effc] text-[#022d62] font-black py-3 rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-95 border border-[#022d62]/10"
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
