
import { GoogleGenAI } from "@google/genai";
import type { EmotionDataPoint } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateReadingSummary = async (emotionTimeline: EmotionDataPoint[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("The reading began with a neutral tone, shifted towards happiness, and concluded with a sense of calm surprise. (This is a mock summary as API key is not configured).");
  }

  const prompt = `
    You are an expert in analyzing children's reading patterns and emotions.
    Based on the following timeline of emotion probabilities detected in a student's reading audio, write a 2-3 sentence summary of their emotional journey.
    Describe the flow of emotions from beginning to end in a narrative, educational, and encouraging tone.

    Emotion Data (time in seconds, probabilities from 0.0 to 1.0):
    ${JSON.stringify(emotionTimeline.slice(0, 20), null, 2)} 

    Example Summary: "The reading began with curiosity and joy, transitioned into tension and anger during the conflict, and concluded with a sense of calm reflection and sadness."

    Generate a new summary based on the data provided.
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating summary with Gemini API:", error);
    return "Could not generate summary. There might be an issue with the AI service.";
  }
};
