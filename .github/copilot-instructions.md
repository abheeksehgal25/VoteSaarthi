# Voter Awareness Platform - Project Instructions

## Project Overview
MERN stack voter awareness platform for India - politically neutral, accessibility-first, audio-visual interface.

## ✅ Completed Implementation

### Frontend (React + Vite + Tailwind CSS)
- ✅ Homepage with three main navigation options
- ✅ How Voting Works (4-step educational module)
- ✅ Know Your Candidates (neutral candidate display)
- ✅ Misinformation Awareness Game (interactive learning)
- ✅ Audio system with Web Speech API
- ✅ Language selector (6 Indian languages)
- ✅ Audio toggle component
- ✅ Accessibility-first design (WCAG 2.1 AA compliant)
- ✅ Mobile-first responsive layout
- ✅ Large touch targets (48px minimum)
- ✅ High contrast colors
- ✅ ARIA labels and semantic HTML

### Backend (Node.js + Express + MongoDB)
- ✅ Express server with CORS and middleware
- ✅ MongoDB models (State, Constituency, Candidate, Scenario)
- ✅ RESTful API routes
- ✅ Database seeding script with sample data
- ✅ Environment configuration

### Documentation
- ✅ README.md (complete project overview)
- ✅ QUICKSTART.md (getting started guide)
- ✅ DEVELOPMENT.md (developer guide)
- ✅ ACCESSIBILITY.md (accessibility documentation)
- ✅ PROJECT-SUMMARY.md (implementation summary)
- ✅ setup.ps1 (automated setup script)
- ✅ start.ps1 (quick start script)

## 🚀 Next Steps for Development

1. **Start MongoDB** (if not running)
   ```bash
   mongod
   ```

2. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

3. **Run development servers**
   ```bash
   .\start.ps1
   # OR manually in two terminals:
   # Terminal 1: cd server && npm run dev
   # Terminal 2: cd client && npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📋 Key Features

- **Political Neutrality**: No rankings, equal treatment of all candidates
- **Accessibility**: Screen reader support, keyboard navigation, audio-first
- **Mobile-First**: Optimized for low-end smartphones
- **Audio-Visual**: Web Speech API for voice guidance
- **Multi-Language**: Support for 6 Indian languages
- **Educational**: Three learning modules
- **Privacy-Focused**: No tracking, no user accounts

## 🎯 Design Principles

- One action per screen
- Large touch targets (48px+)
- High contrast for outdoor visibility
- Voice narration on every screen
- Simple language, minimal text
- No ads, no bias, no personalization

## 📁 Project Structure

```
iitm/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Audio context
│   │   └── pages/       # Page components
│   └── package.json
├── server/              # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── seed.js          # Database seeding
│   └── server.js
└── [documentation files]
```

## 🔧 Technology Stack

- Frontend: React 18, Vite, Tailwind CSS, React Router, Axios, Lottie
- Backend: Node.js, Express, MongoDB, Mongoose
- Audio: Web Speech API
- Accessibility: ARIA labels, semantic HTML, WCAG 2.1 AA

## ⚠️ Important Guidelines

### Political Neutrality
- Never rank or recommend candidates
- Always sort alphabetically
- Use equal visual treatment
- Display only factual, verified data
- No emotional or persuasive language

### Accessibility
- All interactive elements must have ARIA labels
- Minimum 48px touch targets
- Voice narration for all content
- Keyboard navigation support
- High contrast colors (4.5:1 minimum)

### Data Integrity
- Only use official Election Commission data
- Cite sources for all information
- Verify candidate info from affidavits
- No unverified claims

## 📚 Documentation Reference

- `README.md` - Complete project overview
- `QUICKSTART.md` - Quick start guide
- `DEVELOPMENT.md` - Development guide with detailed instructions
- `ACCESSIBILITY.md` - Comprehensive accessibility documentation
- `PROJECT-SUMMARY.md` - What has been built and project status

---

**Status**: ✅ Complete and ready for development/testing
**Last Updated**: January 2026
