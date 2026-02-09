
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

// Fix __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Load envs from root
dotenv.config({ path: path.join(ROOT_DIR, '.env') });
dotenv.config({ path: path.join(ROOT_DIR, '.env.local') });

const apiKey = process.env.VITE_ELEVENLABS_API_KEY;

if (!apiKey) {
    console.error("❌ ERROR: VITE_ELEVENLABS_API_KEY not found in .env or .env.local");
    process.exit(1);
}

const client = new ElevenLabsClient({ apiKey });
const VOICE_ID = "hpp4J3VqNfWAUOO0d1Us"; // User requested backup voice
const OUTPUT_DIR = path.join(ROOT_DIR, "public", "assets", "audio", "phonemes");
const MODEL_ID = "eleven_multilingual_v2"; // Slower but higher quality articulation

// Precision Training Prompts
// We add periods to create a "staccato" punch, or double letters for length.
// Based on user feedback: "Train it much more"
const PHONEME_PROMPTS = {
  // Consonants - Short & Punchy
  "b": "Buh.",      // Capitalized + Period = Authority/Punch
  "d": "Duh.",
  "f": "Fff.",
  "g": "Guh.",
  "h": "Huh.",
  "j": "Juh.",
  "k": "Kuh.",
  "l": "Lll.",
  "m": "Mmm.",
  "n": "Nnn.",
  "p": "Puh.",
  "r": "Rrr.",
  "s": "Sss.",
  "t": "Tuh.",
  "v": "Vvv.",
  "w": "Wuh.",
  "y": "Yuh.",
  "z": "Zzz.",
  
  // Special Consonants/Digraphs
  "ch": "Chuh.",
  "sh": "Shhh.",    // Extra 'h' for silence
  "th": "Thuh.",    // unvoiced (think)
  "th_voiced": "The.", // voiced (the) - hardest one. "The" usually works best.
  "ng": "Ing.",     // "Ing" captures the sound best
  "zh": "Zhuh.", 
  "wh": "Wuh.", 
  "q": "Kwuh.", 
  "x": "Ks.",       // Sharp ending
  "c": "Kuh.", 
  "ck": "Kuh.",
  "ph": "Fff.",

  // Short Vowels - "Short" context
  "a": "Ah.",       // Short 'a'
  "e": "Eh.",       // Short 'e'
  "i": "Ih.",       // Short 'i' - tricky. "Ih" usually works.
  "o": "Aw.",       // Short 'o'
  "u": "Uh.",       // Short 'u'

  // Long Vowels - Sustained
  "ai": "Ay.", 
  "ee": "Ee.", 
  "ie": "Eye.", 
  "oa": "Oh.", 
  "ue": "You.", 

  // R-Controlled
  "ar": "Ar.", 
  "or": "Or.", 
  "er": "Er.", 
  "ir": "Ur.",      // "Ur" often sounds better for "bird" than "ir"
  "ur": "Ur.", 
  
  // Diphthongs
  "ou": "Ow.", 
  "oi": "Oy.", 
  "oo": "Ooo.", 
};

async function generateLibrary() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    console.log(`Creating directory: ${OUTPUT_DIR}`);
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`Starting Precision Training Generation...`);
  console.log(`Voice ID: ${VOICE_ID}`);
  console.log(`Model: ${MODEL_ID}\n`);

  let successCount = 0;
  let failCount = 0;

  for (const [key, textPrompt] of Object.entries(PHONEME_PROMPTS)) {
    const filePath = path.join(OUTPUT_DIR, `${key}.mp3`);
    
    // Force Regenerate
    process.stdout.write(`Generating: ${key} ["${textPrompt}"] ... `);
    
    try {
        const response = await client.textToSpeech.convert(VOICE_ID, {
            text: textPrompt,  
            model_id: MODEL_ID,
            output_format: "mp3_44100_128",
            voice_settings: {
                stability: 0.55,       // Increased slightly for consistency
                similarity_boost: 0.85, // Increased clarity
                style: 0.0,
                use_speaker_boost: true
            }
        });

        // Handle stream or buffer
        const fileStream = fs.createWriteStream(filePath);

        if (response && typeof response.pipe === 'function') {
             response.pipe(fileStream);
        } else if (Buffer.isBuffer(response)) {
             fileStream.write(response);
             fileStream.end();
        } else {
             const chunks = [];
             for await (const chunk of response) {
                 chunks.push(chunk);
             }
             const buffer = Buffer.concat(chunks);
             fileStream.write(buffer);
             fileStream.end();
        }

        await new Promise((resolve, reject) => {
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });
        
        console.log("✅ Saved");
        successCount++;

    } catch (error) {
        console.log("❌ Failed");
        if (error.statusCode === 402) {
             console.error("PAYMENT REQUIRED: Reduce usage or upgrade plan.");
             process.exit(1);
        }
        console.error(error.message || error);
        failCount++;
    }

    // Delay to allow processing and avoid rate limits
    if (successCount < Object.keys(PHONEME_PROMPTS).length) {
        await new Promise(resolve => setTimeout(resolve, 800)); 
    }
  }
  
  console.log(`\n🎉 Library Generation Complete! Success: ${successCount}, Failed: ${failCount}`);
}

generateLibrary();
