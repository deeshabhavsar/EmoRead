import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResult, EmotionDataPoint, EMOTION_COLORS, Post } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceDot } from 'recharts';
import { PlayIcon, PauseIcon, ArrowLeftIcon, ArrowRightIcon } from './icons/Icons';

interface ResultsPageProps {
  result: AnalysisResult | Post;
  onPostToCommunity: () => void;
  onBackToCommunity: () => void;
}

const EmotionHeatmap: React.FC<{ timeline: EmotionDataPoint[] }> = ({ timeline }) => {
  if (!timeline || timeline.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Overall Emotion Heatmap</h3>
        <p className="text-gray-500 text-center py-4">Not enough data to generate a heatmap.</p>
      </div>
    );
  }

  const emotionTotals = {
    happy: 0,
    sad: 0,
    angry: 0,
    neutral: 0,
    fear: 0,
    disgust: 0,
    confusion: 0,
  } as { [key: string]: number };

  timeline.forEach(point => {
    Object.keys(emotionTotals).forEach(emotion => {
      emotionTotals[emotion] += point[emotion];
    });
  });

  const grandTotal = Object.values(emotionTotals).reduce((sum, total) => sum + total, 0);

  if (grandTotal === 0) {
     return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Overall Emotion Heatmap</h3>
        <p className="text-gray-500 text-center py-4">No emotional data detected.</p>
      </div>
    );
  }

  // For the legend, sorted by prevalence
  const legendItems = Object.entries(emotionTotals)
    .map(([name, total]) => ({
      name,
      percentage: (total / grandTotal) * 100,
    }))
    .filter(item => item.percentage >= 1) // Only show emotions with >= 1% contribution
    .sort((a, b) => b.percentage - a.percentage);
  
  // For the gradient, a fixed order for consistency
  const fixedOrder = ['happy', 'neutral', 'confusion', 'sad', 'fear', 'disgust', 'angry'];
  let cumulativePercentage = 0;
  const gradientStops = fixedOrder.map(emotion => {
      const percentage = (emotionTotals[emotion] / grandTotal) * 100;
      if (percentage === 0) return '';
      const start = cumulativePercentage;
      cumulativePercentage += percentage;
      const end = cumulativePercentage;
      return `${EMOTION_COLORS[emotion]} ${start}%, ${EMOTION_COLORS[emotion]} ${end}%`;
  }).filter(Boolean).join(', ');

  const gradient = `linear-gradient(to right, ${gradientStops})`;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Overall Emotion Heatmap</h3>
      <div
        className="w-full h-8 rounded-full my-4"
        style={{ background: gradient }}
        aria-label="Emotion heatmap bar"
      />
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4">
        {legendItems.map(({ name, percentage }) => (
          <div key={name} className="flex items-center text-sm">
            <span
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: EMOTION_COLORS[name] }}
              aria-hidden="true"
            />
            <span className="font-semibold capitalize text-gray-700">{name}:</span>
            <span className="font-bold text-gray-800 ml-1">{percentage.toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const ResultsPage: React.FC<ResultsPageProps> = ({ result, onPostToCommunity, onBackToCommunity }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPosting, setIsPosting] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hiddenEmotions, setHiddenEmotions] = useState<string[]>([]);
  
  const isCommunityPost = 'id' in result;
  const totalDuration = result.audioDuration > 0 ? result.audioDuration : 1;
  const interval = totalDuration / 5;
  const emotionGraphTicks = Array.from({ length: 5 }, (_, i) => Math.round((i + 1) * interval));

  const emotions = Object.keys(EMOTION_COLORS);

  const maxEmotionValue = result.emotionTimeline.reduce((max, point) => {
    const pointMax = emotions.reduce((currentPointMax, emotion) => Math.max(currentPointMax, point[emotion]), 0);
    return Math.max(max, pointMax);
  }, 0);

  const yAxisDomainMax = maxEmotionValue > 0 ? Math.min(1, Math.ceil(maxEmotionValue * 10) / 10) : 0.1;

  let peakValue = 0;
  let peakEmotion = '';
  let peakTime = 0;

  if (result.emotionTimeline.length > 0) {
    result.emotionTimeline.forEach(point => {
        emotions.forEach(emotion => {
            if (point[emotion] > peakValue) {
                peakValue = point[emotion];
                peakEmotion = emotion;
                peakTime = point.time;
            }
        });
    });
  }

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const timeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', timeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', timeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };
  
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = Number(event.target.value);
      setCurrentTime(audio.currentTime);
    }
  };
  
  const handlePost = () => {
    setIsPosting(true);
    setTimeout(() => {
        onPostToCommunity();
        setIsPosting(false);
    }, 1000);
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleLegendClick = (data: any) => {
    const { dataKey } = data;
    setHiddenEmotions(prev =>
      prev.includes(dataKey)
        ? prev.filter(e => e !== dataKey)
        : [...prev, dataKey]
    );
  };

  return (
    <main className="p-4 sm:p-6 lg:p-8 animate-fade-in bg-white/50">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {isCommunityPost && (
          <div className="mb-[-1.5rem]">
            <button
              onClick={onBackToCommunity}
              className="inline-flex items-center text-sm font-semibold text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeftIcon className="mr-2 w-4 h-4" />
              Back to Community
            </button>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800">{result.studentName}</h2>
          <p className="text-gray-600 mt-1">{result.bookName} {result.chapter && `| Chapter: ${result.chapter}`}</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-2">📖 Student Reading Summary</h3>
          <p className="text-gray-700 leading-relaxed italic border-l-4 border-black pl-4">
            {result.summary}
          </p>
        </div>

        <div className="space-y-8">
          <EmotionHeatmap timeline={result.emotionTimeline} />

          <div className="bg-gray-50 rounded-xl shadow-lg p-6 relative">
            <h3 className="text-lg font-bold text-center text-gray-800 mb-4">Emotion Timeline Graph</h3>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart
                data={result.emotionTimeline}
                margin={{
                  top: 5, right: 30, left: -10, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" unit="s" ticks={emotionGraphTicks} fontSize={12} />
                <YAxis domain={[0, yAxisDomainMax]} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(2px)', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} />
                {peakEmotion && (
                  <ReferenceDot x={peakTime} y={peakValue} r={8} fill={EMOTION_COLORS[peakEmotion]} stroke="white" strokeWidth={2} />
                )}
                <Legend iconSize={10} wrapperStyle={{fontSize: "12px", cursor: 'pointer'}} onClick={handleLegendClick} />
                {Object.keys(EMOTION_COLORS).map((emotion) => (
                  <Line
                    key={emotion}
                    type="monotone"
                    dataKey={emotion}
                    stroke={EMOTION_COLORS[emotion]}
                    strokeWidth={2.5}
                    dot={false}
                    hide={hiddenEmotions.includes(emotion)}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Audio Playback</h3>
          <audio ref={audioRef} src={result.audioUrl} preload="metadata"></audio>
          <div className="flex items-center gap-4">
            <button onClick={togglePlayPause} className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <span className="text-sm font-mono text-gray-600 w-12">{formatTime(currentTime)}</span>
            <input 
              type="range"
              min="0"
              max={result.audioDuration}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm font-mono text-gray-600 w-12">{formatTime(result.audioDuration)}</span>
          </div>
        </div>

        {!isCommunityPost && (
          <div className="text-center pt-4">
            <button 
              onClick={handlePost}
              disabled={isPosting}
              className="inline-flex items-center justify-center bg-black text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-800 transform hover:-translatey-0.5 transition-all duration-300 disabled:opacity-50"
            >
              {isPosting ? 'Posting...' : 'Post to Community'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ResultsPage;