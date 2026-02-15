const fs = require('fs');
const https = require('https');
const path = require('path');

// THE MASTER LIST: Level 1 to 6 + Extras
const words = [
  // Level 7: Tricky Words
  "the", "to", "he", "she", "we", "me", "be", "was", "my", "you", "her", "they", "all", "are", "some", "one", "said", "come", "do", "so", "were", "when", "have", "there", "out", "like", "little", "what",
  "am", "is", "it", "an", "big", "wish", "fast", "chip", "stop",
  "anchor", "ant", "apple", "arrow", "at", "axe", "igloo", "in", "ink", "insect", "itch", "nap", "neck", "nest", "net", "nose", "nut", "pan", "pen", "pig", "pin", "pink", "pot", "sand", "sat", "sit", "snake", "spot", "sun", "tap", "ten", "tent", "tin", "top", "turtle",
  "bag", "bat", "bed", "box", "bus", "buzz", "cake", "cap", "cat", "cot", "cup", "dad", "dip", "dog", "drum", "duck", "egg", "elbow", "elf", "envelope", "exit", "fan", "fig", "fish", "fox", "frog", "gap", "gate", "girl", "goat", "gun", "hand", "hat", "hen", "hop", "hut", "jam", "jelly", "jet", "jug", "jump", "kick", "king", "kite", "kitten", "leaf", "leg", "lemon", "lip", "log", "man", "map", "mat", "meat", "milk", "mix", "mug", "octopus", "off", "on", "orange", "ostrich", "rabbit", "rat", "red", "rug", "run", "six", "umbrella", "uncle", "under", "unhappy", "up", "van", "vase", "vest", "vet", "violin", "wall", "watch", "web", "wig", "wind", "yak", "yam", "yellow", "yo-yo", "yogurt", "zebra", "zigzag", "zip", "zoo",
  "bench", "chick", "chin", "chips", "chop", "cloth", "fish", "king", "lung", "moth", "quack", "queen", "quick", "quilt", "quiz", "ring", "sheep", "shell", "ship", "shop", "sing", "strong", "thick", "thin", "thumb",
  "bee", "boat", "coat", "cork", "corn", "dried", "feet", "flies", "fork", "goat", "green", "horn", "jeep", "lie", "nail", "pie", "rain", "road", "snail", "soap", "storm", "tail", "tie", "train", "tree",
  "blue", "boil", "book", "car", "clue", "cloud", "coin", "cook", "farm", "foot", "glue", "hammer", "house", "ladder", "letter", "mixer", "moon", "mouse", "mouth", "oil", "park", "point", "shark", "shout", "soil", "spoon", "star", "statue", "supper", "tissue",
  "bike", "bone", "cake", "cone", "cube", "five", "fuse", "game", "gate", "globe", "huge", "kite", "lake", "mule", "nine", "rope", "rose", "slide", "snake", "tube"
];

const outputDir = path.join(__dirname, '../public/phonics_audio');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const download = (word, index) => {
  // High quality Google Dictionary CDN (Human voice, consistent)
  // FIXED URL: added missing /translate_tts?ie=UTF-8&q= and template literal syntax
  const url = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(word)}&tl=en&client=tw-ob`;
  const filePath = path.join(outputDir, `${word.toLowerCase().replace(/ /g, '_')}.mp3`);
  
  // Skip if already exists to save time/bandwidth
  if (fs.existsSync(filePath)) {
    console.log(`[${index + 1}/${words.length}] Skipping (exists): ${word}`);
    return;
  }

  const file = fs.createWriteStream(filePath);

  setTimeout(() => {
    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        console.error(`Error ${word}: Status Code ${res.statusCode}`);
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`[${index + 1}/${words.length}] Success: ${word}`);
      });
    }).on('error', (err) => {
      fs.unlink(filePath, () => {}); // Delete empty file
      console.error(`Error ${word}:`, err.message);
    });
  }, index * 400); // 400ms delay to be safe
};

console.log("🚀 STARTING ULTIMATE PHONICS SNATCH...");
words.forEach((word, i) => download(word, i));
