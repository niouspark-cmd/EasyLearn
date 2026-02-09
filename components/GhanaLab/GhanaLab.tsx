import React, { useState } from 'react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';
import { ArrowLeft, Play, Volume2, Info } from 'lucide-react';

interface ConfusionPair {
  id: string;
  label: string;
  pair1: { word: string; icon?: string }; // e.g. "Glass"
  pair2: { word: string; icon?: string }; // e.g. "Grass"
  tip: string; // "Keep tongue behind teeth"
}

const DATA_SETS: Record<string, ConfusionPair[]> = {
  'l_r': [
    { id: '1', label: 'Glass vs Grass', pair1: { word: 'glass' }, pair2: { word: 'grass' }, tip: 'L: Tongue touches roof of mouth. R: Tongue curls back.' },
    { id: '2', label: 'Light vs Right', pair1: { word: 'light' }, pair2: { word: 'right' }, tip: 'L: Tip up. R: Tip curl.' },
    { id: '3', label: 'Fly vs Fry', pair1: { word: 'fly' }, pair2: { word: 'fry' }, tip: 'L: Air flows sides. R: Growl sound.' },
  ],
  'v_b': [
    { id: '1', label: 'Van vs Ban', pair1: { word: 'van' }, pair2: { word: 'ban' }, tip: 'V: Top teeth on bottom lip. B: Lips together.' },
    { id: '2', label: 'Vest vs Best', pair1: { word: 'vest' }, pair2: { word: 'best' }, tip: 'V: Buzzing sound. B: Pop sound.' },
  ],
  'th_d': [
    { id: '1', label: 'There vs Dare', pair1: { word: 'there' }, pair2: { word: 'dare' }, tip: 'TH: Tongue between teeth. D: Tongue inside.' },
    { id: '2', label: 'Thin vs Tin', pair1: { word: 'thin' }, pair2: { word: 'tin' }, tip: 'TH: Blow air through teeth. T: Tap roof.' },
  ],
  'short_long': [
    { id: '1', label: 'Ship vs Sheep', pair1: { word: 'ship' }, pair2: { word: 'sheep' }, tip: 'Ship: Short /ɪ/. Sheep: Long /i:/ smile.' },
    { id: '2', label: 'Fit vs Feet', pair1: { word: 'fit' }, pair2: { word: 'feet' }, tip: 'Fit: Quick. Feet: Stretch it out.' },
  ]
};

const CATEGORIES = [
  { id: 'l_r', title: 'L vs R Confusion', desc: 'Light / Right, Glass / Grass' },
  { id: 'v_b', title: 'V vs B / F vs P', desc: 'Van / Ban, Fan / Pan' },
  { id: 'th_d', title: 'The "TH" Sound', desc: 'There / Dare, Three / Tree' },
  { id: 'short_long', title: 'Vowel Lengths', desc: 'Ship / Sheep, Fit / Feet' },
];

const GhanaLab: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeDrillIndex, setActiveDrillIndex] = useState(0);

  const handlePlay = async (text: string) => {
    try {
        await ElevenLabsService.play(text);
    } catch (e) {
        console.error("GhanaLab play failed", e);
    }
  };

  const renderMenu = () => (
    <div className="grid gap-4 max-w-md mx-auto">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.id}
          onClick={() => { setActiveCategory(cat.id); setActiveDrillIndex(0); }}
          className="flex flex-col items-start p-6 bg-white rounded-2xl border border-[#022d62]/10 shadow-sm hover:border-[#fb9610] hover:shadow-md transition-all text-left group"
        >
          <h3 className="text-xl font-black text-[#022d62] mb-1 group-hover:text-[#fb9610] transition-colors">{cat.title}</h3>
          <p className="text-[#022d62]/60 font-medium">{cat.desc}</p>
        </button>
      ))}
    </div>
  );

  const renderDrill = () => {
    if (!activeCategory) return null;
    const drills = DATA_SETS[activeCategory];
    const drill = drills[activeDrillIndex];

    return (
      <div className="max-w-2xl mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => setActiveCategory(null)}
            className="p-3 bg-[#e7effc] rounded-xl hover:bg-white transition-colors border border-[#022d62]/10"
          >
            <ArrowLeft size={24} className="text-[#022d62]" />
          </button>
          
          <div className="flex-1">
            <h2 className="text-2xl font-black text-[#022d62]">{CATEGORIES.find(c => c.id === activeCategory)?.title}</h2>
            <p className="text-[#022d62]/40 font-bold uppercase tracking-widest text-xs">Pair {activeDrillIndex + 1} of {drills.length}</p>
          </div>
        </div>

        {/* Minimal Pair Cards */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 mb-8">
            {/* Left Card - Navy */}
            <button 
                onClick={() => handlePlay(drill.pair1.word)}
                className="aspect-square bg-[#022d62] rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform active:scale-95 group"
            >
                <Volume2 size={32} className="text-white opacity-40 mb-4 group-active:opacity-100" />
                <span className="text-3xl sm:text-4xl font-black text-white font-lexend capitalize tracking-wide">{drill.pair1.word}</span>
            </button>

            {/* Right Card - Orange */}
            <button 
                onClick={() => handlePlay(drill.pair2.word)}
                className="aspect-square bg-[#fb9610] rounded-[2.5rem] shadow-xl flex flex-col items-center justify-center p-4 hover:scale-105 transition-transform active:scale-95 group"
            >
                <Volume2 size={32} className="text-white opacity-40 mb-4 group-active:opacity-100" />
                <span className="text-3xl sm:text-4xl font-black text-white font-lexend capitalize tracking-wide">{drill.pair2.word}</span>
            </button>
        </div>

        {/* Tip / Visual Cue */}
        <div className="bg-[#e7effc] border border-[#022d62]/10 rounded-2xl p-6 flex gap-4 items-start mb-8">
            <div className="bg-white rounded-full p-2 mt-1 shadow-sm">
                <Info size={20} className="text-[#fb9610]" />
            </div>
            <div>
                <h4 className="font-black text-[#022d62] mb-1">Mouth Position Tip</h4>
                <p className="text-[#022d62]/70 font-medium leading-relaxed">{drill.tip}</p>
            </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between gap-4">
             <button
                disabled={activeDrillIndex === 0}
                onClick={() => setActiveDrillIndex(cur => cur - 1)}
                className="flex-1 py-4 rounded-xl font-black bg-[#e7effc] text-[#022d62] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-white transition-all shadow-sm"
             >
                Previous Pair
             </button>
             <button
                disabled={activeDrillIndex === drills.length - 1}
                onClick={() => setActiveDrillIndex(cur => cur + 1)}
                className="flex-1 py-4 rounded-xl font-black bg-[#022d62] text-white disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 transition-all shadow-lg"
             >
                Next Pair
             </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!activeCategory ? (
        <div className="animate-fade-in-up">
            <div className="max-w-none mb-8 text-center">
                 <h3 className="text-3xl font-black text-[#022d62] mb-2 font-outfit">Ghana Lab</h3>
                 <p className="text-[#022d62]/50 font-medium font-lexend">Master common tricky sounds. Select a challenge to begin.</p>
            </div>
            {renderMenu()}
        </div>
      ) : (
        renderDrill()
      )}
    </div>
  );
};

export default GhanaLab;
