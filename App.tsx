
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import LabSoundBoardPage from './pages/LabSoundBoardPage';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="lab" element={<LabSoundBoardPage />} />
          <Route path="settings" element={<SettingsPage />} />
          {/* Redirects for legacy routes if user has bookmarks */}
          <Route path="wassce" element={<Navigate to="/dashboard/lab" replace />} />
          <Route path="classes" element={<Navigate to="/dashboard/lab" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};



export default App;
