
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
  "ar": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-14-a-dotted.mp3", "example": "car", "ipa": "/ɑː/" },
  "er": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-13-u-dotted.mp3", "example": "mixer", "ipa": "/ə/" },
  "oo": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-6-o-dotted.mp3", "example": "book", "ipa": "/ʊ/" },
  "oi": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-11-oy.mp3", "example": "coin", "ipa": "/ɔɪ/" },
};

/**
 * THE MASTER LIST: Words with high-quality human dictionary audio
 * Located in /phonics_audio/[word].mp3
 */
export const PHONICS_WORDS = [
  "the", "to", "he", "she", "we", "me", "be", "was", "my", "you", "her", "they", "all", "are", "some", "one", "said", "come", "do", "so", "were", "when", "have", "there", "out", "like", "little", "what",
  "am", "is", "it", "an", "big", "wish", "fast", "chip", "stop",
  "anchor", "ant", "apple", "arrow", "at", "axe", "igloo", "in", "ink", "insect", "itch", "nap", "neck", "nest", "net", "nose", "nut", "pan", "pen", "pig", "pin", "pink", "pot", "sand", "sat", "sit", "snake", "spot", "sun", "tap", "ten", "tent", "tin", "top", "turtle",
  "bag", "bat", "bed", "box", "bus", "buzz", "cake", "cap", "cat", "cot", "cup", "dad", "dip", "dog", "drum", "duck", "egg", "elbow", "elf", "envelope", "exit", "fan", "fig", "fish", "fox", "frog", "gap", "gate", "girl", "goat", "gun", "hand", "hat", "hen", "hop", "hut", "jam", "jelly", "jet", "jug", "jump", "kick", "king", "kite", "kitten", "leaf", "leg", "lemon", "lip", "log", "man", "map", "mat", "meat", "milk", "mix", "mug", "octopus", "off", "on", "orange", "ostrich", "rabbit", "rat", "red", "rug", "run", "six", "umbrella", "uncle", "under", "unhappy", "up", "van", "vase", "vest", "vet", "violin", "wall", "watch", "web", "wig", "wind", "yak", "yam", "yellow", "yo-yo", "yogurt", "zebra", "zigzag", "zip", "zoo",
  "bench", "chick", "chin", "chips", "chop", "cloth", "fish", "king", "lung", "moth", "quack", "queen", "quick", "quilt", "quiz", "ring", "sheep", "shell", "ship", "shop", "sing", "strong", "thick", "thin", "thumb",
  "bee", "boat", "coat", "cork", "corn", "dried", "feet", "flies", "fork", "goat", "green", "horn", "jeep", "lie", "nail", "pie", "rain", "road", "snail", "soap", "storm", "tail", "tie", "train", "tree",
  "blue", "boil", "book", "car", "clue", "cloud", "coin", "cook", "farm", "foot", "glue", "hammer", "house", "ladder", "letter", "mixer", "moon", "mouse", "mouth", "oil", "park", "point", "shark", "shout", "soil", "spoon", "star", "statue", "supper", "tissue",
  "bike", "bone", "cake", "cone", "cube", "five", "fuse", "game", "gate", "globe", "huge", "kite", "lake", "mule", "nine", "rope", "rose", "slide", "snake", "tube"
];

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
