
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Phone, Lock, ArrowRight, Chrome } from 'lucide-react';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#e7effc] font-lexend flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#022d62]/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-[#fb9610]/5 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md animate-fade-in-up z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="relative">
                <div className="absolute inset-0 bg-[#fb9610] blur-lg opacity-40 rounded-full"></div>
                <div className="relative w-16 h-16 bg-[#022d62] rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-2xl">
                  <span className="font-outfit">A</span>
                </div>
            </div>
          </div>
          <h1 className="text-3xl font-black text-[#022d62] mb-3 font-outfit">Welcome to the Lab.</h1>
          <p className="text-[#022d62]/60 text-lg font-medium">Your journey to mastering sounds starts here.<br/>Private. Simple. Powerful.</p>
        </div>

        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-[32px] shadow-2xl border border-[#022d62]/5">
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Social Login */}
            <button 
              type="button"
              className="w-full py-4 bg-white hover:bg-[#e7effc] border border-[#022d62]/10 text-[#022d62] font-black rounded-2xl flex items-center justify-center gap-3 transition-all"
            >
               {/* Simple Google Icon Representation or use Chrome from lucide as placeholder */}
               <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm">
                 <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
               </div>
               <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-4">
               <div className="h-[1px] flex-1 bg-[#022d62]/5"></div>
               <span className="text-[#022d62]/40 font-bold uppercase tracking-widest text-[10px]">or access with PIN</span>
               <div className="h-[1px] flex-1 bg-[#022d62]/5"></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-black text-[#022d62]/40 ml-1 uppercase tracking-widest">Your Access Number</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#022d62]/5 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#022d62]/40" size={18} />
                  <input 
                    type="tel" 
                    className="w-full pl-12 pr-4 py-4 bg-white border border-[#022d62]/10 text-[#022d62] placeholder:text-[#022d62]/20 rounded-2xl focus:outline-none focus:border-[#fb9610] focus:ring-1 focus:ring-[#fb9610]/50 transition-all font-outfit tracking-wide" 
                    placeholder="055 123 4567"
                  />
                </div>
              </div>

               <div className="space-y-2">
                <label className="text-sm font-black text-[#022d62]/40 ml-1 uppercase tracking-widest">4-Digit Lab PIN</label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-[#022d62]/5 rounded-2xl blur-sm opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#022d62]/40" size={18} />
                  <input 
                    type="password" 
                    maxLength={4}
                    className="w-full pl-12 pr-4 py-4 bg-white border border-[#022d62]/10 text-[#022d62] placeholder:text-[#022d62]/20 rounded-2xl focus:outline-none focus:border-[#fb9610] focus:ring-1 focus:ring-[#fb9610]/50 transition-all font-outfit tracking-[0.5em]" 
                    placeholder="••••"
                  />
                </div>
              </div>
            </div>

             <button type="submit" className="w-full py-4 bg-[#fb9610] hover:bg-[#e88a0e] text-white font-black rounded-2xl shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all text-lg font-outfit">
               Enter Lab <ArrowRight size={20} />
            </button>
          </form>

           <div className="mt-8 text-center">
            <p className="text-[#022d62]/40 text-sm font-bold">
              New Researcher? <Link to="/register" className="text-[#fb9610] hover:underline transition-colors uppercase tracking-widest text-[10px]">Join the Lab</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
