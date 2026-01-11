# Voter Awareness Platform - Complete Project Documentation

## 🎯 Project Overview

**Purpose**: A politically neutral, accessibility-first voter awareness platform for India designed to educate citizens about voting processes, provide unbiased candidate information, and help identify misinformation.

**Target Audience**: Indian voters, especially first-time voters and those with limited digital literacy, including support for visually impaired users.

**Core Principle**: Complete political neutrality - no rankings, no recommendations, equal treatment for all candidates.

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18.2.0** - Modern UI library with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Router v6** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lottie React** - Animation library (optional)
- **Web Speech API** - Browser-native text-to-speech for audio features

### **Backend**
- **Node.js** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **MongoDB Atlas** - Cloud NoSQL database
- **Mongoose 8.0.4** - ODM for MongoDB with schema validation

### **Development Tools**
- **ESLint** - Code linting
- **dotenv** - Environment variable management
- **CORS** - Cross-origin resource sharing
- **PowerShell** - Automation scripts

---

## 📁 Project Structure

```
iitm/
├── client/                    # React frontend
│   ├── public/
│   │   └── videos/           # Video files for voting steps
│   ├── src/
│   │   ├── components/       # Reusable components
│   │   │   ├── AudioToggle.jsx
│   │   │   └── LanguageSelector.jsx
│   │   ├── context/
│   │   │   └── AudioContext.jsx     # Global audio state
│   │   ├── data/
│   │   │   └── voterHelpData.js     # Q&A data
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── HowVotingWorks.jsx
│   │   │   ├── KnowYourCandidates.jsx
│   │   │   ├── MisinformationGame.jsx
│   │   │   └── VoterHelpAssistant.jsx
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── translations.js      # i18n helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   └── package.json
│
├── server/                    # Express backend
│   ├── data/
│   │   └── delhiCandidates.js        # Real candidate data
│   ├── middleware/
│   │   └── neutrality.js             # Political neutrality enforcement
│   ├── models/
│   │   ├── State.js
│   │   ├── Constituency.js
│   │   ├── Candidate.js
│   │   └── Scenario.js
│   ├── routes/
│   │   ├── states.js
│   │   ├── constituencies.js
│   │   ├── candidates.js
│   │   └── game.js
│   ├── services/
│   │   ├── realDataService.js        # Data fetching & normalization
│   │   └── dataIntegration.js
│   ├── utils/
│   │   └── assetNormalizer.js        # Asset range standardization
│   ├── seed.js                       # Database seeding script
│   ├── seedDelhi.js                  # Delhi-specific seeding
│   ├── seedScenarios.js              # Game scenarios seeding
│   ├── addHindiNames.js              # Candidate name translation
│   ├── server.js                     # Main server file
│   └── package.json
│
├── .gitignore
├── README.md
├── QUICKSTART.md
├── DEVELOPMENT.md
├── ACCESSIBILITY.md
├── PROJECT-SUMMARY.md
└── .github/
    └── copilot-instructions.md
```

---

## 🎨 Frontend Implementation

### **1. Routing System (App.jsx)**

```javascript
Routes:
- / → HomePage
- /how-voting-works → HowVotingWorks
- /candidates or /know-your-candidates → KnowYourCandidates
- /game → MisinformationGame
- /voter-help → VoterHelpAssistant
```

### **2. Global State Management**

**AudioContext.jsx** - Centralized audio and language management:
- Uses React Context API
- Manages current language (English/Hindi)
- Provides `speak()` function using Web Speech Synthesis API
- Handles audio on/off toggle
- **Persistence**: Saves language and audio preferences to `localStorage`
- Auto-restores settings on page refresh

```javascript
Key Features:
- speak(text, language) - Text-to-speech with language-specific voices
- currentLanguage - 'en-IN' or 'hi-IN'
- isAudioOn - Boolean for audio toggle
- setCurrentLanguage() - Language switcher with persistence
```

### **3. Pages Implementation**

