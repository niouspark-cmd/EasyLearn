
import React, { useState, useEffect } from 'react';
import { X, UserPlus, Info, Key, Loader2 } from 'lucide-react';

interface JoinClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJoin: (code: string) => Promise<void> | void;
}

const JoinClassModal: React.FC<JoinClassModalProps> = ({ isOpen, onClose, onJoin }) => {
  const [code, setCode] = useState('');
  const [width, setWidth] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setIsSubmitting(false);
      // Animate progress bar or something if needed, but not required by prompt
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length < 3) return;
    
    setIsSubmitting(true);
    await onJoin(code);
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal - Scale Animation */}
      <div className="relative bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-xl">
              <UserPlus size={20} />
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Join Class</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
            Enter the class code provided by your teacher to join the class.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Input Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                <Key size={14} /> Class Code <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Enter 8-character code"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 dark:text-white font-mono text-center text-lg tracking-widest placeholder:tracking-normal placeholder:font-sans placeholder:text-sm transition-all"
                maxLength={8}
                autoFocus
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4">
              <div className="flex items-start gap-3">
                <Info size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-blue-700 dark:text-blue-400 text-sm mb-1">How to Join</h4>
                  <ul className="text-xs text-blue-600/80 dark:text-blue-300 space-y-1 list-disc pl-4">
                    <li>Ask your teacher for the 8-character class code</li>
                    <li>Enter the code exactly as provided</li>
                    <li>You'll be added to the class immediately</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex justify-end pt-2">
              <button 
                type="submit"
                disabled={code.length < 3 || isSubmitting}
                className="px-6 py-3 bg-slate-900 dark:bg-blue-600 text-white font-bold rounded-xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Verifying...
                  </>
                ) : (
                  'Join Class'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinClassModal;
