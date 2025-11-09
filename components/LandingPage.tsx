import React, { useState, useCallback, useRef } from 'react';
import { AnalysisResult, EmotionDataPoint } from '../types';
import { generateReadingSummary } from '../services/geminiService';
import { BookIcon, ChapterIcon, UserIcon, ArrowRightIcon, UploadIcon, RecordIcon } from './icons/Icons';

interface LandingPageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

// A simple seeded pseudo-random number generator for consistent mock data
const mulberry32 = (seed: number) => {
    return () => {
      let t = seed += 0x6D2B79F5;
      t = Math.imul(t ^ t >>> 15, t | 1);
      t ^= t + Math.imul(t ^ t >>> 7, t | 61);
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    }
}

const LandingPage: React.FC<LandingPageProps> = ({ onAnalysisComplete }) => {
  const [studentName, setStudentName] = useState('');
  const [bookName, setBookName] = useState('');
  const [chapter, setChapter] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioInfo, setAudioInfo] = useState<{ name: string; duration: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [inputMethod, setInputMethod] = useState<'upload' | 'record'>('upload');

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!['audio/wav', 'audio/mpeg', 'audio/mp4', 'audio/x-m4a', 'audio/webm'].includes(file.type)) {
        setError('Invalid file type. Please upload a valid audio file.');
        return;
      }
      setError(null);
      setAudioFile(file);
      const audio = new Audio(URL.createObjectURL(file));
      audio.onloadedmetadata = () => {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        setAudioInfo({ name: file.name, duration: `${minutes}:${seconds}` });
      };
    }
  };

  const resetAudio = () => {
    setAudioFile(null);
    setAudioInfo(null);
  };
  
  const handleStartRecording = async () => {
    resetAudio();
    setError(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const recordedFile = new File([audioBlob], `recording-${new Date().toISOString()}.webm`, { type: 'audio/webm' });
                handleFileChange(recordedFile);
                stream.getTracks().forEach(track => track.stop()); // Stop microphone access
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingTime(0);
            recordingIntervalRef.current = setInterval(() => {
                setRecordingTime(prevTime => prevTime + 1);
            }, 1000);

        } catch (err) {
            console.error("Error accessing microphone:", err);
            setError("Could not access microphone. Please check permissions.");
        }
    } else {
        setError("Recording is not supported by your browser.");
    }
  };

  const handleStopRecording = () => {
      if (mediaRecorderRef.current && isRecording) {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
          if (recordingIntervalRef.current) {
              clearInterval(recordingIntervalRef.current);
          }
      }
  };

  const formatRecordingTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !bookName || !audioFile) {
      setError('Student Name, Book Name, and an Audio File or Recording are required.');
      return;
    }
    setError(null);
    setIsLoading(true);

    // MOCK BACKEND PROCESSING
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Generate mock emotion data using a seeded PRNG for consistency
    const random = mulberry32(42); // Using a fixed seed (42) for deterministic results
    
    const getDurationInSeconds = () => {
        if (!audioInfo) return 60;
        const parts = audioInfo.duration.split(':').map(Number);
        return (parts[0] || 0) * 60 + (parts[1] || 0);
    };
    const durationInSeconds = getDurationInSeconds();

    const emotionTimeline: EmotionDataPoint[] = [];
    const emotions = ['happy', 'sad', 'angry', 'neutral', 'fear', 'disgust', 'confusion'];
    for (let i = 0; i < durationInSeconds; i += 2) {
      const point: any = { time: i };
      let total = 0;
      emotions.forEach(emotion => {
        point[emotion] = random(); // Use the seeded random function
        total += point[emotion];
      });
      emotions.forEach(emotion => point[emotion] /= total);
      emotionTimeline.push(point);
    }
    
    const summary = await generateReadingSummary(emotionTimeline);

    const result: AnalysisResult = {
      studentName,
      bookName,
      chapter,
      summary,
      emotionTimeline,
      audioUrl: URL.createObjectURL(audioFile),
      audioDuration: durationInSeconds,
    };

    setIsLoading(false);
    onAnalysisComplete(result);

  }, [studentName, bookName, chapter, audioFile, audioInfo, onAnalysisComplete]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-black font-poppins tracking-tight">EmoRead</h1>
          <p className="text-black/80 mt-2 text-lg">"Using AI, unlike AI"</p>
        </div>
        <div 
            className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl"
            style={{boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.1)'}}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><UserIcon /></span>
              <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BookIcon /></span>
              <input type="text" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><ChapterIcon /></span>
              <input type="text" placeholder="Chapter (Optional)" value={chapter} onChange={(e) => setChapter(e.target.value)} className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition-all" />
            </div>
            
            <div>
              <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
                <button type="button" onClick={() => { setInputMethod('upload'); resetAudio(); }} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${inputMethod === 'upload' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-200/50'}`}>Upload File</button>
                <button type="button" onClick={() => { setInputMethod('record'); resetAudio(); }} className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${inputMethod === 'record' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:bg-gray-200/50'}`}>Record Audio</button>
              </div>

              {inputMethod === 'upload' ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-4 border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${isDragOver ? 'border-black bg-gray-500/10' : 'border-gray-300 bg-white hover:border-black/50'}`}
                >
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)} 
                    className="hidden" 
                    accept=".wav,.mp3,.m4a"
                  />
                  <div className="flex flex-col items-center justify-center text-gray-600">
                    <UploadIcon className={`w-10 h-10 mb-2 transition-colors ${isDragOver ? 'text-black' : 'text-gray-400'}`} />
                    {audioInfo ? (
                      <div className="text-sm">
                        <p className="font-semibold text-gray-800">{audioInfo.name}</p>
                        <p>Duration: {audioInfo.duration}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="font-semibold">Drag & drop your audio file</p>
                        <p className="text-sm">or click to browse</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="mt-4 border-2 border-dashed rounded-lg p-6 text-center transition-all border-gray-300 bg-white">
                   <div className="flex flex-col items-center justify-center text-gray-600">
                    <RecordIcon className={`w-10 h-10 mb-2 ${isRecording ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
                     {audioInfo ? (
                        <div className="text-sm">
                            <p className="font-semibold text-gray-800">{audioInfo.name}</p>
                            <p>Duration: {audioInfo.duration}</p>
                        </div>
                     ) : isRecording ? (
                        <div>
                            <p className="font-semibold text-lg font-mono">{formatRecordingTime(recordingTime)}</p>
                            <p className="text-sm">Recording in progress...</p>
                        </div>
                     ) : (
                       <div>
                         <p className="font-semibold">Ready to record</p>
                         <p className="text-sm">Click the button below to start</p>
                       </div>
                     )}
                     <div className="mt-4">
                        {!isRecording ? (
                            <button type="button" onClick={handleStartRecording} disabled={!!audioFile} className="bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-black disabled:opacity-50">Start Recording</button>
                        ) : (
                            <button type="button" onClick={handleStopRecording} className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">Stop Recording</button>
                        )}
                     </div>
                   </div>
                </div>
              )}
            </div>
            
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div className="text-center pt-2">
              <button type="submit" disabled={isLoading} className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing...
                  </>
                ) : (
                  <>
                    Submit <ArrowRightIcon className="ml-2" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;