#### **HomePage.jsx**
- Welcome screen with 4 main navigation buttons
- Large touch targets (minimum 48px)
- Each button speaks its label on click before navigating
- Animations and clear visual hierarchy
- Features:
  - How Voting Works 🗳️
  - Know Your Candidates 👥
  - Spot Misinformation 🛡️
  - Voter Help Assistant ❓

#### **HowVotingWorks.jsx**
- **4-step educational flow** teaching the voting process
- Step data structure with bilingual content:
  - Title, description, audioText, icon, details array
- **Video integration**: Side-by-side layout (video left, content right)
  - HTML5 video player with autoplay, controls, muted
  - Video files: step1.mp4, step2.mp4, step3.mp4, step4.mp4
- Progress indicators (4 dots showing current step)
- **Listen Again button** (🔊) - Green button to replay step audio
- Navigation: Previous/Next buttons (w-40 width)
- Auto-speaks step content on navigation
- Fully responsive (stacks on mobile)

**Implementation Details:**
- `getSteps(lang)` - Returns bilingual step data
- `useEffect` - Auto-speaks on step change
- `handleListenAgain()` - Replays current step audio
- Grid layout: `lg:grid-cols-2` for side-by-side view

#### **KnowYourCandidates.jsx**
- **Three-tier selection**: State → Constituency → Candidates
- Fetches real data from MongoDB via API
- **Bilingual candidate display**:
  - Names: Uses `nameHi` field when Hindi selected
  - Party names: Spelled letter-by-letter (B J P, A A P)
  - Education, assets, liabilities all translated
- **Expandable candidate cards**:
  - Click to expand/collapse
  - Shows: Name, Party, Age, Education, Criminal cases, Assets, Liabilities
  - Expanded: Previous positions, Key issues, Manifesto, Contact info
- **Comprehensive audio narration** on click:
  - Candidate name (in Hindi if selected)
  - Party (properly pronounced: "B J P" not "BJP")
  - Age, Education, Criminal cases, Assets, Liabilities
  - Previous positions if available
- **Official party symbols**: 🪷 (BJP), ✋ (INC), 🧹 (AAP), 🐘 (BSP), ⭐ (Independent)
- Alphabetically sorted (political neutrality)
- Disclaimer: "All candidates shown with equal importance"

**Data Flow:**
```
User selects state → API call → Get constituencies
User selects constituency → API call → Get candidates
User clicks candidate → Expand card + Audio narration
```

**Translation Helpers:**
- `translateAssetRange()` - ₹10 Lakh–1 Crore → ₹10 लाख–1 करोड़
- `translateEducation()` - Post Graduate → स्नातकोत्तर
- `translateStateName()` - Delhi → दिल्ली
- `translateConstituencyName()` - NEW DELHI → नई दिल्ली
- `formatPartyForAudio()` - BJP → "B J P" / "बी जे पी"

#### **MisinformationGame.jsx**
- **Interactive learning game** with 6 scenarios
- Scenarios stored in MongoDB with bilingual content
- **Three answer options**:
  - ✔ Factual Information (`information`)
  - ⚠ Emotional Manipulation (`emotional`)
  - ❌ Misleading/False (`misleading`)
- **Auto-audio**: Reads scenario content on load
- **Listen Again button** - Replays scenario before answering
- Progress bar (6 dots with color coding)
- Instant feedback: Green (correct) / Red (incorrect)
- **Explanation section** shows:
  - Correct answer with explanation
  - Emotion used (Fear, Confusion, Greed, etc.)
  - Tip for identifying similar content
- Next scenario or finish

**Scenario Structure:**
```javascript
{
  content: { 'en-IN': '...', 'hi-IN': '...' },
  type: 'whatsapp' | 'social' | 'information',
  correctAnswer: 'misleading',
  explanation: { 'en-IN': '...', 'hi-IN': '...' },
  emotionUsed: { 'en-IN': '...', 'hi-IN': '...' },
  tip: { 'en-IN': '...', 'hi-IN': '...' }
}
```

