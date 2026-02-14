import React, { useState, useCallback } from 'react';
import { Volume2, RotateCcw, CheckCircle, ArrowRight } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { useDroppable, useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

// Types
interface WordTile {
  id: string;
  text: string;
  category: 'given' | 'suggested';
}

interface SentenceSlot {
  id: string;
  word: string | null;
}

// Sample sentence templates using common phonics words
const SENTENCE_TEMPLATES = [
  "The {word1} {word2}.",
  "I see a {word1}.",
  "The {word1} is {word2}.",
  "Look at the {word1}.",
  "My {word1} is {word2}.",
  "We have a {word1}.",
  "The big {word1} {word2}.",
  "{word1} and {word2} play.",
];

// Sample words that would come from previous blending exercises
const SAMPLE_WORDS = [
  'cat', 'dog', 'sun', 'hat', 'pig', 'red', 'big', 'fun',
  'sit', 'run', 'hop', 'jump', 'eat', 'see', 'get', 'win'
];

const SentenceSlot: React.FC<{
  id: string;
  word: string | null;
  onRemove: () => void;
}> = ({ id, word, onRemove }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={`min-w-[80px] h-16 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
        isOver 
          ? 'bg-emerald-100 border-emerald-500 scale-105' 
          : word 
            ? 'bg-white border-[#022d62]/20 shadow-sm' 
            : 'bg-[#e7effc]/20 border-dashed border-[#022d62]/10'
      }`}
    >
      {word ? (
        <div className="relative">
          <div className="px-3 py-2 bg-[#022d62] text-white rounded-lg font-black text-lg">
            {word}
          </div>
          <button 
            onClick={onRemove}
            className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 text-white rounded-full flex items-center justify-center text-xs hover:scale-110 transition-transform"
          >
            ×
          </button>
        </div>
      ) : (
        <div className="text-[#022d62]/30 text-sm font-bold">Drop word</div>
      )}
    </div>
  );
};

