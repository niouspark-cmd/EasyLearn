
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
      { grapheme: 'qu', words: ['queen', 'quick', 'quilt', 'quiz', 'quack'] }
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
      { grapheme: 'oa', words: ['boat', 'goat', 'coat', 'soap', 'road'] },
      { grapheme: 'ie', words: ['pie', 'tie', 'lie', 'flies', 'dried'] },
      { grapheme: 'ee', words: ['tree', 'bee', 'feet', 'green', 'jeep'] },
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
      { grapheme: 'oi', words: ['coin', 'boil', 'oil', 'soil', 'point'] },
      { grapheme: 'ue', words: ['glue', 'blue', 'clue', 'tissue', 'statue'] },
      { grapheme: 'er', words: ['mixer', 'letter', 'hammer', 'ladder', 'supper'] },
      { grapheme: 'ar', words: ['car', 'park', 'star', 'shark', 'farm'] }
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
      { grapheme: 'i-e', words: ['bike', 'kite', 'five', 'nine', 'slide'] },
      { grapheme: 'o-e', words: ['bone', 'rose', 'cone', 'globe', 'rope'] },
      { grapheme: 'u-e', words: ['cube', 'tube', 'mule', 'fuse', 'huge'] }
    ]
  },
  {
    id: 7,
    title: 'Level 7: Tricky Words',
    subtitle: 'Words you just have to know.',
    type: 'tricky-words',
    color: '#ef4444',
    data: [
      { grapheme: 'Set A', words: ['the', 'I', 'to', 'he', 'she', 'we'] },
      { grapheme: 'Set B', words: ['me', 'be', 'was', 'my', 'you', 'her'] },
      { grapheme: 'Set C', words: ['they', 'all', 'are', 'some', 'one', 'said'] },
      { grapheme: 'Set D', words: ['come', 'do', 'so', 'were', 'when', 'have'] },
      { grapheme: 'Set E', words: ['there', 'out', 'like', 'little', 'what'] }
    ]
  }
];
