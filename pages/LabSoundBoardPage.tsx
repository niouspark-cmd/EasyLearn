
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  PlayCircle, 
  Book, 
  BookOpen,
  Star, 
  ArrowLeft, 
  ArrowRight,
  Zap, 
  Hammer, 
  CheckCircle,
  Eye,
  EyeOff,
  Trash2
} from 'lucide-react';
import SoundTile from '../components/SoundBoard/SoundTile';
import SatpinLesson from '../components/SoundBoard/SatpinLesson';
import ElkoninBox, { PhonemeSegment } from '../components/Mapping/ElkoninBox';
import WordBuilder from '../components/BuildWord/WordBuilder';
import TextHighlighter from '../components/Fluency/TextHighlighter';
import GhanaLab from '../components/GhanaLab/GhanaLab';

// Expanded Phonics Data - Full Alphabet + Digraphs
const PHONEMES = [
  // Row 1: Vowels & Common
  { g: 'a', p: '/æ/', c: 'bg-[#fb9610]' }, // Vowels orange
  { g: 'b', p: '/b/', c: 'bg-[#022d62]' }, // Consonants navy
  { g: 'c', p: '/k/', c: 'bg-[#022d62]' },
  { g: 'd', p: '/d/', c: 'bg-[#022d62]' },
  { g: 'e', p: '/e/', c: 'bg-[#fb9610]' },
  { g: 'f', p: '/f/', c: 'bg-[#022d62]' },
  
  // Row 2
  { g: 'g', p: '/g/', c: 'bg-[#022d62]' },
  { g: 'h', p: '/h/', c: 'bg-[#022d62]' },
  { g: 'i', p: '/ɪ/', c: 'bg-[#fb9610]' },
  { g: 'j', p: '/dʒ/', c: 'bg-[#022d62]' },
  { g: 'k', p: '/k/', c: 'bg-[#022d62]' },
  { g: 'l', p: '/l/', c: 'bg-[#022d62]' },

  // Row 3
  { g: 'm', p: '/m/', c: 'bg-[#022d62]' },
  { g: 'n', p: '/n/', c: 'bg-[#022d62]' },
  { g: 'o', p: '/ɒ/', c: 'bg-[#fb9610]' },
  { g: 'p', p: '/p/', c: 'bg-[#022d62]' },
  { g: 'q', p: '/kw/', c: 'bg-[#022d62]' },
  { g: 'r', p: '/r/', c: 'bg-[#022d62]' },

  // Row 4
  { g: 's', p: '/s/', c: 'bg-[#022d62]' },
  { g: 't', p: '/t/', c: 'bg-[#022d62]' },
  { g: 'u', p: '/ʌ/', c: 'bg-[#fb9610]' },
  { g: 'v', p: '/v/', c: 'bg-[#022d62]' },
  { g: 'w', p: '/w/', c: 'bg-[#022d62]' },
  { g: 'x', p: '/ks/', c: 'bg-[#022d62]' },

  // Row 5
  { g: 'y', p: '/y/', c: 'bg-[#fb9610]' },
  { g: 'z', p: '/z/', c: 'bg-[#022d62]' },
  { g: 'ch', p: '/tʃ/', c: 'bg-[#022d62]' }, 
  { g: 'sh', p: '/ʃ/', c: 'bg-[#022d62]' },
  { g: 'th', p: '/θ/', c: 'bg-[#022d62]' },
  { g: 'ng', p: '/ŋ/', c: 'bg-[#022d62]' },
  { g: 'ou', p: '/aʊ/', c: 'bg-[#fb9610]' },
  { g: 'ow', p: '/aʊ/', c: 'bg-[#fb9610]' },
  { g: 'oy', p: '/ɔɪ/', c: 'bg-[#fb9610]' },
];

