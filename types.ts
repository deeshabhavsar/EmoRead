export type Page = 'landing' | 'results' | 'community';

export interface EmotionDataPoint {
  time: number;
  happy: number;
  sad: number;
  angry: number;
  neutral: number;
  fear: number;
  disgust: number;
  confusion: number;
  [key: string]: number;
}

export interface AnalysisResult {
  studentName: string;
  bookName: string;
  chapter?: string;
  summary: string;
  emotionTimeline: EmotionDataPoint[];
  audioUrl: string;
  audioDuration: number;
}

export interface Comment {
  user: string;
  text: string;
  timestamp: string;
}

export interface Post extends AnalysisResult {
  id: string;
  createdAt: string;
  comments: Comment[];
}

export const EMOTION_COLORS: { [key: string]: string } = {
  happy: '#22C55E',   // Green
  sad: '#3B82F6',     // Blue
  angry: '#EF4444',   // Red
  neutral: '#6B7280', // Gray
  fear: '#8B5CF6',    // Purple
  disgust: '#F97316',  // Orange
  confusion: '#14B8A6',// Teal
};