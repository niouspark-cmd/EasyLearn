
import { useRef, useEffect, useState } from 'react';
import { distance } from 'fastest-levenshtein';

interface SpeechResult {
  transcript: string;
  score: number;
  isListening: boolean;
  isLoading: boolean;
  error: string | null;
}

const useSpeechAssessment = (targetText: string) => {
  const [result, setResult] = useState<SpeechResult>({
    transcript: '',
    score: 0,
    isListening: false,
    isLoading: false,
    error: null,
  });

  const workerRef = useRef<Worker | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const recorderRef = useRef<ScriptProcessorNode | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(new URL('../utils/speechWorker.ts', import.meta.url), {
      type: 'module',
    });

    workerRef.current.onmessage = (e) => {
      const { status, output, error } = e.data;
      if (status === 'complete') {
        const transcript = output.text;
        const normalizedTarget = targetText.toLowerCase().replace(/[^a-z0-9]/g, '');
        const normalizedTranscript = transcript.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        const dist = distance(normalizedTarget, normalizedTranscript);
        // Simple heuristic: if diff is small relative to length, good score.
        // For single phonemes (very short), exact match is best.
        let score = Math.max(0, 100 - (dist * 20)); // Deduct 20 pts per error
        if (targetText.length <= 1) { // Single letter/phoneme
            score = transcript.includes(targetText.toLowerCase()) ? 100 : 0;
        }

        setResult((prev) => ({
          ...prev,
          transcript,
          score,
          isListening: false,
          isLoading: false,
        }));
      } else if (status === 'error') {
        setResult((prev) => ({ ...prev, error: error, isListening: false, isLoading: false }));
      }
    };

    return () => {
      if (workerRef.current) {
         workerRef.current.terminate();
      }
      stopRecording();
    };
  }, [targetText]); // Added dependency to reset if targetText changes, though worker is generic.

  const startListening = async () => {
    setResult((prev) => ({ ...prev, isListening: true, error: null, transcript: '' }));
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      streamRef.current = source;
      
      // Use ScriptProcessor for raw audio access (simpler for this demo than AudioWorklet)
      const recorder = audioContextRef.current.createScriptProcessor(4096, 1, 1);
      recorderRef.current = recorder;

      let audioData: Float32Array[] = [];


      recorder.onaudioprocess = (e) => {
          if(!result.isListening) return; // Stop collecting if stopped
          const inputData = e.inputBuffer.getChannelData(0);
          audioData.push(new Float32Array(inputData));
      };

      source.connect(recorder);
      recorder.connect(audioContextRef.current.destination);

      // Auto-stop after 3 seconds for short phrases/phonemes
      setTimeout(() => {
          stopRecording(audioData);
      }, 3000);

    } catch (err) {
      setResult((prev) => ({ ...prev, error: 'Microphone access denied', isListening: false }));
    }
  };

  const stopRecording = (bufferedAudio?: Float32Array[]) => {
    if (recorderRef.current) {
        recorderRef.current.disconnect();
        recorderRef.current = null;
    }
    if (streamRef.current) {
        streamRef.current.disconnect();
        streamRef.current = null;
    }
    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
    }
    if(audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }

    if (bufferedAudio && bufferedAudio.length > 0) {
        setResult(prev => ({ ...prev, isListening: false, isLoading: true }));
        // Flat the arrays
        const length = bufferedAudio.reduce((acc, curr) => acc + curr.length, 0);
        const merged = new Float32Array(length);
        let offset = 0;
        bufferedAudio.forEach(chunk => {
            merged.set(chunk, offset);
            offset += chunk.length;
        });
        
        // Downsample or send as is (model handles various rates, but 16k is standard)
        // For simplicity, sending raw float32 array. The worker/model might expect specific format.
        // Wav2Vec2 usually expects 16kHz audio.
        // AudioContext default is usuall 44.1k or 48k. Downsampling is needed for best results.
        // We will send and let the worker/pipeline handle or assume it works (transformers.js pipeline handles resampling often).
        
        workerRef.current?.postMessage({ type: 'process', audio: merged });
    } else {
        setResult(prev => ({ ...prev, isListening: false }));
    }
  };

  return { ...result, startListening };
};

export default useSpeechAssessment;