const BLEND_2_WORDS = [
  { word: 'am', segments: [{ text: 'a', type: 'vowel' }, { text: 'm', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'at', segments: [{ text: 'a', type: 'vowel' }, { text: 't', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'is', segments: [{ text: 'i', type: 'vowel' }, { text: 's', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'it', segments: [{ text: 'i', type: 'vowel' }, { text: 't', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'on', segments: [{ text: 'o', type: 'vowel' }, { text: 'n', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'up', segments: [{ text: 'u', type: 'vowel' }, { text: 'p', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'in', segments: [{ text: 'i', type: 'vowel' }, { text: 'n', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'an', segments: [{ text: 'a', type: 'vowel' }, { text: 'n', type: 'consonant' }] as PhonemeSegment[] },
];

const BLEND_3_WORDS = [
  { word: 'cat', segments: [{ text: 'c', type: 'consonant' }, { text: 'a', type: 'vowel' }, { text: 't', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'pig', segments: [{ text: 'p', type: 'consonant' }, { text: 'i', type: 'vowel' }, { text: 'g', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'sun', segments: [{ text: 's', type: 'consonant' }, { text: 'u', type: 'vowel' }, { text: 'n', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'dog', segments: [{ text: 'd', type: 'consonant' }, { text: 'o', type: 'vowel' }, { text: 'g', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'bat', segments: [{ text: 'b', type: 'consonant' }, { text: 'a', type: 'vowel' }, { text: 't', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'red', segments: [{ text: 'r', type: 'consonant' }, { text: 'e', type: 'vowel' }, { text: 'd', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'big', segments: [{ text: 'b', type: 'consonant' }, { text: 'i', type: 'vowel' }, { text: 'g', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'hat', segments: [{ text: 'h', type: 'consonant' }, { text: 'a', type: 'vowel' }, { text: 't', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'top', segments: [{ text: 't', type: 'consonant' }, { text: 'o', type: 'vowel' }, { text: 'p', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'cup', segments: [{ text: 'c', type: 'consonant' }, { text: 'u', type: 'vowel' }, { text: 'p', type: 'consonant' }] as PhonemeSegment[] },
];

const BLEND_4_WORDS = [
  { word: 'wish', segments: [{ text: 'w', type: 'consonant' }, { text: 'i', type: 'vowel' }, { text: 'sh', type: 'digraph' }] as PhonemeSegment[] },
  { word: 'fast', segments: [{ text: 'f', type: 'consonant' }, { text: 'a', type: 'vowel' }, { text: 's', type: 'consonant' }, { text: 't', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'chip', segments: [{ text: 'ch', type: 'digraph' }, { text: 'i', type: 'vowel' }, { text: 'p', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'frog', segments: [{ text: 'f', type: 'consonant' }, { text: 'r', type: 'consonant' }, { text: 'o', type: 'vowel' }, { text: 'g', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'stop', segments: [{ text: 's', type: 'consonant' }, { text: 't', type: 'consonant' }, { text: 'o', type: 'vowel' }, { text: 'p', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'hand', segments: [{ text: 'h', type: 'consonant' }, { text: 'a', type: 'vowel' }, { text: 'n', type: 'consonant' }, { text: 'd', type: 'consonant' }] as PhonemeSegment[] },
  { word: 'wind', segments: [{ text: 'w', type: 'consonant' }, { text: 'i', type: 'vowel' }, { text: 'n', type: 'consonant' }, { text: 'd', type: 'consonant' }] as PhonemeSegment[] },
];

const CURRICULUM = [
  { id: 1, title: 'Listen to the Sounds', type: 'pure-sounds', subtitle: 'Focus on pure phonemes' },
  { id: 2, title: 'Letters and Their Sounds', type: 'letters', subtitle: 'Connect audio to alphabet' },
  { id: 3, title: 'Blend Two Letters', type: 'blend2', subtitle: 'Vowel + Consonant pairs' },
  { id: 4, title: 'Blend Three Letters', type: 'blend3', subtitle: 'CVC word mapping' },
  { id: 5, title: 'Blend Four Letters', type: 'blend4', subtitle: 'Complex blends & digraphs' },
  { id: 6, title: 'Practice: Build Your Own Words', type: 'practice', subtitle: 'Word workshop board' },
];

import SessionSuccess from '../components/Feedback/SessionSuccess';

const PagedElkoninLesson: React.FC<{ 
    words: { word: string, segments: PhonemeSegment[] }[],
    onComplete: () => void 
}> = ({ words, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    const currentItem = words[currentIndex];

    // Minimum swipe distance (pixels)
    const minSwipeDistance = 50;

    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            handleNext();
        } else if (isRightSwipe) {
            handlePrev();
        }
    };

    const handleNext = () => {
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <div 
            className="h-full flex flex-col items-center select-none"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Counter: X of X */}
            <div className="mb-4 text-[#fb9610] font-black text-3xl font-outfit">
                {currentIndex + 1} of {words.length}
            </div>

            {/* Instruction text */}
            <p className="mb-8 text-slate-300 font-bold uppercase tracking-widest text-[10px]">
                Swipe to change words
            </p>

            <div className="flex-1 w-full flex items-center justify-center min-h-[400px]">
                <div key={currentIndex} className="animate-slide-in-right w-full">
                    <ElkoninBox word={currentItem.word} segments={currentItem.segments} />
                </div>
            </div>

            {/* Navigation Dots */}
            <div className="mt-12 flex items-center gap-3">
                {words.map((_, i) => (
                    <div 
                        key={i} 
                        className={`
                            h-3 rounded-full transition-all duration-300
                            ${i === currentIndex ? 'w-10 bg-[#fb9610]' : 'w-3 bg-slate-200'}
                        `}
                    />
                ))}
            </div>

            {/* Hidden fallback/shortcut for non-touch desktops */}
            <div className="mt-8 hidden lg:flex gap-4">
                 <button onClick={handlePrev} disabled={currentIndex === 0} className="px-6 py-2 rounded-xl bg-slate-100 text-[#022d62] disabled:opacity-30 font-bold">Back</button>
                 <button onClick={handleNext} className="px-6 py-2 rounded-xl bg-[#fb9610] text-white font-bold">{currentIndex === words.length - 1 ? 'Finish' : 'Next'}</button>
            </div>
        </div>
    );
};

const LabSoundBoardPage: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLevelComplete = () => {
    // Play applause sound
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/201/201-preview.mp3');
    audio.play().catch(() => {});
    setShowSuccess(true);
  };

  const handleContinue = () => {
    setShowSuccess(false);
    if (activeLessonId && activeLessonId < 6) {
        setActiveLessonId(activeLessonId + 1);
    } else {
        setActiveLessonId(null);
    }
  };

  const renderLessonContent = (type: string) => {
    switch (type) {
      case 'pure-sounds':
        return <SatpinLesson stage="pure-sounds" onComplete={handleLevelComplete} />;
      case 'letters':
        return <SatpinLesson stage="letters" onComplete={handleLevelComplete} onBack={() => setActiveLessonId(1)} />;
      case 'blend2':
        return <PagedElkoninLesson words={BLEND_2_WORDS} onComplete={handleLevelComplete} />;
      case 'blend3':
        return <PagedElkoninLesson words={BLEND_3_WORDS} onComplete={handleLevelComplete} />;
      case 'blend4':
        return <PagedElkoninLesson words={BLEND_4_WORDS} onComplete={handleLevelComplete} />;
      case 'practice':
        return <WordBuilder />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#011627] text-[#022d62] dark:text-white transition-colors duration-300">
      {/* Top Logo Section */}
      <header className="py-12 flex flex-col items-center text-center px-4">
        <div className="w-24 h-24 relative mb-6 animate-bounce">
            {/* Simulated 3D Cube Logo - Using Brand Colors */}
            <div className="absolute inset-0 bg-[#022d62] rounded-xl transform -rotate-12 flex items-center justify-center text-white font-black text-2xl">ee</div>
            <div className="absolute inset-0 bg-[#fb9610] rounded-xl transform rotate-12 -translate-y-2 flex items-center justify-center text-white font-black text-2xl">ie</div>
            <div className="absolute inset-0 bg-[#e7effc] dark:bg-slate-800 rounded-xl -translate-y-4 flex items-center justify-center text-[#022d62] dark:text-white font-black text-2xl shadow-lg border-2 border-[#022d62]/10">ay</div>
        </div>
        <h1 className="text-4xl font-black text-[#022d62] dark:text-white mb-2 font-outfit">Adesua<br/>Reading & Sounds</h1>
      </header>
      
      {/* Curriculum Sections - Using Brand Colors */}
      <div className="flex flex-col">
        
        {/* Section 1: Single Letter Sounds - ORANGE */}
        <div className="bg-[#fb9610]/10 dark:bg-[#fb9610]/5 py-16 px-6 flex flex-col items-center gap-6 text-center border-t-4 border-white dark:border-white/5">
           <div className="w-16 h-16 bg-[#fb9610] rounded-3xl flex items-center justify-center text-white shadow-lg mx-auto mb-2">
                <BookOpen size={32} />
           </div>
           <button 
                onClick={() => setActiveLessonId(1)}
                className="w-full max-w-sm py-6 px-8 bg-[#fb9610] text-white rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform border-b-8 border-orange-700"
           >
                Learn Sounds
           </button>
           <p className="text-[#022d62]/60 dark:text-white/40 font-black uppercase tracking-widest text-sm">Then try this:</p>
           <button 
                onClick={() => setActiveLessonId(2)}
                className="w-full max-w-sm py-6 px-8 bg-white dark:bg-slate-800 text-[#fb9610] border-4 border-[#fb9610] rounded-full font-black text-2xl shadow-lg hover:scale-105 transition-transform"
           >
                Practise Sounds
           </button>
        </div>

        {/* Section 2: Blending - NAVY */}
        <div className="bg-[#022d62] py-20 px-6 flex flex-col items-center gap-6 text-center border-t-4 border-white dark:border-white/5 relative overflow-hidden">
           {/* Decorative circles */}
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/5 rounded-full" />
           <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white/5 rounded-full" />

           <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center text-white shadow-lg mx-auto mb-2">
                <Zap size={32} />
           </div>
           
           <h3 className="text-white text-3xl font-black mb-2">Blending Fun!</h3>

           <button 
                onClick={() => setActiveLessonId(3)}
                className="w-full max-w-sm py-6 px-8 bg-[#fb9610] text-white rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform border-b-8 border-orange-700"
           >
                2-Letter Words
           </button>
            <button 
                onClick={() => setActiveLessonId(4)}
                className="w-full max-w-sm py-6 px-8 bg-white dark:bg-slate-800 text-[#022d62] dark:text-white rounded-full font-black text-2xl shadow-xl hover:scale-105 transition-transform border-b-8 border-slate-200 dark:border-slate-900"
            >
                3-Letter Words
            </button>
        </div>

        {/* Section 4: Practice Board - CLOUD */}
        <div className="bg-[#e7effc] dark:bg-slate-900/50 py-20 px-6 flex flex-col items-center gap-6 text-center border-t-4 border-white dark:border-white/5">
           <div className="w-16 h-16 bg-[#022d62] dark:bg-[#fb9610] rounded-3xl flex items-center justify-center text-white shadow-lg mx-auto mb-4">
                <Hammer size={32} />
           </div>
           <button 
                onClick={() => setActiveLessonId(6)}
                className="w-full max-w-sm py-8 px-8 bg-white dark:bg-slate-800 text-[#022d62] dark:text-white rounded-[3rem] font-black text-3xl shadow-xl hover:scale-105 transition-transform border-b-8 border-slate-200 dark:border-slate-900"
           >
                Word Workshop
           </button>
           <p className="text-[#022d62]/40 dark:text-white/20 font-black uppercase tracking-widest text-sm">Build your own words!</p>
        </div>

      </div>

      {/* Lesson Overlay */}
      {activeLessonId !== null && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#011627] flex flex-col animate-slide-up">
           <div className={`relative p-5 flex items-center justify-center text-white font-bold shadow-md
                ${activeLessonId <= 2 ? 'bg-[#fb9610]' : 'bg-[#022d62]'}
           `}>
                <button onClick={() => setActiveLessonId(null)} className="absolute left-4 p-2 hover:scale-110 transition-transform">
                    <ArrowLeft size={28} strokeWidth={3} />
                </button>
               <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Level {activeLessonId}</span>
                    <h2 className="text-2xl font-black font-outfit tracking-tight">
                        {CURRICULUM.find(l => l.id === activeLessonId)?.title}
                    </h2>
               </div>
           </div>
           
           <div className="flex-1 overflow-y-auto bg-white dark:bg-[#011627]">
                <div className="max-w-xl mx-auto h-full px-6 py-12">
                    {renderLessonContent(CURRICULUM.find(l => l.id === activeLessonId)?.type || '')}
                </div>
           </div>
        </div>
      )}

      {/* Level Complete Modal */}
      {showSuccess && (
        <SessionSuccess 
            soundsMastered={8} 
            wordsBuilt={10} 
            streakDays={1} 
            onContinue={handleContinue}
            onExit={() => {
                setShowSuccess(false);
                setActiveLessonId(null);
            }} 
        />
      )}

    </div>
  );
};

export default LabSoundBoardPage;
