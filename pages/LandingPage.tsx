
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
  Star,
  Menu,
  X,
  Zap,
  Play
} from 'lucide-react';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stats = [
    { label: 'Active Students', value: '45k+', icon: <Users size={20} /> },
    { label: 'Courses', value: '150+', icon: <BookOpen size={20} /> },
    { label: 'Pass Rate', value: '94%', icon: <Award size={20} /> },
    { label: 'Tutors', value: '300+', icon: <CheckCircle2 size={20} /> },
  ];

  const features = [
    {
      title: 'Study for Class',
      desc: 'Interactive video lessons & real-time exercises.',
      icon: <BookOpen className="text-white" size={24} />,
      bg: 'bg-blue-600',
      span: 'col-span-1 md:col-span-1'
    },
    {
      title: 'Ace WASSCE',
      desc: 'Thousands of timed mock exams with deep analytics.',
      icon: <Award className="text-white" size={24} />,
      bg: 'bg-purple-600',
      span: 'col-span-1 md:col-span-2'
    },
    {
      title: 'Peer Learning',
      desc: 'Join study groups.',
      icon: <Users className="text-white" size={24} />,
      bg: 'bg-orange-600',
      span: 'col-span-1 md:col-span-1'
    },
    {
      title: 'Expert Support',
      desc: 'Get 24/7 help from mentors.',
      icon: <MessageCircle className="text-white" size={24} />,
      bg: 'bg-green-600',
      span: 'col-span-1 md:col-span-1'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300 overflow-x-hidden font-sans selection:bg-blue-200 dark:selection:bg-blue-900">
      
      {/* Navigation */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-600/20">E</div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">EasyLearn</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#stats" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Results</a>
            <Link to="/about" className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">About</Link>
          </div>

          {/* Actions */}
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

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 p-4 animate-fade-in-up shadow-xl">
             <div className="flex flex-col gap-2">
                <a href="#features" onClick={() => setIsMenuOpen(false)} className="p-3 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Features</a>
                <a href="#stats" onClick={() => setIsMenuOpen(false)} className="p-3 font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Results</a>
                <Link to="/login" className="p-3 font-bold text-slate-800 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl">Log In</Link>
                <div className="flex items-center justify-between p-3">
                  <span className="font-bold text-slate-600 dark:text-slate-400">Theme</span>
                  <ThemeToggle />
                </div>
             </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <header className="relative pt-32 pb-16 md:py-32 overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 pointer-events-none"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-40 -left-20 w-72 h-72 bg-purple-400/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 text-center md:text-left">
            
            {/* Hero Text */}
            <div className="flex-1 max-w-2xl mx-auto md:mx-0 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm mb-8 mx-auto md:mx-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide">#1 Learning Platform in Ghana</span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                Master Your <br className="hidden md:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">Future Today.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg mx-auto md:mx-0">
                Join over 45,000 students acing their WASSCE exams with our AI-powered tutoring and premium video lessons.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start w-full sm:w-auto">
                <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-2xl shadow-xl shadow-slate-900/20 hover:scale-105 active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                  Start Learning Free <ArrowRight size={20} />
                </Link>
                <Link to="/features" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-bold border border-slate-200 dark:border-slate-800 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-center">
                  Explore Features
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center md:justify-start gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
                <span className="text-sm font-bold text-slate-400">Trusted by top schools:</span>
                <div className="flex gap-4">
                  {['Achimota', 'Presec', 'Wesley Girls'].map((school) => (
                    <span key={school} className="text-xs font-black uppercase text-slate-300 dark:text-slate-600">{school}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Hero Visual/Stats */}
            <div className="flex-1 w-full max-w-md md:max-w-none relative animate-fade-in-up animation-delay-200">
               <div className="relative z-10 bg-white dark:bg-slate-900 rounded-[2.5rem] p-4 shadow-2xl border border-slate-100 dark:border-slate-800 transform rotate-2 md:rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="aspect-[4/3] rounded-[2rem] overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Students learning" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                       <div className="text-white">
                          <p className="font-bold text-lg mb-1">Live Class Session</p>
                          <div className="flex items-center gap-2 text-sm opacity-90">
                              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Live Now • 1.2k watching
                          </div>
                       </div>
                    </div>
                    <button className="absolute inset-0 m-auto w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white md:opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 group-hover:scale-100">
                        <Play fill="currentColor" size={28} />
                    </button>
                  </div>
                  
                  {/* Floating Stats UI */}
                  <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-4 animate-bounce-slow">
                     <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-xl flex items-center justify-center">
                        <TrendingUp size={24} />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-slate-400 uppercase">Avg. Success</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white">98.5%</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section id="stats" className="py-10 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4">
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center p-4">
                   <div className="mb-2 text-blue-600 dark:text-blue-400 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl">
                     {stat.icon}
                   </div>
                   <h3 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h3>
                   <p className="text-xs md:text-sm font-bold text-slate-500 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-blue-600 font-bold tracking-widest uppercase text-xs mb-4 block">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 leading-tight">Everything You Need to <span className="text-blue-600">Excel</span>.</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">Our platform combines world-class curriculum with advanced AI to create the perfect learning environment for Ghanaian students.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className={`${f.span} group relative overflow-hidden rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
                 <div className={`absolute top-0 right-0 w-32 h-32 ${f.bg} opacity-10 rounded-bl-[100px] transition-transform group-hover:scale-150 duration-500`}></div>
                 
                 <div className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/5 group-hover:scale-110 transition-transform duration-300`}>
                    {f.icon}
                 </div>
                 
                 <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{f.title}</h3>
                 <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed mb-6">{f.desc}</p>
                 
                 <div className="flex items-center text-blue-600 font-bold text-sm group-hover:translate-x-2 transition-transform cursor-pointer">
                    Learn more <ChevronRight size={16} />
                 </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-blue-600 dark:bg-blue-900 z-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent"></div>
         </div>
         
         <div className="container mx-auto px-4 relative z-10 text-center text-white">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Ready to boost your grades?</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">Join the fastest growing student community in West Africa today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/register" className="px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-2xl shadow-xl hover:scale-105 transition-transform">Get Started for Free</Link>
               <Link to="/contact" className="px-10 py-4 bg-transparent border-2 border-white/30 text-white font-bold text-lg rounded-2xl hover:bg-white/10 transition-colors">Contact Schools</Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-900">
        <div className="container mx-auto px-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-slate-900 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-900 font-bold">E</div>
               <span className="font-bold text-lg text-slate-900 dark:text-white">EasyLearn</span>
            </div>
            <div className="flex items-center gap-8 text-sm font-bold text-slate-500">
               <Link to="/terms" className="hover:text-blue-600 transition-colors">Terms</Link>
               <Link to="/privacy" className="hover:text-blue-600 transition-colors">Privacy</Link>
               <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <p className="text-sm text-slate-400 font-medium">© 2026 EasyLearn Inc.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
