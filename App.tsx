
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './AppContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardLayout from './components/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import ClassesPage from './pages/ClassesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonViewPage from './pages/LessonViewPage';
import WasscePracticePage from './pages/WasscePracticePage';
import LabSoundBoardPage from './pages/LabSoundBoardPage';
import ExamTakerPage from './pages/ExamTakerPage';
import PerformancePage from './pages/PerformancePage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import FeaturesPage from './pages/FeaturesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import TechnicalSkillsPage from './pages/TechnicalSkillsPage';
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
        <Route path="/technical" element={<TechnicalSkillsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/dashboard/wassce/exam/:id" element={<ExamTakerPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="course/:id" element={<CourseDetailPage />} />
          <Route path="course/:id/lesson/:lessonId" element={<LessonViewPage />} />
          <Route path="lab" element={<LabSoundBoardPage />} />
          <Route path="wassce" element={<Navigate to="lab" replace />} /> {/* Redirect old route */}
          <Route path="performance" element={<PerformancePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppProvider>
  );
};

export default App;
