const fs = require('fs');
const https = require('https');
const path = require('path');

// THE MASTER LIST: Level 1 to 6 + Extras
const words = [
  // Level 7: Tricky Words
  "the", "i", "to", "he", "she", "we", "me", "be", "was", "my", "you", "her", "they", "all", "are", "some", "one", "said", "come", "do", "so", "were", "when", "have", "there", "out", "like", "little", "what",
  
  // New Phase 3/5 Words (Expansion)
  "when", "which", "wheel", "white", "whip", // wh
  "phone", "photo", "dolphin", "alphabet", "graph", // ph
  "day", "play", "say", "way", "stay", // ay
  "sea", "eat", "meat", "read", "tea", // ea
  "high", "night", "light", "bright", "right", // igh
  "snow", "blow", "show", "slow", "grow", // ow (long)
  "new", "few", "grew", "chew", "flew", // ew
  "burn", "turn", "fur", "hurt", "surf", // ur
  "bird", "girl", "shirt", "skirt", "first", // ir
  "saw", "paw", "raw", "claw", "jaw", // aw
  "sauce", "haul", "launch", "author", "august", // au
  "boy", "toy", "joy", "royal", "enjoy", // oy
  "cow", "now", "how", "brown", "down", // ow (short)
  "air", "hair", "chair", "pair", "fair", // air
  "ear", "hear", "dear", "near", "year", // ear
  "pure", "sure", "cure", "lure", "manure", // ure
  "these", "eve", "complete", "extreme", "delete", // e-e
  "blue", "glue", "true", "clue", "rescue", // ue

  "am", "is", "it", "an", "as", "big", "wish", "fast", "chip", "stop",
  "anchor", "ant", "apple", "arrow", "at", "axe", "igloo", "in", "ink", "insect", "itch", "nap", "neck", "nest", "net", "nose", "nut", "pan", "pen", "pig", "pin", "pink", "pot", "sand", "sat", "sit", "snake", "spot", "sun", "tap", "ten", "tent", "tin", "top", "turtle",
  "bag", "bat", "bed", "box", "bus", "buzz", "cake", "cap", "cat", "cot", "cup", "dad", "dip", "dog", "drum", "duck", "egg", "elbow", "elf", "envelope", "exit", "fan", "fig", "fish", "fox", "frog", "gap", "gate", "girl", "goat", "gun", "hand", "hat", "hen", "hop", "hut", "jam", "jelly", "jet", "jug", "jump", "kick", "king", "kite", "kitten", "leaf", "leg", "lemon", "lip", "log", "man", "map", "mat", "meat", "milk", "mix", "mug", "octopus", "off", "on", "orange", "ostrich", "rabbit", "rat", "red", "rug", "run", "six", "umbrella", "uncle", "under", "unhappy", "up", "van", "vase", "vest", "vet", "violin", "wall", "watch", "web", "wig", "wind", "yak", "yam", "yellow", "yo-yo", "yogurt", "zebra", "zigzag", "zip", "zoo",
  "bench", "chick", "chin", "chips", "chop", "cloth", "fish", "king", "lung", "moth", "quack", "queen", "quick", "quilt", "quiz", "ring", "sheep", "shell", "ship", "shop", "sing", "strong", "thick", "thin", "thumb",
  "bee", "boat", "coat", "cork", "corn", "dried", "feet", "flies", "fork", "goat", "green", "horn", "jeep", "lie", "nail", "pie", "rain", "road", "snail", "soap", "storm", "tail", "tie", "train", "tree",
  "blue", "boil", "book", "car", "clue", "cloud", "coin", "cook", "farm", "foot", "glue", "hammer", "house", "ladder", "letter", "mixer", "moon", "mouse", "mouth", "oil", "park", "point", "shark", "shout", "soil", "spoon", "star", "statue", "supper", "tissue",
  "bike", "bone", "cake", "cone", "cube", "five", "fuse", "game", "gate", "globe", "huge", "kite", "lake", "mule", "nine", "rope", "rose", "slide", "snake", "tube",
  "as", "nit", "sin", "pit", "spin", "snap", "spit", "pans", "pins", "pants", "ants", "naps", "pits", "tips"
];

const outputDir = path.join(__dirname, '../public/phonics_audio');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const downloadFile = (word) => {
  return new Promise((resolve) => {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=en&client=tw-ob`;
    const filePath = path.join(outputDir, `${word.toLowerCase().replace(/ /g, '_')}.mp3`);
    
    if (fs.existsSync(filePath) && fs.statSync(filePath).size > 0) {
      console.log(`- Skipping (exists): ${word}`);
      return resolve();
    }

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`- Error ${word}: Status ${res.statusCode}`);
        return resolve();
      }

      const file = fs.createWriteStream(filePath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`- Success: ${word}`);
        setTimeout(resolve, 300); // 300ms gap
      });
    }).on('error', (err) => {
      console.error(`- Error ${word}: ${err.message}`);
      resolve();
    });
  });
};

const run = async () => {
  console.log("🚀 STARTING ROBUST PHONICS SNATCH...");
  const uniqueWords = [...new Set(words)];
  for (let i = 0; i < uniqueWords.length; i++) {
    process.stdout.write(`[${i + 1}/${uniqueWords.length}] `);
    await downloadFile(uniqueWords[i]);
  }
  console.log("✅ FINISHED!");
};

run();
