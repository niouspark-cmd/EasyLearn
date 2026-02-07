
import React from 'react';
import { 
  User, 
  Bell, 
  Lock, 
  Shield, 
  Smartphone, 
  ChevronRight,
  Camera
} from 'lucide-react';
import { useApp } from '../AppContext';

const SettingsSection: React.FC<{ icon: React.ReactNode, title: string, subtitle: string, children: React.ReactNode }> = ({ icon, title, subtitle, children }) => (
  <div className="bg-white rounded-[32px] border border-slate-100 p-8 shadow-sm">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
    </div>
    {children}
  </div>
);

const SettingsPage: React.FC = () => {
  const { user, setUser } = useApp();
  const [firstName, setFirstName] = React.useState(user?.firstName || '');
  const [lastName, setLastName] = React.useState(user?.lastName || '');
  const [isSaving, setIsSaving] = React.useState(false);

  const handleSaveProfile = () => {
    if (user) {
      setIsSaving(true);
      // Simulate API call
      setTimeout(() => {
        setUser({ ...user, firstName, lastName });
        setIsSaving(false);
        alert('Profile updated successfully!');
      }, 800);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400">Manage your account preferences and security.</p>
      </div>

      <div className="space-y-8">
        {/* Profile Section */}
        <SettingsSection 
          icon={<User size={24} />} 
          title="Profile Information" 
          subtitle="Update your photo and personal details"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group">
              <img src={user?.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-slate-50 dark:border-slate-800" alt="" />
              <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} />
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">First Name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-blue-600 dark:text-white" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-blue-600 dark:text-white" 
                />
              </div>
            </div>
          </div>
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-6 py-3 blue-gradient text-white font-bold rounded-xl shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </SettingsSection>

        {/* Notifications */}
        <SettingsSection 
          icon={<Bell size={24} />} 
          title="Notifications" 
          subtitle="Choose what updates you want to receive"
        >
          <div className="space-y-4">
            {[
              { label: 'Email Notifications', desc: 'Receive weekly progress reports and news.', checked: true },
              { label: 'Class Reminders', desc: 'Alerts for upcoming live classes and sessions.', checked: true },
              { label: 'Exam Results', desc: 'Instant notification when an exam is graded.', checked: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all">
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">{item.label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.checked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${item.checked ? 'right-1' : 'left-1'}`}></div>
                </div>
              </div>
            ))}
          </div>
        </SettingsSection>

        {/* Security */}
        <SettingsSection 
          icon={<Lock size={24} />} 
          title="Security" 
          subtitle="Keep your account safe and secure"
        >
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Change Password</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Last changed 3 months ago</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-2xl transition-all text-left">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400">
                  <Smartphone size={18} />
                </div>
                <div>
                  <p className="font-bold text-slate-800 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Add an extra layer of security</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300" />
            </button>
          </div>
        </SettingsSection>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-4">
          <button className="px-6 py-3 text-slate-500 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">Deactivate Account</button>
          <button className="px-6 py-3 bg-red-50 dark:bg-red-900/20 text-red-600 font-bold rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30 transition-all">Delete Data</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
