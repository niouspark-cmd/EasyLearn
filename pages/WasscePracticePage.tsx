
import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  BookOpen, 
  Clock, 
  FileText, 
  ChevronRight,
  Zap,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MOCK_EXAMS, SUBJECTS } from '../constants';

const WasscePracticePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');

  const filteredExams = MOCK_EXAMS.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || exam.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">WASSCE Practice</h1>
        <p className="text-slate-500 dark:text-slate-400">Prepare for your WASSCE exams with our comprehensive practice tests.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-yellow-500/20 text-yellow-500 rounded-xl flex items-center justify-center">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">9</h3>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Available Exams</p>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/20 text-emerald-500 rounded-xl flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">11</h3>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Subjects</p>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500/20 text-blue-500 rounded-xl flex items-center justify-center">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">0</h3>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Completed</p>
          </div>
        </div>
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-500/20 text-orange-500 rounded-xl flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">0%</h3>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Avg Score</p>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 mb-10">
        <div className="flex items-center gap-2 mb-4 text-white font-bold">
          <Filter size={20} /> Filter Exams
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <select 
            className="w-full bg-slate-800 text-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 font-medium"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="All">All Subjects</option>
            {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select className="w-full bg-slate-800 text-white border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-600 font-medium">
            <option>All Years</option>
            <option>2023</option>
            <option>2022</option>
            <option>2021</option>
          </select>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search exams..." 
              className="w-full bg-slate-800 text-white border-none rounded-xl pl-10 px-4 py-3 focus:ring-2 focus:ring-blue-600 font-medium"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map(exam => (
          <div key={exam.id} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 hover:border-blue-600 transition-all group flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold text-lg">{exam.year} WASSCE</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                   <CheckCircle size={12} /> Pasco
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6 group-hover:text-blue-400 transition-colors">{exam.title}</h3>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-slate-400 text-sm">
                  <div className="flex items-center gap-2"><BookOpen size={16} /> {exam.questions.length} Questions</div>
                  <div className="flex items-center gap-2"><Clock size={16} /> {exam.timeLimitMinutes} mins</div>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-sm">
                   <div className="flex items-center gap-2"><Zap size={16} /> 50 marks</div>
                   <div className="flex items-center gap-2"><CheckCircle size={16} /> 75% to pass</div>
                </div>
              </div>
            </div>

            <Link 
              to={`/dashboard/wassce/exam/${exam.id}`}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
              Start Exam
            </Link>
          </div>
        ))}

        {/* Placeholder cards to fill grid and look like reference */}
        {[1, 2, 3].map((_, i) => (
           <div key={`placeholder-${i}`} className="bg-slate-900 rounded-2xl p-6 border border-slate-800 opacity-60">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white font-bold text-lg">202{2-i} WASSCE</span>
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-1">
                   <CheckCircle size={12} /> Pasco
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6">English Language - Paper 1</h3>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-slate-400 text-sm">
                  <div className="flex items-center gap-2"><BookOpen size={16} /> 50 Questions</div>
                  <div className="flex items-center gap-2"><Clock size={16} /> 45 mins</div>
                </div>
                <div className="flex items-center justify-between text-slate-400 text-sm">
                   <div className="flex items-center gap-2"><Zap size={16} /> 50 marks</div>
                   <div className="flex items-center gap-2"><CheckCircle size={16} /> 80% to pass</div>
                </div>
              </div>
              <button disabled className="w-full py-3 bg-slate-800 text-slate-500 rounded-xl font-bold cursor-not-allowed">Coming Soon</button>
           </div>
        ))}
      </div>
    </div>
  );
};

export default WasscePracticePage;
