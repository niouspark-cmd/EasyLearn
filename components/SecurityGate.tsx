import React, { useState, useEffect } from 'react';

interface SecurityGateProps {
  children: React.ReactNode;
}

const SecurityGate: React.FC<SecurityGateProps> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const SITE_PASSWORD = import.meta.env.VITE_SITE_PASSWORD || 'EasyLearn@2026!';

  useEffect(() => {
    const unlocked = localStorage.getItem('site_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === SITE_PASSWORD) {
      localStorage.setItem('site_unlocked', 'true');
      setIsUnlocked(true);
      setError('');
    } else {
      setError('Incorrect password. Access denied.');
      setPassword('');
    }
  };

  if (isLoading) return null;

  return (
    <div className="relative min-h-screen">
      {/* The main app content which will be blurred if locked */}
      <div className={`${!isUnlocked ? 'blur-2xl pointer-events-none select-none' : ''} transition-all duration-700`}>
        {children}
      </div>

      {/* Security Overlay */}
      {!isUnlocked && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-navy/20 backdrop-blur-xl transition-all duration-500">
          <div className="w-full max-w-md p-8 bg-white/90 dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-white/20 animate-slide-in-right">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-brand-orange rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg rotate-3 overflow-hidden">
                <span className="text-4xl text-white font-black">!</span>
              </div>
              <h2 className="text-3xl font-black text-brand-navy dark:text-white mb-2">Access Protected</h2>
              <p className="text-slate-600 dark:text-slate-300">This site is currently undergoing final maintenance. Please enter the access password to proceed.</p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter security password"
                  className="w-full px-6 py-4 bg-brand-cloud dark:bg-slate-800 border-2 border-transparent focus:border-brand-orange rounded-xl outline-none transition-all text-lg font-bold text-brand-navy dark:text-white"
                  autoFocus
                />
              </div>
              
              {error && (
                <div className="p-3 bg-red-100 text-red-600 rounded-lg text-sm font-bold text-center animate-pulse">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-brand-navy dark:bg-brand-orange text-white rounded-xl font-black text-xl shadow-lg hover:shadow-brand-orange/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                UNLOCK SITE
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 font-medium tracking-widest uppercase">
                &copy; {new Date().getFullYear()} Development Team. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityGate;
