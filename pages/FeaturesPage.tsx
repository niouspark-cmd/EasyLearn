
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Hammer, 
  Lock, 
  Headphones, 
  Mic, 
  Smartphone, 
  ArrowRight
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const FeaturesPage: React.FC = () => {
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
            <Link to="/register" className="px-6 py-2 bg-[#fb9610] text-white font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-orange-500/20">Get Access</Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-black text-[#022d62] mb-6 font-outfit">Tools for Quiet Mastery</h1>
            <p className="text-xl text-[#022d62]/60 font-medium">A complete laboratory for rebuilding your reading foundation.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: <Zap />, title: "Phonics Engine", desc: "Hear strict phonetic sounds mapping to letters, not letter names." },
              { icon: <Hammer />, title: "Word Workshop", desc: "Drag and drop graphemes to build words and test them instantly." },
              { icon: <Lock />, title: "Privacy First", desc: "No public leaderboards. Your progress is strictly between you and the lab." },
              { icon: <Headphones />, title: "Pure Audio", desc: "High-fidelity phoneme synthesis without distracting gamification." },
              { icon: <Mic />, title: "Speech Analysis", desc: "Compare your spoken words with standard pronunciation models." },
              { icon: <Smartphone />, title: "Mobile Ready", desc: "Practice discretely on your phone, anywhere, anytime." },
            ].map((feature, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] border border-[#022d62]/5 bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="w-14 h-14 bg-[#e7effc] text-[#022d62] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black text-[#022d62] mb-4 font-outfit">{feature.title}</h3>
                <p className="text-[#022d62]/60 font-medium leading-relaxed mb-6">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
