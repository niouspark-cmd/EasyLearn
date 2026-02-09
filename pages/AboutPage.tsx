
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Heart, Globe, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#e7effc] font-lexend text-[#022d62]">
      <nav className="sticky top-0 z-50 bg-[#e7effc]/80 backdrop-blur-md border-b border-[#022d62]/5 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#022d62] rounded-xl flex items-center justify-center text-white font-bold text-xl font-outfit">A</div>
            <span className="text-2xl font-black text-[#022d62] font-outfit">Adesua Lab</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/register" className="px-6 py-2 bg-[#fb9610] text-white font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-orange-500/20">Join Us</Link>
          </div>
        </div>
      </nav>

      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-black text-[#022d62] mb-8 leading-tight font-outfit">Our Mission is <span className="text-[#fb9610]">Dignity</span> in Literacy.</h1>
            <p className="text-xl text-[#022d62]/60 mb-8 leading-relaxed font-medium">
              Adesua Lab was born from a silent crisis: millions of bright, capable adults and teens struggle with reading due to gaps in their early education. Traditional "remedial" classes often bring shame. We built a private laboratory where you can rebuild your foundation—sound by sound—without judgment.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-[#022d62]/10 pt-8">
              <div>
                <p className="text-4xl font-black text-[#022d62] font-outfit">2026</p>
                <p className="text-[#022d62]/40 font-bold uppercase tracking-widest text-[10px]">Lab Founded</p>
              </div>
              <div>
                <p className="text-4xl font-black text-[#fb9610] font-outfit">Scientific</p>
                <p className="text-[#022d62]/40 font-bold uppercase tracking-widest text-[10px]">Approach</p>
              </div>
            </div>
          </div>
          <div className="relative">
             <div className="absolute inset-0 bg-[#022d62]/5 rounded-[3rem] rotate-6 blur-xl"></div>
             <div className="relative bg-white border border-[#022d62]/5 p-8 rounded-[3rem] shadow-2xl">
                <p className="text-lg italic text-[#022d62] font-medium leading-relaxed">"I hid my reading struggle for 20 years. Adesua gave me a place to fix it in private."</p>
                <div className="mt-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#fb9610]/10 rounded-full flex items-center justify-center text-[#fb9610] font-black">KW</div>
                    <div>
                        <p className="text-[#022d62] font-black">Kwame W.</p>
                        <p className="text-[#022d62]/40 font-bold uppercase tracking-widest text-[10px]">Accra, Ghana</p>
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
