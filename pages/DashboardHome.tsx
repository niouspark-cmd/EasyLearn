
import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  Hammer, 
  BookOpen, 
  Play,
  ArrowRight,
  Star
} from 'lucide-react';
import { useApp } from '../AppContext';
import { Link } from 'react-router-dom';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const HubCard: React.FC<{ 
    title: string, 
    subtitle: string, 
    icon: React.ReactNode, 
    to: string, 
    variant: 'orange' | 'navy'
}> = ({ title, subtitle, icon, to, variant }) => {
    return (
        <Link 
            to={to}
            className={`
                group p-8 rounded-[3rem] border-b-8 transition-all duration-300 flex flex-col items-center text-center gap-4
                ${variant === 'orange' 
                    ? 'bg-[#fb9610] border-orange-700 text-white hover:scale-105 active:translate-y-2' 
                    : 'bg-[#022d62] border-blue-950 text-white hover:scale-105 active:translate-y-2'
                }
            `}
        >
            <div className={`p-6 rounded-[2rem] bg-white/20 transition-transform group-hover:rotate-12`}>
                {React.cloneElement(icon as React.ReactElement, { size: 48, strokeWidth: 3 })}
            </div>
            
            <div>
                <h3 className="text-3xl font-black font-outfit mb-2">{title}</h3>
                <p className="font-lexend text-white/80 font-bold text-sm tracking-wide uppercase">{subtitle}</p>
            </div>
        </Link>
    );
};

const DashboardHome: React.FC = () => {
  const { user } = useApp();
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] py-8 px-4">
      <div className="w-full max-w-2xl bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-[3rem] p-8 md:p-12 shadow-inner-lg flex flex-col items-center">
        
        {/* Playful Header */}
        <header className="mb-8 text-center animate-fade-in-up w-full">
          <div className="flex justify-center mb-6">
              <div className="bg-white dark:bg-slate-800 p-4 md:p-6 rounded-3xl shadow-xl rotate-1 hover:rotate-0 transition-transform cursor-default inline-block border-2 border-[#fb9610] max-w-full">
                  <h1 className="text-3xl md:text-5xl font-black font-outfit text-[#022d62] dark:text-white leading-tight px-4 tracking-tighter">
                      Adesua<br/>Reading & Sounds
                  </h1>
              </div>
          </div>
          
          <h2 className="text-lg md:text-xl font-black text-[#022d62]/30 dark:text-white/20 font-outfit mb-1">
            {greeting}, {user?.firstName || 'Friend'}! 🎈
          </h2>
          <div className="flex items-center justify-center gap-2">
              <span className="h-1 w-6 bg-[#fb9610] rounded-full opacity-30" />
              <p className="font-black text-[#fb9610] uppercase tracking-[0.2em] text-[9px] md:text-xs">Adventure Awaits</p>
              <span className="h-1 w-6 bg-[#fb9610] rounded-full opacity-30" />
          </div>
        </header>

        {/* Main Action Area - Ultra Focused */}
        <div className="flex flex-col gap-6 w-full max-w-md animate-fade-in-up animation-delay-200">
          
          <Link 
              to="/dashboard/lab"
              className="group relative w-full py-5 px-8 bg-[#fb9610] text-white rounded-[2rem] font-black text-2xl shadow-lg hover:scale-[1.02] active:translate-y-1 transition-all border-b-8 border-orange-700 flex items-center justify-center gap-4 text-center"
          >
              <div className="p-3 bg-white/20 rounded-2xl group-hover:rotate-12 transition-transform shadow-inner">
                  <Play size={24} fill="currentColor" strokeWidth={0} />
              </div>
              <span className="tracking-tight">Start Learning</span>
          </Link>

          <div className="relative flex items-center py-6">
              <div className="flex-grow border-t border-[#022d62]/5 dark:border-white/5"></div>
              <span className="flex-shrink mx-4 text-[#022d62]/20 dark:text-white/20 font-black uppercase tracking-[0.4em] text-[10px]">Explore More</span>
              <div className="flex-grow border-t border-[#022d62]/5 dark:border-white/5"></div>
          </div>

          <div className="grid grid-cols-1 gap-4 w-full">
              <Link 
                  to="/dashboard/performance" 
                  className="w-full py-6 px-10 bg-white dark:bg-slate-800 text-[#022d62] dark:text-white rounded-[2.5rem] font-black text-xl shadow-lg hover:scale-[1.02] active:translate-y-1 transition-all border-b-8 border-slate-100 dark:border-slate-900 flex items-center justify-between group"
              >
                  <span className="group-hover:translate-x-1 transition-transform tracking-tight">My Stickers</span>
                  <span className="text-3xl group-hover:scale-125 transition-transform">⭐</span>
              </Link>

              <Link 
                  to="/dashboard/settings" 
                  className="w-full py-5 px-10 bg-white/60 dark:bg-slate-800/60 text-[#022d62]/40 dark:text-white/40 rounded-[2.5rem] font-black text-lg hover:bg-white/80 dark:hover:bg-slate-800 hover:text-[#022d62]/60 dark:hover:text-white/60 hover:scale-[1.02] active:translate-y-1 transition-all text-center border-2 border-transparent hover:border-[#022d62]/5"
              >
                  Settings ⚙️
              </Link>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="mt-16 flex justify-center gap-10 opacity-20 pointer-events-none animate-fade-in">
             <span className="text-4xl grayscale hover:grayscale-0 transition-all cursor-default scale-110">📚</span>
             <span className="text-4xl grayscale hover:grayscale-0 transition-all cursor-default rotate-12 scale-110">✏️</span>
             <span className="text-4xl grayscale hover:grayscale-0 transition-all cursor-default -rotate-12 scale-110">🎨</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
