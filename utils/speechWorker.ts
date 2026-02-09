
import { pipeline, env } from '@huggingface/transformers';

// Skip local checks for faster loading in browser environments if needed
env.allowLocalModels = false;
env.useBrowserCache = true;

class SpeechRecognitionWorker {
  static instance: SpeechRecognitionWorker | null = null;
  transcriber: any = null;
  loading: boolean = false;

  static getInstance() {
    if (!SpeechRecognitionWorker.instance) {
      SpeechRecognitionWorker.instance = new SpeechRecognitionWorker();
    }
    return SpeechRecognitionWorker.instance;
  }

  async loadModel() {
    if (this.transcriber) return;
    if (this.loading) return;

    this.loading = true;
    try {
      // Use a small, quantized model for faster inference and lower bandwidth
      // 'Xenova/wav2vec2-bert-CV16-en' is good but larger.
      // 'Xenova/whisper-tiny.en' is also an option, but let's stick to the recommendation if possible,
      // or use a very lightweight wav2vec2 model.
      // For this demo, let's use 'Xenova/wav2vec2-large-xlsr-53-english' or similar if available,
      // but 'Xenova/wav2vec2-bert-CV16-en' is the one suggested.
      this.transcriber = await pipeline('automatic-speech-recognition', 'Xenova/wav2vec2-bert-CV16-en');
      
      self.postMessage({ status: 'ready' });
    } catch (error) {
      console.error('Model loading failed:', error);
      self.postMessage({ status: 'error', error: String(error) });
    } finally {
      this.loading = false;
    }
  }

  async processAudio(audioContext: Float32Array) {
    if (!this.transcriber) {
      await this.loadModel();
    }

    if(this.transcriber) {
        try {
            const output = await this.transcriber(audioContext, {
                return_timestamps: false,
                chunk_length_s: 30,
            });
            self.postMessage({ status: 'complete', output });
        } catch (err) {
            console.error(err);
             self.postMessage({ status: 'error', error: String(err) });
        }
    }
  }
}

const worker = SpeechRecognitionWorker.getInstance();

self.onmessage = async (e: MessageEvent) => {
  const { type, audio } = e.data;

  if (type === 'load') {
    await worker.loadModel();
  } else if (type === 'process') {
    await worker.processAudio(audio);
  }
};
