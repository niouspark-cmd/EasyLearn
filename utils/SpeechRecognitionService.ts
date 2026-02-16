
/**
 * SpeechRecognitionService.ts - Offline Speech-to-Text using Transformers.js
 * 
 * Runs a local transcription model in a Web Worker to verify pronunciation
 * without needing an internet connection.
 */

export class SpeechRecognitionService {
    private static worker: Worker | null = null;
    private static isReady: boolean = false;
    private static onReadyCallbacks: (() => void)[] = [];
    private static pendingResolve: ((text: string) => void) | null = null;

    static initialize() {
        if (this.worker) return;

        console.log('[Offline STT] Initializing worker...');
        
        // Load the worker using Vite's ?worker syntax
        this.worker = new Worker(new URL('./speechWorker.ts', import.meta.url), {
            type: 'module'
        });

        this.worker.onmessage = (e) => {
            const { status, output, error } = e.data;

            if (status === 'ready') {
                console.log('[Offline STT] Model ready!');
                this.isReady = true;
                this.onReadyCallbacks.forEach(cb => cb());
                this.onReadyCallbacks = [];
            } else if (status === 'complete') {
                if (this.pendingResolve) {
                    this.pendingResolve(output.text || "");
                    this.pendingResolve = null;
                }
            } else if (status === 'error') {
                console.error('[Offline STT] Worker error:', error);
            }
        };

        // Tell worker to load model
        this.worker.postMessage({ type: 'load' });
    }

    static async transcribe(audioBlob: Blob): Promise<string> {
        if (!this.worker) {
            this.initialize();
        }

        // Wait for ready if not yet
        if (!this.isReady) {
            await new Promise<void>(resolve => {
                this.onReadyCallbacks.push(resolve);
            });
        }

        const audioData = await this.prepareAudio(audioBlob);

        return new Promise((resolve) => {
            this.pendingResolve = resolve;
            this.worker?.postMessage({
                type: 'process',
                audio: audioData
            });
        });
    }

    /**
     * Converts a MediaRecorder blob to a Float32Array at 16kHz
     * as required by the Wav2Vec2/Whisper models.
     */
    private static async prepareAudio(audioBlob: Blob): Promise<Float32Array> {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
        const arrayBuffer = await audioBlob.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // We only care about one channel for transcription
        const channelData = audioBuffer.getChannelData(0);
        
        await audioContext.close();
        return channelData;
    }

    static get ready() {
        return this.isReady;
    }
}
