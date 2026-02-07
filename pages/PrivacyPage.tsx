
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const PrivacyPage: React.FC = () => {
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
          </div>
        </div>
      </nav>

      <article className="py-20 max-w-3xl mx-auto px-6 prose prose-slate dark:prose-invert">
        <h1 className="text-4xl font-extrabold mb-8">Privacy Policy</h1>
        <p className="text-slate-500 mb-8">Last Updated: October 2024</p>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
          <p>We collect minimal information necessary to provide an excellent learning experience, including your name, email, and academic progress. We do not sell your data to third parties.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Academic Tracking</h2>
          <p>Performance data from WASSCE practice exams is stored locally and on our secure servers to provide you with performance analytics. Institutional users (schools) may view student data linked to their organization.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. AI Interaction</h2>
          <p>Interactions with the AI Study Tutor are used to improve the model's accuracy for West African educational contexts. These logs are anonymized whenever possible.</p>
        </section>
      </article>
    </div>
  );
};

export default PrivacyPage;
