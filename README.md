# 🗳️ Voter Awareness Platform

A mobile-first, accessibility-focused voter awareness web platform for India built with the MERN stack. This platform helps first-time voters, rural users, and people with low literacy understand the voting process through audio-visual guidance.

## 🎯 Core Principles

- **Politically Neutral**: No recommendations, rankings, or bias
- **Audio-First**: Voice narration for all content
- **Mobile-First**: Optimized for low-end smartphones
- **Accessibility**: Large touch targets, high contrast, screen reader support
- **Simple**: One action per screen, minimal text
- **Trustworthy**: Only publicly verifiable data

## ✨ Features

### 1. How Voting Works
Step-by-step educational module with animations explaining:
- Voter ID verification
- Polling booth entry
- EVM button press
- Vote secrecy

### 2. Know Your Candidates
Neutral candidate information display:
- Education (from affidavits)
- Criminal cases (Yes/No)
- Assets (range only)
- All candidates shown equally (no ranking)

### 3. Misinformation Awareness Game
Interactive learning to identify:
- Factual information
- Emotional manipulation
- Misleading/false content
- No scoring pressure, focus on learning

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling with accessibility tokens
- **React Router** - Navigation
- **Axios** - API calls
- **Lottie React** - Animations
- **Web Speech API** - Text-to-speech

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM

## 📁 Project Structure

```
iitm/
├── client/                # React frontend
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   │   ├── AudioToggle.jsx
│   │   │   └── LanguageSelector.jsx
│   │   ├── context/      # React contexts
│   │   │   └── AudioContext.jsx
│   │   ├── pages/        # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── HowVotingWorks.jsx
│   │   │   ├── KnowYourCandidates.jsx
│   │   │   └── MisinformationGame.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/               # Node.js backend
│   ├── models/          # MongoDB models
│   │   ├── State.js
│   │   ├── Constituency.js
│   │   ├── Candidate.js
│   │   └── Scenario.js
│   ├── routes/          # API routes
│   │   ├── states.js
│   │   ├── constituencies.js
│   │   ├── candidates.js
│   │   └── game.js
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone and navigate to the project**
```bash
cd c:\Users\sehga\Desktop\iitm
```

2. **Install client dependencies**
```bash
cd client
npm install
```

3. **Install server dependencies**
```bash
cd ../server
npm install
```

4. **Set up environment variables**
```bash
# In the server directory
cp .env.example .env
```

Edit `.env` with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voter-awareness
NODE_ENV=development
```

5. **Start MongoDB** (if running locally)
```bash
mongod
```

### Running the Application

**Development Mode:**

Open two terminal windows:

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Building for Production

**Build the client:**
```bash
cd client
npm run build
```

**Start the server:**
```bash
cd server
npm start
```

## 🎨 Accessibility Features

### Touch Targets
- Minimum 48px × 48px (WCAG AAA)
- Large buttons with clear spacing
- Custom Tailwind tokens: `touch-target`, `touch-button`

### Audio
- Web Speech API for narration
- Automatic voice guidance on all screens
- Language-specific voice selection
- Toggle audio on/off

### Visual
- High contrast colors (outdoor visibility)
- Large font sizes: `touch-sm` to `touch-2xl`
- Clear iconography with text labels
- Responsive design (mobile-first)

### Screen Readers
- ARIA labels on all interactive elements
- Semantic HTML structure
- Role attributes where needed
- Descriptive alt text

## 📱 Supported Languages

- English (en-IN)
- Hindi (hi-IN)
- Tamil (ta-IN)
- Telugu (te-IN)
- Kannada (kn-IN)
- Malayalam (ml-IN)

*Note: Add more Indian languages as needed*

## 🔒 Ethical Guidelines

### What This Platform Does NOT Do:
- ❌ Recommend any candidate or party
- ❌ Rank candidates
- ❌ Collect user's political preferences
- ❌ Show ads or sponsored content
- ❌ Track user behavior for profiling
- ❌ Use persuasive or emotional language

### What This Platform DOES:
- ✅ Provides factual information from official sources
- ✅ Educates about the voting process
- ✅ Shows all candidates equally
- ✅ Teaches critical thinking about misinformation
- ✅ Respects user privacy
- ✅ Maintains complete political neutrality

## 📊 Database Schema

### State
```javascript
{
  name: String,      // "Maharashtra"
  code: String       // "MH"
}
```

### Constituency
```javascript
{
  name: String,           // "Mumbai South"
  state: ObjectId,        // Reference to State
  code: String            // "S13"
}
```

### Candidate
```javascript
{
  name: String,
  constituency: ObjectId,
  party: String,
  symbol: String,             // Emoji or icon
  education: String,
  criminalCases: Boolean,
  criminalCasesDetails: String,
  assets: String,             // Range, not exact amount
  affidavitUrl: String        // Link to official affidavit
}
```

### Scenario (Misinformation Game)
```javascript
{
  content: String,
  type: String,              // whatsapp, social, poster, information
  correctAnswer: String,     // information, emotional, misleading, false
  explanation: String,
  emotionUsed: String,
  tip: String,
  language: String,
  isActive: Boolean
}
```

## 🔧 API Endpoints

### States
- `GET /api/states` - Get all states

### Constituencies
- `GET /api/constituencies/:stateId` - Get constituencies by state

### Candidates
- `GET /api/candidates/:constituencyId` - Get candidates by constituency

### Game
- `GET /api/game/scenarios?lang=en` - Get misinformation scenarios

## 🎯 Design Decisions

### Why No Login?
- Reduces friction for first-time users
- No tracking of political preferences
- Maintains complete anonymity
- Faster access to information

### Why Alphabetical Ordering?
- Prevents any bias or favoritism
- Equal treatment of all candidates
- Government-grade neutrality

### Why Audio-First?
- Serves low-literacy users
- Accessible for visually impaired
- Helpful for elderly voters
- Works in noisy environments

### Why Large Touch Targets?
- Outdoor use (sunlight glare)
- Users with tremors or limited dexterity
- Low-cost smartphones with imprecise screens
- Elderly users

## 🌟 Future Enhancements

- [ ] Offline mode with service workers
- [ ] SMS-based information service
- [ ] More regional languages
- [ ] Voter registration status check
- [ ] Polling booth locator
- [ ] Election reminder notifications
- [ ] Animated Lottie files for voting steps
- [ ] Video content with sign language

## 🤝 Contributing

This is a non-partisan public service platform. Contributions are welcome, but must maintain:
- Complete political neutrality
- Factual accuracy (cite sources)
- Accessibility standards
- Privacy respect

## 📄 License

This project is intended for public benefit and educational purposes.

## 🙏 Acknowledgments

- Election Commission of India for public data
- Accessibility guidelines from WCAG 2.1
- Web Speech API for text-to-speech
- Open-source community

## 📞 Support

For issues or questions about the platform's neutrality, accessibility, or technical implementation, please open an issue in the repository.

---

**Remember:** This platform empowers voters with information. The choice is always yours. 🗳️
