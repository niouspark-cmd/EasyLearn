
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const PrivacyPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 font-sans">
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/20">E</div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">EasyLearn</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/#features" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</Link>
            <Link to="/about" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
            <Link to="/contact" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
               <ThemeToggle />
            </div>
            <Link to="/login" className="hidden sm:inline-flex px-5 py-2 text-sm font-bold text-slate-700 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
              Log In
            </Link>
            <Link to="/register" className="px-5 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:scale-105 transition-all">
              Get Started
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 p-4 animate-fade-in-up shadow-xl">
             <div className="flex flex-col gap-2">
                <Link to="/" className="p-3 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Home</Link>
                <Link to="/about" className="p-3 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">About</Link>
                <Link to="/contact" className="p-3 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Contact</Link>
                <Link to="/login" className="p-3 font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Log In</Link>
                <div className="flex items-center justify-between p-3">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Theme</span>
                  <ThemeToggle />
                </div>
             </div>
          </div>
        )}
      </nav>

      <div className="py-20 max-w-3xl mx-auto px-6">
        <h1 className="text-4xl font-extrabold mb-8 text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">Last Updated: March 2026</p>
        
        <div className="space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">1. Data Collection</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">We collect minimal information necessary to provide an excellent learning experience, including your name, email, and academic progress. We do not sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">2. Academic Tracking</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Performance data from WASSCE practice exams is stored locally and on our secure servers to provide you with performance analytics. Institutional users (schools) may view student data linked to their organization.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">3. AI Interaction</h2>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">Interactions with the AI Study Tutor are used to improve the model's accuracy for West African educational contexts. These logs are anonymized whenever possible.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
