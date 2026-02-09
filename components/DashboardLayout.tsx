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
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { to: '/dashboard', icon: <BookOpen />, label: 'My Journey' },
    { to: '/dashboard/lab', icon: <Zap />, label: 'The Lab' },
    { to: '/dashboard/performance', icon: <BarChart3 />, label: 'My Stats' },
  ];

  return (
    <div className="flex h-screen bg-[#e7effc] dark:bg-[#011627] transition-colors duration-300 overflow-hidden font-lexend">
      {/* DESKTOP SIDEBAR (Hidden on Mobile) */}
      <aside 
        className={`hidden lg:flex flex-col ${
          isSidebarOpen ? 'w-72' : 'w-24'
        } bg-white dark:bg-slate-900 border-r border-[#022d62]/5 dark:border-white/5 transition-all duration-300 z-50`}
      >
        <div className="p-8 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#022d62] rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-[#022d62]/20 font-outfit">
              AS
            </div>
            {isSidebarOpen && <span className="text-2xl font-bold text-[#022d62] tracking-tight font-outfit truncate">Adesua Reading & Sounds</span>}
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <SidebarItem 
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
              active={location.pathname === item.to}
              collapsed={!isSidebarOpen}
            />
          ))}
        </nav>

        <div className="p-4 border-t border-[#022d62]/5 dark:border-white/5 space-y-2 bg-[#e7effc]/30 dark:bg-slate-800/30">
          <SidebarItem 
            to="/dashboard/settings" 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={location.pathname === '/dashboard/settings'} 
            collapsed={!isSidebarOpen} 
          />
          <button onClick={handleLogout} className={`w-full flex items-center gap-3 px-4 py-3 text-[#022d62]/60 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all group`}>
            <LogOut size={20} className="group-hover:scale-110 transition-transform" />
            {isSidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* DESKTOP HEADER (Hidden on Mobile) */}
        <header className="hidden lg:flex h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-[#022d62]/5 dark:border-white/5 items-center justify-between px-8 z-40 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="p-2.5 hover:bg-[#e7effc] rounded-xl text-[#022d62]/60 transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 mx-2"></div>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center bg-[#e7effc] dark:bg-slate-800 px-4 py-2.5 rounded-2xl w-80 border border-transparent focus-within:border-[#fb9610]/50 focus-within:ring-4 focus-within:ring-[#fb9610]/10 transition-all">
              <Search size={18} className="text-slate-400 mr-2" />
              <input 
                type="text" 
                placeholder="Search resources, classes..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-full dark:text-white placeholder-slate-400 font-medium"
              />
            </div>

            <div className="flex items-center gap-4 pl-6 border-l border-[#022d62]/5">
              <button className="relative p-2.5 text-[#022d62]/60 hover:bg-[#e7effc] rounded-xl transition-colors">
                <Bell size={22} />
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-[#fb9610] rounded-full border-2 border-white"></span>
              </button>
              
              <div className="flex items-center gap-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
                <div className="text-right">
                  <p className="text-sm font-bold text-[#022d62] leading-tight">{user?.firstName} {user?.lastName}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role}</p>
                </div>
                <img 
                  src={user?.avatar} 
                  alt="Profile" 
                  className="w-11 h-11 rounded-full border-2 border-white shadow-sm object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* MOBILE HEADER (Visible on Mobile Only) */}
        <div className="lg:hidden h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-[#022d62]/5 dark:border-white/5 flex items-center justify-between px-4 sticky top-0 z-40">
           <Link to="/dashboard" className="flex items-center gap-2">
             <div className="w-8 h-8 bg-[#022d62] rounded-lg flex items-center justify-center text-white font-bold text-lg font-outfit">A</div>
             <span className="text-lg font-bold text-[#022d62] font-outfit">Adesua Reading & Sounds</span>
           </Link>
           <div className="flex items-center gap-3">
             <ThemeToggle />
             <Link to="/dashboard/settings" className="w-8 h-8 rounded-full overflow-hidden border border-[#022d62]/10">
                <img src={user?.avatar} alt="" className="w-full h-full object-cover" />
             </Link>
           </div>
        </div>

        {/* MAIN SCROLLABLE CONTENT */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 pb-28 md:p-8 bg-[#e7effc] dark:bg-[#011627] scroll-smooth">
          <Outlet />
        </main>

        {/* MOBILE BOTTOM NAVIGATION (Fixed) */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 h-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-[#022d62]/5 dark:border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] rounded-[2.5rem] z-50 flex items-center justify-between px-2 pb-1 transition-all duration-300">
          {navItems.slice(0, 4).map((item) => (
             <MobileNavItem 
               key={item.to}
               {...item}
               active={location.pathname === item.to}
             />
          ))}
          
          <button 
             onClick={() => setShowMobileMenu(!showMobileMenu)}
             className={`relative flex flex-col items-center justify-center w-full h-full gap-1 transition-all duration-300 rounded-2xl group ${showMobileMenu ? 'text-[#fb9610]' : 'text-[#022d62]/40 hover:text-[#022d62]'}`}
          >
             {/* Active Glow */}
             <div className={`absolute inset-x-2 inset-y-2 bg-[#fb9610]/10 rounded-2xl blur-md transition-all duration-500 ${showMobileMenu ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />

             <div className={`relative z-10 p-1.5 rounded-xl transition-all duration-300 ${showMobileMenu ? '-translate-y-2' : 'group-hover:-translate-y-1'}`}>
               <MoreHorizontal size={24} strokeWidth={showMobileMenu ? 2.5 : 2} className={`transition-transform duration-300 ${showMobileMenu ? 'scale-110 drop-shadow-sm' : ''}`} />
             </div>
             <span className={`text-[10px] font-bold absolute bottom-2 transition-all duration-300 ${showMobileMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>Menu</span>
          </button>
        </div>

        {/* MOBILE MENU DRAWER (For extra items) */}
        {showMobileMenu && (
           <div className="lg:hidden fixed inset-0 z-[60]">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={() => setShowMobileMenu(false)}></div>
              <div className="absolute bottom-24 right-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-[#022d62]/5 p-4 animate-scale-in origin-bottom-right">
                 <div className="space-y-1">
                    <Link to="/dashboard/settings" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#e7effc] text-[#022d62] font-bold">
                       <Settings size={20} /> Settings
                    </Link>
                    <Link to="/contact" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-[#e7effc] text-[#022d62] font-bold">
                       <MessageSquare size={20} /> Support
                    </Link>
                    <div className="h-px bg-[#022d62]/5 my-2"></div>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 font-bold">
                       <LogOut size={20} /> Logout
                    </button>
                 </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default DashboardLayout;
