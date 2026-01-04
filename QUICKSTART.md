# 🚀 Quick Start Guide

## Immediate Next Steps

### 1. Update Environment Variables
Edit `server/.env` and update the MongoDB connection string:
```
MONGODB_URI=mongodb://localhost:27017/voter-awareness
```

Or use MongoDB Atlas (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/voter-awareness
```

### 2. Seed the Database
```bash
cd server
npm run seed
```

This will create:
- Sample states (Maharashtra, Karnataka, Tamil Nadu)
- Sample constituencies
- Sample candidates with neutral information
- Misinformation game scenarios

### 3. Start Development Servers

**Option A: Use the start script**
```bash
.\start.ps1
```

**Option B: Manual (two terminals)**

Terminal 1 - Backend:
```bash
cd server
npm run dev
```

Terminal 2 - Frontend:
```bash
cd client
npm run dev
```

### 4. Access the Application
Open your browser and navigate to:
```
http://localhost:3000
```

## Testing the Features

### Homepage
- ✅ Click on each large button to navigate
- ✅ Toggle audio on/off using the audio button
- ✅ Change language from the dropdown
- ✅ Listen to voice narration

### How Voting Works
- ✅ Navigate through 4 educational steps
- ✅ Listen to audio explanation for each step
- ✅ View large icons and clear instructions

### Know Your Candidates
- ✅ Select a state and constituency
- ✅ View candidate cards (all equal size, alphabetically ordered)
- ✅ Click on a candidate to hear details
- ✅ Verify neutral presentation (no rankings)

### Misinformation Game
- ✅ Read different types of messages
- ✅ Choose if it's information, emotional, or misleading
- ✅ Learn from explanations
- ✅ No pressure - focus on learning

## Accessibility Testing

### Screen Reader
1. Enable your screen reader (NVDA, JAWS, VoiceOver)
2. Navigate using Tab key
3. Verify all elements have proper ARIA labels

### Keyboard Navigation
1. Use Tab to move between elements
2. Use Enter/Space to activate buttons
3. Use Arrow keys in the education module

### Mobile Testing
1. Open Chrome DevTools (F12)
2. Click device toolbar icon
3. Test on various mobile sizes
4. Verify touch targets are large enough

## Common Issues

### MongoDB Connection Error
**Error:** `MongooseServerSelectionError`

**Solution:**
- Ensure MongoDB is running: `mongod`
- Or use MongoDB Atlas cloud database
- Check connection string in `.env`

### Port Already in Use
**Error:** `EADDRINUSE: address already in use`

**Solution:**
```bash
# Kill process on port 5000 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5000).OwningProcess | Stop-Process

# Kill process on port 3000 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

### Audio Not Working
**Issue:** No voice narration

**Solution:**
- Check browser permissions for audio
- Try Chrome/Edge (best Web Speech API support)
- Click the audio toggle to enable it

## Project Structure Overview

```
iitm/
├── client/              # React frontend
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Audio context for voice
│   │   ├── pages/       # Main page components
│   │   └── App.jsx      # Root component with routing
│   └── package.json
│
├── server/              # Express backend
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API endpoints
│   ├── seed.js          # Database seeding
│   └── server.js        # Main server file
│
├── README.md            # Complete documentation
├── DEVELOPMENT.md       # Developer guide
└── start.ps1           # Quick start script
```

## Key Features Implemented

### ✅ Mobile-First Design
- Responsive layout
- Large touch targets (48px minimum)
- High contrast colors
- Works on low-end devices

### ✅ Accessibility
- Web Speech API integration
- ARIA labels on all elements
- Keyboard navigation
- Screen reader compatible
- Multi-language support

### ✅ Political Neutrality
- No candidate rankings
- Alphabetical ordering only
- Equal visual treatment
- Only factual information
- No recommendations

### ✅ Three Core Modules
1. **How Voting Works** - Step-by-step education
2. **Know Your Candidates** - Neutral candidate info
3. **Misinformation Game** - Learn to spot fake news

### ✅ Audio-Visual Interface
- Voice narration on every screen
- Audio toggle for control
- Language-specific voices
- Clear iconography

## Next Steps

### For Development
1. Add real candidate data from Election Commission
2. Implement Lottie animations for voting steps
3. Add more regional languages
4. Create offline mode with service workers
5. Add admin panel for data management

### For Production
1. Set up MongoDB Atlas
2. Deploy backend to Railway/Heroku
3. Deploy frontend to Vercel/Netlify
4. Configure domain and SSL
5. Set up monitoring and backups

## Need Help?

Check the full documentation:
- [README.md](README.md) - Complete project overview
- [DEVELOPMENT.md](DEVELOPMENT.md) - Detailed dev guide

## Important Reminders

🔒 **Never compromise neutrality** - All candidates must be shown equally

📱 **Test on real devices** - Low-end smartphones are the primary target

♿ **Accessibility first** - Every feature must work with screen readers

🔊 **Audio is critical** - Voice guidance helps low-literacy users

🎯 **Keep it simple** - One action per screen, minimal text

---

**Happy building! You're helping strengthen democracy! 🗳️**
