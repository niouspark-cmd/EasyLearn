// Letter Sound Image Library
// Comic-style illustrations for each letter with target letter highlighted

interface LetterImage {
  letter: string;
  word: string;
  imageUrl: string;
  description: string;
  highlightPositions: number[]; // Array of character positions to highlight
}

export const LETTER_IMAGES: Record<string, LetterImage> = {
  's': {
    letter: 's',
    word: 'snake',
    imageUrl: 'https://images.pexels.com/photos/175255/pexels-photo-175255.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    description: 'A friendly snake with a big smile',
    highlightPositions: [0] // 's'nake - highlight first letter
  },
  'a': {
    letter: 'a',
    word: 'apple',
    imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    description: 'A bright red apple on a tree',
    highlightPositions: [0] // 'a'pple - highlight first letter
  },
  't': {
    letter: 't',
    word: 'turtle',
    imageUrl: 'https://images.pexels.com/photos/162349/turtle-green-sea-turtle-tortoise-caribbean-162349.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    description: 'A cute turtle with a patterned shell',
    highlightPositions: [0] // 't'urtle - highlight first letter
  },
  'p': {
    letter: 'p',
    word: 'panda',
    imageUrl: 'https://images.pexels.com/photos/1661005/pexels-photo-1661005.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    description: 'A playful panda bear eating bamboo',
    highlightPositions: [0] // 'p'anda - highlight first letter
  },
  'i': {
    letter: 'i',
    word: 'igloo',
    imageUrl: 'https://images.pexels.com/photos/326629/pexels-photo-326629.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    description: 'A cozy igloo in the snow',
    highlightPositions: [0] // 'i'gloo - highlight first letter
  },
  'n': {
    letter: 'n',
    word: 'nest',
    imageUrl: 'https://images.pexels.com/photos/459113/pexels-photo-459113.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&dpr=1',
    description: 'A bird\'s nest with eggs',
    highlightPositions: [0] // 'n'est - highlight first letter
  },
  'b': {
    letter: 'b',
    word: 'ball',
    imageUrl: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=300&h=300&fit=crop&crop=center',
    description: 'A colorful bouncing ball',
    highlightPositions: [0] // 'b'all - highlight first letter
  },
  'c': {
    letter: 'c',
    word: 'cat',
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=center',
    description: 'A fluffy cat with bright eyes',
    highlightPositions: [0] // 'c'at - highlight first letter
  },
  'd': {
    letter: 'd',
    word: 'dog',
    imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop&crop=center',
    description: 'A happy dog with floppy ears',
    highlightPositions: [0] // 'd'og - highlight first letter
  },
  'e': {
    letter: 'e',
    word: 'elephant',
    imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=300&h=300&fit=crop&crop=center',
    description: 'A gentle elephant with big ears',
    highlightPositions: [0] // 'e'lephant - highlight first letter
  },
  'f': {
    letter: 'f',
    word: 'fish',
    imageUrl: 'https://images.unsplash.com/photo-1517512147212-0a357e38c9ff?w=300&h=300&fit=crop&crop=center',
    description: 'A colorful fish swimming underwater',
    highlightPositions: [0] // 'f'ish - highlight first letter
  },
  'g': {
    letter: 'g',
    word: 'giraffe',
    imageUrl: 'https://images.unsplash.com/photo-1534619170225-5d4c50f02f0a?w=300&h=300&fit=crop&crop=center',
    description: 'A tall giraffe with spotted pattern',
    highlightPositions: [0] // 'g'iraffe - highlight first letter
  },
  'h': {
    letter: 'h',
    word: 'house',
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=300&fit=crop&crop=center',
    description: 'A cozy house with a chimney',
    highlightPositions: [0] // 'h'ouse - highlight first letter
  },
  'j': {
    letter: 'j',
    word: 'jellyfish',
    imageUrl: 'https://images.unsplash.com/photo-1568777037516-99552d2df8b4?w=300&h=300&fit=crop&crop=center',
    description: 'A glowing jellyfish in blue water',
    highlightPositions: [0] // 'j'ellyfish - highlight first letter
  },
  'k': {
    letter: 'k',
    word: 'kite',
    imageUrl: 'https://images.unsplash.com/photo-1583336663277-620dc1996580?w=300&h=300&fit=crop&crop=center',
    description: 'A colorful kite flying in the sky',
    highlightPositions: [0] // 'k'ite - highlight first letter
  },
  'l': {
    letter: 'l',
    word: 'lion',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=300&h=300&fit=crop&crop=center',
    description: 'A majestic lion with a mane',
    highlightPositions: [0] // 'l'ion - highlight first letter
  },
  'm': {
    letter: 'm',
    word: 'monkey',
    imageUrl: 'https://images.unsplash.com/photo-1552728089-57b28c1d685d?w=300&h=300&fit=crop&crop=center',
    description: 'A playful monkey in a tree',
    highlightPositions: [0] // 'm'onkey - highlight first letter
  },
  'o': {
    letter: 'o',
    word: 'octopus',
    imageUrl: 'https://images.unsplash.com/photo-1535591273668-57809d7928f4?w=300&h=300&fit=crop&crop=center',
    description: 'An octopus with eight wiggly arms',
    highlightPositions: [0] // 'o'ctopus - highlight first letter
  },
  'q': {
    letter: 'q',
    word: 'queen',
    imageUrl: 'https://images.unsplash.com/photo-1511882150382-421056c89033?w=300&h=300&fit=crop&crop=center',
    description: 'A queen with a golden crown',
    highlightPositions: [0] // 'q'ueen - highlight first letter
  },
  'r': {
    letter: 'r',
    word: 'rabbit',
    imageUrl: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=300&h=300&fit=crop&crop=center',
    description: 'A fluffy rabbit with long ears',
    highlightPositions: [0] // 'r'abbit - highlight first letter
  },
  'u': {
    letter: 'u',
    word: 'umbrella',
    imageUrl: 'https://images.unsplash.com/photo-1596873800509-8f001d6e928b?w=300&h=300&fit=crop&crop=center',
    description: 'A rainbow umbrella keeping dry',
    highlightPositions: [0] // 'u'mbrella - highlight first letter
  },
  'v': {
    letter: 'v',
    word: 'violin',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
    description: 'A wooden violin with strings',
    highlightPositions: [0] // 'v'iolin - highlight first letter
  },
  'w': {
    letter: 'w',
    word: 'whale',
    imageUrl: 'https://images.unsplash.com/photo-1563904094685-9963e4f0c1ce?w=300&h=300&fit=crop&crop=center',
    description: 'A huge whale swimming in ocean',
    highlightPositions: [0] // 'w'hale - highlight first letter
  },
  'x': {
    letter: 'x',
    word: 'xylophone',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=300&h=300&fit=crop&crop=center',
    description: 'A colorful xylophone with bars',
    highlightPositions: [0] // 'x'ylophone - highlight first letter
  },
  'y': {
    letter: 'y',
    word: 'yacht',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=300&h=300&fit=crop&crop=center',
    description: 'A sailing yacht on blue water',
    highlightPositions: [0] // 'y'acht - highlight first letter
  },
  'z': {
    letter: 'z',
    word: 'zebra',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop&crop=center',
    description: 'A zebra with black and white stripes',
    highlightPositions: [0] // 'z'ebra - highlight first letter
  }
};

// Function to get image data for a letter
export const getLetterImage = (letter: string): LetterImage | null => {
  return LETTER_IMAGES[letter.toLowerCase()] || null;
};

// Function to highlight specific letters in a word
export const highlightWord = (word: string, positions: number[]): string => {
  return word.split('').map((char, index) => {
    if (positions.includes(index)) {
      return `<span class="highlighted-letter">${char}</span>`;
    }
    return char;
  }).join('');
};