#### **VoterHelpAssistant.jsx**
- **Menu-based Q&A system** (NOT a chatbot - no free text input)
- **5 categories** with 4-5 questions each (25+ total questions)
- **Three-view navigation system**:
  1. **Categories view**: Grid of 5 category cards
  2. **Questions view**: List of questions for selected category
  3. **Answer view**: Question + Answer + Related questions
- **Auto-audio**: Speaks on category/question selection
- **Listen Again button**: Available on answer view
- **Related questions**: Guided navigation for deeper learning
- Fully bilingual with structured data in `voterHelpData.js`

**Categories:**
- Voting Basics (What is voting?, Who can vote?, etc.)
- How Voting Works (EVM usage, polling booth process)
- Voter ID & Eligibility (ID requirements, age criteria)
- Elections & Government (Types of elections, term lengths)
- Misinformation Awareness (Fact-checking, fear-based messages)

**Navigation Flow:**
```
Categories → Select category → Questions list
→ Select question → Answer + Related questions
→ Click related question → New answer
→ "More Questions" → Back to questions list
→ "Other Topics" → Back to categories
```

### **4. Components**

#### **LanguageSelector.jsx**
- Dropdown with 6 Indian languages (only English/Hindi active)
- Updates global language state via AudioContext
- Speaks confirmation in selected language
- Persists selection to localStorage

#### **AudioToggle.jsx**
- Toggle button with 🔊/🔇 icons
- Controls global audio on/off
- Persists to localStorage
- Does not affect audio already playing (completes current speech)

### **5. Internationalization (i18n)**

**translations.js** - Complete translation system:
- **282 translation keys** covering all UI text
- Two languages: `'en-IN'` and `'hi-IN'`
- Structure:
```javascript
translations = {
  'en-IN': { homeTitle: 'Your Vote Matters', ... },
  'hi-IN': { homeTitle: 'आपका वोट मायने रखता है', ... }
}
```

**Helper Functions:**
- `getTranslation(key, language)` - Main translation function
- `translateAssetRange(range, language)` - Financial ranges
- `translateEducation(education, language)` - Education levels
- `translateStateName(state, language)` - State names
- `translateConstituencyName(const, language)` - Constituency names
- `formatPartyForAudio(party, language)` - Party pronunciations

**Pronunciation Mappings:**
```javascript
Party Audio:
BJP → "B J P" (English) / "बी जे पी" (Hindi)
INC → "I N C" / "आई एन सी"
AAP → "A A P" / "ए ए पी"
BSP → "B S P" / "बी एस पी"
IND → "Independent" / "निर्दलीय"
```

### **6. Accessibility Features**

- **ARIA labels** on all interactive elements
- **Semantic HTML**: `<header>`, `<main>`, `<nav>`, `<button>`
- **Keyboard navigation**: All elements focusable and actionable
- **Screen reader support**: Descriptive labels and announcements
- **Touch targets**: Minimum 48x48px (WCAG 2.1 AA compliant)
- **High contrast**: 4.5:1 minimum contrast ratio
- **Text-to-speech**: Web Speech API with language-specific voices
- **Mobile-first design**: Works on low-end smartphones
- **Offline-capable**: Can work with cached data
- **No flashing content**: Avoids seizure triggers

### **7. Styling System**

**Tailwind CSS Configuration:**
```javascript
Custom classes:
- touch-target: min-h-[48px] min-w-[48px]
- touch-button: p-4 rounded-2xl text-lg
- touch-base/lg/xl/2xl: Font sizes optimized for touch
- card-elevated: Shadow and border for depth
```

**Color Palette:**
- Primary (Blue): Voting works section
- Secondary (Green): Candidates section  
- Amber: Misinformation game
- Purple: Help assistant
- Neutral grays: Text and backgrounds

**Responsive Design:**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Grid system: `lg:grid-cols-2` for side-by-side layouts
- Stacks vertically on mobile

---

## 🗄️ Backend Implementation

### **1. Server Architecture (server.js)**

**Express Server Setup:**
```javascript
Port: 5000
Middleware:
- cors() - Allows frontend access
- express.json() - JSON body parser
- Custom error handling
```

