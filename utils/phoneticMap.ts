
/**
 * phoneticMap.ts
 * 
 * Maps graphemes (letters/digraphs) to audio filenames.
 * 
 * CORE UPDATE: User has provided "98% accurate" manually recorded assets in /public/assets/audio/phonemes/
 * Naming convention varies: "Letter a.wav", "letter b.wav", etc.
 */

interface PhonemeData {
  trigger: string;
  example: string;
  ipa: string;
}

const PHONETIC_DICTIONARY: Record<string, PhonemeData> = {
  // A-Z (Manual Assets - note capitalization differences in filenames)
  "a": { "trigger": "Letter a.wav", "example": "apple", "ipa": "/æ/" },
  "b": { "trigger": "letter b.wav", "example": "bat", "ipa": "/b/" },
  "c": { "trigger": "letter c.wav", "example": "cat", "ipa": "/k/" },
  "d": { "trigger": "letter d.wav", "example": "dog", "ipa": "/d/" },
  "e": { "trigger": "letter e.wav", "example": "egg", "ipa": "/e/" },
  "f": { "trigger": "letter f.wav", "example": "fish", "ipa": "/f/" },
  "g": { "trigger": "letter g.wav", "example": "goat", "ipa": "/g/" },
  "h": { "trigger": "letter h.wav", "example": "hat", "ipa": "/h/" },
  "i": { "trigger": "letter i.wav", "example": "igloo", "ipa": "/ɪ/" },
  "j": { "trigger": "letter j.wav", "example": "jam", "ipa": "/dʒ/" },
  "k": { "trigger": "letter k.wav", "example": "kite", "ipa": "/k/" },
  "l": { "trigger": "letter L.wav", "example": "lion", "ipa": "/l/" }, // Note capital L in filename
  "m": { "trigger": "letter m.wav", "example": "monkey", "ipa": "/m/" },
  "n": { "trigger": "letter n.wav", "example": "nest", "ipa": "/n/" },
  "o": { "trigger": "letter o.wav", "example": "octopus", "ipa": "/ɒ/" },
  "p": { "trigger": "letter p.wav", "example": "pig", "ipa": "/p/" },
  "q": { "trigger": "letter q.wav", "example": "queen", "ipa": "/kw/" },
  "r": { "trigger": "letter r.wav", "example": "rabbit", "ipa": "/r/" },
  "s": { "trigger": "letter s.wav", "example": "snake", "ipa": "/s/" },
  "t": { "trigger": "letter t.wav", "example": "tent", "ipa": "/t/" },
  "u": { "trigger": "letter u.wav", "example": "umbrella", "ipa": "/ʌ/" },
  "v": { "trigger": "letter v.wav", "example": "van", "ipa": "/v/" },
  "w": { "trigger": "letter w.wav", "example": "web", "ipa": "/w/" },
  "x": { "trigger": "letter x.wav", "example": "box", "ipa": "/ks/" },
  "y": { "trigger": "letter y.wav", "example": "yo-yo", "ipa": "/j/" },
  "z": { "trigger": "letter z.wav", "example": "zebra", "ipa": "/z/" },

  // Consonant Digraphs - Mapped to public/assets/audio/phonemes/Consonant Digraphs/
  "sh": { "trigger": "Consonant Digraphs/btalpha-1-sh.mp3", "example": "ship", "ipa": "/ʃ/" },
  "ch": { "trigger": "Consonant Digraphs/btalpha-8-ch.mp3", "example": "chip", "ipa": "/tʃ/" },
  "th": { "trigger": "Consonant Digraphs/btalpha-4-th-soft.mp3", "example": "thumb", "ipa": "/θ/" },
  "ng": { "trigger": "Consonant Digraphs/btalpha-9-ng.mp3", "example": "king", "ipa": "/ŋ/" },

  // Vowel Pairs / Diphthongs - Mapped to public/assets/audio/phonemes/vowel pairs diphthongs/
  "ou": { "trigger": "vowel pairs diphthongs/alphasounds-ou.mp3", "example": "cloud", "ipa": "/aʊ/" },
  "ow": { "trigger": "vowel pairs diphthongs/btalpha-12-ow.mp3", "example": "cow", "ipa": "/aʊ/" },
  "oy": { "trigger": "vowel pairs diphthongs/btalpha-11-oy.mp3", "example": "boy", "ipa": "/ɔɪ/" },
  
  // Alternates (Internal references)
  "ou_alt": { "trigger": "vowel pairs diphthongs/btalpha--ou-dotted.mp3", "example": "soup", "ipa": "/uː/" },
  "ow_long": { "trigger": "vowel pairs diphthongs/btalpha-3-ow-long.mp3", "example": "snow", "ipa": "/oʊ/" },
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

// Updated STATIC_ASSETS list based solely on files present
export const STATIC_ASSETS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
    "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "sh", "ch", "th", "ng", "ou", "ow", "oy", "ou_alt", "ow_long"
];
