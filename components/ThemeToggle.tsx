
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useApp } from '../AppContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useApp();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:ring-2 hover:ring-blue-500/20 transition-all duration-300 group"
      aria-label="Toggle Theme"
    >
      {theme === 'light' ? (
        <Moon size={20} className="group-hover:rotate-12 transition-transform" />
      ) : (
        <Sun size={20} className="group-hover:rotate-45 transition-transform text-yellow-500" />
      )}
    </button>
  );
};

export default ThemeToggle;