**Routes:**
```javascript
/api/states → Get all states
/api/constituencies → Get constituencies by state
/api/candidates → Get candidates by constituency
/api/game/scenarios → Get game scenarios
```

### **2. Database Models (Mongoose)**

#### **State.js**
```javascript
{
  name: String (required),
  code: String (required, unique)
}
```

#### **Constituency.js**
```javascript
{
  name: String (required),
  state: ObjectId (ref: State),
  code: String (required, unique)
}
```

#### **Candidate.js**
- **57 candidates** from Delhi constituencies
```javascript
{
  name: String (required),
  nameHi: String (Hindi name),
  constituency: ObjectId (ref: Constituency),
  party: String,
  symbol: String (emoji),
  education: String,
  criminalCases: Number,
  assets: String,
  liabilities: String,
  age: Number,
  profession: String,
  previousPositions: [String],
  keyIssues: [{issue: String, stance: String}],
  manifesto: String,
  contactInfo: {phone, email, website},
  socialMedia: {twitter, facebook},
  dataSource: String,
  isWinner: Boolean
}
```

**Key Features:**
- Mixed type fields for bilingual support (nameHi)
- Asset ranges normalized (< ₹1 Lakh, ₹1-10 Lakh, etc.)
- Criminal cases stored as numbers
- Rich metadata (previous positions, key issues, manifesto)

#### **Scenario.js**
- **6 bilingual game scenarios**
```javascript
{
  content: Schema.Types.Mixed,      // {en-IN: '...', hi-IN: '...'}
  type: String (enum: whatsapp, social, information),
  correctAnswer: String (enum: information, emotional, misleading),
  explanation: Schema.Types.Mixed,
  emotionUsed: Schema.Types.Mixed,
  tip: Schema.Types.Mixed,
  language: String (default: 'en'),
  isActive: Boolean (default: true)
}
```

**Mixed Type Usage**: Allows storing both strings and objects (for bilingual content)

### **3. Data Services**

#### **realDataService.js**
- Central service for data fetching and processing
- **Rate limiting**: Queue system for API calls (2 second delay)
- **Caching**: In-memory cache with TTL (Time To Live)
- **Functions**:
  - `getStates()` - Fetch states with caching
  - `getConstituencies(stateId)` - Fetch constituencies
  - `getCandidates(constituencyId)` - Fetch candidates
  - `getPartySymbol(party)` - Map party to emoji symbol
  - `enforceNeutrality(candidates)` - Ensure neutral treatment

**Neutrality Enforcement:**
```javascript
- Alphabetical sorting (by name)
- Equal data formatting
- No ranking/rating/recommendation fields
- Consistent display order
- Includes nameHi field in API response
```

#### **assetNormalizer.js**
- Standardizes asset/liability formats
- Converts various formats to consistent ranges:
  - < ₹1 Lakh
  - ₹1–10 Lakh
  - ₹10 Lakh–1 Crore
  - ₹1–5 Crore
  - ₹5 Crore+
  - Not Available
- Handles null, undefined, and various string formats

### **4. Database Seeding**

#### **seedDelhi.js** - Main seeding script
```bash
npm run seed:delhi
```
- Seeds 1 state (Delhi)
- Seeds 6 constituencies (New Delhi, Rajinder Nagar, etc.)
- Seeds **57 real candidates** with verified data
- Applies party symbols
- Normalizes asset/liability ranges
- **Data source**: MyNeta (affidavits)

**Process:**
1. Clear existing data
2. Create State document (Delhi)
3. Create 6 Constituency documents
4. Import 57 candidates from `delhiCandidates.js`
5. Assign party symbols (🪷, ✋, 🧹, 🐘, ⭐)
6. Normalize financial data
7. Save to MongoDB

#### **seedScenarios.js**
```bash
node seedScenarios.js
```
- Seeds 6 bilingual misinformation scenarios
- Each scenario has English and Hindi content
- Covers different types: WhatsApp, Social media, Official

**Scenarios:**
1. Ration card threat (misleading)
2. Election date change (misleading)
3. Voter list removal (misleading)
4. Official election notice (information)
5. Money promise (emotional)
6. Community division (emotional)

