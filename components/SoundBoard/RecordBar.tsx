import React, { useState, useRef } from 'react';
import { Mic, Play, RotateCcw, StopCircle } from 'lucide-react';

const RecordBar: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasRecording, setHasRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setHasRecording(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      // Stop all tracks to release microphone
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

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

  return (
    <div className="mx-auto mt-12 w-full max-w-md bg-white dark:bg-slate-900 rounded-[2rem] shadow-xl p-2 border border-slate-100 dark:border-slate-800 flex items-center justify-between z-40 relative backdrop-blur-lg backdrop-filter bg-opacity-90 dark:bg-opacity-90">
      
      {/* Record Button */}
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
        /* Review Controls */
        <div className="flex-1 flex items-center gap-2">
           <button
             onClick={playRecording}
             className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-4 rounded-[1.5rem] hover:bg-blue-700 transition-colors"
           >
             <Play size={24} fill="currentColor" />
             <span className="font-bold font-lexend">Play</span>
           </button>
           
           <button
             onClick={resetRecording}
             className="w-14 h-14 flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 rounded-full transition-colors"
           >
             <RotateCcw size={20} />
           </button>
        </div>
      )}
    </div>
  );
};

export default RecordBar;
