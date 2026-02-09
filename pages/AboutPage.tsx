
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Heart, Globe, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-950 font-lexend text-slate-300">
      <nav className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-xl flex items-center justify-center text-white font-bold text-xl font-outfit">A</div>
            <span className="text-2xl font-bold text-white font-outfit">Adesua Lab</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/register" className="px-6 py-2 bg-teal-500 text-slate-900 font-bold rounded-xl hover:bg-teal-400 transition-all">Join Us</Link>
          </div>
        </div>
      </nav>

      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight font-outfit">Our Mission is <span className="text-teal-400">Dignity</span> in Literacy.</h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Adesua Lab was born from a silent crisis: millions of bright, capable adults and teens struggle with reading due to gaps in their early education. Traditional "remedial" classes often bring shame. We built a private laboratory where you can rebuild your foundation—sound by sound—without judgment.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
              <div>
                <p className="text-4xl font-bold text-indigo-400 font-outfit">2026</p>
                <p className="text-slate-500 font-medium">Lab Founded</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-teal-400 font-outfit">Scientific</p>
                <p className="text-slate-500 font-medium">Approach</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-indigo-600/20 rounded-[3rem] rotate-6 blur-xl"></div>
             <div className="relative bg-slate-900 border border-slate-800 p-8 rounded-[3rem] shadow-2xl">
                <p className="text-lg italic text-slate-300">"I hid my reading struggle for 20 years. Adesua gave me a place to fix it in private."</p>
                <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-teal-900/50 rounded-full flex items-center justify-center text-teal-400 font-bold">KW</div>
                    <div>
                        <p className="text-white font-bold">Kwame W.</p>
                        <p className="text-slate-500 text-sm">Accra, Ghana</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
