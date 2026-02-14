
import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Layout,
  Music
} from 'lucide-react';
import SatpinLesson from '../components/SoundBoard/SatpinLesson';
import PhonicLesson from '../components/SmartLesson/PhonicLesson';
import MagicELesson from '../components/SmartLesson/MagicELesson';
import TrickyWordsLesson from '../components/SmartLesson/TrickyWordsLesson';
import ElkoninBox, { PhonemeSegment } from '../components/Mapping/ElkoninBox';
import WordBuilder from '../components/BuildWord/WordBuilder';
import SentenceBuilder from '../components/SentenceBuilder/SentenceBuilder';
import SectionCompletionScreen from '../components/Feedback/SectionCompletionScreen';
import FoundationLessonComplete from '../components/Feedback/FoundationLessonComplete';
import { CURRICULUM_DATA } from '../data/curriculumData';

// Re-defining blending words locally or importing them (keeping local for now as in original)
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

// Combine standard phonics curriculum with interactive/activity modules
const FULL_CURRICULUM = [
    // Level 1: SATPIN
    { ...CURRICULUM_DATA[0], subtitle: 'The sounds s, a, t, p, i, n', icon: <Music /> },
    
    // Level 2: CVC
    { ...CURRICULUM_DATA[1], subtitle: 'Complete alphabet sounds', icon: <BookOpen /> },
    
    // Activity: Blend 2
    { id: 101, title: 'Activity: Blend 2 Letters', type: 'blend2', subtitle: 'Practice vowel + consonant', color: '#10b981', icon: <Zap /> },
    
    // Activity: Blend 3
    { id: 102, title: 'Activity: Blend 3 Letters', type: 'blend3', subtitle: 'Read CVC words', color: '#10b981', icon: <Zap /> },
    
    // Level 3: Digraphs
    { ...CURRICULUM_DATA[2], subtitle: 'sh, ch, th, ng, qu', icon: <BookOpen /> },
    
    // Activity: Blend 4 (Review)
    { id: 103, title: 'Activity: Blend 4 Letters', type: 'blend4', subtitle: 'Practice blends & digraphs', color: '#10b981', icon: <Zap /> },
    
    // Level 4: Vowel Teams
    { ...CURRICULUM_DATA[3], icon: <BookOpen /> },
    
    // Level 5: Other Sounds
    { ...CURRICULUM_DATA[4], icon: <BookOpen /> },
    
    // Level 6: Magic E
    { ...CURRICULUM_DATA[5], icon: <Sparkles /> },
    
    // Level 7: Tricky Words
    { ...CURRICULUM_DATA[6], icon: <Eye /> },
    
    // Tools
    { id: 104, title: 'Word Workshop', type: 'practice', subtitle: 'Build any word you want', color: '#f59e0b', icon: <Hammer /> },
    { id: 105, title: 'Make Sentences', type: 'sentences', subtitle: 'Create full sentences', color: '#8b5cf6', icon: <Layout /> },
];

