import React from 'react';
import { 
  BookOpen, 
  CheckCircle2, 
  Trophy, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Play,
  Award,
  Zap,
  Calendar,
  ArrowUpRight
} from 'lucide-react';
import { useApp } from '../AppContext';
import { Link } from 'react-router-dom';

const VibrantCard: React.FC<{ 
  title: string, 
  subtitle: string, 
  value: string, 
  pillText: string, 
  icon: React.ReactNode, 
  gradient: string,
  delay: string
}> = ({ title, subtitle, value, pillText, icon, gradient, delay }) => (
  <div className={`relative overflow-hidden rounded-[32px] p-8 text-white shadow-xl hover:scale-[1.02] transition-all duration-300 ${gradient} ${delay} animate-fade-in-up`}>
    {/* Background Pattern */}
    <div className="absolute -right-4 -bottom-4 opacity-20 transform rotate-12 scale-150">
      {React.cloneElement(icon as React.ReactElement, { size: 100 })}
    </div>
    
    <div className="relative z-10 flex flex-col h-full justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl">
            {icon}
          </div>
          <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider">
            {pillText}
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1">{value}</h3>
        <p className="font-bold text-lg opacity-90">{title}</p>
        <p className="text-sm opacity-70 font-medium">{subtitle}</p>
      </div>
    </div>
  </div>
);

const DashboardHome: React.FC = () => {
  const { user, enrolledCourses } = useApp();

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Welcome Header */}
      <div className="mb-10 animate-fade-in-up">
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
          Here's your academic progress and upcoming tasks for the week. You're doing great!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <VibrantCard 
          title="Enrolled Classes"
          subtitle="Your active courses"
          value={enrolledCourses.length.toString()}
          pillText={`${enrolledCourses.length} Active`}
          icon={<BookOpen />}
          gradient="bg-gradient-to-br from-blue-600 to-blue-800"
          delay="animation-delay-none"
        />
        <VibrantCard 
          title="Avg. Performance"
          subtitle="Across all quizzes"
          value="82%"
          pillText="+5% vs last week"
          icon={<TrendingUp />}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-700"
          delay="animation-delay-100"
        />
        <VibrantCard 
          title="Pending Tasks"
          subtitle="Assignments due soon"
          value="3"
          pillText="Urgent"
          icon={<Clock />}
          gradient="bg-gradient-to-br from-orange-500 to-amber-600"
          delay="animation-delay-200"
        />
        <VibrantCard 
          title="WASSCE Prep"
          subtitle="Mock exams taken"
          value="12"
          pillText="Top 10% Rank"
          icon={<Trophy />}
          gradient="bg-gradient-to-br from-purple-600 to-indigo-800"
          delay="animation-delay-300"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Quick Actions Band */}
          <section className="animate-fade-in-up animation-delay-400">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/dashboard/wassce" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                 <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <Zap size={28} />
                 </div>
                 <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Practice Mode</span>
              </Link>
              <Link to="/dashboard/classes" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                 <div className="w-14 h-14 bg-purple-50 dark:bg-purple-900/30 text-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <BookOpen size={28} />
                 </div>
                 <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">My Classes</span>
              </Link>
              <Link to="/dashboard/performance" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                 <div className="w-14 h-14 bg-green-50 dark:bg-green-900/30 text-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <Award size={28} />
                 </div>
                 <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Check Grades</span>
              </Link>
              <Link to="/dashboard/chat" className="flex flex-col items-center justify-center p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all group">
                 <div className="w-14 h-14 bg-orange-50 dark:bg-orange-900/30 text-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                   <Calendar size={28} />
                 </div>
                 <span className="font-bold text-slate-700 dark:text-slate-200 text-sm">Schedule</span>
              </Link>
            </div>
          </section>

          {/* Continue Learning */}
          <section className="animate-fade-in-up animation-delay-500">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Subject Progress</h2>
              <Link to="/dashboard/classes" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                View All <ChevronRight size={16} />
              </Link>
            </div>
            <div className="space-y-4">
              {enrolledCourses.map((course, idx) => (
                <div key={course.id} className="group flex flex-col md:flex-row items-center gap-6 p-6 bg-white dark:bg-slate-900 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl transition-all">
                  <div className="relative w-full md:w-48 h-32 rounded-2xl overflow-hidden shrink-0">
                     <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                     <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors"></div>
                     <button className="absolute inset-0 m-auto w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform scale-50 group-hover:scale-100">
                       <Play fill="currentColor" size={20} />
                     </button>
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex justify-between items-start mb-2">
                       <div>
                         <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg mb-2 inline-block">
                           {course.subject}
                         </span>
                         <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-1">{course.title}</h3>
                         <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{course.moduleCount - 2} of {course.moduleCount} modules completed</p>
                       </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-xs font-bold mb-2">
                        <span className="text-slate-500 dark:text-slate-400">Progress</span>
                        <span className="text-slate-900 dark:text-white">{course.progress}%</span>
                      </div>
                      <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-600 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  
                  <Link 
                    to={`/dashboard/course/${course.id}`} 
                    className="w-full md:w-auto px-6 py-3 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    Resume <ArrowUpRight size={18} />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Widgets */}
        <div className="lg:col-span-1 space-y-8 animate-fade-in-up animation-delay-600">
          {/* Daily Goal Widget */}
          <div className="bg-slate-900 text-white p-8 rounded-[40px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[60px] opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                   <TrendingUp size={20} />
                </div>
                <span className="font-bold uppercase text-xs tracking-widest text-blue-300">Daily Goal</span>
              </div>
              <h3 className="text-3xl font-bold mb-2">2.5 hrs</h3>
              <p className="text-slate-400 text-sm mb-6">Of study time remaining today to hit your streak.</p>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-slate-900 border-2 border-slate-900">
                    <CheckCircle2 size={14} />
                  </div>
                  <span className="text-slate-300 line-through">Complete Math Quiz</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-transparent"></div>
                  </div>
                  <span className="text-white">Watch English Video</span>
                </div>
                <div className="flex items-center gap-3 text-sm font-medium">
                  <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-transparent"></div>
                  </div>
                  <span className="text-white">Read History Notes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Leaderboard/Community Widget */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[40px] border border-slate-100 dark:border-slate-800 shadow-sm">
             <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 dark:text-white">Top Students</h3>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-lg">This Week</span>
             </div>
             <div className="space-y-4">
               {[
                 { name: 'Ama O.', points: '2,400 XP', img: 'https://picsum.photos/seed/ama/100', rank: 1 },
                 { name: 'Kweku A.', points: '2,150 XP', img: 'https://picsum.photos/seed/kweku/100', rank: 2 },
                 { name: 'You', points: '1,890 XP', img: user?.avatar, rank: 12 },
                 { name: 'Sarah J.', points: '1,850 XP', img: 'https://picsum.photos/seed/sarah/100', rank: 4 },
               ].map((student, i) => (
                 <div key={i} className={`flex items-center justify-between ${student.name === 'You' ? 'bg-slate-50 dark:bg-slate-800 -mx-4 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-700' : ''}`}>
                   <div className="flex items-center gap-3">
                     <div className="font-bold text-slate-400 w-4">{student.rank}</div>
                     <img src={student.img} className="w-10 h-10 rounded-full object-cover border border-slate-100" alt="" />
                     <span className={`font-bold ${student.name === 'You' ? 'text-blue-600' : 'text-slate-700 dark:text-slate-300'}`}>{student.name}</span>
                   </div>
                   <span className="text-xs font-bold text-slate-500">{student.points}</span>
                 </div>
               ))}
             </div>
             <button className="w-full mt-6 py-3 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm">
               View Leaderboard
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
