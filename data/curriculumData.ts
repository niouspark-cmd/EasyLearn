
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
  blend2?: string[];
  blend3?: string[];
  blend4?: string[];
  color?: string;
  icon?: string;
}

export const CURRICULUM_DATA: CurriculumLevel[] = [
  {
    id: 1,
    title: 'Group 1: s a t p i n',
    subtitle: 'The first 6 sounds for your child.',
    type: 'phonic',
    color: '#fb9610',
    data: [
      { grapheme: 's', words: ['sat', 'sit', 'sap', 'sip', 'spin', 'sin'] },
      { grapheme: 'a', words: ['ant', 'at', 'an', 'as', 'asp'] },
      { grapheme: 't', words: ['tap', 'tin', 'tip', 'tan', 'pat'] },
      { grapheme: 'p', words: ['pan', 'pin', 'pat', 'pit', 'pip', 'tap'] },
      { grapheme: 'i', words: ['in', 'is', 'it', 'its', 'sit'] },
      { grapheme: 'n', words: ['nap', 'nip', 'nit', 'nan', 'snap', 'pan'] }
    ],
    blend2: ['is', 'at', 'in', 'as', 'an', 'it'],
    blend3: ['sat', 'nit', 'pin', 'tin', 'tap', 'sin', 'pit', 'pan'],
    blend4: ['spin', 'snap', 'spit', 'pans', 'pins', 'pants', 'ants', 'naps', 'pits', 'tips']
  },
  {
    id: 2,
    title: 'Group 2: Alphabet Sounds',
    subtitle: 'Completing the single letter sounds.',
    type: 'phonic',
    color: '#022d62',
    data: [
      { grapheme: 'c', words: ['cat', 'cup', 'cot', 'cap', 'can'] },
      { grapheme: 'k', words: ['kit', 'kid', 'kin', 'kick'] },
      { grapheme: 'e', words: ['egg', 'elf', 'elbow', 'end', 'exit'] },
      { grapheme: 'h', words: ['hat', 'hen', 'hop', 'hut', 'hand'] },
      { grapheme: 'r', words: ['rat', 'run', 'rug', 'red', 'rip'] },
      { grapheme: 'm', words: ['mat', 'man', 'mug', 'map', 'mom'] },
      { grapheme: 'd', words: ['dog', 'dad', 'dip', 'duck', 'drum'] },
      { grapheme: 'g', words: ['gap', 'gum', 'got', 'gas', 'pig'] },
      { grapheme: 'o', words: ['on', 'off', 'pot', 'top', 'hot'] },
      { grapheme: 'u', words: ['up', 'sun', 'mud', 'bug', 'run'] },
      { grapheme: 'l', words: ['log', 'leg', 'lip', 'lap', 'let'] },
      { grapheme: 'f', words: ['fan', 'fig', 'fit', 'fog', 'fun'] },
      { grapheme: 'b', words: ['bat', 'bag', 'bed', 'bus', 'box'] },
      { grapheme: 'j', words: ['jam', 'jet', 'jug', 'job', 'jog'] },
      { grapheme: 'z', words: ['zip', 'zag', 'zig', 'fuzz', 'buzz'] },
      { grapheme: 'w', words: ['web', 'wig', 'wet', 'win', 'wag'] },
      { grapheme: 'v', words: ['van', 'vet', 'vim', 'vat'] },
      { grapheme: 'y', words: ['yak', 'yam', 'yes', 'yet', 'yell'] },
      { grapheme: 'x', words: ['box', 'fox', 'six', 'tax', 'mix'] }
    ]
  },
  {
    id: 3,
    title: 'Group 3: Digraphs',
    subtitle: 'Two letters, one sound.',
    type: 'phonic',
    color: '#10b981',
    data: [
      { grapheme: 'sh', words: ['ship', 'shop', 'fish', 'wish', 'dash'] },
      { grapheme: 'ch', words: ['chop', 'chin', 'chick', 'rich', 'much'] },
      { grapheme: 'th', words: ['thin', 'moth', 'cloth', 'with', 'bath'] },
      { grapheme: 'ng', words: ['ring', 'king', 'long', 'song', 'sing'] },
      { grapheme: 'qu', words: ['quick', 'quit', 'quiz', 'quack'] },
      { grapheme: 'wh', words: ['when', 'whip', 'which', 'whiz'] },
      { grapheme: 'ph', words: ['graph', 'dolphin', 'phone', 'alpha'] }
    ]
  },
  {
    id: 4,
    title: 'Group 4: Vowel Teams',
    subtitle: 'Two vowels working together.',
    type: 'phonic',
    color: '#f59e0b',
    data: [
      { grapheme: 'ai', words: ['rain', 'wait', 'tail', 'nail', 'main'] },
      { grapheme: 'ay', words: ['day', 'play', 'say', 'may', 'tray'] },
      { grapheme: 'oa', words: ['boat', 'goat', 'coat', 'soap', 'road'] },
      { grapheme: 'oe', words: ['toe', 'doe', 'hoe', 'joe'] },
      { grapheme: 'ie', words: ['pie', 'tie', 'lie', 'die'] },
      { grapheme: 'ee', words: ['tree', 'bee', 'feet', 'meet', 'keep'] },
      { grapheme: 'ea', words: ['sea', 'meat', 'read', 'tea', 'each'] },
      { grapheme: 'or', words: ['fork', 'corn', 'born', 'horn', 'sport'] }
    ]
  },
  {
    id: 5,
    title: 'Group 5: Special Sounds',
    subtitle: 'More sounds to learn.',
    type: 'phonic',
    color: '#8b5cf6',
    data: [
      { grapheme: 'oo', words: ['book', 'cook', 'foot', 'look', 'good'] },
      { grapheme: 'ou', words: ['cloud', 'found', 'round', 'shout', 'mouth'] },
      { grapheme: 'ow', words: ['cow', 'now', 'how', 'down', 'town'] },
      { grapheme: 'oi', words: ['coin', 'boil', 'oil', 'soil', 'join'] },
      { grapheme: 'oy', words: ['boy', 'toy', 'joy', 'enjoy'] },
      { grapheme: 'ue', words: ['glue', 'blue', 'clue', 'true'] },
      { grapheme: 'ew', words: ['new', 'few', 'grew', 'flew', 'stew'] },
      { grapheme: 'er', words: ['mixer', 'letter', 'hammer', 'longer', 'better'] },
      { grapheme: 'ir', words: ['bird', 'girl', 'shirt', 'skirt', 'third'] },
      { grapheme: 'ur', words: ['burn', 'turn', 'fur', 'hurt', 'surf'] },
      { grapheme: 'ar', words: ['car', 'park', 'star', 'farm', 'hard'] },
      { grapheme: 'au', words: ['haul', 'fault', 'haunt', 'launch'] },
      { grapheme: 'aw', words: ['saw', 'paw', 'raw', 'claw', 'draw'] }
    ]
  },
  {
    id: 6,
    title: 'Group 6: Magic E',
    subtitle: 'The silent e makes magic.',
    type: 'magic-e',
    color: '#ec4899',
    data: [
      { grapheme: 'a-e', words: ['cake', 'snake', 'game', 'gate', 'lake'] },
      { grapheme: 'e-e', words: ['eve', 'these', 'pete', 'gene'] },
      { grapheme: 'i-e', words: ['bike', 'kite', 'five', 'nine', 'slide'] },
      { grapheme: 'o-e', words: ['bone', 'rose', 'cone', 'home', 'rope'] },
      { grapheme: 'u-e', words: ['cube', 'tube', 'mule', 'huge', 'rule'] }
    ]
  },
  {
    id: 7,
    title: 'Group 7: Trigraphs',
    subtitle: 'Three letters, one sound.',
    type: 'phonic',
    color: '#d946ef',
    data: [
      { grapheme: 'igh', words: ['high', 'night', 'light', 'might', 'sight'] },
      { grapheme: 'air', words: ['hair', 'fair', 'pair', 'pair', 'air'] },
      { grapheme: 'ear', words: ['hear', 'ear', 'dear', 'near', 'fear'] },
      { grapheme: 'ure', words: ['pure', 'sure', 'cure', 'lure'] }
    ]
  },
  {
    id: 8,
    title: 'Phase 4: Blends',
    subtitle: 'Blending adjacent consonants.',
    type: 'blending',
    color: '#06b6d4',
    data: [
      { grapheme: 'st', words: ['stop', 'step', 'star', 'fast', 'best'] },
      { grapheme: 'nd', words: ['sand', 'hand', 'band', 'pond', 'end'] },
      { grapheme: 'mp', words: ['lamp', 'jump', 'camp', 'pump', 'dump'] },
      { grapheme: 'nt', words: ['tent', 'ant', 'hunt', 'sent', 'mint'] },
      { grapheme: 'nk', words: ['pink', 'sink', 'bunk', 'tank', 'bank'] },
      { grapheme: 'ft', words: ['lift', 'loft', 'soft', 'gift', 'left'] },
      { grapheme: 'sk', words: ['skip', 'desk', 'mask', 'task', 'ask'] },
      { grapheme: 'lt', words: ['belt', 'melt', 'tilt', 'felt', 'guilt'] },
      { grapheme: 'br', words: ['brick', 'brush', 'bring', 'brass'] }
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