const PagedElkoninLesson: React.FC<{ 
    words: { word: string, segments: PhonemeSegment[] }[],
    onComplete: (stats: { totalQuestions: number, correctAnswers: number }) => void 
}> = ({ words, onComplete }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctCount, setCorrectCount] = useState(0);
    
    // Safety check
    if (currentIndex >= words.length && words.length > 0) {
        setCurrentIndex(0);
    }
    
    useEffect(() => {
        setCurrentIndex(0);
        setCorrectCount(0);
    }, [words]);

    const currentItem = words[currentIndex] || words[0] || { word: '', segments: [] };

    const handleNext = () => {
        const isCorrect = Math.random() > 0.2; 
        if (isCorrect) setCorrectCount(prev => prev + 1);
        
        if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            onComplete({
                totalQuestions: words.length,
                correctAnswers: correctCount + (isCorrect ? 1 : 0)
            });
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
    };

    return (
        <div className="h-full flex flex-col items-center animate-fade-in">
            <div className="mb-4 text-[#fb9610] font-black text-3xl font-outfit">
                {currentIndex + 1} of {words.length}
            </div>
            <p className="mb-8 text-slate-300 font-bold uppercase tracking-widest text-[10px]">Swipe to change words</p>

            <div className="flex-1 w-full flex items-center justify-center min-h-[400px]">
                {currentItem && currentItem.word ? (
                    <div className="animate-slide-in-right w-full">
                        <ElkoninBox key={currentItem.word} word={currentItem.word} segments={currentItem.segments} />
                    </div>
                ) : (
                    <div className="text-slate-400">Loading...</div>
                )}
            </div>

            <div className="mt-8 flex gap-4 justify-center">
                <button onClick={handlePrev} disabled={currentIndex === 0}
                    className={`px-6 py-4 rounded-2xl font-black text-lg flex items-center gap-2 transition-all ${currentIndex > 0 ? 'bg-white text-[#022d62] border-4 border-[#022d62]' : 'bg-gray-200 text-gray-400'}`}>
                    ← Previous
                </button>
                <button onClick={handleNext}
                    className={`px-6 py-4 rounded-2xl font-black text-lg flex items-center gap-2 transition-all ${currentIndex < words.length - 1 ? 'bg-[#fb9610] text-white border-4 border-orange-700' : 'bg-emerald-500 text-white border-4 border-emerald-700'}`}>
                    {currentIndex === words.length - 1 ? 'Finish! 🎉' : 'Next →'}
                </button>
            </div>
        </div>
    );
};