#### **addHindiNames.js**
```bash
node addHindiNames.js
```
- Adds Hindi names (Devanagari script) to all 57 candidates
- Updates existing Candidate documents
- Maps English names to Hindi equivalents
- Example: Arvind Kejriwal → अरविंद केजरीवाल

### **5. API Endpoints**

#### **GET /api/states**
```javascript
Response: [{ _id, name, code }]
Sorting: Alphabetical by name
Neutrality: Equal treatment
```

#### **GET /api/constituencies?state={stateId}**
```javascript
Query param: state (MongoDB ObjectId)
Response: [{ _id, name, code, state }]
Sorting: Alphabetical
```

#### **GET /api/candidates?constituency={constituencyId}**
```javascript
Query param: constituency (MongoDB ObjectId)
Response: [{ name, nameHi, party, symbol, education, ... }]
Sorting: Alphabetical by name (neutrality)
Includes: nameHi field for bilingual support
Excludes: __v, createdAt, updatedAt
```

**Neutrality Enforcement:**
- Alphabetical sorting (no ranking)
- All fields treated equally
- No "popular", "recommended", "rating" fields
- Consistent formatting

#### **GET /api/game/scenarios**
```javascript
Response: [{ content, type, correctAnswer, explanation, ... }]
Filter: isActive: true
Projection: Only necessary fields
Bilingual: content, explanation, emotionUsed, tip
```

---

## 🔊 Audio System Implementation

### **Web Speech Synthesis API**

**Features:**
- Browser-native (no external libraries)
- Language-specific voices
- Volume, rate, pitch control
- Queue management

**Implementation in AudioContext:**
```javascript
const speak = (text, language) => {
  if (!isAudioOn) return
  
  window.speechSynthesis.cancel() // Stop previous
  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = language
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}
```

**Usage Patterns:**
1. **Auto-speak on page load**: Welcome messages, instructions
2. **Speak on interaction**: Button clicks, selections
3. **Listen Again buttons**: Replay content on demand
4. **Speak on state change**: New scenario, step change, answer selection

**Voice Selection:**
- `en-IN`: Google UK English Female / Microsoft Zira
- `hi-IN`: Google हिन्दी / Microsoft Hemant

---

## 🎯 Key Features Implemented

### **1. Political Neutrality**
- **Alphabetical sorting** everywhere (no ranking)
- **Equal visual treatment**: Same card sizes, colors, fonts
- **No bias indicators**: No stars, ratings, recommendations
- **Neutral language**: Factual only, no persuasive text
- **Equal data display**: All candidates get same fields
- **Official symbols only**: Using registered party symbols
- **Disclaimer text**: "All candidates shown with equal importance"

### **2. Bilingual Support (English + Hindi)**
- **UI translations**: 282+ keys covering all text
- **Candidate names**: Both English and Hindi (nameHi field)
- **Dynamic content**: Game scenarios, help questions all bilingual
- **Party pronunciations**: Letter-by-letter for acronyms
- **Asset ranges**: ₹10 Lakh → ₹10 लाख
- **Education levels**: Graduate → स्नातक
- **Location names**: Delhi → दिल्ली

### **3. Accessibility-First Design**
- **Audio-first approach**: Every screen has audio narration
- **Large touch targets**: 48px minimum (WCAG AA)
- **High contrast**: 4.5:1 ratio for readability
- **Keyboard navigation**: Full keyboard support
- **Screen reader compatible**: ARIA labels throughout
- **Mobile-optimized**: Works on low-end smartphones
- **Simple language**: Minimal text, clear instructions
- **One action per screen**: Reduces cognitive load

### **4. Educational Content**
- **4-step voting guide** with videos
- **Candidate information** from official affidavits
- **Misinformation awareness**: 6 scenarios teaching critical thinking
- **25+ Q&A pairs**: Covering voting basics, rights, processes
- **Related questions**: Guided learning paths

