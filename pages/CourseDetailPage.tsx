
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  Clock, 
  Play, 
  FileText, 
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ArrowRight,
  Award
} from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import { useApp } from '../AppContext';
import BackButton from '../components/BackButton';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams();
  const { enrolledCourses, enrollInCourse } = useApp();
  const course = MOCK_COURSES.find(c => c.id === id);
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({ 'm1': true });

  if (!course) return <div>Course not found</div>;

  const isEnrolled = enrolledCourses.some(c => c.id === course.id);

  const toggleModule = (moduleId: string) => {
    setExpandedModules({ ...expandedModules, [moduleId]: !expandedModules[moduleId] });
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up pb-20">
      <div className="mb-6">
        <BackButton to="/dashboard/classes" label="Back to Classes" />
      </div>
      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          {/* Course Hero */}
          <div className="relative h-72 md:h-96 rounded-[40px] overflow-hidden mb-10 shadow-2xl">
            <img src={course.image} className="w-full h-full object-cover" alt="" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 bg-blue-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest">{course.subject}</span>
                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md text-white rounded-xl text-xs font-bold uppercase tracking-widest border border-white/20">{course.level}</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <img src={course.teacherAvatar} className="w-10 h-10 rounded-full border-2 border-white object-cover" alt="" />
                  <span className="text-white font-bold">{course.teacherName}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <Users size={18} /> {course.studentCount} Students
                </div>
                <div className="flex items-center gap-2 text-white/80 text-sm font-medium">
                  <BookOpen size={18} /> {course.moduleCount} Modules
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Description</h2>
            <p className="text-lg text-slate-600 leading-relaxed bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
              {course.description} This comprehensive course is designed specifically to meet the Ghana Education Service (GES) standards for {course.subject}. Whether you're preparing for {course.level} exams or looking to deepen your understanding of fundamental concepts, this course offers structured learning paths to help you succeed.
            </p>
          </section>

          {/* Syllabus */}
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Course Syllabus</h2>
            <div className="space-y-4">
              {course.modules.length > 0 ? (
                course.modules.map(module => (
                  <div key={module.id} className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm">
                    <button 
                      onClick={() => toggleModule(module.id)}
                      className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                          {course.modules.indexOf(module) + 1}
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg">{module.title}</h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-400 font-bold uppercase">{module.lessons.length} Lessons</span>
                        <ChevronDown className={`text-slate-400 transition-transform ${expandedModules[module.id] ? 'rotate-180' : ''}`} />
                      </div>
                    </button>
                    {expandedModules[module.id] && (
                      <div className="px-6 pb-6 space-y-2">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl hover:bg-slate-50 transition-all">
                            <div className="flex items-center gap-4">
                              <div className="w-8 h-8 flex items-center justify-center text-slate-400">
                                {lesson.type === 'video' ? <Play size={18} /> : lesson.type === 'quiz' ? <HelpCircle size={18} /> : <FileText size={18} />}
                              </div>
                              <div>
                                <p className="font-bold text-slate-800 text-sm">{lesson.title}</p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{lesson.duration} • {lesson.type}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              {lesson.completed && <CheckCircle2 className="text-green-500" size={20} />}
                              {isEnrolled && (
                                <Link to={`/dashboard/course/${course.id}/lesson/${lesson.id}`} className="px-4 py-2 bg-white text-blue-600 font-bold rounded-lg text-xs border border-blue-100 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                  {lesson.completed ? 'Review' : 'Start'}
                                </Link>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-[32px] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-medium">Syllabus content is being updated...</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl">
              {!isEnrolled ? (
                <>
                  <p className="text-3xl font-extrabold text-slate-900 mb-2">Free Access</p>
                  <p className="text-sm text-slate-500 mb-8 font-medium">Get lifetime access to this course and all future updates.</p>
                  <button 
                    onClick={() => enrollInCourse(course)}
                    className="w-full py-4 blue-gradient text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    Enroll Now <ArrowRight size={20} />
                  </button>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center">
                      <Award size={28} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Your Progress</p>
                      <p className="text-2xl font-extrabold text-slate-900">{course.progress}%</p>
                    </div>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full mb-8 overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <Link 
                    to={`/dashboard/course/${course.id}/lesson/l1`}
                    className="w-full py-4 blue-gradient text-white font-bold rounded-2xl shadow-xl shadow-blue-100 flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                  >
                    Continue Learning <ChevronRight size={20} />
                  </Link>
                </>
              )}
              
              <div className="mt-8 pt-8 border-t border-slate-50 space-y-4">
                <div className="flex items-center gap-4 text-slate-600 font-medium">
                  <Play size={18} className="text-blue-600" />
                  <span className="text-sm">12 Hours on-demand video</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium">
                  <FileText size={18} className="text-blue-600" />
                  <span className="text-sm">24 Downloadable resources</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium">
                  <Award size={18} className="text-blue-600" />
                  <span className="text-sm">Certificate of completion</span>
                </div>
                <div className="flex items-center gap-4 text-slate-600 font-medium">
                  <Clock size={18} className="text-blue-600" />
                  <span className="text-sm">Lifetime access</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 rounded-[40px] p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Have Questions?</h3>
              <p className="text-blue-100 mb-6 text-sm font-medium">Our AI Tutor is available 24/7 to help you with any concept in this course.</p>
              <Link to="/dashboard/chat" className="w-full py-4 bg-white text-blue-600 font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-50 transition-all">
                Ask AI Tutor <Sparkles size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Sparkles icon since it's not in standard Lucide occasionally depending on version
const Sparkles: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);

export default CourseDetailPage;
