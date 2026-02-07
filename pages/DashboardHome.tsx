import React, { useEffect, useState } from 'react';
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
  ArrowUpRight,
  Sparkles,
  Target,
  Flame
} from 'lucide-react';
import { useApp } from '../AppContext';
import { Link } from 'react-router-dom';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

const StatCard: React.FC<{ 
  title: string, 
  value: string, 
  subtitle: string, 
  icon: React.ReactNode, 
  colorClass: string 
}> = ({ title, value, subtitle, icon, colorClass }) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className={`p-3 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-lg">
        <TrendingUp size={12} />
        <span>+12%</span>
      </div>
    </div>
    <div>
      <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1 tracking-tight">{value}</h3>
      <p className="font-bold text-slate-500 dark:text-slate-400 text-sm">{title}</p>
    </div>
  </div>
);

const CourseCard: React.FC<{ course: any, index: number }> = ({ course, index }) => (
  <div className="group relative flex flex-col md:flex-row items-stretch gap-4 md:gap-6 p-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
    <div className="relative w-full md:w-48 h-48 md:h-auto rounded-[1.5rem] overflow-hidden shrink-0">
       <img src={course.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="" />
       <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
       <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-slate-900 dark:text-white shadow-sm">
          Module {course.moduleCount - 2}
       </div>
    </div>
    
    <div className="flex-1 py-2 flex flex-col">
      <div className="flex justify-between items-start mb-2">
         <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-xl mb-3 inline-block">
           {course.subject}
         </span>
         <div className="w-8 h-8 rounded-full border-2 border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400">
            <ChevronRight size={16} />
         </div>
      </div>
      
      <h3 className="font-bold text-slate-900 dark:text-white text-xl md:text-2xl mb-2 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {course.title}
      </h3>
      
      <div className="mt-auto space-y-3">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-500 dark:text-slate-400">Progress</span>
          <span className="text-slate-900 dark:text-white">{course.progress}%</span>
        </div>
        <div className="h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.3)] relative overflow-hidden" 
            style={{ width: `${course.progress}%` }}
          >
             <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
          </div>
        </div>
      </div>
    </div>
    
    <Link 
      to={`/dashboard/course/${course.id}`} 
      className="absolute inset-0 z-10"
      aria-label={`Resume ${course.title}`}
    />
  </div>
);

const DashboardHome: React.FC = () => {
  const { user, enrolledCourses } = useApp();
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto pb-20 px-2 sm:px-0">
      
      {/* Hero Welcome Section */}
      <header className="mb-10 relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 md:p-12 shadow-2xl shadow-blue-900/20 animate-fade-in-up">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full w-fit border border-white/10">
              <Sparkles size={14} className="text-yellow-300" />
              <span className="text-xs font-bold tracking-wide uppercase">Student Dashboard 2.0</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 leading-tight">
              {greeting}, <br className="md:hidden" /> {user?.firstName}!
            </h1>
            <p className="text-blue-100 text-lg max-w-xl font-medium leading-relaxed">
              You're on a <span className="text-white font-bold bg-white/20 px-2 rounded-lg">3-day streak</span>! Keep pushing towards your WASSCE goals.
            </p>
          </div>
          
          <Link to="/dashboard/wassce" className="px-8 py-4 bg-white text-blue-700 font-bold rounded-2xl shadow-lg shadow-black/10 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-3 group">
            <Zap size={20} className="fill-blue-700 group-hover:scale-110 transition-transform" />
            Resume Practice
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 animate-fade-in-up animation-delay-100">
        <StatCard 
          title="Active Courses" 
          value={enrolledCourses.length.toString()} 
          subtitle="In progress" 
          icon={<BookOpen size={24} />} 
          colorClass="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
        />
        <StatCard 
          title="Assignments" 
          value="3" 
          subtitle="Due this week" 
          icon={<Target size={24} />} 
          colorClass="bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
        />
        <StatCard 
          title="Avg. Grade" 
          value="82%" 
          subtitle="Top 15%" 
          icon={<Award size={24} />} 
          colorClass="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
        />
        <StatCard 
          title="Study Hours" 
          value="12.5" 
          subtitle="This week" 
          icon={<Clock size={24} />} 
          colorClass="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Main Content: Courses */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between animate-fade-in-up animation-delay-200">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
              <span className="w-2 h-8 bg-blue-600 rounded-full"></span>
              Current Learning
            </h2>
            <Link to="/dashboard/classes" className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 transition-all">
               <ArrowUpRight size={20} />
            </Link>
          </div>
          
          <div className="space-y-6 animate-fade-in-up animation-delay-300">
            {enrolledCourses.map((course, idx) => (
              <CourseCard key={course.id} course={course} index={idx} />
            ))}
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6 animate-fade-in-up animation-delay-400">
          
          {/* Quick Actions Grid (Bento) */}
          <section className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
             <h3 className="font-bold text-slate-900 dark:text-white mb-6 px-2">Quick Access</h3>
             <div className="grid grid-cols-2 gap-4">
               <Link to="/dashboard/wassce" className="aspect-square bg-white dark:bg-slate-900 rounded-[2rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-slate-100 dark:border-slate-800 hover:border-blue-200">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Zap size={24} />
                  </div>
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">WASSCE Prep</span>
               </Link>
               <Link to="/dashboard/performance" className="aspect-square bg-white dark:bg-slate-900 rounded-[2rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-slate-100 dark:border-slate-800 hover:border-green-200">
                  <div className="w-12 h-12 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <TrendingUp size={24} />
                  </div>
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Analytics</span>
               </Link>
               <Link to="/dashboard/chat" className="aspect-square bg-white dark:bg-slate-900 rounded-[2rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-slate-100 dark:border-slate-800 hover:border-purple-200">
                  <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Calendar size={24} />
                  </div>
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Schedule</span>
               </Link>
               <Link to="/contact" className="aspect-square bg-white dark:bg-slate-900 rounded-[2rem] p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-all group border border-slate-100 dark:border-slate-800 hover:border-orange-200">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                     <Flame size={24} />
                  </div>
                  <span className="font-bold text-sm text-slate-700 dark:text-slate-300">Go Pro</span>
               </Link>
             </div>
          </section>

          {/* Daily Goal */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 rounded-full blur-[50px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10">
               <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-2">
                    <div className="p-2 bg-white/10 rounded-xl">
                      <Target size={18} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-200">Daily Goal</span>
                 </div>
                 <span className="text-2xl font-bold">75%</span>
               </div>
               
               <div className="h-40 flex items-end justify-center mb-4">
                  {/* Simple CSS Chart for aesthetics */}
                  <div className="flex items-end gap-2 w-full h-full">
                     <div className="flex-1 bg-blue-500/20 rounded-t-lg h-[40%]"></div>
                     <div className="flex-1 bg-blue-500/20 rounded-t-lg h-[60%]"></div>
                     <div className="flex-1 bg-blue-500/20 rounded-t-lg h-[30%]"></div>
                     <div className="flex-1 bg-blue-500 rounded-t-lg h-[75%] shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                     <div className="flex-1 bg-blue-500/20 rounded-t-lg h-[50%]"></div>
                  </div>
               </div>
               
               <p className="text-sm text-blue-200 font-medium text-center">
                 You've studied <strong>1.5 hrs</strong> today. Aim for 2 hrs to keep your streak!
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
