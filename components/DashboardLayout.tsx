import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BookOpen, 
  MessageSquare, 
  Award, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Search,
  User,
  MoreHorizontal,
  Zap
} from 'lucide-react';
import { useApp } from '../AppContext';
import ThemeToggle from './ThemeToggle';

const SidebarItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active: boolean, collapsed: boolean }> = ({ to, icon, label, active, collapsed }) => (
  <Link 
    to={to} 
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
      active 
        ? 'bg-[#022d62] text-white shadow-lg shadow-[#022d62]/20' 
        : 'text-[#022d62]/60 hover:bg-[#e7effc] hover:text-[#fb9610]'
    }`}
  >
    <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform duration-200`}>
      {icon}
    </div>
    {!collapsed && <span className="font-medium tracking-wide">{label}</span>}
  </Link>
);

const MobileNavItem: React.FC<{ to: string, icon: React.ReactNode, label: string, active: boolean }> = ({ to, icon, label, active }) => (
  <Link 
    to={to} 
    className={`relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 rounded-2xl group ${
      active ? 'text-[#fb9610]' : 'text-[#022d62]/40 hover:text-[#022d62]'
    }`}
  >
    {/* Active Glow Background */}
    <div className={`absolute inset-x-2 inset-y-2 bg-[#fb9610]/10 rounded-2xl blur-md transition-all duration-500 ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />

    {/* Icon Container */}
    <div className={`relative z-10 p-1.5 rounded-xl transition-all duration-300 ${active ? '-translate-y-2' : 'group-hover:-translate-y-1'}`}>
      {React.cloneElement(icon as React.ReactElement, { 
        size: 24, 
        strokeWidth: active ? 2.5 : 2,
        className: `transition-transform duration-300 ${active ? 'scale-110 drop-shadow-sm' : ''}`
      })}
    </div>
    
    {/* Label (Only visible/prominent when active) */}
    <span className={`text-[10px] font-bold absolute bottom-2 transition-all duration-300 ${active ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {label}
    </span>
  </Link>
);

const DashboardLayout: React.FC = () => {
  const { user, isSidebarOpen, toggleSidebar } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { to: '/dashboard/lab', icon: <Zap />, label: 'My Path' },
    { to: '/dashboard/settings', icon: <Settings />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-[#fdfaf5] transition-colors duration-300 overflow-hidden font-outfit">
      
      {/* MINIMAL DESKTOP SIDEBAR */}
      <aside className={`hidden lg:flex flex-col w-64 bg-white border-r border-[#e7effc] z-50`}>
        <div className="p-8">
          <Link to="/dashboard/lab" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#fb9610] rounded-xl flex items-center justify-center text-white font-black shadow-lg">E</div>
            <span className="text-xl font-black text-[#022d62]">EasyLearn</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
              collapsed={false}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-slate-50">
           <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-red-500 rounded-xl transition-all">
             <LogOut size={20} />
             <span className="font-bold">Logout</span>
           </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* SIMPLE HEADER */}
        <header className="h-20 bg-white/50 backdrop-blur-md border-b border-[#e7effc] flex items-center justify-center px-8 z-40 relative">
          <div className="text-center">
              <h1 className="text-xl md:text-2xl font-black text-[#022d62] uppercase tracking-tighter">
                Adesua Reading & Sounds
              </h1>
          </div>

          <div className="absolute right-8 flex items-center gap-4">
             <button onClick={() => navigate('/')} className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Logout">
                <LogOut size={20} />
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 pb-28 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
