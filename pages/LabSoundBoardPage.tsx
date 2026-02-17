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

const PhonicGridItem: React.FC<{ grapheme: string, dark?: boolean }> = ({ grapheme, dark }) => (
  <button 
    onClick={() => ElevenLabsService.play(grapheme)}
    className={`aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl transition-all active:scale-95 shadow-sm border-2 ${
      dark 
        ? 'bg-[#022d62] border-[#022d62] text-white' 
        : 'bg-white border-slate-100 text-[#022d62] hover:border-[#fb9610]'
    }`}
  >
    {dark ? <Volume2 size={24} /> : <span className="text-2xl font-black">{grapheme}</span>}
  </button>
);

const WordGridItem: React.FC<{ word: string }> = ({ word }) => (
  <button 
    onClick={() => ElevenLabsService.play(word)}
    className="aspect-[1.2/1] flex flex-col items-center justify-center gap-3 bg-white border-2 border-slate-100 rounded-[2rem] hover:border-[#fb9610] transition-all active:scale-95 hover:shadow-xl shadow-sm group relative"
  >
    <div className="flex gap-1">
      {word.split('').map((char, i) => (
        <span key={i} className="text-3xl font-black text-[#022d62] group-hover:text-[#fb9610] tracking-tighter">{char}</span>
      ))}
    </div>
    <div className="w-10 h-10 bg-[#fb961010] text-[#fb9610] rounded-xl flex items-center justify-center group-hover:bg-[#fb9610] group-hover:text-white transition-all shadow-inner">
      <Volume2 size={20} strokeWidth={2.5} />
    </div>
  </button>
);

const StageCard: React.FC<{ id: number, title: string, subtitle: string, onClick: () => void }> = ({ id, title, subtitle, onClick }) => (
  <button 
    onClick={onClick}
    className="w-full p-6 bg-white rounded-[2rem] border-2 border-slate-100 flex items-center justify-between text-left group transition-all hover:border-[#fb9610] hover:shadow-2xl active:scale-95 mb-3"
  >
    <div className="flex items-center gap-5">
      <div className="w-14 h-14 rounded-2xl bg-[#fb961015] text-[#fb9610] flex items-center justify-center text-2xl font-black italic">
        {id}
      </div>
      <div>
        <h3 className="text-xl font-black text-[#022d62] leading-tight">{title}</h3>
        <p className="text-slate-400 font-bold text-sm tracking-tight">{subtitle}</p>
      </div>
    </div>
    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-300 group-hover:bg-[#fb9610] group-hover:text-white transition-all">
      <ChevronRight size={24} strokeWidth={3} />
    </div>
  </button>
);

const LabSoundBoardPage: React.FC = () => {
  const [currentStage, setCurrentStage] = useState<number | null>(null);
  const group1 = CURRICULUM_DATA.find(g => g.id === 1)!;

  const STAGES = [
    { id: 1, title: "1. listen to Sounds", subtitle: "Listen carefully" },
    { id: 2, title: "2. Letters & Sounds", subtitle: "See the letters" },
    { id: 3, title: "3. Two Letters", subtitle: "Start blending" },
    { id: 4, title: "4. Three Letters", subtitle: "Blend three letters" },
    { id: 5, title: "5. Four Letters", subtitle: "Blend four letters" }
  ];

  const renderStageContent = () => {
    switch (currentStage) {
      case 1:
        return (
          <div className="animate-fade-in-up">
            <p className="text-slate-500 font-bold mb-6 px-2 text-base">Tap buttons to hear sounds!</p>
            <div className="grid grid-cols-3 gap-3">
              {group1.data?.map(item => (
                <PhonicGridItem key={item.grapheme} grapheme={item.grapheme} dark />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="animate-fade-in-up">
            <p className="text-slate-500 font-bold mb-6 px-2 text-base">Look and say the sounds.</p>
            <div className="grid grid-cols-3 gap-3">
              {group1.data?.map(item => (
                <PhonicGridItem key={item.grapheme} grapheme={item.grapheme} />
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="animate-fade-in-up grid grid-cols-2 gap-4">
            {group1.blend2?.map(word => <WordGridItem key={word} word={word} />)}
          </div>
        );
      case 4:
        return (
          <div className="animate-fade-in-up grid grid-cols-2 gap-4">
            {group1.blend3?.map(word => <WordGridItem key={word} word={word} />)}
          </div>
        );
      case 5:
        return (
          <div className="animate-fade-in-up grid grid-cols-2 gap-4">
            {group1.blend4?.map(word => <WordGridItem key={word} word={word} />)}
          </div>
        );
      default:
        return null;
    }
  };

  if (currentStage !== null) {
    const stageInfo = STAGES.find(s => s.id === currentStage)!;
    return (
      <div className="max-w-xl mx-auto px-6 py-8 pb-32 font-outfit">
        <header className="mb-10 flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-black text-[#022d62] mb-1">{stageInfo.title}</h1>
                <div className="h-2 w-16 bg-[#fb9610] rounded-full" />
            </div>
            <button 
                onClick={() => setCurrentStage(null)}
                className="flex flex-col items-center gap-1 group"
            >
                <div className="w-14 h-14 rounded-2xl bg-[#fb961015] text-[#fb9610] flex items-center justify-center transition-all group-hover:bg-[#fb9610] group-hover:text-white shadow-sm border-2 border-transparent group-hover:border-[#fb9610]">
                    <ArrowLeft size={28} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-[#fb9610]">Back</span>
            </button>
        </header>

        {renderStageContent()}
        
        <div className="h-10" />
      </div>
    );
  }


  return (
    <div className="max-w-xl mx-auto px-4 py-8 pb-32 font-outfit">
      <header className="mb-12 text-center">
          <span className="bg-[#fb961015] text-[#fb9610] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
              Foundation Level
          </span>
          <h1 className="text-5xl font-black mt-3 text-[#022d62]">Learn to Read</h1>
          <p className="text-slate-400 font-bold mt-4 px-8 leading-relaxed">Follow the path to master your first 6 sounds!</p>
      </header>

      <div className="space-y-2">
        {STAGES.map(stage => (
          <StageCard 
            key={stage.id}
            id={stage.id}
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

