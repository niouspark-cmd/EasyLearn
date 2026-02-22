
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import { PiperService } from './utils/PiperService';
import { ElevenLabsService } from './utils/ElevenLabsService';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import LabSoundBoardPage from './pages/LabSoundBoardPage';
import PerformancePage from './pages/PerformancePage';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import SecurityGate from './components/SecurityGate';


const App: React.FC = () => {
  // Initialize Piper TTS on app startup (downloads voice model if needed)
  useEffect(() => {
    // 1. Preload Piper voice model in background
    PiperService.initialize().catch(err => {
      console.log('[App] Piper initialization deferred (will retry on first use):', err);
    });

    // 2. Pre-warm static audio assets for 100% offline usage
    ElevenLabsService.preWarmStaticAssets().catch(err => {
        console.warn('[App] Pre-warm failed:', err);
    });
  }, []);

  return (
    <AppProvider>
      <SecurityGate>
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
            <Route index element={<Navigate to="/dashboard/lab" replace />} />
            <Route path="lab" element={<LabSoundBoardPage />} />
            <Route path="performance" element={<PerformancePage />} />
            <Route path="settings" element={<SettingsPage />} />
            {/* Redirects for legacy routes if user has bookmarks */}
            <Route path="wassce" element={<Navigate to="/dashboard/lab" replace />} />
            <Route path="classes" element={<Navigate to="/dashboard/lab" replace />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </SecurityGate>
    </AppProvider>
  );
};



export default App;
