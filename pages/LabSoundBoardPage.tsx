import React, { useState } from 'react';
import { 
  Volume2, 
  ArrowLeft,
  ChevronRight,
  Music,
  Zap
} from 'lucide-react';
import { CURRICULUM_DATA } from '../data/curriculumData';
import { ElevenLabsService } from '../utils/ElevenLabsService';
import { getPhonemes } from '../utils/phoneticMap';

const PhonicGridItem: React.FC<{ grapheme: string, dark?: boolean }> = ({ grapheme, dark }) => (
  <button 
    onClick={() => ElevenLabsService.play(grapheme)}
    className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl transition-all active:scale-95 shadow-sm border-2 ${
      dark 
        ? 'bg-[#022d62] border-[#022d62] text-white' 
        : 'bg-white border-slate-100 text-[#022d62] hover:border-[#fb9610]'
    }`}
  >
    {dark ? <Volume2 size={20} /> : <span className="text-xl font-black">{grapheme}</span>}
  </button>
);

const WordGridItem: React.FC<{ word: string }> = ({ word }) => (
  <button 
    onClick={() => ElevenLabsService.playWithPhonemes(word)}
    className="aspect-[1.1/1] flex flex-col items-center justify-center gap-2 bg-white border-2 border-slate-100 rounded-2xl hover:border-[#fb9610] transition-all active:scale-95 hover:shadow-xl shadow-sm group relative"
  >
    <div className="flex gap-0.5">
      {word.split('').map((char, i) => (
        <span key={i} className="text-xl font-black text-[#022d62] group-hover:text-[#fb9610] tracking-tighter">{char}</span>
      ))}
    </div>
    <div className="w-8 h-8 bg-[#fb961010] text-[#fb9610] rounded-lg flex items-center justify-center group-hover:bg-[#fb9610] group-hover:text-white transition-all shadow-inner">
      <Volume2 size={16} strokeWidth={2.5} />
    </div>
  </button>
);

const WordSequenceView: React.FC<{ words: string[] }> = ({ words }) => {
  const [index, setIndex] = useState(0);
  const [activePhoneme, setActivePhoneme] = useState<number | null>(null);
  const word = words[index];
  const phonemes = getPhonemes(word);

  const playPhoneme = async (p: string, i: number) => {
    setActivePhoneme(i);
    await ElevenLabsService.play(p);
    setTimeout(() => setActivePhoneme(null), 500);
  };

  const handleBlend = async () => {
    // Reset index-based highlights during full blend if needed, 
    // but playWithPhonemes doesn't currently support external highlight sync easily.
    // For now we just play the blend.
    await ElevenLabsService.playWithPhonemes(word);
  };

  return (
    <div className="flex flex-col items-center gap-6 py-2 animate-fade-in-up">
      <div className="w-full aspect-[1.8/1] bg-white border-2 border-[#e7effc] rounded-[32px] shadow-xl flex flex-col items-center justify-center p-6 transition-all relative">
        <div className="flex flex-wrap justify-center gap-4 mb-4">
          {phonemes.map((p, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
                <button
                onClick={(e) => {
                    e.stopPropagation();
                    playPhoneme(p, i);
                }}
                className={`text-5xl font-black transition-all p-1 rounded-xl active:scale-90 ${activePhoneme === i ? 'text-[#fb9610] scale-110' : 'text-[#022d62] hover:text-[#fb9610]'}`}
                >
                {p.toLowerCase()}
                </button>
                <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activePhoneme === i ? 'bg-[#fb9610] scale-125 shadow-[0_0_10px_#fb9610]' : 'bg-slate-200'}`} />
            </div>
          ))}
        </div>
        
        <button 
          onClick={handleBlend}
          className="flex items-center gap-2 text-[#fb9610] font-bold text-sm px-5 py-2 bg-[#fb961010] rounded-full hover:bg-[#fb9610] hover:text-white transition-all active:scale-95"
        >
          <Volume2 size={18} /> Tap to blend
        </button>
      </div>

      <div className="flex items-center justify-between w-full mt-2 px-2">
        <button 
          onClick={() => { setIndex(i => Math.max(0, i - 1)); setActivePhoneme(null); }}
          disabled={index === 0}
          className={`p-3 rounded-2xl bg-white border-2 border-slate-100 text-[#022d62] transition-all ${index === 0 ? 'opacity-30' : 'active:scale-90 hover:border-[#fb9610]'}`}
        >
          <ArrowLeft size={24} />
        </button>
        <div className="text-slate-400 font-black text-sm">
          {index + 1} / {words.length}
        </div>
        <button 
          onClick={() => { setIndex(i => Math.min(words.length - 1, i + 1)); setActivePhoneme(null); }}
          disabled={index === words.length - 1}
          className={`p-3 rounded-2xl bg-[#022d62] text-white transition-all ${index === words.length - 1 ? 'opacity-30' : 'active:scale-90 shadow-lg'}`}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