const LabSoundBoardPage: React.FC = () => {
  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);
  const [showFoundationComplete, setShowFoundationComplete] = useState(false);
  const [showSectionComplete, setShowSectionComplete] = useState(false);
  const [sectionCompleteData, setSectionCompleteData] = useState({
    title: '',
    subtitle: '',
    nextSectionTitle: '',
    nextSectionIcon: undefined as React.ReactNode
  });
  const [foundationLessonData, setFoundationLessonData] = useState({
    lessonType: 'sounds' as 'sounds' | 'letters',
    masteredItems: [] as string[],
    totalItems: 0
  });

  const handleLevelComplete = (stats?: { totalQuestions: number, correctAnswers: number }, foundationData?: { lessonType: 'sounds' | 'letters', masteredItems: string[], totalItems: number }) => {
    const celebrateAudio = new Audio('https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3');
    celebrateAudio.play().catch(() => {});

    if (foundationData) {
       setFoundationLessonData(foundationData);
       setShowFoundationComplete(true);
       return;
    }

    if (activeLessonId === 101) {
        setSectionCompleteData({ title: "Great Job! 🌟", subtitle: "You mastered 2-letter words!", nextSectionTitle: "Blend 3 Letters", nextSectionIcon: <Zap size={32} /> });
        setShowSectionComplete(true);
    } else if (activeLessonId === 102) {
        setSectionCompleteData({ title: "Super Reader! 🚀", subtitle: "3-letter words are easy for you!", nextSectionTitle: "Digraphs", nextSectionIcon: <BookOpen size={32} /> });
        setShowSectionComplete(true);
    } else if (activeLessonId === 103) {
        setSectionCompleteData({ title: "Blending Mastered! 🌪️", subtitle: "You are a blending pro!", nextSectionTitle: "Word Workshop", nextSectionIcon: <Hammer size={32} /> });
        setShowSectionComplete(true);
    } else if (activeLessonId === 104) {
        setSectionCompleteData({ title: "Word Wizard! 🧙‍♂️", subtitle: "Ready to make sentences?", nextSectionTitle: "Make Sentences", nextSectionIcon: <Layout size={32} /> });
        setShowSectionComplete(true);
    } else {
        const currentIdx = FULL_CURRICULUM.findIndex(l => l.id === activeLessonId);
        const nextLevel = FULL_CURRICULUM[currentIdx + 1];
        
        if (nextLevel) {
             setSectionCompleteData({ 
                 title: "Level Complete! 🏆", 
                 subtitle: "You've unlocked the next level!", 
                 nextSectionTitle: nextLevel.title, 
                 nextSectionIcon: React.isValidElement(nextLevel.icon) ? nextLevel.icon : <Star size={32} /> 
             });
             setShowSectionComplete(true);
        } else {
             setSectionCompleteData({ 
                 title: "Course Complete! 🎓", 
                 subtitle: "You've finished everything! You are a reading superstar!", 
                 nextSectionTitle: "Dashboard", 
                 nextSectionIcon: <Star size={32} /> 
             });
             setShowSectionComplete(true);
        }
    }
  };

  const handleContinue = () => {
    setShowFoundationComplete(false);
    setShowSectionComplete(false);
    
    const currentIdx = FULL_CURRICULUM.findIndex(l => l.id === activeLessonId);
    if (currentIdx !== -1 && currentIdx < FULL_CURRICULUM.length - 1) {
        setActiveLessonId(FULL_CURRICULUM[currentIdx + 1].id);
    } else {
        setActiveLessonId(null);
    }
  };

  const handleGoHome = () => {
    setShowFoundationComplete(false);
    setShowSectionComplete(false);
    setActiveLessonId(null);
  };
  
  const handleTryAgain = () => {
    setShowFoundationComplete(false);
    setShowSectionComplete(false);
  };

  const renderLessonContent = (lessonId: number) => {
      const lessonItem = FULL_CURRICULUM.find(l => l.id === lessonId);
      if (!lessonItem) return null;

      // Handle custom activity types first
      if (lessonItem.type === 'blend2') return <PagedElkoninLesson words={BLEND_2_WORDS} onComplete={handleLevelComplete} />;
      if (lessonItem.type === 'blend3') return <PagedElkoninLesson words={BLEND_3_WORDS} onComplete={handleLevelComplete} />;
      if (lessonItem.type === 'blend4') return <PagedElkoninLesson words={BLEND_4_WORDS} onComplete={handleLevelComplete} />;
      if (lessonItem.type === 'practice') return <WordBuilder />;
      if (lessonItem.type === 'sentences') {
          const previousWords = [...BLEND_2_WORDS, ...BLEND_3_WORDS, ...BLEND_4_WORDS].map(w => w.word).slice(0, 8);
          return <SentenceBuilder onComplete={() => handleLevelComplete()} givenWords={previousWords} />;
      }

      // Handle Data-Driven Phonics Types
      if (lessonItem.type === 'phonic') {
          return <PhonicLesson lessonId={lessonId} title={lessonItem.title} data={lessonItem.data as any} onComplete={handleLevelComplete} onBack={handleGoHome} />;
      }
      if (lessonItem.type === 'magic-e') {
          const magicPairs = [
              { short: 'hop', long: 'hope', vowel: 'o' },
              { short: 'kit', long: 'kite', vowel: 'i' },
              { short: 'can', long: 'cane', vowel: 'a' },
              { short: 'cub', long: 'cube', vowel: 'u' },
              { short: 'pet', long: 'pete', vowel: 'e' }
          ];
          return <MagicELesson data={magicPairs} onComplete={handleLevelComplete} onBack={handleGoHome} />;
      }
      if (lessonItem.type === 'tricky-words') {
          // Flatten standard data to match TrickyWordsLessonProps
          return <TrickyWordsLesson data={lessonItem.data as any} onComplete={handleLevelComplete} onBack={handleGoHome} />;
      }

      return <div>Unknown Lesson Type</div>;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#011627] text-[#022d62] dark:text-white transition-colors duration-300 font-outfit overflow-x-hidden">
      
      {!activeLessonId ? (
          <div className="animate-fade-in">
            {/* Premium App Bar */}
            <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#011627]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#022d62] rounded-xl flex items-center justify-center shadow-lg transform -rotate-6">
                        <span className="text-white font-black text-xl">A</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-[#022d62] dark:text-white leading-none">Adesua</h1>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Reading Path</p>
                    </div>
                </div>
                <div className="bg-[#fb9610]/10 px-3 py-1 rounded-full flex items-center gap-2">
                    <Star size={14} className="text-[#fb9610] fill-[#fb9610]" />
                    <span className="text-xs font-black text-[#fb9610]">JOURNEY</span>
                </div>
            </header>

            {/* Path Progress Overview */}
            <div className="px-6 py-8 bg-white dark:bg-[#011627] border-b border-slate-50 dark:border-slate-800">
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4">Your Progress</p>
                <div className="flex gap-2">
                    {FULL_CURRICULUM.slice(0, 5).map((_, i) => (
                        <div key={i} className={`h-2 flex-1 rounded-full ${i === 0 ? 'bg-[#fb9610]' : 'bg-slate-100 dark:bg-slate-800'}`} />
                    ))}
                </div>
            </div>

            {/* Learning Path - Grid Layout */}
            <div className="px-4 py-8 max-w-2xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {FULL_CURRICULUM.map((lesson, index) => (
                        <button 
                            key={lesson.id}
                            onClick={() => setActiveLessonId(lesson.id)}
                            className={`
                                relative p-6 rounded-[2rem] text-left transition-all duration-300 active:scale-95 group overflow-hidden
                                border-2 hover:shadow-xl hover:-translate-y-1
                                ${index === 0 
                                    ? 'bg-white border-[#fb9610]/20 dark:bg-slate-800' 
                                    : 'bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-800'
                                }
                            `}
                        >
                            {/* Accent Background Shape */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-5 group-hover:opacity-10 transition-opacity" style={{ backgroundColor: lesson.color || '#64748b' }} />

                            <div className="relative z-10">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 duration-500`} 
                                         style={{ backgroundColor: lesson.color || '#64748b' }}>
                                        {React.isValidElement(lesson.icon) ? lesson.icon : <Star />}
                                    </div>
                                    {index === 0 && (
                                        <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                                            Current
                                        </div>
                                    )}
                                </div>
                                
                                <h3 className="font-black text-xl text-[#022d62] dark:text-white leading-tight mb-2 pr-4">{lesson.title}</h3>
                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wide line-clamp-2">{lesson.subtitle}</p>
                                
                                <div className="mt-6 flex items-center justify-between">
                                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Level {index + 1}</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 group-hover:bg-[#022d62] group-hover:text-white transition-all transform group-hover:translate-x-1">
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Bottom Safe Area */}
            <div className="h-20" />
          </div>
      ) : (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#011627] flex flex-col animate-slide-up">
           {/* Lesson Header - Clean & Simple */}
           <div className="px-6 py-4 flex items-center justify-between bg-white dark:bg-[#011627] border-b border-slate-100 dark:border-slate-800">
                <button 
                    onClick={() => setActiveLessonId(null)} 
                    className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                
                <div className="text-center">
                    <p className="text-[10px] font-black text-[#fb9610] uppercase tracking-widest mb-1">
                        {FULL_CURRICULUM.find(l => l.id === activeLessonId)?.type?.toUpperCase()}
                    </p>
                    <h2 className="text-sm font-black text-[#022d62] dark:text-white truncate max-w-[200px]">
                        {FULL_CURRICULUM.find(l => l.id === activeLessonId)?.title}
                    </h2>
                </div>
                
                <div className="w-10 h-10 flex items-center justify-center">
                    <Star size={20} className="text-[#fb9610]/20" />
                </div>
           </div>
           
           <div className="flex-1 overflow-y-auto bg-white dark:bg-[#011627] scrollbar-hide scroll-smooth">
                <div className="max-w-xl mx-auto min-h-full px-6 py-8 flex flex-col pb-32">
                    {renderLessonContent(activeLessonId)}
                </div>
           </div>
        </div>
      )}

      {showFoundationComplete && (
        <FoundationLessonComplete
          lessonType={foundationLessonData.lessonType}
          masteredItems={foundationLessonData.masteredItems}
          totalItems={foundationLessonData.totalItems}
          onNext={handleContinue}
          onTryAgain={handleTryAgain}
          onHome={handleGoHome}
        />
      )}

      {showSectionComplete && (
        <SectionCompletionScreen
            title={sectionCompleteData.title}
            subtitle={sectionCompleteData.subtitle}
            nextSectionTitle={sectionCompleteData.nextSectionTitle}
            nextSectionIcon={sectionCompleteData.nextSectionIcon}
            onContinue={handleContinue}
            onHome={handleGoHome}
        />
      )}

    </div>
  );
};

export default LabSoundBoardPage;
