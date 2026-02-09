import React, { useState, useRef } from 'react';
import { Mic, Play, RotateCcw, StopCircle } from 'lucide-react';
import { ElevenLabsService } from '../../utils/ElevenLabsService';

const RecordBar: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  
  const [transcription, setTranscription] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const playRecording = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  const resetRecording = () => {
    setHasRecording(false);
    setAudioUrl(null);
  };

  // Updated start logic (same as before really)

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop tracks...
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());

      // Trigger transcription? Note: mediaRecorder.onstop handles data extraction.
    }
  };

  /** New: Custom handler for data processing */
  const handleDataAvailable = (event: BlobEvent) => {
      audioChunksRef.current.push(event.data);
  };

  const handleStopEvent = async () => {
     if (!mediaRecorderRef.current) return;
     
     const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
     const url = URL.createObjectURL(audioBlob);
     
     setAudioUrl(url);
     setHasRecording(true);
     
     // Start Transcription
     setIsTranscribing(true);
     setTranscription(null);

     try {
         const text = await ElevenLabsService.transcribe(audioBlob);
         setTranscription(text || "No speech detected.");
     } catch (e) {
         console.error(e);
         setTranscription("Error transcribing audio.");
     } finally {
         setIsTranscribing(false);
     }
  };

  // Re-write startRecording to attach new handlers
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.onstop = handleStopEvent;

      mediaRecorder.start();
      setIsRecording(true);
      setTranscription(null); // Clear old
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone.');
    }
  };

  // ... playRecording, resetRecording ...

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto mt-8">
        
        {/* Main Bar */}
        <div className="w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-2 border border-slate-100 dark:border-slate-800 flex items-center justify-between z-40 relative backdrop-blur-lg backdrop-filter bg-opacity-90">
            {/* ... Buttons ... */}
            {!hasRecording ? (
                <button
                onClick={isRecording ? stopRecording : startRecording}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[1.5rem] transition-all duration-300 ${
                    isRecording 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
                >
                {isRecording ? <StopCircle size={24} /> : <Mic size={24} />}
                <span className="font-bold font-lexend">{isRecording ? 'Stop' : 'Record Voice'}</span>
                </button>
            ) : (
                <div className="flex-1 flex items-center gap-2">
                   <button onClick={playRecording} className="flex-1 bg-blue-600 text-white py-4 rounded-[1.5rem] flex items-center justify-center gap-2">
                        <Play size={20} fill="currentColor"/> Play
                   </button>
                   <button onClick={resetRecording} className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-red-500">
                        <RotateCcw size={20} />
                   </button>
                </div>
            )}
        </div>

        {/* Transcription Result */}
        {(isTranscribing || transcription) && (
            <div className="mt-4 p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-blue-100 dark:border-blue-900 text-center animate-fade-in-up w-full">
                {isTranscribing ? (
                    <div className="flex items-center justify-center gap-2 text-blue-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                        <span className="text-sm font-bold">Transcribing...</span>
                    </div>
                ) : (
                    <p className="text-slate-700 dark:text-slate-300 font-medium">"{transcription}"</p>
                )}
            </div>
        )}
    </div>
  );
};

export default RecordBar;
