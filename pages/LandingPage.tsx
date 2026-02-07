
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Award, 
  Users, 
  MessageCircle, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star
} from 'lucide-react';
import { SUBJECTS, MOCK_COURSES } from '../constants';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage: React.FC = () => {
  const stats = [
    { label: 'Active Students', value: '45,000+' },
    { label: 'Courses Offered', value: '150+' },
    { label: 'Expert Teachers', value: '300+' },
    { label: 'WASSCE Pass Rate', value: '94%' },
  ];

  const features = [
    {
      title: 'Study for Class',
      desc: 'Join interactive classes with video lessons, rich modules, and real-time exercises.',
      icon: <BookOpen className="text-blue-600" size={32} />,
      color: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: 'Ace WASSCE',
      desc: 'Access thousands of timed mock exams with automatic grading and deep performance analytics.',
      icon: <Award className="text-purple-600" size={32} />,
      color: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      title: 'Peer Learning',
      desc: 'Connect with fellow students across Ghana, join study groups, and share knowledge.',
      icon: <Users className="text-orange-600" size={32} />,
      color: 'bg-orange-50 dark:bg-orange-900/20'
    },
    {
      title: 'Expert Support',
      desc: 'Get help from mentors and professional teachers through our dedicated support chat.',
      icon: <MessageCircle className="text-green-600" size={32} />,
      color: 'bg-green-50 dark:bg-green-900/20'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-morphism dark:bg-slate-900/80 py-4">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">E</div>
            <span className="text-2xl font-bold text-slate-800 dark:text-white">EasyLearn</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link to="/features" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">Features</Link>
            <Link to="/technical" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">Technical Skills</Link>
            <Link to="/about" className="text-slate-600 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">About</Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="px-5 py-2 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-all">Sign In</Link>
            <Link to="/register" className="px-6 py-2 blue-gradient text-white font-semibold rounded-lg shadow-lg shadow-blue-200 hover:scale-105 transition-all">Join Free</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative py-20 overflow-hidden">
        <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-blue-50 dark:bg-blue-900/10 rounded-l-[100px] transform translate-x-20"></div>
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full font-semibold text-sm mb-6">
              <Star size={16} /> <span>#1 E-Learning Platform in Ghana</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">
              Transform Your <span className="text-blue-600">Learning Journey</span> with Easy Learn
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-lg">
              Unlock your academic potential with personalized WASSCE preparation, interactive technical modules, and support from top educators.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-8 py-4 blue-gradient text-white font-bold rounded-xl text-lg flex items-center justify-center gap-2 group shadow-xl">
                Get Started Now <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border-2 border-slate-200 dark:border-slate-800 rounded-xl text-lg hover:border-blue-600 transition-all text-center">
                Browse Classes
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 animate-float">
              <img src="https://picsum.photos/seed/learning/800/600" className="rounded-[40px] shadow-2xl border-8 border-white dark:border-slate-800" alt="Learning" />
            </div>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">Designed for Every Student</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Everything you need to excel in your SHS education and technical training, all in one place.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[32px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-transparent dark:border-slate-800">
                <div className={`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6`}>
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
                <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">EasyLearn</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm">Empowering students across Africa with quality, accessible, and affordable digital education tools.</p>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Platform</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                <li><Link to="/features" className="hover:text-blue-600 transition-colors">Features</Link></li>
                <li><Link to="/technical" className="hover:text-blue-600 transition-colors">Technical Skills</Link></li>
                <li><Link to="/about" className="hover:text-blue-600 transition-colors">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white mb-6">Support</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Contact Sales</Link></li>
                <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
