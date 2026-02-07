import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import SoundTile from '../components/SoundBoard/SoundTile';
import RecordBar from '../components/SoundBoard/RecordBar';
import ElkoninBox, { PhonemeSegment } from '../components/Mapping/ElkoninBox';
import WordBuilder from '../components/BuildWord/WordBuilder';
import TextHighlighter from '../components/Fluency/TextHighlighter';
import GhanaLab from '../components/GhanaLab/GhanaLab';

// Mock data for initial Sound Board
const PHONEMES = [
  { g: 'a', p: '/æ/', c: 'bg-blue-500' },
  { g: 's', p: '/s/', c: 'bg-indigo-500' },
  { g: 't', p: '/t/', c: 'bg-indigo-500' },
  { g: 'p', p: '/p/', c: 'bg-indigo-500' },
  { g: 'i', p: '/ɪ/', c: 'bg-blue-500' },
  { g: 'n', p: '/n/', c: 'bg-indigo-500' },
  { g: 'm', p: '/m/', c: 'bg-indigo-500' },
  { g: 'd', p: '/d/', c: 'bg-indigo-500' },
  { g: 'g', p: '/g/', c: 'bg-indigo-500' },
  { g: 'o', p: '/ɒ/', c: 'bg-blue-500' },
  { g: 'c', p: '/k/', c: 'bg-indigo-500' },
  { g: 'k', p: '/k/', c: 'bg-indigo-500' },
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

const LabSoundBoardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sounds' | 'mapping' | 'build' | 'fluency' | 'ghana'>('sounds');
  const [privacyMode, setPrivacyMode] = useState(false);

  return (
    <div className="pb-32">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 font-outfit">The Sound Lab</h1>
           <p className="text-slate-500 dark:text-slate-400 font-lexend">Master phonemes, word mapping, and reading.</p>
        </div>

        {/* Start Privacy Mode Toggle */}
        <button 
           onClick={() => setPrivacyMode(!privacyMode)}
           className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all border ${privacyMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
        >
            {privacyMode ? <EyeOff size={18} /> : <Eye size={18} />}
            {privacyMode ? 'Privacy On' : 'Privacy Off'}
        </button>
      </header>
      
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit mb-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('sounds')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'sounds' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Sound Board
          </button>
          <button 
            onClick={() => setActiveTab('mapping')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'mapping' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Word Mapping
          </button>
          <button 
            onClick={() => setActiveTab('build')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'build' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Build-a-Word
          </button>
          <button 
            onClick={() => setActiveTab('fluency')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'fluency' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Fluency Reader
          </button>
          <button 
            onClick={() => setActiveTab('ghana')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'ghana' ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
          >
            Sound Clinic
          </button>
      </div>

      {activeTab === 'sounds' && (
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {PHONEMES.map((item, index) => (
              <SoundTile 
                key={index} 
                grapheme={item.g} 
                phoneme={item.p} 
                color={item.c}
              />
            ))}
          </div>
          <RecordBar />
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
               privacyMode={privacyMode}
             />
             
             <TextHighlighter 
               title="The Friendly Cat" 
               text="The cat sat on the mat. It saw a rat. The rat ran away fast. The cat was sad." 
               privacyMode={privacyMode}
             />
           </div>
        </div>
      )}

      {activeTab === 'ghana' && (
        <GhanaLab />
      )}
    </div>
  );
};

export default LabSoundBoardPage;
