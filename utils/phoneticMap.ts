
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

const BASE_PATH = "/assets/audio/curriculum_sorted/";

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
  "l": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter L.wav", "example": "leg", "ipa": "/l/" }, // Changed lion -> leg
  "f": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter f.wav", "example": "fish", "ipa": "/f/" },
  "b": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter b.wav", "example": "bag", "ipa": "/b/" }, // Changed bat -> bag
  "j": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter j.wav", "example": "jam", "ipa": "/dʒ/" },
  "z": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter z.wav", "example": "zip", "ipa": "/z/" }, // Changed zebra -> zip
  "w": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter w.wav", "example": "web", "ipa": "/w/" },
  "v": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter v.wav", "example": "van", "ipa": "/v/" },
  "y": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter y.wav", "example": "yogurt", "ipa": "/j/" }, // Changed yo-yo -> yogurt
  "x": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter x.wav", "example": "box", "ipa": "/ks/" },

  // --- Level 3: Digraphs ---
  // Note: These filenames come from 'Consonant Digraphs' folder but are now in Level 3 folder
  "sh": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-1-sh.mp3", "example": "ship", "ipa": "/ʃ/" },
  "ch": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-8-ch.mp3", "example": "chip", "ipa": "/tʃ/" },
  "th": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-4-th-soft.mp3", "example": "thumb", "ipa": "/θ/" },
  "ng": { "trigger": BASE_PATH + "Level 3 - Digraphs/btalpha-9-ng.mp3", "example": "king", "ipa": "/ŋ/" },
  "q":  { "trigger": BASE_PATH + "Level 3 - Digraphs/letter q.wav", "example": "queen", "ipa": "/kw/" }, // Moved Q here
  "qu": { "trigger": BASE_PATH + "Level 3 - Digraphs/letter q.wav", "example": "queen", "ipa": "/kw/" }, // Alias for convenience

  // --- Level 4: Vowel Teams ---
  "ai": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-7-a-long.mp3", "example": "rain", "ipa": "/eɪ/" }, 
  "oa": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-3-o-long.mp3", "example": "boat", "ipa": "/oʊ/" },
  "ie": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter i.wav", "example": "pie", "ipa": "/aɪ/" }, 
  // wait, let's map what we have in "all sounds raw here". 
  // We have: btalpha-7-a-long (ai), btalpha-3-o-long (oa), btalpha-2-e-long (ee), btalpha-10-u-long (ue)
  "ee": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-2-e-long.mp3", "example": "tree", "ipa": "/iː/" },
  "or": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-6-o-dotted.mp3", "example": "corn", "ipa": "/ɔː/" }, // Sharing with oo/aw sound

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

  // --- Level 6: Magic E (Split Digraphs) ---
  // These use the "Long Vowel" sounds
  "a-e": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-7-a-long.mp3", "example": "cake", "ipa": "/eɪ/" },
  "e-e": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-2-e-long.mp3", "example": "eve", "ipa": "/iː/" },
  "i-e": { "trigger": BASE_PATH + "Level 1 - Golden Letters (SATPIN)/letter i.wav", "example": "kite", "ipa": "/aɪ/" }, // Fallback until i-long found
  "o-e": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-3-o-long.mp3", "example": "bone", "ipa": "/oʊ/" },
  "u-e": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-10-u-long.mp3", "example": "cube", "ipa": "/juː/" },

  // Additional Phase 3/5 Sounds
  "zh": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-15-zh.mp3", "example": "measure", "ipa": "/ʒ/" },
  "aw": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-6-o-dotted.mp3", "example": "saw", "ipa": "/ɔː/" },
  "ur": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-13-u-dotted.mp3", "example": "burn", "ipa": "/ɜː/" },
  
  // Phase 5 New Graphemes (Mapped to existing sounds)
  "ay": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-7-a-long.mp3", "example": "day", "ipa": "/eɪ/" },
  "ea": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-2-e-long.mp3", "example": "sea", "ipa": "/iː/" },
  "ir": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-13-u-dotted.mp3", "example": "bird", "ipa": "/ɜː/" }, // Same as ur/er
  "wh": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter w.wav", "example": "wheel", "ipa": "/w/" },
  "ph": { "trigger": BASE_PATH + "Level 2 - The Alphabet (CVC)/letter f.wav", "example": "photo", "ipa": "/f/" },
  "ew": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-10-u-long.mp3", "example": "new", "ipa": "/juː/" },
  "oe": { "trigger": BASE_PATH + "Level 4 - Vowel Teams/btalpha-3-o-long.mp3", "example": "toe", "ipa": "/oʊ/" },
  "au": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-6-o-dotted.mp3", "example": "paul", "ipa": "/ɔː/" }, // Same as aw

  // Trigraphs (Level 7) - Specific mappings
  "air": { "trigger": "/phonics_audio/air.mp3?v=9", "example": "hair", "ipa": "/eə/" },
  "ear": { "trigger": "/phonics_audio/ear.mp3?v=9", "example": "hear", "ipa": "/ɪə/" },
  "ure": { "trigger": BASE_PATH + "Level 5 - Other Sounds/btalpha-13-u-dotted.mp3", "example": "pure", "ipa": "/ɜː/" },
  
  // Highlighting specific mapping for IGH -> "Eye" (Pronoun I sound)
  "igh": { "trigger": "/phonics_audio/i.mp3?v=9", "example": "high", "ipa": "/aɪ/" },
};

