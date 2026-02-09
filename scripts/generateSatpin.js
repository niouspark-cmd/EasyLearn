
import { ElevenLabsClient } from "@elevenlabs/elevenlabs-js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Load envs
dotenv.config({ path: path.join(ROOT_DIR, '.env') });
dotenv.config({ path: path.join(ROOT_DIR, '.env.local') });

const apiKey = process.env.VITE_ELEVENLABS_API_KEY;
if (!apiKey) {
    console.error("❌ ERROR: VITE_ELEVENLABS_API_KEY Missing");
    process.exit(1);
}

const client = new ElevenLabsClient({ apiKey });
const VOICE_ID = "hpp4J3VqNfWAUOO0d1Us"; // User Approved Voice
const OUTPUT_DIR = path.join(ROOT_DIR, "public", "assets", "audio", "phonemes");
const MODEL_ID = "eleven_multilingual_v2"; // High Precision Articulation

// Level 1: SATPIN Sounds
// Using "Cache Busting" filenames: {key}_phonic.mp3
// Using "Natural Punched Prompts" for maximum clarity: "Sss." not "Ess"
const SATPIN_PROMPTS = {
    "s": "Sss.",  // Hissing sound, punched with period
    "a": "Ah.",   // Short 'a' (cat)
    "t": "Tuh.",  // Plosive T
    "p": "Puh.",  // Plosive P
    "i": "Ih.",   // Short 'i' (sit)
    "n": "Nnn."   // Nasal N
};

async function generateSatpin() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`🎤 Generating Level 1: SATPIN (High Precision)`);
  console.log(`Voice: ${VOICE_ID} | Model: ${MODEL_ID}`);

  for (const [key, prompt] of Object.entries(SATPIN_PROMPTS)) {
      const filename = `${key}_phonic.mp3`; // CACHE BUSTER
      const filePath = path.join(OUTPUT_DIR, filename);

      process.stdout.write(`Generating: ${key.toUpperCase()} ["${prompt}"] -> ${filename} ... `);

      try {
        const response = await client.textToSpeech.convert(VOICE_ID, {
            text: prompt,
            model_id: MODEL_ID,
            output_format: "mp3_44100_128",
            voice_settings: {
                stability: 0.65,       // High stability for consistent phonemes
                similarity_boost: 0.9,  // Maximum clarity
                style: 0.0,
                use_speaker_boost: true
            }
        });

        const fileStream = fs.createWriteStream(filePath);
        
        if (response && typeof response.pipe === 'function') {
            response.pipe(fileStream);
        } else if (Buffer.isBuffer(response)) {
            fileStream.write(response);
            fileStream.end();
        } else {
             const chunks = [];
             for await (const chunk of response) { chunks.push(chunk); }
             fileStream.write(Buffer.concat(chunks));
             fileStream.end();
        }

        await new Promise((resolve, reject) => {
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });

        console.log("✅ DONE");

      } catch (error) {
          console.log("❌ FAILED");
          console.error(error);
      }
      
      // Gentle delay
      await new Promise(r => setTimeout(r, 1000));
  }
}

generateSatpin();
