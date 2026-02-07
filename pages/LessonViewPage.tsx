
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  ChevronRight, 
  PlayCircle, 
  Download, 
  CheckCircle,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { MOCK_COURSES } from '../constants';
import BackButton from '../components/BackButton';

const LessonViewPage: React.FC = () => {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const course = MOCK_COURSES.find(c => c.id === id);
  const lesson = course?.modules.flatMap(m => m.lessons).find(l => l.id === lessonId);

  if (!course || !lesson) return <div>Lesson not found</div>;

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up pb-20">
      {/* Header Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <BackButton to={`/dashboard/course/${course.id}`} label="Back to Course" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{lesson.title}</h1>
            <p className="text-sm text-slate-500 font-medium">{course.title}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white text-slate-600 font-bold rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all">
            <ChevronLeft size={18} /> Previous
          </button>
          <button className="flex items-center gap-2 px-6 py-3 blue-gradient text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all">
            Next Lesson <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          {/* Video Placeholder */}
          <div className="aspect-video bg-slate-900 rounded-[40px] shadow-2xl relative flex items-center justify-center overflow-hidden mb-10 border-8 border-white">
            <img src={course.image} className="absolute inset-0 w-full h-full object-cover opacity-30 blur-sm" alt="" />
            <div className="relative z-10 text-center">
              <button className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform mb-6">
                <PlayCircle size={48} fill="currentColor" />
              </button>
              <p className="text-white text-lg font-bold">Watch Video Lesson</p>
              <p className="text-blue-100/60 text-sm mt-1">{lesson.duration} duration</p>
            </div>
          </div>

          {/* Lesson Content */}
          <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
            <div className="prose prose-blue max-w-none">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">Understanding the Concepts</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                In this lesson, we cover the core principles of {lesson.title}. This is a fundamental topic for the WASSCE {course.subject} curriculum and frequently appears in the Part 1 section of the examination.
              </p>
              <div className="bg-blue-50 border-l-8 border-blue-600 p-8 rounded-3xl mb-10">
                <h4 className="text-blue-900 font-bold mb-3 text-xl">Key Learning Objectives:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 shrink-0" />
                    <span className="text-blue-800 font-medium">Define the core terminology related to the topic.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 shrink-0" />
                    <span className="text-blue-800 font-medium">Apply mathematical principles to solve real-world problems.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-blue-600 mt-1 shrink-0" />
                    <span className="text-blue-800 font-medium">Identify common pitfalls in examination questions.</span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-slate-600 mb-10 leading-relaxed">
                Make sure to download the attached summary sheet to review the formulas we discussed in the video. Remember, consistent practice is the key to mastering this subject.
              </p>
            </div>

            {/* Resources */}
            <div className="pt-10 border-t border-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Lesson Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                      <Download size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Summary Notes.pdf</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">1.2 MB • PDF</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
                <button className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl hover:bg-slate-100 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                      <CheckCircle size={24} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">Practice Exercises</p>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">12 Questions</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-600 transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-6">
            <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-6">Course Content</h3>
              <div className="space-y-1">
                {course.modules.flatMap(m => m.lessons).map((l, idx) => (
                  <button 
                    key={l.id}
                    onClick={() => navigate(`/dashboard/course/${course.id}/lesson/${l.id}`)}
                    className={`w-full p-4 flex items-center gap-4 rounded-2xl text-left transition-all ${l.id === lessonId ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'hover:bg-slate-50'}`}
                  >
                    <span className={`text-xs font-bold ${l.id === lessonId ? 'text-blue-100' : 'text-slate-400'}`}>{idx + 1}</span>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-bold text-sm truncate">{l.title}</p>
                      <p className={`text-[10px] font-bold uppercase tracking-wider ${l.id === lessonId ? 'text-blue-200' : 'text-slate-400'}`}>{l.duration}</p>
                    </div>
                    {l.completed && <CheckCircle size={16} className={l.id === lessonId ? 'text-white' : 'text-green-500'} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 rounded-[40px] p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4 text-blue-400 font-bold uppercase tracking-widest text-xs">
                  <Sparkles size={14} /> AI Support
                </div>
                <h3 className="text-xl font-bold mb-4">Don't understand something?</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">Ask our AI tutor specifically about this lesson. Get instant explanations, examples and more.</p>
                <Link to="/dashboard/chat" className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/40">
                  Quick Ask <MessageCircle size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonViewPage;