const StageCard: React.FC<{ title: string, subtitle: string, onClick: () => void }> = ({ title, subtitle, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full py-4 px-6 bg-white rounded-3xl border-2 border-slate-100 flex items-center justify-between text-left group transition-all hover:border-[#fb9610] hover:shadow-2xl active:scale-95 mb-3"
  >
    <div>
      <h3 className="text-lg font-black text-[#022d62] leading-tight">{title}</h3>
      <p className="text-slate-400 font-bold text-xs tracking-tight">{subtitle}</p>
    </div>
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 group-hover:bg-[#fb9610] group-hover:text-white transition-all">
      <ChevronRight size={20} strokeWidth={3} />
    </div>
  </button>
);

const LabSoundBoardPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number | null>(null);
  const group1 = CURRICULUM_DATA.find(g => g.id === 1)!;

  const STAGES = [
    { id: 1, title: "Listen to Sounds", subtitle: "Listen carefully" },
    { id: 2, title: "Letters & Sounds", subtitle: "See the letters" },
    { id: 3, title: "Two Letters", subtitle: "Start blending" },
    { id: 4, title: "Three Letters", subtitle: "Blend three letters" },
    { id: 5, title: "Four Letters", subtitle: "Blend four letters" }
  ];

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="animate-fade-in-up">
            <p className="text-slate-500 font-bold mb-5 px-1 text-sm">Tap buttons to hear sounds!</p>
            <div className="grid grid-cols-5 gap-3">
              {group1.data?.map(item => (
                <PhonicGridItem key={item.grapheme} grapheme={item.grapheme} dark />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in-up">
            <p className="text-slate-500 font-bold mb-5 px-1 text-sm">Look and say the sounds.</p>
            <div className="grid grid-cols-5 gap-3">
              {group1.data?.map(item => (
                <PhonicGridItem key={item.grapheme} grapheme={item.grapheme} />
              ))}
            </div>
          </div>
        );
      case 3:
        return <WordSequenceView words={group1.blend2 || []} />;
      case 4:
        return <WordSequenceView words={group1.blend3 || []} />;
      case 5:
        return <WordSequenceView words={group1.blend4 || []} />;
      default:
        return null;
    }
  };

  if (currentStage !== null) {
    const stageInfo = STAGES.find(s => s.id === currentStage)!;
    return (
      <div className="max-w-md mx-auto px-4 py-8 pb-32 font-outfit">
        <header className="mb-8 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-black text-[#022d62] mb-0.5">{stageInfo.title}</h1>
                <div className="h-1.5 w-12 bg-[#fb9610] rounded-full" />
            </div>
            <button 
                onClick={() => setCurrentStage(null)}
                className="flex flex-col items-center gap-0.5 group"
            >
                <div className="w-10 h-10 rounded-xl bg-[#fb961015] text-[#fb9610] flex items-center justify-center transition-all group-hover:bg-[#fb9610] group-hover:text-white shadow-sm border-2 border-transparent group-hover:border-[#fb9610]">
                    <ArrowLeft size={20} strokeWidth={3} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-tighter text-[#fb9610]">Back</span>
            </button>
        </header>

        {renderStageContent()}
        
        <div className="h-10" />
      </div>
    );
  }


  return (
    <div className="max-w-md mx-auto px-4 py-8 pb-32 font-outfit">
      <header className="mb-10 text-center">
          <span className="bg-[#fb961015] text-[#fb9610] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
              Foundation Level
          </span>
          <h1 className="text-4xl font-black mt-3 text-[#022d62]">Learn to Read</h1>
          <p className="text-slate-400 font-bold mt-3 px-6 text-sm leading-relaxed">Follow the path to master your first 6 sounds!</p>
      </header>

      <div className="space-y-2">
        {STAGES.map(stage => (
          <StageCard 
            key={stage.id}
            title={stage.title}
            subtitle={stage.subtitle}
            onClick={() => setCurrentStage(stage.id)}
          />
        ))}
      </div>

      <div className="h-10" />
    </div>
  );
};

export default LabSoundBoardPage;

