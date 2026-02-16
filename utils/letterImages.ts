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
    imageUrl: '/assets/images/words/snake.png',
    description: 'A friendly snake with a big smile',
    highlightPositions: [0]
  },
  'a': {
    letter: 'a',
    word: 'apple',
    imageUrl: '/assets/images/words/apple.png',
    description: 'A bright red apple on a tree',
    highlightPositions: [0]
  },
  't': {
    letter: 't',
    word: 'tent',
    imageUrl: '/assets/images/words/tent.png',
    description: 'A camping tent',
    highlightPositions: [0]
  },
  'p': {
    letter: 'p',
    word: 'pig',
    imageUrl: '/assets/images/words/pig.png',
    description: 'A pink pig',
    highlightPositions: [0]
  },
  'i': {
    letter: 'i',
    word: 'igloo',
    imageUrl: '/assets/images/words/igloo.png',
    description: 'A cozy igloo in the snow',
    highlightPositions: [0]
  },
  'n': {
    letter: 'n',
    word: 'nest',
    imageUrl: '/assets/images/words/nest.png',
    description: 'A bird\'s nest',
    highlightPositions: [0]
  },
  'b': {
    letter: 'b',
    word: 'bag',
    imageUrl: '/assets/images/words/bag.png',
    description: 'A school bag',
    highlightPositions: [0]
  },
  'c': {
    letter: 'c',
    word: 'cat',
    imageUrl: '/assets/images/words/cat.png',
    description: 'A fluffy cat',
    highlightPositions: [0]
  },
  'd': {
    letter: 'd',
    word: 'dog',
    imageUrl: '/assets/images/words/dog.png',
    description: 'A happy dog',
    highlightPositions: [0]
  },
  'e': {
    letter: 'e',
    word: 'egg',
    imageUrl: '/assets/images/words/egg.png',
    description: 'A cracking egg',
    highlightPositions: [0]
  },
  'f': {
    letter: 'f',
    word: 'fish',
    imageUrl: '/assets/images/words/fish.png',
    description: 'A colorful fish',
    highlightPositions: [0]
  },
  'g': {
    letter: 'g',
    word: 'goat',
    imageUrl: '/assets/images/words/goat.png',
    description: 'A farm goat',
    highlightPositions: [0]
  },
  'h': {
    letter: 'h',
    word: 'hat',
    imageUrl: '/assets/images/words/hat.png',
    description: 'A sun hat',
    highlightPositions: [0]
  },
  'j': {
    letter: 'j',
    word: 'jam',
    imageUrl: '/assets/images/words/jam.png',
    description: 'A jar of jam',
    highlightPositions: [0]
  },
  'k': {
    letter: 'k',
    word: 'kite',
    imageUrl: '/assets/images/words/kite.png',
    description: 'A flying kite',
    highlightPositions: [0]
  },
  'l': {
    letter: 'l',
    word: 'leg',
    imageUrl: '/assets/images/words/leg.png',
    description: 'A leg',
    highlightPositions: [0]
  },
  'm': {
    letter: 'm',
    word: 'map',
    imageUrl: '/assets/images/words/map.png',
    description: 'A treasure map',
    highlightPositions: [0]
  },
  'o': {
    letter: 'o',
    word: 'octopus',
    imageUrl: '/assets/images/words/octopus.png',
    description: 'An octopus',
    highlightPositions: [0]
  },
  'q': {
    letter: 'q',
    word: 'queen',
    imageUrl: '/assets/images/words/queen.png',
    description: 'A queen',
    highlightPositions: [0]
  },
  'r': {
    letter: 'r',
    word: 'rat',
    imageUrl: '/assets/images/words/rat.png',
    description: 'A fast rat',
    highlightPositions: [0]
  },
  'u': {
    letter: 'u',
    word: 'umbrella',
    imageUrl: '/assets/images/words/umbrella.png',
    description: 'A rain umbrella',
    highlightPositions: [0]
  },
  'v': {
    letter: 'v',
    word: 'van',
    imageUrl: '/assets/images/words/van.png',
    description: 'A delivery van',
    highlightPositions: [0]
  },
  'w': {
    letter: 'w',
    word: 'web',
    imageUrl: '/assets/images/words/web.png',
    description: 'A spider web',
    highlightPositions: [0]
  },
  'x': {
    letter: 'x',
    word: 'box',
    imageUrl: '/assets/images/words/box.png',
    description: 'A cardboard box',
    highlightPositions: [2]
  },
  'y': {
    letter: 'y',
    word: 'yogurt',
    imageUrl: '/assets/images/words/yogurt.png',
    description: 'A cup of yogurt',
    highlightPositions: [0]
  },
  'z': {
    letter: 'z',
    word: 'zip',
    imageUrl: '/assets/images/words/zip.png',
    description: 'A zipper',
    highlightPositions: [0]
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

/**
 * Get the local offline image for a specific word.
 * Uses the ARASAAC symbols downloaded to /public/assets/images/words/
 */
export const getWordImage = (word: string): string => {
    const lowerWord = word.toLowerCase().trim();
    
    // EXCLUDE TRIGRAPH EXAMPLES (User Request)
    const excluded = ['high', 'ear', 'pure', 'hair', 'air', 'hear'];
    if (excluded.includes(lowerWord)) {
        return ''; 
    }

    // Return relative path from public folder
    return `/assets/images/words/${lowerWord}.png`;
};
