
export interface LessonItem {
  grapheme: string;
  sound?: string; // For reference/audio mapping
  words: string[];
}

export interface CurriculumLevel {
  id: number;
  title: string;
  subtitle: string;
  type: 'phonic' | 'blending' | 'magic-e' | 'tricky-words' | 'sentences';
  data?: LessonItem[];
  color?: string;
  icon?: string;
}

export const CURRICULUM_DATA: CurriculumLevel[] = [
  {
    id: 1,
    title: 'Level 1: Golden Letters (SATPIN)',
    subtitle: 'The first 6 sounds to start building words.',
    type: 'phonic',
    color: '#fb9610',
    data: [
      { grapheme: 's', words: ['sat', 'sit', 'sun', 'spot', 'snake', 'sand'] },
      { grapheme: 'a', words: ['ant', 'apple', 'at', 'axe', 'arrow', 'anchor'] },
      { grapheme: 't', words: ['tap', 'tin', 'ten', 'top', 'tent', 'turtle'] },
      { grapheme: 'p', words: ['pan', 'pig', 'pot', 'pen', 'pin', 'pink'] },
      { grapheme: 'i', words: ['ink', 'in', 'igloo', 'insect', 'itch'] },
      { grapheme: 'n', words: ['net', 'nut', 'nest', 'nap', 'neck', 'nose'] }
    ]
  },
  {
    id: 2,
    title: 'Level 2: The Alphabet (CVC)',
    subtitle: 'Completing the single sounds.',
    type: 'phonic',
    color: '#022d62',
    data: [
      { grapheme: 'c', words: ['cat', 'cup', 'cot', 'cap', 'cake', 'kite'] },
      { grapheme: 'k', words: ['king', 'kick', 'kite', 'kitten'] },
      { grapheme: 'e', words: ['egg', 'elf', 'elbow', 'envelope', 'exit'] },
      { grapheme: 'h', words: ['hat', 'hen', 'hop', 'hut', 'hand'] },
      { grapheme: 'r', words: ['rat', 'run', 'rug', 'red', 'rabbit'] },
      { grapheme: 'm', words: ['mat', 'man', 'mug', 'map', 'milk'] },
      { grapheme: 'd', words: ['dog', 'dad', 'dip', 'duck', 'drum'] },
      { grapheme: 'g', words: ['gap', 'gun', 'goat', 'gate', 'girl'] },
      { grapheme: 'o', words: ['on', 'off', 'octopus', 'orange', 'ostrich'] },
      { grapheme: 'u', words: ['up', 'umbrella', 'under', 'uncle', 'unhappy'] },
      { grapheme: 'l', words: ['log', 'leg', 'lip', 'leaf', 'lemon'] },
      { grapheme: 'f', words: ['fan', 'fig', 'fish', 'fox', 'frog'] },
      { grapheme: 'b', words: ['bat', 'bag', 'bed', 'bus', 'box'] },
      { grapheme: 'j', words: ['jam', 'jet', 'jug', 'jelly', 'jump'] },
      { grapheme: 'z', words: ['zip', 'zoo', 'zebra', 'zigzag', 'buzz'] },
      { grapheme: 'w', words: ['web', 'wind', 'wig', 'wall', 'watch'] },
      { grapheme: 'v', words: ['van', 'vest', 'vet', 'vase', 'violin'] },
      { grapheme: 'y', words: ['yak', 'yam', 'yellow', 'yo-yo', 'yogurt'] },
      { grapheme: 'x', words: ['box', 'fox', 'six', 'axe', 'mix'] }
    ]
  },
  {
    id: 3,
    title: 'Level 3: Digraphs',
    subtitle: 'Two letters, one sound.',
    type: 'phonic',
    color: '#10b981',
    data: [
      { grapheme: 'sh', words: ['ship', 'shop', 'fish', 'shell', 'sheep'] },
      { grapheme: 'ch', words: ['chop', 'chin', 'chick', 'chips', 'bench'] },
      { grapheme: 'th', words: ['thin', 'thick', 'moth', 'cloth', 'thumb'] },
      { grapheme: 'ng', words: ['ring', 'king', 'lung', 'strong', 'sing'] },
      { grapheme: 'qu', words: ['queen', 'quick', 'quilt', 'quiz', 'quack'] },
      { grapheme: 'wh', words: ['wheel', 'when', 'whip', 'white', 'which'] },
      { grapheme: 'ph', words: ['photo', 'dolphin', 'phone', 'alphabet', 'graph'] }
    ]
  },
  {
    id: 4,
    title: 'Level 4: Vowel Teams',
    subtitle: 'When two vowels go walking...',
    type: 'phonic',
    color: '#f59e0b',
    data: [
      { grapheme: 'ai', words: ['rain', 'train', 'snail', 'tail', 'nail'] },
      { grapheme: 'ay', words: ['day', 'play', 'say', 'way', 'stay'] },
      { grapheme: 'oa', words: ['boat', 'goat', 'coat', 'soap', 'road'] },
      { grapheme: 'oe', words: ['toe', 'foe', 'potatoes', 'tomatoes'] },
      { grapheme: 'ie', words: ['pie', 'tie', 'lie', 'flies', 'dried'] },
      { grapheme: 'ee', words: ['tree', 'bee', 'feet', 'green', 'jeep'] },
      { grapheme: 'ea', words: ['sea', 'meat', 'read', 'tea', 'eat'] },
      { grapheme: 'or', words: ['fork', 'corn', 'cork', 'horn', 'storm'] }
    ]
  },
  {
    id: 5,
    title: 'Level 5: Other Sounds',
    subtitle: 'More complex vowel sounds.',
    type: 'phonic',
    color: '#8b5cf6',
    data: [
      { grapheme: 'oo', words: ['book', 'cook', 'foot', 'moon', 'spoon'] },
      { grapheme: 'ou', words: ['cloud', 'mouth', 'mouse', 'house', 'shout'] },
      { grapheme: 'ow', words: ['cow', 'now', 'how', 'brown', 'down'] },
      { grapheme: 'oi', words: ['coin', 'boil', 'oil', 'soil', 'point'] },
      { grapheme: 'oy', words: ['boy', 'toy', 'joy', 'royal', 'enjoy'] },
      { grapheme: 'ue', words: ['glue', 'blue', 'clue', 'tissue', 'statue'] },
      { grapheme: 'ew', words: ['new', 'few', 'grew', 'chew', 'flew'] },
      { grapheme: 'er', words: ['mixer', 'letter', 'hammer', 'ladder', 'supper'] },
      { grapheme: 'ir', words: ['bird', 'girl', 'shirt', 'skirt', 'first'] },
      { grapheme: 'ur', words: ['burn', 'turn', 'fur', 'hurt', 'surf'] },
      { grapheme: 'ar', words: ['car', 'park', 'star', 'shark', 'farm'] },
      { grapheme: 'au', words: ['paul', 'launch', 'haul', 'author', 'august'] },
      { grapheme: 'aw', words: ['saw', 'paw', 'raw', 'claw', 'jaw'] }
    ]
  },
  {
    id: 6,
    title: 'Level 6: Magic E',
    subtitle: 'The E makes the vowel say its name.',
    type: 'magic-e',
    color: '#ec4899',
    data: [
      { grapheme: 'a-e', words: ['cake', 'snake', 'game', 'gate', 'lake'] },
      { grapheme: 'e-e', words: ['eve', 'these', 'complete', 'extreme', 'delete'] },
      { grapheme: 'i-e', words: ['bike', 'kite', 'five', 'nine', 'slide'] },
      { grapheme: 'o-e', words: ['bone', 'rose', 'cone', 'globe', 'rope'] },
      { grapheme: 'u-e', words: ['cube', 'tube', 'mule', 'fuse', 'huge'] }
    ]
  },
  {
    id: 7,
    title: 'Level 7: Trigraphs',
    subtitle: 'Three letters, one sound.',
    type: 'phonic',
    color: '#d946ef',
    data: [
      { grapheme: 'igh', words: ['high', 'night', 'light', 'bright', 'right'] },
      { grapheme: 'air', words: ['hair', 'chair', 'pair', 'fair', 'air'] },
      { grapheme: 'ear', words: ['hear', 'ear', 'dear', 'near', 'year'] },
      { grapheme: 'ure', words: ['pure', 'sure', 'cure', 'lure', 'manure'] }
    ]
  },
  {
    id: 8,
    title: 'Phase 4: Blends',
    subtitle: 'Blending adjacent consonants.',
    type: 'blending',
    color: '#06b6d4',
    data: [
      { grapheme: 'st', words: ['stop', 'step', 'star', 'fist', 'nest'] },
      { grapheme: 'nd', words: ['sand', 'hand', 'band', 'pond', 'wind'] },
      { grapheme: 'mp', words: ['lamp', 'jump', 'camp', 'pump', 'damp'] },
      { grapheme: 'nt', words: ['tent', 'ant', 'hunt', 'sent', 'mint'] },
      { grapheme: 'nk', words: ['pink', 'sink', 'bunk', 'tank', 'wink'] },
      { grapheme: 'ft', words: ['lift', 'loft', 'soft', 'tuft', 'left'] },
      { grapheme: 'sk', words: ['skip', 'desk', 'mask', 'tusk', 'ask'] },
      { grapheme: 'lt', words: ['belt', 'melt', 'tilt', 'felt', 'kilt'] },
      { grapheme: 'br', words: ['brick', 'brush', 'crab', 'crib', 'trap'] } // Mixing some start blends
    ]
  },
  {
    id: 9,
    title: 'Tricky Words (Phase 3-5)',
    subtitle: 'Words you just have to know.',
    type: 'tricky-words',
    color: '#ef4444',
    data: [
      { grapheme: 'Phase 3', words: ['he', 'she', 'we', 'me', 'be', 'was', 'you', 'they', 'all', 'are', 'my', 'her'] },
      { grapheme: 'Phase 4', words: ['said', 'have', 'like', 'so', 'do', 'some', 'come', 'were', 'there', 'little', 'one', 'when', 'out', 'what'] },
      { grapheme: 'Phase 5', words: ['oh', 'their', 'people', 'looked', 'called', 'asked', 'could', 'about'] }
    ]
  }
];
