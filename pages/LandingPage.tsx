
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
    <div className="min-h-screen bg-[#e7effc] h-screen flex flex-col items-center justify-center p-6 text-center overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#fb9610]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#022d62]/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Card */}
      <div className="max-w-md w-full animate-fade-in-up">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center gap-6 mb-12">
            <div className="w-24 h-24 bg-[#022d62] rounded-[2rem] flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-[#022d62]/20 font-outfit rotate-3">
              AS
            </div>
            <div className="space-y-2">
                <h1 className="text-4xl font-black text-[#022d62] font-outfit leading-tight">
                    Adesua<br/>Reading & Sounds
                </h1>
                <p className="text-[#022d62]/40 font-bold uppercase tracking-widest text-[10px]">Simple Phonics for Everyone</p>
            </div>
        </div>

        {/* The Big Action */}
        <div className="space-y-6">
            <Link 
                to="/dashboard/lab" 
                className="group relative block w-full py-8 px-8 bg-[#fb9610] text-white rounded-[3rem] font-black text-3xl shadow-2xl hover:scale-105 active:translate-y-2 transition-all border-b-[12px] border-orange-700 flex items-center justify-center gap-4"
            >
                <span>Start Learning</span>
                <span className="text-4xl transition-transform group-hover:translate-x-2">🚀</span>
            </Link>

            <p className="text-[#022d62]/30 font-bold text-sm">
                No passwords. No pressure. <br/> Just fun with sounds!
            </p>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-16 pt-8 border-t border-[#022d62]/5 flex justify-center gap-8">
            <Link to="/about" className="text-xs font-black text-[#022d62]/40 hover:text-[#022d62] uppercase tracking-widest transition-colors">How it works</Link>
            <Link to="/login" className="text-xs font-black text-[#022d62]/40 hover:text-[#022d62] uppercase tracking-widest transition-colors">Log In</Link>
        </div>

      </div>

      {/* Playful Floating Elments */}
      <div className="fixed bottom-12 left-12 animate-bounce opacity-20 pointer-events-none">
          <div className="text-6xl">🍎</div>
      </div>
      <div className="fixed top-24 right-12 animate-pulse opacity-20 pointer-events-none">
          <div className="text-6xl">⭐</div>
      </div>

    </div>
  );
};

export default LandingPage;
