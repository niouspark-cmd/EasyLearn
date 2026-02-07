
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, ArrowRight, UserCheck } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'STUDENT' | 'TEACHER'>('STUDENT');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-[150px] opacity-10"></div>
      
      <div className="w-full max-w-xl animate-fade-in-up">
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl shadow-blue-200">E</div>
            <span className="text-3xl font-bold text-slate-800">EasyLearn</span>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Join Easy Learn</h1>
          <p className="text-slate-500">Create your account to start learning today.</p>
        </div>

        <div className="bg-white p-10 rounded-[40px] shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="flex p-1 bg-slate-50 rounded-2xl mb-8">
            <button 
              onClick={() => setRole('STUDENT')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'STUDENT' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              I am a Student
            </button>
            <button 
              onClick={() => setRole('TEACHER')}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${role === 'TEACHER' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              I am a Teacher
            </button>
          </div>

          <form onSubmit={handleRegister} className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">First Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Kofi" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Last Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="text" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="Mensah" required />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="email" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="kofimensah@gmail.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="password" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="••••••••" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input type="password" className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-600 transition-all" placeholder="••••••••" required />
              </div>
            </div>

            <div className="md:col-span-2 flex items-center gap-3 py-2">
              <input type="checkbox" className="w-5 h-5 text-blue-600 rounded-lg border-slate-200 focus:ring-blue-600" required />
              <label className="text-sm text-slate-500">I agree to the <a href="#" className="text-blue-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 font-bold hover:underline">Privacy Policy</a></label>
            </div>

            <button type="submit" className="md:col-span-2 py-4 blue-gradient text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
              Create Account <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-50">
            <p className="text-center text-slate-500 text-sm">
              Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
