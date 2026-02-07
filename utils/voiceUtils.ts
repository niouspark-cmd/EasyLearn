/**
 * Utility to manage Speech Synthesis for The Sound Lab
 * Prioritizes a friendly, clear, female voice (often better for phonics).
 */

let selectedVoice: SpeechSynthesisVoice | null = null;

// Tries to find a good voice
const getVoice = (): SpeechSynthesisVoice | null => {
  if (selectedVoice) return selectedVoice;

  const voices = window.speechSynthesis.getVoices();

  // HEURISTIC:
  // 1. Google US English (often very clear, female-sounding by default)
  // 2. Microsoft Zira (Windows default female)
  // 3. Samantha (Mac default female)
  // 4. Any "English (United Kingdom)" female voice (often clearer articulation for phonics)
  // 5. Any female voice
  
  // Specific known good voices:
  const preferredNames = [
    "Google US English",
    "Microsoft Zira", 
    "Samantha",
    "Google UK English Female",
    "Daniel" // UK Male, but very clear if female fails
  ];

  for (const name of preferredNames) {
    const found = voices.find(v => v.name.includes(name));
    if (found) {
      selectedVoice = found;
      return found;
    }
  }

  // Fallback 1: Any English Female voice
  const femaleEn = voices.find(v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('f')));
  if (femaleEn) {
      selectedVoice = femaleEn;
      return femaleEn;
  }

  // Fallback 2: Any English voice
  const en = voices.find(v => v.lang.startsWith('en'));
  if (en) {
      selectedVoice = en;
      return en;
  }

  return null;
};

// Ensures voices are loaded (Chrome sometimes needs an event)
if (typeof window !== 'undefined' && window.speechSynthesis) {
    // Initial fetch
    if (window.speechSynthesis.getVoices().length > 0) {
        getVoice();
    } else {
        window.speechSynthesis.onvoiceschanged = () => {
             getVoice();
        };
    }
}


interface SpeakOptions {
    rate?: number; // Default 0.9 (slightly slower for kids)
    pitch?: number; // Default 1.1 (slightly higher/friendlier)
    volume?: number; // Default 1.0
    onEnd?: () => void;
    onBoundary?: (event: SpeechSynthesisEvent) => void;
}

export const speakText = (text: string, options: SpeakOptions = {}) => {
    // Cancel previous
    window.speechSynthesis.cancel();

    // If empty, just return
    if (!text) return;

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Voice
    const voice = getVoice();
    if (voice) {
        utterance.voice = voice;
    }

    // Options
    utterance.rate = options.rate ?? 0.85; // Default slightly slow for learners
    utterance.pitch = options.pitch ?? 1.1; // Slightly higher pitch = friendlier/child-like
    utterance.volume = options.volume ?? 1.0;

    // Callbacks
    if (options.onEnd) {
        utterance.onend = options.onEnd;
    }
    
    if (options.onBoundary) {
        utterance.onboundary = options.onBoundary;
    }

    window.speechSynthesis.speak(utterance);
};

export const stopSpeaking = () => {
    window.speechSynthesis.cancel();
};