/**
 * THE MASTER LIST: Words with high-quality human dictionary audio
 * Located in /phonics_audio/[word].mp3
 */
export const PHONICS_WORDS = [
  // Level 7: Tricky Words
  "the", "i", "to", "he", "she", "we", "me", "be", "was", "my", "you", "her", "they", "all", "are", "some", "one", "said", "come", "do", "so", "were", "when", "have", "there", "out", "like", "little", "what",
  
  // Phase 3/5 Words
  "when", "which", "wheel", "white", "whip", "phone", "photo", "dolphin", "alphabet", "graph", "day", "play", "say", "way", "stay", "sea", "eat", "meat", "read", "tea", "high", "night", "light", "bright", "right", "snow", "blow", "show", "slow", "grow", "new", "few", "grew", "chew", "flew", "burn", "turn", "fur", "hurt", "surf", "bird", "girl", "shirt", "skirt", "first", "saw", "paw", "raw", "claw", "jaw", "sauce", "haul", "launch", "author", "august", "boy", "toy", "joy", "royal", "enjoy", "cow", "now", "how", "brown", "down", "air", "hair", "chair", "pair", "fair", "ear", "hear", "dear", "near", "year", "pure", "sure", "cure", "lure", "manure", "these", "eve", "complete", "extreme", "delete", "blue", "glue", "true", "clue", "rescue",

  "am", "is", "it", "an", "big", "wish", "fast", "chip", "stop",
  "anchor", "ant", "apple", "arrow", "at", "axe", "igloo", "in", "ink", "insect", "itch", "nap", "neck", "nest", "net", "nose", "nut", "pan", "pen", "pig", "pin", "pink", "pot", "sand", "sat", "sit", "snake", "spot", "sun", "tap", "ten", "tent", "tin", "top", "turtle",
  "bag", "bat", "bed", "box", "bus", "buzz", "cake", "cap", "cat", "cot", "cup", "dad", "dip", "dog", "drum", "duck", "egg", "elbow", "elf", "envelope", "exit", "fan", "fig", "fish", "fox", "frog", "gap", "gate", "girl", "goat", "gun", "hand", "hat", "hen", "hop", "hut", "jam", "jelly", "jet", "jug", "jump", "kick", "king", "kite", "kitten", "leaf", "leg", "lemon", "lip", "log", "man", "map", "mat", "meat", "milk", "mix", "mug", "octopus", "off", "on", "orange", "ostrich", "rabbit", "rat", "red", "rug", "run", "six", "umbrella", "uncle", "under", "unhappy", "up", "van", "vase", "vest", "vet", "violin", "wall", "watch", "web", "wig", "wind", "yak", "yam", "yellow", "yo-yo", "yogurt", "zebra", "zigzag", "zip", "zoo",
  "bench", "chick", "chin", "chips", "chop", "cloth", "fish", "lung", "moth", "quack", "queen", "quick", "quilt", "quiz", "ring", "sheep", "shell", "ship", "shop", "sing", "strong", "thick", "thin", "thumb",
  "bee", "boat", "coat", "cork", "corn", "dried", "feet", "flies", "fork", "green", "horn", "jeep", "lie", "nail", "pie", "rain", "road", "snail", "soap", "storm", "tail", "tie", "train", "tree", // 'goat' is duplicate
  "boil", "book", "car", "cloud", "coin", "cook", "farm", "foot", "hammer", "house", "ladder", "letter", "mixer", "moon", "mouse", "mouth", "oil", "park", "point", "shark", "shout", "soil", "spoon", "star", "statue", "supper", "tissue", // duplicates like blue, glue, clue removed
  "bike", "bone", "cone", "cube", "five", "fuse", "game", "gate", "globe", "huge", "lake", "mule", "nine", "rope", "rose", "slide", "tube" // duplicates removed
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
