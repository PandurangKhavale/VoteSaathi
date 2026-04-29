# VoteSaathi 🗳️

**VoteSaathi** (meaning "Vote Companion") is a modern, AI-enhanced election assistant designed to empower voters with accessible, non-partisan civic information. Built with a focus on user experience and educational engagement, it helps users navigate the complexities of voter registration, research candidates, and understand democratic processes.

---

## 🌟 Key Features

### 🤖 Intelligent Civic Assistant
*   **Hybrid AI Architecture**: Uses a robust local knowledge base for immediate answers to common election queries, minimizing external API calls.
*   **Gemini Integration**: Seamlessly connects with Google Gemini 1.5 Flash for advanced, conversational AI responses (requires user API key).
*   **Context-Aware**: Understands the flow of conversation to provide relevant follow-up suggestions.

### 🧩 Interactive Learning
*   **Knowledge Quiz**: A built-in 10-question civic challenge that awards badges (e.g., "Democracy Champion") based on performance.
*   **Voter Guides**: Step-by-step instructions for registration, voting methods (mail-in, early, in-person), and ballot tracking.

### 🛡️ Non-Partisan Research Tools
*   **Candidate Criteria**: Educational framework for evaluating candidates based on track records and policy rather than rhetoric.
*   **Fact-Checking Suite**: Direct access to trusted resources like FactCheck.org and Ballotpedia.
*   **Civic Glossary**: Simplified explanations of complex terms like the *Electoral College*, *Gerrymandering*, and the *Filibuster*.

### 🎨 Premium User Experience
*   **Dynamic Design**: A state-of-the-art interface featuring glassmorphism, smooth animations, and a responsive layout.

<img width="1010" height="570" alt="Screenshot 2026-04-29 232500" src="https://github.com/user-attachments/assets/3b088a18-0343-4b99-a2cd-957aa3f1e3c7" />


    
*   **Dark Mode Support**: Fully integrated dark and light modes for comfortable reading in any environment.

---

## 🛠️ Technology Stack

*   **Frontend**: React.js (Hooks & Context API)
*   **Styling**: Tailwind CSS (Custom Design System)
*   **Build Tool**: Vite (Lightning-fast HMR)
*   **AI Engine**: Google Gemini API (1.5 Flash)
*   **State Management**: LocalStorage for persistent user settings and API keys.

---

## 🚀 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v18 or higher)
*   npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/VoteSaathi.git
   ```
2. Navigate to the project directory:
   ```bash
   cd election-assistant
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Running Locally
To start the development server:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

---

## ⚙️ Configuration

To enable AI-powered answers:
1. Obtain a free API key from [Google AI Studio](https://aistudio.google.com/).
2. Open the **VoteSaathi Assistant** widget in the app.
3. Click the **Settings** (gear) icon in the chat header.
4. Paste your key and click **Save**.

*Note: Your API key is stored locally in your browser's `localStorage` and is never sent to any server other than Google's Gemini API.*

---

## 📂 Project Structure

```text
src/
├── components/      # UI Components (ChatWidget, Navigation, Home, etc.)
├── context/         # Theme and Global State
├── data/            # Static knowledge base, quiz questions, and timelines
├── utils/           # Chat engine logic and AI service integration
└── assets/          # Styles and media
```

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Disclaimer**: *VoteSaathi is an educational tool. Always verify local election deadlines and requirements with your official state or local election office.*
