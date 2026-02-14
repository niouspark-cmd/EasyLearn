import React, { useEffect, useState } from 'react';
import { Volume2, Star, RotateCcw, Home, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FoundationLessonCompleteProps {
  lessonType: 'sounds' | 'letters';
  masteredItems: string[];
  totalItems: number;
  onNext: () => void;
  onTryAgain: () => void;
  onHome: () => void;
  showConfetti?: boolean;
}

const FoundationLessonComplete: React.FC<FoundationLessonCompleteProps> = ({ 
  lessonType,
  masteredItems,
  totalItems,
  onNext,
  onTryAgain,
  onHome,
  showConfetti = true
}) => {
  const [showContent, setShowContent] = useState(false);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Calculate progress percentage
  useEffect(() => {
    const percentage = Math.round((masteredItems.length / totalItems) * 100);
    setProgressPercentage(percentage);
  }, [masteredItems.length, totalItems]);

  // Trigger confetti and entrance animation
  useEffect(() => {
    setShowContent(true);
    
    if (showConfetti) {
      // Gentle celebration confetti for foundation lessons
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#022d62', '#fb9610', '#ffffff'], // Navy, Orange, White
          gravity: 0.8,
          scalar: 0.8
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#022d62', '#fb9610', '#ffffff'],
          gravity: 0.8,
          scalar: 0.8
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [showConfetti]);

  // Determine lesson-specific content
  const getTitle = () => {
    return lessonType === 'sounds' ? 'Sounds Mastered!' : 'Letters Learned!';
  };

  const getMessage = () => {
    return lessonType === 'sounds' 
      ? 'You explored all the sounds! Ready to connect them with letters?' 
      : 'Great work connecting sounds to letters! Your reading skills are growing!';
  };

  const getNextAction = () => {
    return lessonType === 'sounds' ? 'Learn Letters →' : 'Continue Journey →';
  };

  const getIcon = () => {
    return lessonType === 'sounds' ? Volume2 : CheckCircle;
  };

  const IconComponent = getIcon();

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-[#e7effc] via-white to-[#fb9610]/5 backdrop-blur-sm animate-fade-in">
      {/* Gentle decorative elements */}
      <div className="absolute top-8 left-8 text-[#022d62]/20">
        <Sparkles size={20} />
      </div>
      <div className="absolute top-16 right-12 text-[#fb9610]/20">
        <Star size={18} />
      </div>
      <div className="absolute bottom-12 left-10 text-[#022d62]/15">
        <Sparkles size={22} />
      </div>
      <div className="absolute bottom-20 right-8 text-[#fb9610]/15">
        <Star size={16} />
      </div>

      <div 
        className={`w-full max-w-md p-8 rounded-3xl bg-white border border-[#022d62]/10 shadow-xl transform transition-all duration-700 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        {/* Header with Lesson Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-[#022d62] blur-lg opacity-20 rounded-full animate-pulse"></div>
            <div className="relative bg-[#022d62]/10 p-5 rounded-full border-4 border-[#022d62]/30">
              <IconComponent size={40} className="text-[#022d62]" />
            </div>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl font-black text-center mb-2 text-[#022d62] font-outfit">
          {getTitle()}
        </h2>
        
        <p className="text-center text-[#022d62]/70 mb-6 text-lg font-bold">
          {getMessage()}
        </p>

        {/* Progress Visualization */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-black text-[#022d62]/60 uppercase tracking-widest">
              Progress
            </span>
            <span className="text-lg font-black text-[#022d62]">
              {masteredItems.length}/{totalItems} completed
            </span>
          </div>
          
          <div className="w-full bg-[#e7effc] rounded-full h-4 mb-4">
            <div 
              className="bg-[#022d62] h-4 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="text-center">
            <span className="inline-block bg-[#fb9610]/20 px-4 py-2 rounded-full">
              <span className="text-2xl font-black text-[#fb9610]">
                {progressPercentage}%
              </span>
              <span className="text-[#022d62] ml-2 font-bold">Complete</span>
            </span>
          </div>
        </div>

        {/* Mastered Items Preview */}
        {masteredItems.length > 0 && (
          <div className="mb-8">
            <p className="text-center text-sm text-[#022d62]/60 font-bold mb-3 uppercase tracking-wider">
              You Mastered:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {masteredItems.slice(0, 6).map((item, index) => (
                <div 
                  key={index}
                  className="bg-[#022d62] text-white px-3 py-2 rounded-xl font-black text-lg animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item}
                </div>
              ))}
              {masteredItems.length > 6 && (
                <div className="bg-[#fb9610] text-white px-3 py-2 rounded-xl font-black text-lg">
                  +{masteredItems.length - 6} more
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Primary NEXT Button */}
          <button 
            onClick={onNext}
            className="w-full py-4 bg-[#022d62] hover:bg-[#033d82] text-white rounded-2xl font-black text-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            <span>{getNextAction()}</span>
            <ArrowRight size={20} />
          </button>

          {/* Secondary Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={onTryAgain}
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-[#022d62] font-black rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-[#022d62]/20"
            >
              <RotateCcw size={18} />
              <span>EXPLORE MORE</span>
            </button>
            
            <button 
              onClick={onHome}
              className="flex-1 py-3 bg-white hover:bg-gray-50 text-[#022d62] font-black rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 border-2 border-[#022d62]/20"
            >
              <Home size={18} />
              <span>LEARN MORE</span>
            </button>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="mt-6 p-4 bg-[#e7effc] rounded-2xl border border-[#022d62]/10">
          <p className="text-center text-[#022d62] font-bold text-sm">
            🌟 Great progress! You're building strong reading foundations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoundationLessonComplete;