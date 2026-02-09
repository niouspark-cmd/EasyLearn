import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent, useSensor, useSensors, MouseSensor, TouchSensor } from '@dnd-kit/core';
import { X, Volume2 } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

type LetterCategory = 'vowel' | 'consonant';

// Draggable Letter Tile
const DraggableTile: React.FC<{ id: string, letter: string, category: LetterCategory }> = ({ id, letter, category }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { letter, category }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  const bgColor = category === 'vowel' ? 'bg-teal-500' : 'bg-indigo-600';

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes}
      className={`w-14 h-14 sm:w-16 sm:h-16 ${bgColor} text-white rounded-xl shadow-md flex items-center justify-center text-2xl font-bold font-lexend cursor-grab active:cursor-grabbing touch-none`}
    >
      {letter}
    </div>
  );
};

// Droppable Slot
const WordSlot: React.FC<{ id: string, content: { id: string, letter: string, category: LetterCategory } | null, index: number, isMagicETarget: boolean }> = ({ id, content, index, isMagicETarget }) => {
  const { setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
        isMagicETarget 
          ? 'bg-teal-50 border-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.5)] scale-110' 
          : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 dashed-border'
      }`}
    >
      {content ? (
        <div className={`w-full h-full ${content.category === 'vowel' ? 'bg-teal-500' : 'bg-indigo-600'} text-white rounded-lg flex items-center justify-center text-3xl font-bold font-lexend`}>
          {content.letter}
        </div>
      ) : (
        <span className="text-slate-300 text-sm font-bold opacity-50">{index + 1}</span>
      )}
    </div>
  );
};

const WordBuilder: React.FC = () => {
  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor)
  );

  const [isPlaying, setIsPlaying] = useState(false);
  
  // Initial supply of letters
  const [letters] = useState<{ id: string, letter: string, category: LetterCategory }[]>([
    { id: 'l1', letter: 'a', category: 'vowel' },
    { id: 'l2', letter: 'e', category: 'vowel' },
    { id: 'l3', letter: 'i', category: 'vowel' },
    { id: 'l4', letter: 'o', category: 'vowel' },
    { id: 'l5', letter: 'u', category: 'vowel' },
    { id: 'l6', letter: 'c', category: 'consonant' },
    { id: 'l7', letter: 't', category: 'consonant' },
    { id: 'l8', letter: 'p', category: 'consonant' },
    { id: 'l9', letter: 'm', category: 'consonant' },
    { id: 'l10', letter: 's', category: 'consonant' },
    { id: 'l11', letter: 'h', category: 'consonant' },
    { id: 'l12', letter: 'r', category: 'consonant' },
    // Digraphs
    { id: 'd1', letter: 'sh', category: 'consonant' },
    { id: 'd2', letter: 'ch', category: 'consonant' },
    { id: 'd3', letter: 'th', category: 'consonant' },
    { id: 'd4', letter: 'ng', category: 'consonant' },
    { id: 'd5', letter: 'ck', category: 'consonant' },
    { id: 'd6', letter: 'ai', category: 'vowel' },
    { id: 'd7', letter: 'ee', category: 'vowel' },
    { id: 'd8', letter: 'oa', category: 'vowel' },
  ]);

  // Workbench state: 5 slots
  const [slots, setSlots] = useState<( { id: string, letter: string, category: LetterCategory } | null )[]>([null, null, null, null, null]);
  
  // Magic Vowel Logic
  const [magicVowelIndex, setMagicVowelIndex] = useState<number | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current) {
        const data = active.data.current as { letter: string, category: LetterCategory };
        const slotIndex = parseInt(String(over.id).replace('slot-', ''));
        const newSlots = [...slots];
        
        // Check if item was already in a slot (to move it)
        const previousSlotIndex = slots.findIndex(s => s?.id === active.id);
        if (previousSlotIndex !== -1) {
            newSlots[previousSlotIndex] = null;
        }

        newSlots[slotIndex] = {
            id: active.id as string,
            letter: data.letter,
            category: data.category
        };
        
        setSlots(newSlots);
        checkMagicE(newSlots);
    }
  };

  const checkMagicE = (currentSlots: ( { id: string, letter: string, category: LetterCategory } | null )[]) => {
      // Simple logic: If last filled slot is 'e', and there is a vowel before it separated by 1 consonant.
      // E.g. [c] [a] [p] [e]
      
      // Find index of 'e'
      const eIndex = currentSlots.findIndex(s => s?.letter === 'e');
      
      if (eIndex > 1) { // Needs at least 2 slots before it (V + C)
          const consonant = currentSlots[eIndex - 1];
          const vowel = currentSlots[eIndex - 2];

          if (
              consonant && consonant.category === 'consonant' &&
              vowel && vowel.category === 'vowel'
          ) {
              setMagicVowelIndex(eIndex - 2);
              playSound('magic');
              return;
          }
      }
      setMagicVowelIndex(null);
  };

  const playSound = async (type: string) => {
      // Use ElevenLabs Service
      if (type === 'read') {
          // Construct the word
          const word = slots.map(s => s ? s.letter : '_').join('').replace(/_/g, '');
          if (word.length > 0) {
              setIsPlaying(true);
              try {
                  // Use Groq to get "cuh... ah... tuh... cat"
                  let speechText = word;
                  try {
                      // Dynamically import to avoid top-level issues if not ready
                      const { GroqService } = await import('../../utils/GroqService');
                      const phonetics = await GroqService.getPhoneticSegment(word);
                      if (phonetics) speechText = phonetics;
                  } catch (err) {
                      console.warn("Groq failed, falling back to simple word", err);
                  }

                  await ElevenLabsService.play(speechText, {
                      onComplete: () => setIsPlaying(false)
                  });
              } catch (e) {
                  console.error(e);
                  setIsPlaying(false);
              }
          }
      } else if (type === 'magic') {
          // Quick feedback
          ElevenLabsService.play("Magic E activated!");
      }
  };

  const clearWorkbench = () => {
    setSlots([null, null, null, null, null]);
    setMagicVowelIndex(null);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-8">
        
        {/* Workbench Area */}
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 sm:p-8 shadow-xl border border-blue-100 dark:border-blue-900/30 relative overflow-visible">
            <div className="absolute top-4 right-4">
                <button onClick={clearWorkbench} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <X size={24} />
                </button>
            </div>
            
            <h3 className="text-center text-slate-500 dark:text-slate-400 font-bold mb-6 font-lexend uppercase tracking-widest text-sm">Build a Word</h3>
            
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 relative">
                {/* Magic E Arc Overlay */}
                {magicVowelIndex !== null && (
                    <div 
                        className="absolute -top-8 h-12 pointer-events-none z-10 animate-fade-in"
                        style={{
                            // Calculate position based on slot index.
                            // Each slot is roughly w-16(64px) + gap-2(8px) = 72px on mobile
                            // w-20(80px) + gap-4(16px) = 96px on desktop
                            // Accessing direct pixel values is hard, so we use % or estimated calc.
                            // Better: Render it relative to the Vowel slot? No, it spans multiple.
                            // Let's rely on the fact that slots are centered.
                            // The Arc spans 3 slots: [Vowel] [Cons] [E]
                            // Width approx: 3 slots gap included.
                            // Actually, simpler: render it inside the Vowel slot but with width 300%?
                            // No, flex gap messes that up.
                            // Let's just create a full width absolute container and position the SVG absolutely.
                            left: '0', right: '0'
                        }}
                    >
                        {/* We need to precisely target the centers. This is pure CSS guessing game without refs. 
                            However, since we know indices, we can try to "float" it.
                            Let's try a safer visual: An arc connecting the vowel and the E using a dedicated component that we calculate width for?
                            Or, more robustly: Just draw it over the slots it connects? 
                            Let's use a simplified approach: Render it as a child of the `flex` container, but absolute positioning.
                        */}
                       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                            {/* This is too hard to coordinate with DOM elements blindly. */}
                       </svg>
                    </div>
                )}

                {/* Better Approach: Render the Arc PIECES inside the slots? No. 
                    Let's use the assumption that the slots are uniform.
                    On desktop: 80px + 16px gap = 96px width per unit.
                    On mobile: 64px + 8px gap = 72px width per unit.
                    The start index is `magicVowelIndex`.
                    The offset is `magicVowelIndex * UnitWidth`.
                    The width of arc is `2 * UnitWidth` to span from center of i to center of i+2.
                */}
                
                {magicVowelIndex !== null && (
                     <div className="absolute -top-12 left-0 w-full h-12 pointer-events-none flex justify-center gap-2 sm:gap-4">
                        {/* We mirror the slots structure but only render the arc in the right place */}
                        {slots.map((_, i) => (
                             <div key={i} className={`w-16 sm:w-20 h-0 flex justify-center relative`}>
                                 {i === magicVowelIndex && (
                                     // This is the Vowel Slot. We need an arc starting here and going to i+2
                                     <svg className="absolute top-0 left-1/2 w-[calc(200%+1rem)] sm:w-[calc(200%+2rem)] h-12 overflow-visible" style={{ marginLeft: '-1px' }}>
                                         <path 
                                            d="M 1 40 Q 50 -10 100% 40" 
                                            fill="none" 
                                            stroke="#2dd4bf" 
                                            strokeWidth="4" 
                                            strokeDasharray="8 4"
                                            className={`${isPlaying ? 'animate-glow-path' : 'animate-dash'}`}
                                         />
                                         <circle cx="1" cy="40" r="4" fill="#2dd4bf" />
                                         <circle cx="100%" cy="40" r="4" fill="#2dd4bf" />
                                     </svg>
                                 )}
                             </div>
                        ))}
                     </div>
                )}

                {slots.map((slot, i) => (
                    <WordSlot 
                        key={`slot-${i}`} 
                        id={`slot-${i}`} 
                        index={i} 
                        content={slot} 
                        isMagicETarget={i === magicVowelIndex}
                    />
                ))}
            </div>

            {/* Read Word Button (Appears if at least one letter) */}
            {slots.some(s => s !== null) && (
                <div className="flex justify-center animate-fade-in-up">
                    <button onClick={() => playSound('read')} className="flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform">
                        <Volume2 size={20} />
                        Read Word
                    </button>
                </div>
            )}
        </div>

        {/* Letter Tray */}
        <div className="bg-slate-100 dark:bg-slate-800/50 rounded-[2rem] p-6 lg:p-8">
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {letters.map((l: { id: string, letter: string, category: LetterCategory }) => (
                    <DraggableTile key={l.id} id={l.id} letter={l.letter} category={l.category} />
                ))}
            </div>
        </div>
      </div>
    </DndContext>
  );
};

export default WordBuilder;
