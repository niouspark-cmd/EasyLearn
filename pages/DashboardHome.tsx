
import React, { useEffect, useState } from 'react';
import { 
  Zap, 
  Hammer, 
  BookOpen, 
  Play,
  ArrowRight
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
    color: 'teal' | 'indigo' | 'slate',
    locked?: boolean
}> = ({ title, subtitle, icon, to, color, locked }) => {
    const bgColors = {
        teal: 'bg-teal-50 dark:bg-teal-900/10 border-teal-100 dark:border-teal-900/30 hover:border-teal-300',
        indigo: 'bg-indigo-50 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-300',
        slate: 'bg-slate-50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800'
    };

    const iconColors = {
        teal: 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400',
        indigo: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
        slate: 'bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
    };

    return (
        <Link 
            to={locked ? '#' : to}
            className={`
                relative group p-6 rounded-[2rem] border transition-all duration-300
                ${locked ? 'opacity-60 cursor-not-allowed grayscale' : 'hover:-translate-y-1 hover:shadow-xl'}
                ${bgColors[color]}
            `}
        >
            <div className="flex items-start justify-between mb-8">
                <div className={`p-4 rounded-2xl ${iconColors[color]} transition-transform group-hover:scale-110`}>
                    {icon}
                </div>
                {!locked && (
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
                        <ArrowRight size={20} />
                    </div>
                )}
            </div>
            
            <div>
                <h3 className="text-2xl font-bold font-outfit text-slate-900 dark:text-white mb-2">{title}</h3>
                <p className="font-lexend text-slate-500 dark:text-slate-400">{subtitle}</p>
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
    <div className="max-w-5xl mx-auto pb-20 px-4 sm:px-6">
      
      {/* Hero / Progress Header */}
      <header className="mb-12 pt-8 animate-fade-in-up">
        <h1 className="text-4xl md:text-5xl font-bold font-outfit text-slate-900 dark:text-white mb-4">
          {greeting}, {user?.firstName || 'Friend'}.
        </h1>
        <p className="text-xl text-slate-500 dark:text-slate-400 font-lexend">
          You've mastered <span className="text-teal-600 dark:text-teal-400 font-bold">12 sounds</span> this week.
        </p>

        {/* Current Focus Card */}
        <div className="mt-8 relative overflow-hidden rounded-[2.5rem] bg-indigo-900 text-white p-8 md:p-10 shadow-2xl shadow-indigo-900/20 group">
            <div className="absolute top-0 right-0 w-[30rem] h-[30rem] bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <span className="inline-block px-4 py-2 rounded-full bg-indigo-800/50 border border-indigo-700/50 text-teal-300 text-xs font-bold uppercase tracking-widest mb-4">
                        Current Focus
                    </span>
                    <h2 className="text-3xl font-bold font-outfit mb-2">Short Vowels & 'T'</h2>
                    <p className="text-indigo-200/80 max-w-md">Continue working on blending short 'a' with terminal consonants.</p>
                </div>
                
                <Link 
                    to="/dashboard/lab" 
                    className="flex items-center gap-3 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-slate-900 font-bold rounded-2xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(45,212,191,0.3)]"
                >
                    <Play size={20} fill="currentColor" />
                    <span>Resume Session</span>
                </Link>
            </div>
        </div>
      </header>

      {/* The Hub Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up animation-delay-200">
        
        <HubCard 
            title="The Sound Board"
            subtitle="Explore the building blocks."
            icon={<Zap size={32} />}
            to="/dashboard/lab"
            color="indigo"
        />

        <HubCard 
            title="The Workshop"
            subtitle="Build and blend words."
            icon={<Hammer size={32} />}
            to="/dashboard/lab" // Ideally specific tab?
            color="teal"
        />

        <HubCard 
            title="The Reading Room"
            subtitle="Put it all together."
            icon={<BookOpen size={32} />}
            to="/dashboard/lab"
            color="slate"
        />

      </div>
    </div>
  );
};

export default DashboardHome;