const WordTileComponent: React.FC<{
  word: WordTile;
}> = ({ word }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: word.id,
    data: { text: word.text }
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1
  };

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-4 py-3 rounded-xl font-black text-lg shadow-md border-b-4 active:translate-y-1 transition-all touch-none ${
        word.category === 'given' 
          ? 'bg-[#fb9610] text-white border-orange-700' 
          : 'bg-[#022d62] text-white border-blue-700'
      }`}
    >
      {word.text}
    </button>
  );
};

const SentenceBuilder: React.FC<{ 
  onComplete: () => void,
  givenWords?: string[]
}> = ({ onComplete, givenWords = [] }) => {
  const [sentenceSlots, setSentenceSlots] = useState<SentenceSlot[]>([
    { id: 'slot-1', word: null },
    { id: 'slot-2', word: null },
    { id: 'slot-3', word: null },
    { id: 'slot-4', word: null },
    { id: 'slot-5', word: null },
  ]);
  
  const [availableWords, setAvailableWords] = useState<WordTile[]>(() => {
    const given = (givenWords || []).map((word, index) => ({
      id: `given-${index}`,
      text: word,
      category: 'given' as const
    }));
    
    const suggested = SAMPLE_WORDS
      .filter(word => !givenWords.includes(word))
      .slice(0, 8)
      .map((word, index) => ({
        id: `suggested-${index}`,
        text: word,
        category: 'suggested' as const
      }));
    
    return [...given, ...suggested];
  });
  
  const [currentTemplate, setCurrentTemplate] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const getSentenceText = useCallback(() => {
    const words = sentenceSlots.map(slot => slot.word).filter(Boolean) as string[];
    if (words.length === 0) return '';
    
    // Simply join the words together with a space
    const combined = words.join(' ');
    
    // Capitalize first letter and add a period
    return combined.charAt(0).toUpperCase() + combined.slice(1) + '.';
  }, [sentenceSlots]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && over.id.toString().startsWith('slot-')) {
      const wordText = active.data.current?.text;
      const slotId = over.id.toString();
      
      setSentenceSlots(prev => 
        prev.map(slot => 
          slot.id === slotId ? { ...slot, word: wordText } : slot
        )
      );
      
      setAvailableWords(prev => prev.filter(w => w.id !== active.id));
    }
  };

  const handleRemoveWord = (slotId: string) => {
    const slot = sentenceSlots.find(s => s.id === slotId);
    if (slot?.word) {
      setAvailableWords(prev => [
        ...prev,
        { id: `returned-${Date.now()}`, text: slot.word!, category: 'given' }
      ]);
      
      setSentenceSlots(prev => 
        prev.map(s => s.id === slotId ? { ...s, word: null } : s)
      );
    }
  };

  const playSentence = async () => {
    const sentence = getSentenceText();
    if (!sentence) return;
    
    setIsPlaying(true);
    try {
      await ElevenLabsService.play(sentence);
    } catch (e) {
      console.error("Sentence playback failed", e);
    } finally {
      setIsPlaying(false);
    }
  };

  const resetSentence = () => {
    const wordsInSentence = sentenceSlots.map(s => s.word).filter(Boolean) as string[];
    setAvailableWords(prev => [
      ...prev,
      ...wordsInSentence.map(word => ({ 
        id: `reset-${Date.now()}-${word}`, 
        text: word, 
        category: 'given' as const 
      }))
    ]);
    
    setSentenceSlots(prev => prev.map(slot => ({ ...slot, word: null })));
  };

  const isSentenceComplete = sentenceSlots.some(slot => slot.word !== null);

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="h-full flex flex-col items-center py-4 px-2 sm:px-4">
        <div className="mb-4 text-center">
          <h2 className="text-xl sm:text-2xl font-black text-[#022d62] mb-2">Build a Sentence</h2>
          <p className="text-[#022d62]/60 text-xs sm:text-sm font-bold uppercase tracking-widest">
            Drag words to create sentences
          </p>
        </div>

        <div className="w-full max-w-md sm:max-w-2xl mb-6 sm:mb-8">
          <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border-2 border-[#e7effc]">
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center min-h-[70px] sm:min-h-[80px] items-center">
              {sentenceSlots.map((slot) => (
                <SentenceSlot
                  key={slot.id}
                  id={slot.id}
                  word={slot.word}
                  onRemove={() => handleRemoveWord(slot.id)}
                />
              ))}
            </div>
            
            {isSentenceComplete && (
              <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                <p className="text-emerald-800 font-bold text-center text-sm sm:text-base">
                  "{getSentenceText()}"
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mb-4 sm:mb-6">
          <button
            onClick={playSentence}
            disabled={!isSentenceComplete || isPlaying}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-[#022d62] text-white rounded-lg sm:rounded-xl font-black flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Volume2 size={20} />
            {isPlaying ? 'Playing...' : 'Hear Sentence'}
          </button>
          
          <button
            onClick={resetSentence}
            className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-200 text-[#022d62] rounded-lg sm:rounded-xl font-black flex items-center justify-center gap-2"
          >
            <RotateCcw size={20} />
            Reset
          </button>
        </div>

        <div className="w-full max-w-md sm:max-w-2xl">
          <h3 className="text-center text-[#022d62]/60 font-bold mb-2 sm:mb-3 uppercase text-xs sm:text-sm">
            Available Words
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
            {availableWords.map((word) => (
              <WordTileComponent
                key={word.id}
                word={word}
              />
            ))}
          </div>
        </div>

        {isSentenceComplete && (
          <div className="mt-6 sm:mt-8 w-full max-w-xs sm:max-w-sm">
            <button
              onClick={onComplete}
              className="w-full py-3 sm:py-4 bg-emerald-500 text-white rounded-lg sm:rounded-xl font-black text-base sm:text-lg shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-transform"
            >
              <CheckCircle size={24} />
              Great Job! Finish Lesson
              <ArrowRight size={20} />
            </button>
          </div>
        )}

        {!isSentenceComplete && (
          <div className="mt-6 text-center">
            <p className="text-[#022d62]/60 font-bold text-sm">
              Drag words to the boxes above to build your sentence!
            </p>
          </div>
        )}
      </div>
    </DndContext>
  );
};

export default SentenceBuilder;