### **5. Data Persistence**
- **Language preference**: Saved to localStorage
- **Audio toggle**: Persists across sessions
- **No user accounts**: Privacy-focused (no tracking)
- **Session state**: Maintains progress within session

---

## 🔍 Special Implementation Details

### **1. Asset Range Normalization**
**Problem**: Candidates report assets in various formats

**Solution**: `assetNormalizer.js` converts to 6 standard ranges
```javascript
Input: "Rs 10,50,000" or "1050000" or "10.5 Lakh"
Output: "₹10 Lakh–1 Crore"
```

### **2. Party Symbol Mapping**
**Implementation**: Two-tier system
- Short codes: BJP, AAP, INC, BSP → Symbols
- Full names: Bharatiya Janata Party → Same symbol
- Fallback: Unknown parties get ⭐

### **3. Audio Pronunciation for Acronyms**
**Problem**: Speech synthesizer reads "BJP" as "beejap"

**Solution**: `formatPartyForAudio()` converts:
- BJP → "B J P" (spaces between letters)
- Hindi: BJP → "बी जे पी"

### **4. Bilingual Content Handling**
**Mixed Type Schema**: Allows both string and object
```javascript
// Scenario content can be:
content: "Text"  // Old format (backward compatible)
// OR
content: { 'en-IN': 'Text', 'hi-IN': 'पाठ' }  // New bilingual format

// Frontend handles both:
const text = typeof content === 'object' 
  ? content[currentLanguage] 
  : content
```

### **5. Video Integration**
**Side-by-side layout** for voting steps:
- CSS Grid: `lg:grid-cols-2`
- Left column: Video player (autoplay, muted, controls)
- Right column: Text content + details
- Mobile: Stacks vertically
- Video key prop: Forces reload on step change

### **6. Expandable Candidate Cards**
**State management**:
- `expandedCandidate`: Stores current expanded ID
- Click toggle: Expand/collapse with animation
- Audio narration: Comprehensive info on expand
- Only one card expanded at a time

### **7. Three-View Navigation (Help Assistant)**
**State machine pattern**:
```javascript
view: 'categories' | 'questions' | 'answer'
selectedCategory: Category ID
selectedQuestion: Question ID

Flow:
categories → select category → questions
questions → select question → answer
answer → related question → new answer
```

---

## 📊 Data Flow Architecture

### **Frontend → Backend → Database**

```
User Action (KnowYourCandidates):
1. User selects state → Select event
2. Frontend calls: GET /api/constituencies?state={id}
3. Backend queries: Constituency.find({ state: id })
4. MongoDB returns: Array of constituency documents
5. Backend sorts: Alphabetically (neutrality)
6. Backend sends: JSON response
7. Frontend updates: constituencies state
8. UI renders: Dropdown with options

User Action (Click Candidate):
1. User clicks candidate card → onClick event
2. Component calls: handleCandidateClick(candidate)
3. Function builds: Audio narration string
4. Function calls: speak(narration, language)
5. Web Speech API: Speaks text
6. Component updates: expandedCandidate state
7. UI renders: Expanded card with details
```

### **Language Change Flow**

```
User selects language:
1. LanguageSelector onChange event
2. setCurrentLanguage('hi-IN') in AudioContext
3. localStorage.setItem('selectedLanguage', 'hi-IN')
4. All components re-render (Context update)
5. All text uses getTranslation(key, 'hi-IN')
6. All audio uses speak(text, 'hi-IN')
7. Speech API uses Hindi voice
```

---

## 🚀 Performance Optimizations

1. **Caching**: Backend caches API responses (TTL-based)
2. **Rate limiting**: Prevents API abuse (2s delay between calls)
3. **Lazy loading**: Components load on route navigation
4. **Memoization**: Expensive computations cached
5. **Debouncing**: Speech synthesis cancels previous utterances
6. **Selective rendering**: Only expanded cards show full details
7. **Lean queries**: MongoDB projections exclude unnecessary fields

---

## 🔒 Security & Privacy

