
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400 rounded-full blur-[150px] opacity-10"></div>
      
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-200">E</div>
            <span className="text-3xl font-bold text-slate-800">EasyLearn</span>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-500">Log in to your account to continue your journey.</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Username or Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" 
                  placeholder="kofimensah@gmail.com"
                  defaultValue="kofimensah"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between ml-1">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-sm text-blue-600 font-bold hover:underline">Forgot?</a>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="password" 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" 
                  placeholder="••••••••"
                  defaultValue="password"
                />
              </div>
            </div>

            <button type="submit" className="w-full py-4 blue-gradient text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
              Sign In <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50">
            <p className="text-center text-slate-500 text-sm">
              Don't have an account? <Link to="/register" className="text-blue-600 font-bold hover:underline">Create one free</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
