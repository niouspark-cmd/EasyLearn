
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ShieldCheck, 
  Menu,
  X,
  Zap,
  Hammer,
  ArrowRight,
  TrendingUp,
  Lock
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e7effc] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-center overflow-hidden">
      
      {/* Background Decor - Responsive positioning */}
      <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] sm:w-[40%] sm:h-[40%] bg-[#fb9610]/10 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] sm:w-[40%] sm:h-[40%] bg-[#022d62]/5 rounded-full blur-[80px] sm:blur-[100px] pointer-events-none" />

      {/* Main Content Card - Responsive container */}
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl animate-fade-in-up">
        
        {/* Logo Section - Responsive sizing */}
        <div className="flex flex-col items-center gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-[#022d62] rounded-[1.5rem] sm:rounded-[2rem] flex items-center justify-center text-white font-black text-3xl sm:text-4xl md:text-5xl shadow-xl shadow-[#022d62]/20 font-outfit rotate-3">
              AS
            </div>
            <div className="space-y-2">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#022d62] font-outfit leading-tight">
                    Adesua<br/>Reading & Sounds
                </h1>
                <p className="text-[#022d62]/40 font-bold uppercase tracking-widest text-[9px] sm:text-[10px] md:text-xs">Simple Phonics for Everyone</p>
            </div>
        </div>

        {/* The Big Action - Responsive button */}
        <div className="space-y-6 sm:space-y-8">
            <Link 
                to="/dashboard/lab" 
                className="group relative block w-full py-4 sm:py-5 px-5 sm:px-6 bg-[#fb9610] text-white rounded-full font-black text-xl sm:text-2xl shadow-lg border-b-4 border-orange-700 flex items-center justify-center gap-2 sm:gap-3"
            >
                <span>Start Learning</span>
                <span className="text-2xl sm:text-3xl">🚀</span>
            </Link>

            <p className="text-[#022d62]/30 font-bold text-sm sm:text-base md:text-lg">
                No passwords. No pressure. <br className="hidden sm:block"/> Just fun with sounds!
            </p>
        </div>

        {/* Secondary Navigation - Responsive spacing */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-[#022d62]/5 flex justify-center gap-6 sm:gap-8">
            <Link to="/about" className="text-[10px] sm:text-xs font-black text-[#022d62]/40 hover:text-[#022d62] uppercase tracking-widest transition-colors">How it works</Link>
            <Link to="/login" className="text-[10px] sm:text-xs font-black text-[#022d62]/40 hover:text-[#022d62] uppercase tracking-widest transition-colors">Log In</Link>
        </div>

      </div>

      {/* Playful Floating Elements - Responsive positioning and sizing */}
      <div className="fixed bottom-8 sm:bottom-12 left-8 sm:left-12 animate-bounce opacity-20 pointer-events-none">
          <div className="text-4xl sm:text-5xl md:text-6xl">🍎</div>
      </div>
      <div className="fixed top-16 sm:top-24 right-8 sm:right-12 animate-pulse opacity-20 pointer-events-none">
          <div className="text-4xl sm:text-5xl md:text-6xl">⭐</div>
      </div>

    </div>
  );
};

export default LandingPage;
