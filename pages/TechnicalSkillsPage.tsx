
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Settings, Wrench, Laptop, Zap, ArrowRight } from 'lucide-react';

const TechnicalSkillsPage: React.FC = () => {
  const tracks = [
    { title: "ICT & Computing", icon: <Laptop />, color: "bg-blue-600", desc: "Software development, networking, and data management tracks." },
    { title: "Electrical Engineering", icon: <Zap />, color: "bg-orange-600", desc: "Installation, industrial maintenance, and solar technology." },
    { title: "Mechanical Tech", icon: <Settings />, color: "bg-purple-600", desc: "Automotive engineering and industrial machining basics." },
    { title: "Vocational Arts", icon: <Wrench />, color: "bg-green-600", desc: "Graphic design, tailoring, and catering modules." },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <nav className="sticky top-0 z-50 glass-morphism dark:bg-slate-900/80 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white">EasyLearn</span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-6 py-2 blue-gradient text-white font-bold rounded-lg shadow-lg">Start Skill Track</Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">Technical & Vocational Excellence</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">Beyond the books. Master practical skills demanded by today's West African job market.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {tracks.map((track, i) => (
              <div key={i} className="flex gap-8 p-10 bg-slate-50 dark:bg-slate-900 rounded-[40px] hover:scale-[1.02] transition-all border border-transparent hover:border-blue-600/20">
                <div className={`w-20 h-20 ${track.color} rounded-[28px] shrink-0 flex items-center justify-center text-white shadow-xl`}>
                  {React.cloneElement(track.icon as React.ReactElement, { size: 36 })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{track.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">{track.desc}</p>
                  <Link to="/login" className="inline-flex items-center gap-2 font-bold text-blue-600 group">
                    Explore Modules <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnicalSkillsPage;
