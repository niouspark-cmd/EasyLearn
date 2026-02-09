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
      className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-2 flex items-center justify-center transition-all duration-500 shadow-inner flex-shrink-0 ${
        isMagicETarget 
          ? 'bg-orange-50 border-[#fb9610] ring-2 ring-orange-500/10 scale-105 shadow-md' 
          : content ? 'bg-white border-[#022d62]/20 shadow-sm' : 'bg-[#e7effc]/20 border-dashed border-[#022d62]/10'
      }`}
    >
      {content ? (
        <div className={`w-full h-full ${content.category === 'vowel' ? 'bg-[#fb9610]' : 'bg-[#022d62]'} text-white rounded-lg sm:rounded-xl flex items-center justify-center text-xl sm:text-2xl font-black font-outfit animate-pop-in border-b-4 border-black/20`}>
          {content.letter}
        </div>
      ) : (
        <div className="flex flex-col items-center opacity-10">
            <span className="text-xs sm:text-sm font-black">{index + 1}</span>
        </div>
      )}
    </div>
  );
};


// Extended letter set for Level 6 - includes all phonemes and common digraphs
const EXTENDED_LETTERS: { id: string, letter: string, category: LetterCategory }[] = [
  // Short vowels
  { id: 'v1', letter: 'a', category: 'vowel' },
  { id: 'v2', letter: 'e', category: 'vowel' },
  { id: 'v3', letter: 'i', category: 'vowel' },
  { id: 'v4', letter: 'o', category: 'vowel' },
  { id: 'v5', letter: 'u', category: 'vowel' },
  
  // Consonants
  { id: 'c1', letter: 'b', category: 'consonant' },
  { id: 'c2', letter: 'c', category: 'consonant' },
  { id: 'c3', letter: 'd', category: 'consonant' },
  { id: 'c4', letter: 'f', category: 'consonant' },
  { id: 'c5', letter: 'g', category: 'consonant' },
  { id: 'c6', letter: 'h', category: 'consonant' },
  { id: 'c7', letter: 'j', category: 'consonant' },
  { id: 'c8', letter: 'k', category: 'consonant' },
  { id: 'c9', letter: 'l', category: 'consonant' },
  { id: 'c10', letter: 'm', category: 'consonant' },
  { id: 'c11', letter: 'n', category: 'consonant' },
  { id: 'c12', letter: 'p', category: 'consonant' },
  { id: 'c13', letter: 'qu', category: 'consonant' },
  { id: 'c14', letter: 'r', category: 'consonant' },
  { id: 'c15', letter: 's', category: 'consonant' },
  { id: 'c16', letter: 't', category: 'consonant' },
  { id: 'c17', letter: 'v', category: 'consonant' },
  { id: 'c18', letter: 'w', category: 'consonant' },
  { id: 'c19', letter: 'x', category: 'consonant' },
  { id: 'c20', letter: 'y', category: 'consonant' },
  { id: 'c21', letter: 'z', category: 'consonant' },
  
  // Digraphs - consonant blends
  { id: 'd1', letter: 'sh', category: 'consonant' },
  { id: 'd2', letter: 'ch', category: 'consonant' },
  { id: 'd3', letter: 'th', category: 'consonant' },
  { id: 'd4', letter: 'ng', category: 'consonant' },
  { id: 'd5', letter: 'ck', category: 'consonant' },
  { id: 'd6', letter: 'll', category: 'consonant' },
  { id: 'd7', letter: 'ss', category: 'consonant' },
  { id: 'd8', letter: 'ff', category: 'consonant' },
  { id: 'd9', letter: 'zz', category: 'consonant' },
  
  // Long vowels / vowel pairs
  { id: 'vv1', letter: 'ee', category: 'vowel' },
  { id: 'vv2', letter: 'ai', category: 'vowel' },
  { id: 'vv3', letter: 'oa', category: 'vowel' },
  { id: 'vv4', letter: 'oo', category: 'vowel' },
  { id: 'vv5', letter: 'ou', category: 'vowel' },
  { id: 'vv6', letter: 'ow', category: 'vowel' },
  { id: 'vv7', letter: 'oy', category: 'vowel' },
  { id: 'vv8', letter: 'ar', category: 'vowel' },
  { id: 'vv9', letter: 'or', category: 'vowel' },
  { id: 'vv10', letter: 'ur', category: 'vowel' },
  { id: 'vv11', letter: 'er', category: 'vowel' },
  { id: 'vv12', letter: 'ir', category: 'vowel' },
];

// Word Builder Stages - Progressive learning
const STAGES = [
  { id: 1, name: 'Vowels Only', description: 'Build words using only vowels', allowed: (l: typeof EXTENDED_LETTERS[0]) => l.category === 'vowel' && l.letter.length === 1 },
  { id: 2, name: 'Vowels + Simple Consonants', description: 'Add b, c, d, f, g, h, m, n, p, s, t', allowed: (l: typeof EXTENDED_LETTERS[0]) => (l.category === 'vowel' && l.letter.length === 1) || ['b','c','d','f','g','h','m','n','p','s','t'].includes(l.letter) },
  { id: 3, name: 'All Letters', description: 'Use all single letters', allowed: (l: typeof EXTENDED_LETTERS[0]) => l.letter.length === 1 },
  { id: 4, name: 'With Digraphs', description: 'Add sh, ch, th, ng, ck', allowed: (l: typeof EXTENDED_LETTERS[0]) => l.letter.length <= 2 && !['ll','ss','ff','zz','ee','ai','oa','oo','ou','ow','oy','ar','or','ur','er','ir'].includes(l.letter) },
  { id: 5, name: 'Vowel Pairs', description: 'Add ee, ai, oa, oo', allowed: (l: typeof EXTENDED_LETTERS[0]) => !['ou','ow','oy','ar','or','ur','er','ir'].includes(l.letter) },
  { id: 6, name: 'Master Builder', description: 'All phonemes available', allowed: () => true },
] as const;

const WordBuilder: React.FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const [letters] = useState(EXTENDED_LETTERS);
  const [slots, setSlots] = useState<( { id: string, letter: string, category: LetterCategory } | null )[]>([null, null, null, null, null, null]);
  const [magicVowelIndex, setMagicVowelIndex] = useState<number | null>(null);
  const [currentStage, setCurrentStage] = useState(0); // 0-indexed stage
  const [builtWord, setBuiltWord] = useState('');
  const [showHint, setShowHint] = useState(true);
  const [showStageComplete, setShowStageComplete] = useState(false);

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
        updateBuiltWord(newSlots);
        checkMagicE(newSlots);
        ElevenLabsService.play(data.letter);
    }
  };

  const updateBuiltWord = (currentSlots: typeof slots) => {
    const word = currentSlots.map(s => s?.letter || '').join('');
    setBuiltWord(word);
    if (word.length > 0) setShowHint(false);
  };

  const checkMagicE = (currentSlots: ( { id: string, letter: string, category: LetterCategory } | null )[]) => {
      const eIndex = currentSlots.findIndex(s => s?.letter === 'e');
      if (eIndex > 1) {
          const consonant = currentSlots[eIndex - 1];
          const vowel = currentSlots[eIndex - 2];
          if (consonant?.category === 'consonant' && vowel?.category === 'vowel') {
              setMagicVowelIndex(eIndex - 2);
              setTimeout(() => {
                  ElevenLabsService.play("Magic E makes the vowel say its name!");
              }, 500);
              return;
          }
      }
      setMagicVowelIndex(null);
  };

  const handleClear = () => {
      setSlots([null, null, null, null, null, null]);
      setBuiltWord('');
      setShowHint(true);
      setMagicVowelIndex(null);
  };

  const handleTileClick = (letter: string) => {
      // Find first empty slot
      const emptyIndex = slots.findIndex(s => s === null);
      if (emptyIndex !== -1) {
          const letterObj = letters.find(l => l.letter === letter);
          if (letterObj) {
              const newSlots = [...slots];
              newSlots[emptyIndex] = { id: letterObj.id, letter: letterObj.letter, category: letterObj.category };
              setSlots(newSlots);
              updateBuiltWord(newSlots);
              checkMagicE(newSlots);
              ElevenLabsService.play(letter);
          }
      }
  };

  const filteredLetters = letters.filter(STAGES[currentStage].allowed);
  
  const handleNextStage = () => {
      if (currentStage < STAGES.length - 1) {
          setCurrentStage(currentStage + 1);
          handleClear();
          setShowStageComplete(false);
      }
  };
  
  const handlePrevStage = () => {
      if (currentStage > 0) {
          setCurrentStage(currentStage - 1);
          handleClear();
          setShowStageComplete(false);
      }
  };

  const playSound = async () => {
      if (builtWord.length === 0) return;
      setIsPlaying(true);
      try {
          // Play individual sounds first, then the whole word
          const filledSlots = slots.filter(s => s !== null);
          
          // Play each phoneme
          for (const slot of filledSlots) {
              if (slot) {
                  await ElevenLabsService.play(slot.letter);
                  await new Promise(r => setTimeout(r, 150));
              }
          }
          
          // Small pause before full word
          await new Promise(r => setTimeout(r, 300));
          
          // Play the full word using Piper (offline, consistent voice)
          await ElevenLabsService.play(builtWord);
          
      } catch (e) {
          console.error(e);
      } finally {
          setIsPlaying(false);
      }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-6">
        
        {/* Build Area - Enhanced with word display */}
        <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-4 sm:p-8 shadow-2xl border-4 border-[#e7effc] relative">
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <button 
                    onClick={handleClear} 
                    className="p-2 sm:p-3 bg-rose-50 text-rose-500 rounded-lg sm:rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                    title="Clear all"
                >
                    <Trash2 size={18} className="sm:w-5 sm:h-5" />
                </button>
            </div>
            
            <p className="text-center text-[#fb9610] font-black mb-4 sm:mb-6 uppercase tracking-[0.2em] text-[10px] sm:text-xs pr-12">
                {showHint ? 'Tap letters below to build words' : 'Your Word'}
            </p>
            
            {/* Word Display - Wrapped Grid Layout */}
            <div className="flex justify-center mb-6 sm:mb-8 relative">
                <div className="grid grid-cols-3 gap-2 max-w-sm">
                    {slots.map((slot, i) => (
                        <div key={`slot-wrapper-${i}`} className="relative">
                            {/* Magic E Arc */}
                            {magicVowelIndex !== null && i === magicVowelIndex && (
                                <div className="absolute -top-8 left-0 w-[calc(200%+0.5rem)] h-8 pointer-events-none z-10">
                                    <svg className="w-full h-full overflow-visible">
                                        <path d="M 10 20 Q 50 -5 90% 20" fill="none" stroke="#fb9610" strokeWidth="2.5" strokeDasharray="5 3" className="animate-dash" />
                                        <circle cx="10" cy="20" r="2.5" fill="#fb9610" />
                                        <circle cx="90%" cy="20" r="2.5" fill="#fb9610" />
                                    </svg>
                                </div>
                            )}
                            <WordSlot id={`slot-${i}`} index={i} content={slot} isMagicETarget={i === magicVowelIndex} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Built Word Display */}
            {builtWord && (
                <div className="text-center mb-4">
                    <span className="text-2xl sm:text-3xl font-black text-[#022d62] tracking-wider">{builtWord.toUpperCase()}</span>
                </div>
            )}

            {/* Read Button */}
            <div className="flex justify-center">
                <button 
                    onClick={playSound} 
                    disabled={isPlaying || !builtWord}
                    className={`
                        flex items-center gap-3 px-8 py-4 rounded-[2rem] font-black text-xl shadow-xl transition-all border-b-8
                        ${isPlaying || !builtWord
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' 
                            : 'bg-[#022d62] text-white hover:bg-black active:translate-y-2 border-black'
                        }
                    `}
                >
                    <Volume2 size={28} className={isPlaying ? 'animate-pulse' : ''} />
                    <span>{isPlaying ? 'Reading...' : 'Read Word'}</span>
                </button>
            </div>
        </div>

        {/* Stage Selector - Box Style */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border-2 border-[#e7effc]">
            <div className="flex items-center justify-between mb-3">
                <button 
                    onClick={handlePrevStage}
                    disabled={currentStage === 0}
                    className={`p-2 rounded-xl font-black text-sm ${currentStage === 0 ? 'text-slate-300' : 'text-[#022d62] hover:bg-[#e7effc]'}`}
                >
                    ← Back
                </button>
                <div className="text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#fb9610]">Stage {currentStage + 1} of {STAGES.length}</span>
                    <h3 className="text-sm font-black text-[#022d62]">{STAGES[currentStage].name}</h3>
                </div>
                <button 
                    onClick={handleNextStage}
                    disabled={currentStage === STAGES.length - 1}
                    className={`p-2 rounded-xl font-black text-sm ${currentStage === STAGES.length - 1 ? 'text-slate-300' : 'text-[#022d62] hover:bg-[#e7effc]'}`}
                >
                    Next →
                </button>
            </div>
            <p className="text-center text-xs text-slate-500 font-medium">{STAGES[currentStage].description}</p>
            
            {/* Progress Bar */}
            <div className="mt-3 flex gap-1">
                {STAGES.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`h-2 flex-1 rounded-full transition-all ${idx <= currentStage ? 'bg-[#fb9610]' : 'bg-slate-200'}`}
                    />
                ))}
            </div>
        </div>

        {/* Letter Tray - Keyboard Style (No Scroll) */}
        <div className="bg-[#e7effc]/30 rounded-[2rem] sm:rounded-[2.5rem] p-4 sm:p-6 border-4 border-[#e7effc] shadow-inner">
            {/* Vowels Section */}
            {filteredLetters.some(l => l.category === 'vowel') && (
                <div className="mb-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#fb9610] mb-2 text-center">Vowels</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {filteredLetters.filter(l => l.category === 'vowel').map((l) => (
                            <button
                                key={l.id}
                                onClick={() => handleTileClick(l.letter)}
                                className="bg-[#fb9610] text-white rounded-xl h-12 w-12 sm:h-14 sm:w-14 font-black text-lg sm:text-xl shadow-md border-b-4 border-black/20 active:translate-y-1 active:border-b-2 transition-all hover:scale-105 flex items-center justify-center"
                            >
                                {l.letter}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            {/* Consonants Section */}
            {filteredLetters.some(l => l.category === 'consonant') && (
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-[#022d62] mb-2 text-center">Consonants</p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {filteredLetters.filter(l => l.category === 'consonant').map((l) => (
                            <button
                                key={l.id}
                                onClick={() => handleTileClick(l.letter)}
                                className="bg-[#022d62] text-white rounded-xl h-12 w-12 sm:h-14 sm:w-14 font-black text-lg sm:text-xl shadow-md border-b-4 border-black/20 active:translate-y-1 active:border-b-2 transition-all hover:scale-105 flex items-center justify-center"
                            >
                                {l.letter}
                            </button>
                        ))}
                    </div>
                </div>
            )}
            
            <p className="text-center text-[#022d62]/30 font-bold text-[10px] uppercase tracking-widest mt-4">
                Tap letters to build words
            </p>
        </div>

        {/* Stage-specific Tips */}
        <div className="bg-emerald-50 rounded-2xl p-4 border-2 border-emerald-100">
            <p className="text-emerald-700 text-xs font-bold text-center">
                {currentStage === 0 && "💡 Try: a, e, i, o, u (just the sounds!)"}
                {currentStage === 1 && "💡 Try: cat, bed, dog, sun, pig"}
                {currentStage === 2 && "💡 Try: frog, jump, nest, wind"}
                {currentStage === 3 && "💡 Try: ship, chat, sing, back"}
                {currentStage === 4 && "💡 Try: sheep, rain, boat, moon"}
                {currentStage === 5 && "💡 Try: anything you can imagine!"}
            </p>
        </div>
      </div>
    </DndContext>
  );
};

export default WordBuilder;
