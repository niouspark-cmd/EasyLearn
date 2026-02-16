
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

        // Wait for ready if not yet (with 10s timeout)
        if (!this.isReady) {
            await Promise.race([
                new Promise<void>(resolve => {
                    this.onReadyCallbacks.push(resolve);
                }),
                new Promise((_, reject) => setTimeout(() => reject("Offline model timeout"), 15000))
            ]);
        }

        const audioData = await this.prepareAudio(audioBlob);

        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject("Transcription timeout"), 10000);
            this.pendingResolve = (text) => {
                clearTimeout(timeout);
                resolve(text);
            };
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
        
        // Use a clean decoding process
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
        
        // Resample to 16kHz if the context didn't do it automatically (safari/older browsers)
        let offlineContext = new OfflineAudioContext(1, audioBuffer.duration * 16000, 16000);
        let source = offlineContext.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(offlineContext.destination);
        source.start();
        
        const renderedBuffer = await offlineContext.startRendering();
        const channelData = renderedBuffer.getChannelData(0);
        
        await audioContext.close();
        return channelData;
    }

    static get ready() {
        return this.isReady;
    }
}