1. **No user accounts**: Zero personal data collection
2. **No tracking**: No analytics, cookies, or fingerprinting
3. **CORS protection**: Only whitelisted origins
4. **Input validation**: Mongoose schema validation
5. **MongoDB injection prevention**: Parameterized queries
6. **HTTPS ready**: SSL certificate compatible
7. **Environment variables**: Sensitive data in .env
8. **No client secrets**: API keys server-side only

---

## 🧪 Testing Approach

- **Manual testing**: Cross-browser, cross-device
- **Audio testing**: Multiple voices, languages
- **Accessibility testing**: Screen readers, keyboard navigation
- **Mobile testing**: Various screen sizes, touch interactions
- **Data integrity**: Verified against official sources
- **Neutrality checks**: Ensured equal treatment

---

## 📈 Project Statistics

- **Total files**: ~40 files
- **Lines of code**: ~6,000+ lines
- **Translation keys**: 282 keys (2 languages = 564 entries)
- **Candidates**: 57 real candidates
- **Constituencies**: 6 (Delhi)
- **Game scenarios**: 6 bilingual scenarios
- **Help questions**: 25+ Q&A pairs
- **Party symbols**: 13+ major parties mapped
- **Languages supported**: 2 active (English, Hindi), 4 planned

---

## 🎓 Key Learnings & Decisions

### **1. Why Web Speech API over external libraries?**
- Native browser support (no dependencies)
- Free (no API costs)
- Works offline
- Multi-language support built-in

### **2. Why MongoDB over SQL?**
- Flexible schema (Mixed types for bilingual content)
- Easy JSON structure
- Cloud-ready with Atlas
- Better for semi-structured data

### **3. Why Tailwind over custom CSS?**
- Rapid prototyping
- Consistent design system
- Responsive utilities out-of-box
- Smaller bundle size

### **4. Why localStorage over cookies?**
- Larger storage (5MB vs 4KB)
- No server overhead
- Privacy-friendly (no tracking)
- Simple API

### **5. Why Context API over Redux?**
- Simpler for small state
- Less boilerplate
- Built into React
- Sufficient for our needs

---

## 🚀 Running the Project

### **Prerequisites**
- Node.js 16+ installed
- MongoDB Atlas account (or local MongoDB)
- Modern browser with Web Speech API support

### **Setup Steps**

1. **Clone and Install**
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

2. **Configure Environment**
```bash
# Create .env in server folder
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

3. **Seed Database**
```bash
cd server
npm run seed:delhi      # Seed Delhi candidates
node seedScenarios.js   # Seed game scenarios
node addHindiNames.js   # Add Hindi names
```

4. **Run Development Servers**
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

5. **Access Application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

---

## 📝 Future Enhancements

### **Planned Features**
- Add more states and constituencies
- Support for 4 additional languages (Tamil, Telugu, Kannada, Malayalam)
- Video upload feature for candidates
- Fact-checking API integration
- PWA support for offline usage
- Voice input for help assistant
- SMS-based voter registration check
- Electoral bond information
- Past election results comparison

### **Technical Improvements**
- Add unit tests (Jest, React Testing Library)
- Implement E2E testing (Playwright)
- Add error boundaries
- Optimize bundle size
- Implement service workers
- Add analytics (privacy-respecting)
- CI/CD pipeline
- Automated accessibility testing

---

## 🤝 Contributing Guidelines

1. **Code Style**: Follow ESLint rules
2. **Commits**: Use conventional commit messages
3. **Testing**: Test all changes manually
4. **Neutrality**: Ensure political neutrality
5. **Accessibility**: Maintain WCAG 2.1 AA compliance
6. **Translations**: Update both English and Hindi
7. **Documentation**: Update docs for new features

---

## 📄 License

This project is designed for educational purposes and public good. Use responsibly.

---

## 📧 Contact & Support

For questions, issues, or contributions, please refer to project documentation or contact the development team.

---

**Built with ❤️ for Indian Democracy**

This platform demonstrates a comprehensive implementation of a civic tech application with emphasis on accessibility, neutrality, and educational value. Every design decision prioritizes the user experience, especially for first-time voters and those with limited digital literacy.
