
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
  <div className="bg-white rounded-[32px] border border-[#022d62]/5 p-8 shadow-sm">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-[#e7effc] text-[#022d62] rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-black text-[#022d62]">{title}</h3>
        <p className="text-sm text-[#022d62]/40 font-bold uppercase tracking-widest text-[10px]">{subtitle}</p>
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
        <h1 className="text-3xl font-black text-[#022d62] mb-2 font-outfit">Settings</h1>
        <p className="text-[#022d62]/60 font-medium">Manage your account preferences and security.</p>
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
              <img src={user?.avatar} className="w-24 h-24 rounded-full object-cover border-4 border-[#e7effc]" alt="" />
              <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera size={20} />
              </button>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#022d62]/40 uppercase tracking-widest">First Name</label>
                <input 
                  type="text" 
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#e7effc]/50 border-none rounded-xl focus:ring-2 focus:ring-[#022d62] text-[#022d62] font-bold" 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-[#022d62]/40 uppercase tracking-widest">Last Name</label>
                <input 
                  type="text" 
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#e7effc]/50 border-none rounded-xl focus:ring-2 focus:ring-[#022d62] text-[#022d62] font-bold" 
                />
              </div>
            </div>
          </div>
          <button 
            onClick={handleSaveProfile}
            disabled={isSaving}
            className="px-8 py-3 bg-[#fb9610] text-white font-black rounded-xl shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
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
              <div key={i} className="flex items-center justify-between p-4 hover:bg-[#e7effc]/50 rounded-2xl transition-all group">
                <div>
                  <p className="font-black text-[#022d62]">{item.label}</p>
                  <p className="text-sm text-[#022d62]/40 font-medium">{item.desc}</p>
                </div>
                <div className={`w-12 h-6 rounded-full relative cursor-pointer transition-colors ${item.checked ? 'bg-[#fb9610]' : 'bg-[#022d62]/10'}`}>
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
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#e7effc]/50 rounded-2xl transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#e7effc] rounded-xl flex items-center justify-center text-[#022d62]">
                  <Shield size={18} />
                </div>
                <div>
                  <p className="font-black text-[#022d62]">Change Password</p>
                  <p className="text-sm text-[#022d62]/40 font-medium">Last changed 3 months ago</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#022d62]/20" />
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-[#e7effc]/50 rounded-2xl transition-all text-left group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#e7effc] rounded-xl flex items-center justify-center text-[#022d62]">
                  <Smartphone size={18} />
                </div>
                <div>
                  <p className="font-black text-[#022d62]">Two-Factor Authentication</p>
                  <p className="text-sm text-[#022d62]/40 font-medium">Add an extra layer of security</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-[#022d62]/20" />
            </button>
          </div>
        </SettingsSection>

        <div className="pt-8 border-t border-[#022d62]/10 flex justify-end gap-4">
          <button 
             onClick={() => {
                if(window.confirm('Are you sure you want to deactivate?')) alert('Deactivation started');
             }}
             className="px-6 py-3 text-[#022d62]/40 font-black hover:bg-white rounded-xl transition-all"
          >
            Deactivate Account
          </button>
          <button 
             onClick={() => {
                if(window.confirm('Delete all data? This is irreversible.')) alert('Data deleted');
             }}
             className="px-6 py-3 bg-red-50 text-red-600 font-black rounded-xl hover:bg-red-100 transition-all"
          >
            Delete Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
