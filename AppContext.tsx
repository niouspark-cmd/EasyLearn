
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, Course } from './types';
import { MOCK_USER, MOCK_COURSES } from './constants';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  enrolledCourses: Course[];
  enrollInCourse: (course: Course) => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(MOCK_USER);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>(MOCK_COURSES.slice(0, 2));
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const enrollInCourse = (course: Course) => {
    if (!enrolledCourses.find(c => c.id === course.id)) {
      setEnrolledCourses([...enrolledCourses, { ...course, progress: 0 }]);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      enrolledCourses, 
      enrollInCourse, 
      isSidebarOpen, 
      toggleSidebar,
      theme,
      toggleTheme 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
