
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';
import { Heart, Globe, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
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
            <Link to="/login" className="px-6 py-2 blue-gradient text-white font-bold rounded-lg shadow-lg">Join Us</Link>
          </div>
        </div>
      </nav>

      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl font-extrabold text-slate-900 dark:text-white mb-8 leading-tight">Our Mission is <span className="text-blue-600">Equality</span> in Education.</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
              Founded in Accra, Easy Learn LMS was born from a simple observation: quality educational resources are unevenly distributed. We believe every student in West Africa deserves access to the best teachers and tools, regardless of their location.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-blue-600">2021</p>
                <p className="text-slate-500 font-medium">Year Founded</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-600">50+</p>
                <p className="text-slate-500 font-medium">Core Contributors</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/about/800/800" className="rounded-[80px] shadow-2xl" alt="" />
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: <Heart />, title: "Student-Centric", text: "We measure our success by the success of our learners." },
              { icon: <Globe />, title: "Accessibility", text: "Optimizing for low bandwidth and mobile-first experiences." },
              { icon: <Award />, title: "Excellence", text: "Holding our content to the highest GES academic standards." },
            ].map((v, i) => (
              <div key={i} className="p-8">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                  {v.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{v.title}</h3>
                <p className="text-slate-400">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
