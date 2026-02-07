
import React, { useState } from 'react';
import { 
  Search, 
  Users, 
  BookOpen, 
  Play,
  Plus,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_COURSES, SUBJECTS, LEVELS } from '../constants';
import { useApp } from '../AppContext';
import JoinClassModal from '../components/JoinClassModal';

const ClassesPage: React.FC = () => {
  const { enrolledCourses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const filteredCourses = MOCK_COURSES.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || course.subject === selectedSubject;
    const matchesLevel = selectedLevel === 'All' || course.level === selectedLevel;
    return matchesSearch && matchesSubject && matchesLevel;
  });

  const handleJoinClass = async (code: string) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsJoinModalOpen(false);
    alert(`Successfully joined class with code: ${code}`);
  };

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up pb-20">
      <JoinClassModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
        onJoin={handleJoinClass}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Explore Classes</h1>
          <p className="text-slate-500 dark:text-slate-400">Find the right course to advance your academic or technical goals.</p>
        </div>
        <button 
          onClick={() => setIsJoinModalOpen(true)}
          className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold rounded-2xl shadow-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
        >
          <Plus size={20} className="text-blue-600 dark:text-blue-400" /> Join with Code
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm mb-10 space-y-4">
        <div className="flex items-center gap-2 mb-2 text-slate-900 dark:text-white font-bold">
           <Filter size={20} /> Filter Classes
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search classes..." 
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-600 dark:text-white placeholder:text-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-600 font-medium text-slate-600 dark:text-white"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select 
            className="px-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 focus:ring-blue-600 font-medium text-slate-600 dark:text-white"
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
          >
            <option value="All">All Levels</option>
            {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map(course => {
          const isEnrolled = enrolledCourses.some(c => c.id === course.id);
          return (
            <Link 
              key={course.id} 
              to={`/dashboard/course/${course.id}`}
              className="group bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-800 hover:-translate-y-1 transition-all flex flex-col"
            >
              <div className="relative h-56 overflow-hidden">
                <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider shadow-sm">
                  {course.subject}
                </div>
                
                {isEnrolled && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    Enrolled
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug drop-shadow-md">
                    {course.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <img src={course.teacherAvatar} className="w-6 h-6 rounded-full object-cover border border-white/50" alt="" />
                    <span className="text-xs font-medium text-slate-200">{course.teacherName}</span>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center text-white transform scale-50 group-hover:scale-100 transition-transform">
                     <Play fill="currentColor" size={24} />
                   </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <Users size={16} />
                    <span className="text-xs font-bold uppercase">{course.studentCount} Students</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                    <BookOpen size={16} />
                    <span className="text-xs font-bold uppercase">{course.moduleCount} Modules</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ClassesPage;
