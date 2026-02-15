
/**
 * phoneticMap.ts
 * 
 * Maps graphemes (letters/digraphs) to audio filenames.
 * 
 * CORE UPDATE: Assets customized and located in public/assets/audio/curriculum_sorted/
 */

interface PhonemeData {
  trigger: string;
  example: string;
  ipa: string;
}

const BASE_PATH = "../curriculum_sorted/";

const PHONETIC_DICTIONARY: Record<string, PhonemeData> = {
  // --- Level 1: Golden Letters (SATPIN) ---
  "s": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter s.wav", "example": "snake", "ipa": "/s/" },
  "a": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/Letter a.wav", "example": "apple", "ipa": "/æ/" },
  "t": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter t.wav", "example": "tent", "ipa": "/t/" },
  "p": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter p.wav", "example": "pig", "ipa": "/p/" },
  "i": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter i.wav", "example": "igloo", "ipa": "/ɪ/" },
  "n": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter n.wav", "example": "nest", "ipa": "/n/" },

  // --- Level 2: The Alphabet (CVC) ---
  "c": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter c.wav", "example": "cat", "ipa": "/k/" },
  "k": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter k.wav", "example": "kite", "ipa": "/k/" },
  "e": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter e.wav", "example": "egg", "ipa": "/e/" },
  "h": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter h.wav", "example": "hat", "ipa": "/h/" },
  "r": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter r.wav", "example": "rabbit", "ipa": "/r/" },
  "m": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter m.wav", "example": "monkey", "ipa": "/m/" },
  "d": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter d.wav", "example": "dog", "ipa": "/d/" },
  "g": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter g.wav", "example": "goat", "ipa": "/g/" },
  "o": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter o.wav", "example": "octopus", "ipa": "/ɒ/" },
  "u": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter u.wav", "example": "umbrella", "ipa": "/ʌ/" },
  "l": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter L.wav", "example": "lion", "ipa": "/l/" }, // Note capital L
  "f": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter f.wav", "example": "fish", "ipa": "/f/" },
  "b": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter b.wav", "example": "bat", "ipa": "/b/" },
  "j": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter j.wav", "example": "jam", "ipa": "/dʒ/" },
  "z": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter z.wav", "example": "zebra", "ipa": "/z/" },
  "w": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter w.wav", "example": "web", "ipa": "/w/" },
  "v": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter v.wav", "example": "van", "ipa": "/v/" },
  "y": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter y.wav", "example": "yo-yo", "ipa": "/j/" },
  "x": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter x.wav", "example": "box", "ipa": "/ks/" },

  // --- Level 3: Digraphs ---
  // Note: These filenames come from 'Consonant Digraphs' folder but are now in Level 3 folder
  "sh": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-1-sh.mp3", "example": "ship", "ipa": "/ʃ/" },
  "ch": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-8-ch.mp3", "example": "chip", "ipa": "/tʃ/" },
  "th": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-4-th-soft.mp3", "example": "thumb", "ipa": "/θ/" },
  "ng": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-9-ng.mp3", "example": "king", "ipa": "/ŋ/" },
  "q":  { "trigger": BASE_PATH + "Level 3 - Digraphs/letter q.wav", "example": "queen", "ipa": "/kw/" }, // Moved Q here
  "qu": { "trigger": BASE_PATH + "Level 3 - Digraphs/letter q.wav", "example": "queen", "ipa": "/kw/" }, // Alias for convenience

  // --- Level 5: Other Sounds (Vowel Pairs / Diphthongs) ---
  "ou": { "trigger": BASE_PATH + "Level 5 - Other Sounds/alphasounds-ou.mp3", "example": "cloud", "ipa": "/aʊ/" },
  "ow": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-12-ow.mp3", "example": "cow", "ipa": "/aʊ/" },
  "oy": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-11-oy.mp3", "example": "boy", "ipa": "/ɔɪ/" },
  
  // Alternates
  "ou_alt": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha--ou-dotted.mp3", "example": "soup", "ipa": "/uː/" },
  "ow_long": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-3-ow-long.mp3", "example": "snow", "ipa": "/oʊ/" }, // Often synonymous with 'oa' in Level 4
  "ue": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-10-u-long.mp3", "example": "blue", "ipa": "/uː/" },
};

export const getPhoneticSound = (grapheme: string): string => {
  const key = grapheme.toLowerCase();
  
  if (PHONETIC_DICTIONARY[key]) {
      return PHONETIC_DICTIONARY[key].trigger;
  }
  
  return grapheme;
};

export const getPhonemeData = (grapheme: string): PhonemeData | null => {
    return PHONETIC_DICTIONARY[grapheme.toLowerCase()] || null;
}

export const STATIC_ASSETS = Object.keys(PHONETIC_DICTIONARY);
