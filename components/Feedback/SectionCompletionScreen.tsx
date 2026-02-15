import React, { useEffect } from 'react';
import { ArrowRight, Trophy, Star, Sparkles, Zap, Layout } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SectionCompletionScreenProps {
  title: string;
  subtitle: string;
  nextSectionTitle: string;
  nextSectionIcon?: React.ReactNode;
  onContinue: () => void;
  onHome: () => void;
}

const SectionCompletionScreen: React.FC<SectionCompletionScreenProps> = ({
  title,
  subtitle,
  nextSectionTitle,
  nextSectionIcon,
  onContinue,
  onHome
}) => {
  useEffect(() => {
    // Premium confetti effect
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#fb9610', '#022d62', '#ffffff']
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
    
    // Sound removed as requested

  }, []);

  return (
    <div className="fixed inset-0 z-[110] bg-[#022d62] flex flex-col items-center justify-center p-6 text-white animate-fade-in overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#fb9610] rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#fb9610] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        {/* Trophy Icon */}
        <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center text-[#fb9610] shadow-2xl mb-8 animate-bounce-custom">
            <Trophy size={48} className="sm:w-16 sm:h-16" strokeWidth={2.5} />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-outfit mb-4 leading-tight tracking-tight">
          {title}
        </h2>
        
        <p className="text-lg sm:text-xl text-white/80 font-medium mb-10 max-w-xs sm:max-w-md mx-auto">
          {subtitle}
        </p>

        {/* Next Up Card */}
        <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 mb-10 transform transition-all hover:scale-105 duration-300">
            <p className="text-[#fb9610] font-black uppercase tracking-widest text-xs mb-3">
                Up Next
            </p>
            <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#022d62]">
                    {nextSectionIcon || <Zap size={24} />}
                </div>
                <div>
                    <h3 className="text-xl font-black leading-none mb-1">{nextSectionTitle}</h3>
                    <p className="text-sm text-white/60 font-bold">Ready to start?</p>
                </div>
            </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col w-full gap-4">
            <button
                onClick={onContinue}
                className="w-full bg-[#fb9610] text-white py-4 rounded-2xl font-black text-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 group"
            >
                Let's Go!
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
                onClick={onHome}
                className="w-full bg-transparent text-white/60 py-3 rounded-2xl font-bold hover:bg-white/5 transition-all"
            >
                Back to Dashboard
            </button>
        </div>
      </div>
    </div>
  );
};

export default SectionCompletionScreen;
