
import React from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const TermsPage: React.FC = () => {
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
        <h1 className="text-4xl font-extrabold mb-8">Terms of Service</h1>
        <p className="text-slate-500 mb-8">Effective Date: October 2024</p>
        
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing Easy Learn LMS, you agree to abide by these terms. This platform is designed for educational purposes only.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">2. Academic Integrity</h2>
          <p>Users must use the platform honestly. Attempting to manipulate exam results or bypass security measures is strictly prohibited and may result in account termination.</p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">3. Content Ownership</h2>
          <p>All video lessons, quiz questions, and study materials are the property of Easy Learn LMS and its certified partners. Unauthorized reproduction or redistribution is prohibited.</p>
        </section>
      </article>
    </div>
  );
};

export default TermsPage;
