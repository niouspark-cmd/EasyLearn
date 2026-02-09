
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Phone, Lock, ArrowRight, Chrome } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 font-lexend flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md animate-fade-in-up z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
                <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-40 rounded-full"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-700 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl border border-teal-400/30">
                  <span className="font-outfit">A</span>
                </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3 font-outfit">Join the Lab.</h1>
          <p className="text-indigo-200 text-lg">Create your private workspace.<br/>No grades. Just progress.</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-indigo-500/20">
          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Social Login */}
            <button 
              type="button"
              className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium rounded-2xl flex items-center justify-center gap-3 transition-all"
            >
               <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                 <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
               </div>
               <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-4">
               <div className="h-[1px] flex-1 bg-indigo-900"></div>
               <span className="text-indigo-300 text-sm">or create ID</span>
               <div className="h-[1px] flex-1 bg-indigo-900"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-300 ml-1">What should we call you?</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                  <input 
                    type="text" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-indigo-500/30 text-white placeholder:text-indigo-500/50 rounded-2xl focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-all font-outfit" 
                    placeholder="Nickname or Alias"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-300 ml-1">Phone Number</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                  <input 
                    type="tel" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-indigo-500/30 text-white placeholder:text-indigo-500/50 rounded-2xl focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-all font-outfit tracking-wide" 
                    placeholder="055 123 4567"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-indigo-300 ml-1">Create 4-Digit PIN</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-indigo-500/20 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={18} />
                  <input 
                    type="password" 
                    maxLength={4}
                    className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-indigo-500/30 text-white placeholder:text-indigo-500/50 rounded-2xl focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400/50 transition-all font-outfit tracking-[0.5em]" 
                    placeholder="••••"
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-lg font-outfit">
              Create Lab Access <ArrowRight size={20} />
            </button>
          </form>

          <div className="mt-8 text-center bg-slate-950/30 py-4 rounded-xl border border-indigo-500/10">
            <p className="text-indigo-400 text-sm">
              Already have access? <Link to="/login" className="text-teal-400 font-bold hover:text-teal-300 transition-colors">Enter Lab</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
