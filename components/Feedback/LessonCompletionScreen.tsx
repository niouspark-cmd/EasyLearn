import React, { useEffect, useState } from 'react';
import { Trophy, Star, RotateCcw, Home, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonCompletionScreenProps {
  lessonTitle: string;
  score: number; // 0-100 percentage
  totalQuestions: number;
  correctAnswers: number;
  onNext: () => void;
  onTryAgain: () => void;
  onHome: () => void;
  showConfetti?: boolean;
}

const LessonCompletionScreen: React.FC<LessonCompletionScreenProps> = ({ 
  lessonTitle,
  score,
  totalQuestions,
  correctAnswers,
  onNext,
  onTryAgain,
  onHome,
  showConfetti = true
}) => {
  const [showContent, setShowContent] = useState(false);
  const [starRating, setStarRating] = useState(0);

  // Calculate star rating based on score
  useEffect(() => {
    let stars = 0;
    if (score >= 85) stars = 3;
    else if (score >= 65) stars = 2;
    else if (score >= 50) stars = 1;
    setStarRating(stars);
  }, [score]);

  // Trigger confetti and entrance animation
  useEffect(() => {
    setShowContent(true);
    
    if (showConfetti) {
      // Celebration confetti
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFA500', '#FF6347'] // Gold, Orange, Tomato
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFA500', '#FF6347']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [showConfetti]);

  // Determine if NEXT button should be enabled
  const canProceed = score >= 50; // Minimum 50% to proceed
  const isPerfectScore = score === 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#022d62] via-[#022d62] to-[#0a3a7a] backdrop-blur-sm animate-fade-in">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 text-yellow-300 opacity-30">
        <Sparkles size={24} />
      </div>
      <div className="absolute top-20 right-16 text-orange-300 opacity-20">
        <Star size={20} />
      </div>
      <div className="absolute bottom-16 left-12 text-yellow-200 opacity-25">
        <Star size={18} />
      </div>
      <div className="absolute bottom-20 right-10 text-orange-200 opacity-20">
        <Sparkles size={22} />
      </div>

      <div 
        className={`w-full max-w-md p-8 rounded-3xl bg-white border border-white/20 shadow-2xl transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-black text-[#fb9610] mb-2 font-outfit animate-bounce">
            WELL DONE!
          </h2>
          <p className="text-gray-600 font-bold text-lg">
            You finished this learning adventure!
          </p>
        </div>

        {/* Trophy Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Trophy circular frame */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center justify-center shadow-xl border-4 border-yellow-200">
              <div className="bg-amber-500 p-4 rounded-full">
                <Trophy size={48} className="text-yellow-100" />
              </div>
            </div>
            
            {/* Wooden base effect */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-amber-800 rounded-b-lg"></div>
          </div>
        </div>

        {/* Lesson Info */}
        <div className="text-center mb-6">
          <p className="text-gray-700 font-bold mb-2">{lessonTitle}</p>
          <p className="text-sm text-gray-500">
            You completed {correctAnswers} out of {totalQuestions} activities
          </p>
        </div>

        {/* Star Rating System */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-3">
            {[1, 2, 3].map((starNum) => (
              <div 
                key={starNum} 
                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                  starNum <= starRating 
                    ? 'bg-[#fb9610] border-[#fb9610]' 
                    : 'bg-white border-gray-300'
                } shadow-md`}
              >
                <Star 
                  size={24} 
                  className={
                    starNum <= starRating 
                      ? 'text-white fill-current' 
                      : 'text-gray-300'
                  } 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Score Display */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#e7effc] px-6 py-3 rounded-full">
            <span className="text-2xl font-black text-[#022d62]">
              {score}%
            </span>
            <span className="text-gray-600 ml-2">Score</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Primary NEXT Button */}
          <button 
            onClick={onNext}
            disabled={!canProceed}
            className={`w-full py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg ${
              canProceed
                ? 'bg-[#fb9610] hover:bg-[#e88a0e] text-white hover:scale-105 active:scale-95 shadow-orange-500/30'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span>{isPerfectScore ? 'PERFECT! CONTINUE >' : 'KEEP LEARNING >'}</span>
            <ArrowRight size={20} />
          </button>

          {/* Secondary Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onTryAgain}
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-[#022d62] font-black rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-[#022d62]/20"
            >
              <RotateCcw size={18} />
              <span>PRACTICE MORE</span>
            </button>
            
            <button 
              onClick={onHome}
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-[#022d62] font-black rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-[#022d62]/20"
            >
              <Home size={18} />
              <span>DASHBOARD</span>
            </button>
          </div>
        </div>

        {/* Conditional Message */}
        {!canProceed && (
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-800 text-center text-sm font-bold">
              🎯 Keep practicing to build your confidence! You're making progress.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonCompletionScreen;