import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  X,
  LayoutGrid,
  CheckCircle,
  AlertCircle,
  Menu
} from 'lucide-react';
import { MOCK_EXAMS } from '../constants';
import { useApp } from '../AppContext';

const ExamTakerPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useApp();
  const isDark = theme === 'dark';
  
  const exam = MOCK_EXAMS.find(e => e.id === id);
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(exam ? exam.timeLimitMinutes * 60 : 0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isQuestionMapOpen, setIsQuestionMapOpen] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  if (!exam) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-500">Exam not found</div>;

  const currentQuestion = exam.questions[currentQuestionIndex];
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (index: number) => {
    setAnswers({ ...answers, [currentQuestion.id]: index });
  };

  const toggleFlag = () => {
    setFlags({ ...flags, [currentQuestion.id]: !flags[currentQuestion.id] });
  };

  const handleSubmit = () => {
    navigate(`/dashboard/performance`);
  };

  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;

  return (
    <div className={`fixed inset-0 flex flex-col ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-300 font-sans`}>
      
      {/* 1. App Bar (Fixed Top) */}
      <header className={`shrink-0 h-16 px-4 flex items-center justify-between border-b z-20 ${
        isDark ? 'bg-slate-950/90 border-slate-800' : 'bg-white/90 border-slate-200'
      } backdrop-blur-md`}>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/dashboard/wassce')}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark ? 'bg-slate-900 text-slate-400 hover:bg-slate-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col">
            <h1 className="text-sm font-bold leading-tight line-clamp-1">{exam.subject}</h1>
            <span className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              Question {currentQuestionIndex + 1} of {exam.questions.length}
            </span>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${
          timeLeft < 300 
            ? 'bg-red-500/10 border-red-500/20 text-red-500' 
            : isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
        }`}>
          <Clock size={14} className={timeLeft < 300 ? 'animate-pulse' : ''} />
          <span className="text-sm font-bold font-mono min-w-[40px] text-center">{formatTime(timeLeft)}</span>
        </div>
      </header>

      {/* 2. Progress Indicator (Slim Line) */}
      <div className={`w-full h-1 ${isDark ? 'bg-slate-900' : 'bg-slate-200'}`}>
        <div 
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 3. Main Content (Scrollable Area) */}
      <main className="flex-1 overflow-y-auto overflow-x-hidden p-5 pb-32 overscroll-contain">
        <div className="max-w-2xl mx-auto space-y-8">
          
          {/* Question Card */}
          <div className="animate-fade-in-up">
            <h2 className={`text-xl md:text-2xl font-bold leading-snug mb-6 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {currentQuestion.text}
            </h2>

            {/* Options List */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = answers[currentQuestion.id] === idx;
                return (
                  <button 
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-5 text-left rounded-2xl border-2 transition-all duration-200 relative group active:scale-[0.98] ${
                      isSelected 
                        ? 'border-blue-600 bg-blue-600/10' 
                        : isDark 
                          ? 'border-slate-800 bg-slate-900 hover:border-slate-700' 
                          : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold border-2 mt-0.5 shrink-0 transition-colors ${
                        isSelected 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : isDark
                            ? 'border-slate-700 text-slate-500'
                            : 'border-slate-300 text-slate-500'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className={`text-base font-medium leading-relaxed ${
                        isSelected 
                          ? 'text-blue-600 dark:text-blue-400' 
                          : isDark ? 'text-slate-300' : 'text-slate-700'
                      }`}>
                        {option}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      {/* 4. Bottom Action Bar (Fixed) */}
      <div className={`shrink-0 px-4 py-3 pb-6 border-t z-20 flex items-center justify-between gap-4 ${
        isDark ? 'bg-slate-950 border-slate-900' : 'bg-white border-slate-100'
      }`}>
        <button 
          onClick={() => setIsQuestionMapOpen(true)}
          className={`p-3 rounded-2xl transition-colors ${
            isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <LayoutGrid size={24} />
        </button>

        <div className="flex-1 flex gap-3 max-w-sm mx-auto">
          <button 
            disabled={currentQuestionIndex === 0}
            onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            className={`flex-1 flex items-center justify-center p-3.5 rounded-2xl font-bold text-base transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 ${
              isDark ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-900'
            }`}
          >
            <ChevronLeft size={20} className="mr-1" /> Prev
          </button>
          
          <button 
            onClick={() => {
              if (currentQuestionIndex === exam.questions.length - 1) {
                setShowConfirmSubmit(true);
              } else {
                setCurrentQuestionIndex(prev => prev + 1);
              }
            }}
            className="flex-1 flex items-center justify-center p-3.5 rounded-2xl font-bold text-base bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95 active:shadow-sm"
          >
            {currentQuestionIndex === exam.questions.length - 1 ? 'Finish' : 'Next'} 
            {currentQuestionIndex !== exam.questions.length - 1 && <ChevronRight size={20} className="ml-1" />}
          </button>
        </div>

        <button 
          onClick={toggleFlag}
          className={`p-3 rounded-2xl transition-colors ${
            flags[currentQuestion.id] 
              ? 'bg-orange-500/10 text-orange-500' 
              : isDark ? 'bg-slate-900 text-slate-400' : 'bg-slate-100 text-slate-600'
          }`}
        >
          <Flag size={24} fill={flags[currentQuestion.id] ? "currentColor" : "none"} />
        </button>
      </div>

      {/* 5. Question Map "Bottom Sheet" */}
      {isQuestionMapOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsQuestionMapOpen(false)}
          />
          <div className={`fixed bottom-0 left-0 right-0 z-50 rounded-t-[32px] overflow-hidden max-h-[80vh] flex flex-col animate-slide-up ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
            <div className="p-2 flex justify-center w-full" onClick={() => setIsQuestionMapOpen(false)}>
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
            
            <div className="px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
              <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>All Questions</h3>
              <div className="flex gap-4 text-xs font-bold">
                 <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                   <span className="w-2 h-2 rounded-full bg-blue-600" /> Answered
                 </span>
                 <span className="flex items-center gap-1.5 text-orange-500">
                   <span className="w-2 h-2 rounded-full bg-orange-500" /> Flagged
                 </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 grid grid-cols-5 gap-3">
              {exam.questions.map((q, i) => {
                const isCurrent = i === currentQuestionIndex;
                const isAnswered = answers[q.id] !== undefined;
                const isFlagged = flags[q.id];
                
                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      setCurrentQuestionIndex(i);
                      setIsQuestionMapOpen(false);
                    }}
                    className={`aspect-square rounded-xl text-sm font-bold flex items-center justify-center relative transition-all active:scale-95 ${
                      isCurrent
                        ? 'bg-blue-600 text-white ring-2 ring-offset-2 ring-blue-600 dark:ring-offset-slate-900'
                        : isAnswered
                          ? 'bg-blue-600/10 text-blue-600 dark:bg-blue-600/20 dark:text-blue-400'
                          : isDark ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {i + 1}
                    {isFlagged && (
                      <div className="absolute top-1 right-1 w-2 h-2 bg-orange-500 rounded-full border-2 border-white dark:border-slate-800" />
                    )}
                  </button>
                );
              })}
            </div>
            
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
               <button 
                  onClick={() => {
                    setIsQuestionMapOpen(false);
                    setShowConfirmSubmit(true);
                  }}
                  className={`w-full py-4 rounded-2xl font-bold text-lg ${
                    isDark ? 'bg-white text-slate-950' : 'bg-slate-900 text-white'
                  }`}
               >
                 Review & Submit
               </button>
            </div>
          </div>
        </>
      )}

      {/* 6. Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={() => setShowConfirmSubmit(false)} />
          <div className={`relative w-full max-w-sm rounded-[32px] p-8 text-center shadow-2xl animate-in zoom-in-95 duration-200 ${
            isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              isDark ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-600'
            }`}>
              <AlertCircle size={40} />
            </div>
            
            <h3 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Submitting Exam
            </h3>
            
            <p className={`text-base mb-8 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Are you sure you want to finish? You've answered <strong className="text-blue-600">{Object.keys(answers).length}</strong> of {exam.questions.length} questions.
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleSubmit}
                className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl text-lg shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-transform"
              >
                Yes, Submit Now
              </button>
              <button 
                onClick={() => setShowConfirmSubmit(false)}
                className={`w-full py-4 font-bold rounded-2xl text-lg ${
                  isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                Keep Working
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamTakerPage;
