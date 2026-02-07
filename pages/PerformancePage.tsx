
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';
import { 
  Trophy, 
  Target, 
  Zap, 
  Clock,
  TrendingUp,
  Award,
  BookOpen,
  Download
} from 'lucide-react';
import { useApp } from '../AppContext';

const PERFORMANCE_BY_SUBJECT = [
  { subject: 'Math', score: 85 },
  { subject: 'English', score: 72 },
  { subject: 'Science', score: 90 },
  { subject: 'Govt', score: 65 },
  { subject: 'Econ', score: 78 },
  { subject: 'ICT', score: 95 },
];

const SCORE_TREND = [
  { name: 'Week 1', score: 60 },
  { name: 'Week 2', score: 65 },
  { name: 'Week 3', score: 72 },
  { name: 'Week 4', score: 70 },
  { name: 'Week 5', score: 82 },
  { name: 'Week 6', score: 85 },
];

const COLORS = ['#2563eb', '#7c3aed', '#f97316', '#10b981', '#ef4444', '#06b6d4'];

const PerformancePage: React.FC = () => {
  const { theme } = useApp();
  const isDark = theme === 'dark';

  return (
    <div className="max-w-7xl mx-auto animate-fade-in-up pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">My Performance Analytics</h1>
          <p className="text-slate-500 dark:text-slate-400">Track your academic progress and identify areas for improvement.</p>
        </div>
        <button className="px-6 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold rounded-2xl shadow-sm flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-all">
          <Download size={20} className="text-blue-600 dark:text-blue-400" /> Export Report
        </button>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm text-center group hover:border-blue-500 hover:shadow-lg dark:hover:shadow-blue-900/20 transition-all">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Trophy size={32} />
          </div>
          <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">24</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Exams Completed</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm text-center group hover:border-green-500 hover:shadow-lg dark:hover:shadow-green-900/20 transition-all">
          <div className="w-16 h-16 bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Target size={32} />
          </div>
          <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">82%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Average Score</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm text-center group hover:border-orange-500 hover:shadow-lg dark:hover:shadow-orange-900/20 transition-all">
          <div className="w-16 h-16 bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Zap size={32} />
          </div>
          <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">12</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Streak Days</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-100 dark:border-slate-700 shadow-sm text-center group hover:border-purple-500 hover:shadow-lg dark:hover:shadow-purple-900/20 transition-all">
          <div className="w-16 h-16 bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
            <Clock size={32} />
          </div>
          <p className="text-4xl font-bold text-slate-900 dark:text-white mb-2">142h</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Learning Time</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Score Improvement Trend</h3>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-bold bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-full">
              <TrendingUp size={16} /> +12.5%
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={SCORE_TREND}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#f1f5f9'} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12}} 
                  domain={[0, 100]} 
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDark ? '#1e293b' : '#fff',
                    color: isDark ? '#fff' : '#0f172a'
                  }}
                  itemStyle={{ color: isDark ? '#fff' : '#0f172a', fontWeight: 'bold' }}
                  labelStyle={{ color: isDark ? '#94a3b8' : '#64748b', marginBottom: '0.5rem' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: isDark ? '#1e293b' : '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] border border-slate-100 dark:border-slate-700 shadow-sm">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Subject Performance Breakdown</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_BY_SUBJECT}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#f1f5f9'} />
                <XAxis 
                  dataKey="subject" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12}} 
                  domain={[0, 100]} 
                />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    backgroundColor: isDark ? '#1e293b' : '#fff',
                    color: isDark ? '#fff' : '#0f172a'
                  }}
                  cursor={{fill: isDark ? '#334155' : '#f1f5f9', opacity: 0.4}}
                />
                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={32}>
                  {PERFORMANCE_BY_SUBJECT.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <section className="bg-white dark:bg-slate-800 rounded-[40px] p-8 border border-slate-100 dark:border-slate-700 shadow-sm mb-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-8">Recent Exam Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-50 dark:border-slate-700">
                <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider pl-4">Exam Name</th>
                <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Subject</th>
                <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Score</th>
                <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Time Taken</th>
                <th className="pb-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Date</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {[
                { name: 'WASSCE Math 2023', subject: 'Math', score: 88, total: 100, time: '1h 24m', date: 'Oct 12, 2024' },
                { name: 'Physics Unit 1 Quiz', subject: 'Physics', score: 92, total: 100, time: '24m 10s', date: 'Oct 10, 2024' },
                { name: 'Integrated Science Mock', subject: 'Science', score: 76, total: 100, time: '1h 45m', date: 'Oct 05, 2024' },
                { name: 'Government Basics', subject: 'Govt', score: 64, total: 80, time: '45m 00s', date: 'Sep 28, 2024' },
              ].map((res, i) => (
                <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-6 pl-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700/50 rounded-2xl flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-600 transition-colors shadow-sm">
                        <Award size={24} />
                      </div>
                      <span className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{res.name}</span>
                    </div>
                  </td>
                  <td className="py-6">
                    <span className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold uppercase tracking-wide">{res.subject}</span>
                  </td>
                  <td className="py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white text-base">{res.score} <span className="text-slate-400 text-sm font-normal">/ {res.total}</span></span>
                      <span className={`text-[10px] font-bold mt-1 ${
                        res.score / res.total >= 0.8 ? 'text-green-500' : 
                        res.score / res.total >= 0.6 ? 'text-blue-500' : 'text-orange-500'
                      }`}>
                        {res.score / res.total >= 0.8 ? 'EXCELLENT' : 
                         res.score / res.total >= 0.6 ? 'GOOD' : 'AVERAGE'}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 text-sm font-medium text-slate-500 dark:text-slate-400">{res.time}</td>
                  <td className="py-6 text-sm font-medium text-slate-500 dark:text-slate-400">{res.date}</td>
                  <td className="py-6 pr-4 text-right">
                    <button className="p-2 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all">
                      <BookOpen size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default PerformancePage;
