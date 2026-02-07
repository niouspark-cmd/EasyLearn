
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Cpu, 
  Target, 
  Users, 
  Play, 
  FileText, 
  Smartphone, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const FeaturesPage: React.FC = () => {
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
            <Link to="/login" className="px-6 py-2 blue-gradient text-white font-bold rounded-lg shadow-lg">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6">Powerful Tools for Modern Students</h1>
            <p className="text-xl text-slate-600 dark:text-slate-400">Everything you need to master your curriculum and excel in your exams.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { icon: <Cpu />, title: "AI Study Tutor", desc: "Get 24/7 instant help with difficult concepts. Our AI is trained on West African curricula." },
              { icon: <Target />, title: "WASSCE Readiness", desc: "Real past papers and timed mock exams with automatic grading and feedback." },
              { icon: <Users />, title: "Peer Collaboration", desc: "Join moderated study groups and share notes with thousands of students." },
              { icon: <Play />, title: "Interactive Video", desc: "Bite-sized video lessons from the best teachers in the sub-region." },
              { icon: <FileText />, title: "Rich Resources", desc: "Downloadable summary sheets, flashcards, and practice worksheets for every topic." },
              { icon: <Smartphone />, title: "Offline Learning", desc: "Download lessons to your device and study anywhere without data." },
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[40px] border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-2xl transition-all group">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{feature.desc}</p>
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold cursor-pointer">
                  Learn more <ArrowRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">Secure & Trusted Environment</h2>
            <div className="space-y-6">
              {[
                { title: "Privacy First", desc: "We protect student data with enterprise-grade encryption.", icon: <ShieldCheck /> },
                { title: "Teacher Verified", desc: "All our content is reviewed by GES-certified educators.", icon: <Zap /> },
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src="https://picsum.photos/seed/feature1/600/400" className="rounded-[40px] shadow-2xl relative z-10" alt="" />
            <div className="absolute -top-10 -right-10 w-40 h-40 blue-gradient rounded-full blur-[80px] opacity-20"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
