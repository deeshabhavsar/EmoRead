# EmoRead

*EmoRead* is an AI-powered reading companion that listens as users read aloud, detects emotions from their voice, and visualizes these emotions as dynamic color patterns. The app creates a unique emotional "reading image" representing the reader's experience.

---

## :rocket: Live Demo
You can view and interact with the app here: [EmoRead on AI Studio](https://emoread-hackprinceton-25-46527136666.us-west1.run.app/)

---

## :tools: Features
- Real-time emotion detection from speech
- Emotion-to-color visualization
- Personalized reading experience
- Generates final visual summary after reading session

---

## :technologist: My Contributions
- Developed the *front-end* using React, implementing dynamic color visualizations and user interaction components.
- Integrated the app with the *Gemini API* for emotion analysis.
- Designed the final reading visualization experience.
- Deployed the application to AI Studio.

---

## :zap: Technologies & Libraries Used
- **[React](https://reactjs.org/)** — Front-end framework  
- **[SpeechBrain](https://github.com/speechbrain/speechbrain?tab=readme-ov-file)** — PyTorch-based speech toolkit used for emotion detection  
- *Node.js* — Backend and development environment  
- *Gemini API* — Emotion analysis from audio input  

> *Note:* SpeechBrain and Gemini API are public frameworks; credit is given to their respective authors. All core application logic, front-end design, and integration were implemented by me.

---

## :inbox_tray: Running the App Locally

### Prerequisites
- Node.js installed on your system  
- Gemini API key

### Installation
```bash
# Clone the repo
git clone https://github.com/<your-username>/emoread.git
cd emoread

# Install dependencies
npm install
