
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      title: 'Phonetic Mapping',
      desc: 'Connect sounds to letters with our advanced audio engine.',
      icon: <Zap className="text-teal-400" size={24} />,
      bg: 'bg-teal-900/20 border-teal-500/20',
      span: 'col-span-1'
    },
    {
      title: 'Word Workshop',
      desc: 'Build words on a magnetic board. Touch, move, and hear them.',
      icon: <Hammer className="text-indigo-400" size={24} />,
      bg: 'bg-indigo-900/20 border-indigo-500/20',
      span: 'col-span-1'
    },
    {
      title: 'Private Progress',
      desc: 'No leaderboards. No public grades. Your journey is yours alone.',
      icon: <Lock className="text-slate-400" size={24} />,
      bg: 'bg-slate-900/20 border-slate-500/20',
      span: 'col-span-1'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-lexend text-slate-300 selection:bg-teal-500/30 selection:text-teal-200 overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800">
        <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-indigo-500/20 font-outfit shrink-0">A</div>
            <span className="text-sm xs:text-base sm:text-lg md:text-xl font-bold text-white tracking-tight font-outfit leading-tight">
              Adesua Reading & Sounds Lab
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Methodology</a>
            <Link to="/about" className="text-sm font-bold text-slate-400 hover:text-white transition-colors">Our Mission</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
               <ThemeToggle />
            </div>
            <Link to="/dashboard/lab" className="hidden sm:inline-flex px-6 py-2.5 bg-slate-900 border border-slate-800 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-all">
              Log In
            </Link>
            <Link to="/dashboard/lab" className="hidden sm:inline-flex px-6 py-2.5 bg-teal-500 text-slate-950 text-sm font-bold rounded-xl shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:bg-teal-400 hover:scale-105 transition-all">
              Enter Lab
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-400 hover:bg-slate-900 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 inset-x-0 bg-slate-950 border-b border-slate-800 p-4 animate-fade-in-up shadow-2xl">
             <div className="flex flex-col gap-2">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="p-4 font-bold text-slate-400 hover:bg-slate-900 rounded-xl">Methodology</a>
                <Link to="/dashboard/lab" className="p-4 font-bold text-white hover:bg-slate-900 rounded-xl">Log In</Link>
                <Link to="/dashboard/lab" className="p-4 font-bold text-teal-400 hover:bg-slate-900 rounded-xl">Enter Lab</Link>
             </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-indigo-900/20 to-transparent pointer-events-none"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-[-100px] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800 rounded-full shadow-sm mb-8 animate-fade-in-up">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                <span className="text-xs font-bold text-teal-400 uppercase tracking-widest">Quiet Progress Engine v1.0</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight font-outfit max-w-4xl mx-auto animate-fade-in-up animation-delay-100">
               Reading confidence <br className="hidden md:block"/>
               built in <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">private.</span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
               A stigma-free laboratory for adults and teens to decode sounds, build words, and master reading without judgment.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center animate-fade-in-up animation-delay-300">
               <Link to="/dashboard/lab" className="w-full sm:w-auto px-8 py-5 bg-teal-500 text-slate-950 font-bold text-lg rounded-2xl shadow-[0_0_30px_rgba(45,212,191,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                  Start Your Journey <ArrowRight size={20} />
               </Link>
               <Link to="/about" className="w-full sm:w-auto px-8 py-5 bg-slate-900 text-slate-300 font-bold text-lg border border-slate-800 rounded-2xl hover:bg-slate-800 transition-all text-center">
                  How it Works
               </Link>
            </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-950 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`${f.span} group relative rounded-[2.5rem] bg-slate-900/50 border border-slate-800 p-8 hover:bg-slate-900 transition-all duration-300`}>
                 <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {f.icon}
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-3 font-outfit">{f.title}</h3>
                 <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-950 border-t border-slate-900">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center text-white font-bold font-outfit">A</div>
               <span className="font-bold text-lg text-slate-500">Adesua Reading & Sounds Lab</span>
            </div>
            <p className="text-sm text-slate-600 font-medium">© 2026 Adesua Reading & Sounds Lab Inc. Ghana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
