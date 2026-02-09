
import React, { useState } from 'react';
import { Eye, EyeOff, Trash2, CheckCircle } from 'lucide-react';
import SoundTile from '../components/SoundBoard/SoundTile';
import SatpinLesson from '../components/SoundBoard/SatpinLesson';

import ElkoninBox, { PhonemeSegment } from '../components/Mapping/ElkoninBox';
import WordBuilder from '../components/BuildWord/WordBuilder';
import TextHighlighter from '../components/Fluency/TextHighlighter';
import GhanaLab from '../components/GhanaLab/GhanaLab';

// Expanded Phonics Data - Full Alphabet + Digraphs
const PHONEMES = [
  // Row 1: Vowels & Common
  { g: 'a', p: '/æ/', c: 'bg-teal-600' },
  { g: 'b', p: '/b/', c: 'bg-indigo-600' },
  { g: 'c', p: '/k/', c: 'bg-indigo-600' },
  { g: 'd', p: '/d/', c: 'bg-indigo-600' },
  { g: 'e', p: '/e/', c: 'bg-teal-600' },
  { g: 'f', p: '/f/', c: 'bg-indigo-600' },
  
  // Row 2
  { g: 'g', p: '/g/', c: 'bg-indigo-600' },
  { g: 'h', p: '/h/', c: 'bg-indigo-600' },
  { g: 'i', p: '/ɪ/', c: 'bg-teal-600' },
  { g: 'j', p: '/dʒ/', c: 'bg-indigo-600' },
  { g: 'k', p: '/k/', c: 'bg-indigo-600' },
  { g: 'l', p: '/l/', c: 'bg-indigo-600' },

  // Row 3
  { g: 'm', p: '/m/', c: 'bg-indigo-600' },
  { g: 'n', p: '/n/', c: 'bg-indigo-600' },
  { g: 'o', p: '/ɒ/', c: 'bg-teal-600' },
  { g: 'p', p: '/p/', c: 'bg-indigo-600' },
  { g: 'q', p: '/kw/', c: 'bg-indigo-600' },
  { g: 'r', p: '/r/', c: 'bg-indigo-600' },

  // Row 4
  { g: 's', p: '/s/', c: 'bg-indigo-600' },
  { g: 't', p: '/t/', c: 'bg-indigo-600' },
  { g: 'u', p: '/ʌ/', c: 'bg-teal-600' },
  { g: 'v', p: '/v/', c: 'bg-indigo-600' },
  { g: 'w', p: '/w/', c: 'bg-indigo-600' },
  { g: 'x', p: '/ks/', c: 'bg-indigo-600' },

  // Row 5
  { g: 'y', p: '/y/', c: 'bg-teal-600' },
  { g: 'z', p: '/z/', c: 'bg-indigo-600' },
  { g: 'ch', p: '/tʃ/', c: 'bg-rose-600' }, // Digraphs distinctive color
  { g: 'sh', p: '/ʃ/', c: 'bg-rose-600' },
  { g: 'th', p: '/θ/', c: 'bg-rose-600' },
  { g: 'ng', p: '/ŋ/', c: 'bg-rose-600' },
  { g: 'ou', p: '/aʊ/', c: 'bg-amber-500' },
  { g: 'ow', p: '/aʊ/', c: 'bg-amber-500' },
  { g: 'oy', p: '/ɔɪ/', c: 'bg-amber-500' },
];

const MAPPING_WORDS = [
  {
    word: 'wish',
    segments: [
      { text: 'w', type: 'consonant' },
      { text: 'i', type: 'vowel' },
      { text: 'sh', type: 'digraph' },
    ] as PhonemeSegment[]
  },
  {
    word: 'chat',
    segments: [
      { text: 'ch', type: 'digraph' },
      { text: 'a', type: 'vowel' },
      { text: 't', type: 'consonant' },
    ] as PhonemeSegment[]
  },
  {
    word: 'tin',
    segments: [
      { text: 't', type: 'consonant' },
      { text: 'i', type: 'vowel' },
      { text: 'n', type: 'consonant' },
    ] as PhonemeSegment[]
  }
];

import SessionSuccess from '../components/Feedback/SessionSuccess';

const LabSoundBoardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sounds' | 'mapping' | 'build' | 'fluency' | 'ghana'>('sounds');
  const [phonicsStage, setPhonicsStage] = useState<'level1' | 'level2' | 'all'>('level1');
  const [privacyMode, setPrivacyMode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div className="pb-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-outfit">The Sound Lab</h1>
           <p className="text-slate-500 dark:text-slate-400 font-lexend">Master phonemes, word mapping, and reading.</p>
        </div>

        <div className="flex gap-2">
            <button 
               onClick={() => setShowSuccess(true)}
               className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border bg-teal-500 text-white border-teal-400 hover:bg-teal-400 shadow-md shadow-teal-500/20"
            >
                <CheckCircle size={18} />
                <span className="hidden sm:inline">Finish</span>
            </button>


        </div>
      </header>
      
      {/* Simplified Navigation */}
      <div className="flex justify-center mb-10">
          <nav className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm backdrop-blur-sm overflow-x-auto max-w-full">
              {[
                  { id: 'sounds', label: 'Sounds' },
                  { id: 'mapping', label: 'Mapping' },
                  { id: 'build', label: 'Builder' },
                  { id: 'fluency', label: 'Reader' },
                  { id: 'ghana', label: 'Clinic' }
              ].map((tab) => (
                  <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`
                          px-5 py-2.5 rounded-full text-sm font-bold transition-all whitespace-nowrap
                          ${activeTab === tab.id 
                            ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-md' 
                            : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300'
                          }
                      `}
                  >
                      {tab.label}
                  </button>
              ))}
          </nav>
      </div>

      {activeTab === 'sounds' && (
        <div className="animate-fade-in-up">
            
          {/* Level Selection */}
          <div className="flex justify-center mb-8">
              <div className="bg-white dark:bg-slate-800 p-1 rounded-xl inline-flex shadow-sm border border-slate-200 dark:border-slate-700">
                  <button 
                      onClick={() => setPhonicsStage('level1')}
                      className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${phonicsStage === 'level1' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}
                  >
                      Pure Sounds (SATPIN)
                  </button>
                  <button 
                      onClick={() => setPhonicsStage('level2')}
                      className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${phonicsStage === 'level2' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}
                  >
                      Sounds & Letters
                  </button>
                  <button 
                      onClick={() => setPhonicsStage('all')}
                      className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${phonicsStage === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 hover:text-indigo-600 dark:text-slate-400'}`}
                  >
                      Full Chart
                  </button>
              </div>
          </div>

          {phonicsStage === 'level1' ? (
              <SatpinLesson 
                stage="pure-sounds" 
                onComplete={() => setPhonicsStage('level2')} 
              />
          ) : phonicsStage === 'level2' ? (
              <SatpinLesson 
                stage="letters" 
                onComplete={() => setPhonicsStage('all')} 
                onBack={() => setPhonicsStage('level1')}
              />
          ) : (
            <>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {PHONEMES.map((item, index) => (
                    <SoundTile 
                        key={index} 
                        grapheme={item.g} 
                        phoneme={item.p} 
                        color={item.c}
                    />
                    ))}
                </div>
                <div className="mt-8 text-center text-slate-400 text-sm font-medium">
                    Explore all phonemes available in the system.
                </div>
            </>
          )}


        </div>
      )}

      {activeTab === 'mapping' && (
        <div className="space-y-8 animate-fade-in-up">
           <div className="prose dark:prose-invert max-w-none mb-6">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Mapping Engine</h3>
             <p className="text-slate-500">Tap specific boxes to hear individual phonemes, or the word button to hear it blended. Notice how digraphs (sh, ch) stay in one box.</p>
           </div>
           
           <div className="grid gap-8">
             {MAPPING_WORDS.map((item, i) => (
               <ElkoninBox 
                 key={i}
                 word={item.word}
                 segments={item.segments}
               />
             ))}
           </div>
        </div>
      )}

      {activeTab === 'build' && (
        <div className="animate-fade-in-up">
           <div className="prose dark:prose-invert max-w-none mb-6">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Build-a-Word Lab</h3>
             <p className="text-slate-500">Drag letters to the workbench. Try adding an 'e' at the end to see the magic happen!</p>
           </div>
           <WordBuilder />
        </div>
      )}

      {activeTab === 'fluency' && (
        <div className="animate-fade-in-up">
           <div className="prose dark:prose-invert max-w-none mb-6">
             <h3 className="text-xl font-bold text-slate-800 dark:text-white">Fluency Reader</h3>
             <p className="text-slate-500">Practice reading full sentences. Adjust speed to match your pace.</p>
           </div>
           
           <div className="grid gap-6">
             <TextHighlighter 
               title="Morning Routine" 
               text="Today is a great day to read. I can learn new words and sounds. Reading makes me smart and happy." 
             />
             
             <TextHighlighter 
               title="The Friendly Cat" 
               text="The cat sat on the mat. It saw a rat. The rat ran away fast. The cat was sad." 
             />
           </div>
        </div>
      )}

      {activeTab === 'ghana' && (
        <GhanaLab />
      )}

      {showSuccess && (
        <SessionSuccess 
          soundsMastered={12}
          wordsBuilt={5}
          streakDays={3}
          onContinue={() => setShowSuccess(false)}
          onExit={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
};

export default LabSoundBoardPage;
