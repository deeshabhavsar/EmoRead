EmoRead
<div align="center"> <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" /> </div>
EmoRead is an AI-powered reading companion that listens as users read aloud, detects emotions from their voice, and visualizes these emotions as dynamic color patterns. The app creates a unique emotional "reading image" representing the reader's experience.
🚀 Live Demo
You can view and interact with the app here: EmoRead on AI Studio
🛠 Features
Real-time emotion detection from speech
Emotion-to-color visualization
Personalized reading experience
Generates final visual summary after reading session
🧑‍💻 My Contributions
Developed the front-end using React, implementing dynamic color visualizations and user interaction components.
Integrated the app with the Gemini API for emotion analysis.
Designed the final reading visualization experience.
Deployed the application to AI Studio.
⚡ Technologies & Libraries Used
React — Front-end framework
SpeechBrain — PyTorch-based speech toolkit used for emotion detection
Node.js — Backend and development environment
Gemini API — Emotion analysis from audio input
Note: SpeechBrain and Gemini API are public frameworks; credit is given to their respective authors. All core application logic, front-end design, and integration were implemented by me.
📥 Running the App Locally
Prerequisites
Node.js installed on your system
Gemini API key
Installation
# Clone the repo
git clone https://github.com/<your-username>/emoread.git
cd emoread

# Install dependencies
npm install
Configuration
Set your Gemini API key in .env.local:
GEMINI_API_KEY=your_api_key_here
Running Locally
npm run dev
The app will be available at http://localhost:3000.
📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
🔗 References
SpeechBrain: GitHub Repository
React: React Docs
Gemini API Documentation: Link to Gemini API
