import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { Trash2, Volume2 } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

type LetterCategory = 'vowel' | 'consonant';

const DraggableTile: React.FC<{ id: string, letter: string, category: LetterCategory }> = ({ id, letter, category }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { letter, category }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const bgColor = category === 'vowel' ? 'bg-[#fb9610]' : 'bg-[#022d62]';

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={`w-14 h-14 sm:w-16 sm:h-16 ${bgColor} text-white rounded-xl shadow-md flex items-center justify-center text-2xl font-black font-outfit cursor-grab active:cursor-grabbing touch-none border-b-4 border-black/20`}
    >
      {letter}
    </div>
  );
};

const WordSlot: React.FC<{ id: string, content: { id: string, letter: string, category: LetterCategory } | null, index: number, isMagicETarget: boolean }> = ({ id, content, index, isMagicETarget }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] border-2 flex items-center justify-center transition-all duration-500 shadow-inner ${
        isMagicETarget 
          ? 'bg-orange-50 border-[#fb9610] ring-4 ring-orange-500/10 scale-105 shadow-md' 
          : content ? 'bg-white border-[#022d62]/20 shadow-sm' : 'bg-[#e7effc]/20 border-dashed border-[#022d62]/10'
      }`}
    >
      {content ? (
        <div className={`w-full h-full ${content.category === 'vowel' ? 'bg-[#fb9610]' : 'bg-[#022d62]'} text-white rounded-xl flex items-center justify-center text-3xl font-black font-outfit animate-pop-in border-b-4 border-black/20`}>
          {content.letter}
        </div>
      ) : (
        <div className="flex flex-col items-center opacity-10">
            <span className="text-xl font-black">{index + 1}</span>
        </div>
      )}
    </div>
  );
};


const WordBuilder: React.FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [letters] = useState<{ id: string, letter: string, category: LetterCategory }[]>([
    { id: 'l1', letter: 'a', category: 'vowel' },
    { id: 'l2', letter: 'e', category: 'vowel' },
    { id: 'l3', letter: 'i', category: 'vowel' },
    { id: 'l4', letter: 'o', category: 'vowel' },
    { id: 'l5', letter: 'u', category: 'vowel' },
    { id: 'l10', letter: 's', category: 'consonant' },
    { id: 'l7', letter: 't', category: 'consonant' },
    { id: 'l8', letter: 'p', category: 'consonant' },
    { id: 'l9', letter: 'm', category: 'consonant' },
    { id: 'l6', letter: 'c', category: 'consonant' },
    { id: 'l11', letter: 'h', category: 'consonant' },
    { id: 'l12', letter: 'r', category: 'consonant' },
    { id: 'd1', letter: 'sh', category: 'consonant' },
    { id: 'd2', letter: 'ch', category: 'consonant' },
    { id: 'd7', letter: 'ee', category: 'vowel' },
  ]);

  const [slots, setSlots] = useState<( { id: string, letter: string, category: LetterCategory } | null )[]>([null, null, null, null]);
  const [magicVowelIndex, setMagicVowelIndex] = useState<number | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.data.current) {
        const data = active.data.current as { letter: string, category: LetterCategory };
        const slotIndex = parseInt(String(over.id).replace('slot-', ''));
        const newSlots = [...slots];
        const previousSlotIndex = slots.findIndex(s => s?.id === active.id);
        if (previousSlotIndex !== -1) newSlots[previousSlotIndex] = null;
        newSlots[slotIndex] = { id: active.id as string, letter: data.letter, category: data.category };
        setSlots(newSlots);
        checkMagicE(newSlots);
        ElevenLabsService.play(data.letter);
    }
  };

  const checkMagicE = (currentSlots: ( { id: string, letter: string, category: LetterCategory } | null )[]) => {
      const eIndex = currentSlots.findIndex(s => s?.letter === 'e');
      if (eIndex > 1) {
          const consonant = currentSlots[eIndex - 1];
          const vowel = currentSlots[eIndex - 2];
          if (consonant?.category === 'consonant' && vowel?.category === 'vowel') {
              setMagicVowelIndex(eIndex - 2);
              ElevenLabsService.play("Magic E makes the vowel say its name!");
              return;
          }
      }
      setMagicVowelIndex(null);
  };

  const playSound = async () => {
      const word = slots.map(s => s ? s.letter : '').join('');
      if (word.length > 0) {
          setIsPlaying(true);
          try {
              let speechText = word;
              const { GroqService } = await import('../../utils/GroqService');
              const phonetics = await GroqService.getPhoneticSegment(word);
              if (phonetics) speechText = phonetics;
              await ElevenLabsService.play(speechText);
          } catch (e) {
              console.error(e);
          } finally {
              setIsPlaying(false);
          }
      }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-10">
        
        {/* Workbench Area */}
        <div className="bg-white rounded-[4rem] p-10 shadow-2xl border-4 border-[#e7effc] relative">
            <div className="absolute top-6 right-6">
                <button onClick={() => setSlots([null, null, null, null])} className="p-4 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all shadow-sm">
                    <Trash2 size={24} />
                </button>
            </div>
            
            <p className="text-center text-[#fb9610] font-black mb-10 uppercase tracking-[0.3em] text-sm">Drag Letters Below</p>
            
            <div className="flex justify-center gap-4 mb-12 relative flex-wrap sm:flex-nowrap">
                {magicVowelIndex !== null && (
                     <div className="absolute -top-16 left-0 w-full h-16 pointer-events-none flex justify-center gap-4">
                        {slots.map((_, i) => (
                             <div key={i} className={`w-24 sm:w-32 h-0 flex justify-center relative`}>
                                 {i === magicVowelIndex && (
                                     <svg className="absolute top-0 left-1/2 w-[calc(200%+1rem)] sm:w-[calc(200%+2rem)] h-16 overflow-visible">
                                         <path d="M 1 40 Q 50 -20 100% 40" fill="none" stroke="#fb9610" strokeWidth="6" strokeDasharray="12 6" className="animate-dash" />
                                         <circle cx="1" cy="40" r="6" fill="#fb9610" />
                                         <circle cx="100%" cy="40" r="6" fill="#fb9610" />
                                     </svg>
                                 )}
                             </div>
                        ))}
                     </div>
                )}
                
                {slots.map((slot, i) => (
                    <WordSlot key={`slot-${i}`} id={`slot-${i}`} index={i} content={slot} isMagicETarget={i === magicVowelIndex} />
                ))}
            </div>

            {slots.some(s => s !== null) && (
                <div className="flex justify-center">
                    <button 
                        onClick={playSound} 
                        disabled={isPlaying}
                        className={`
                            flex items-center gap-4 px-12 py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl transition-all border-b-8
                            ${isPlaying 
                                ? 'bg-slate-100 text-slate-400 border-slate-200' 
                                : 'bg-[#022d62] text-white hover:bg-black active:translate-y-2 border-black'
                            }
                        `}
                    >
                        <Volume2 size={32} className={isPlaying ? 'animate-pulse' : ''} />
                        <span>{isPlaying ? 'Reading...' : 'Listen to My Word'}</span>
                    </button>
                </div>
            )}
        </div>

        {/* Letter Tray */}
        <div className="bg-[#e7effc]/30 rounded-[4rem] p-10 border-4 border-[#e7effc] shadow-inner">
            <h4 className="text-center text-[#022d62]/30 font-black uppercase tracking-widest text-xs mb-8">Your Letter Kit</h4>
            <div className="flex flex-wrap justify-center gap-6">
                {letters.map((l) => (
                    <DraggableTile key={l.id} id={l.id} letter={l.letter} category={l.category} />
                ))}
            </div>
        </div>
      </div>
    </DndContext>
  );
};

export default WordBuilder;
