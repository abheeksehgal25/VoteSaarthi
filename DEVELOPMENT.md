# Voter Awareness Platform - Development Guide

## Quick Start Commands

### First Time Setup
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI

# Seed the database with sample data
npm run seed
```

### Development
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm run dev
```

Access: http://localhost:3000

## Environment Variables

Create `server/.env`:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/voter-awareness
NODE_ENV=development
```

## Adding New Content

### Adding States
```javascript
const newState = await State.create({
  name: 'Gujarat',
  code: 'GJ'
})
```

### Adding Candidates
```javascript
const candidate = await Candidate.create({
  name: 'Name',
  constituency: constituencyId,
  party: 'Party Name',
  symbol: '🎯',
  education: 'Graduate',
  criminalCases: false,
  assets: '₹10-20 Lakhs',
  affidavitUrl: 'https://official-source.gov.in/...'
})
```

### Adding Misinformation Scenarios
```javascript
const scenario = await Scenario.create({
  content: 'The misleading message text...',
  type: 'whatsapp', // or 'social', 'poster', 'information'
  correctAnswer: 'misleading', // or 'false', 'emotional', 'information'
  explanation: 'Why this is misleading...',
  emotionUsed: 'Fear',
  tip: 'How to identify similar messages...',
  language: 'en'
})
```

## Customization

### Adding Languages

1. Update `client/src/components/LanguageSelector.jsx`:
```javascript
const languages = [
  ...
  { code: 'bn-IN', name: 'বাংলা', icon: '🇮🇳' },
]
```

2. Add language-specific scenarios in the database

### Styling

All styling uses Tailwind CSS with custom accessibility tokens:

```javascript
// tailwind.config.js
theme: {
  extend: {
    fontSize: {
      'touch-sm': ['18px', '28px'],
      'touch-base': ['20px', '32px'],
      'touch-lg': ['24px', '36px'],
    },
    spacing: {
      'touch': '48px', // Minimum touch target
    }
  }
}
```

### Audio Configuration

Adjust speech settings in `client/src/context/AudioContext.jsx`:
```javascript
utterance.rate = 0.9 // Speech speed (0.1-10)
utterance.pitch = 1  // Voice pitch (0-2)
utterance.volume = 1 // Volume (0-1)
```

## Testing Accessibility

### Manual Testing
1. Enable screen reader (NVDA/JAWS on Windows, VoiceOver on Mac)
2. Navigate with keyboard only (Tab, Enter, Arrows)
3. Test on mobile device in bright sunlight
4. Test with audio on/off
5. Try with different language settings

### Color Contrast
All colors meet WCAG AA standards:
- Primary blue: #2563eb (contrast ratio 4.5:1)
- Secondary green: #10b981 (contrast ratio 4.5:1)
- Text: #1f2937 on white (contrast ratio 12:1)

### Touch Targets
All interactive elements are minimum 48×48 pixels

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Heroku/Railway/DigitalOcean)
```bash
cd server
# Set environment variables on hosting platform
npm start
```

### MongoDB (Atlas)
Create a cluster at mongodb.com/cloud/atlas and update MONGODB_URI

## Data Sources

### Candidate Information
- Official affidavits from Election Commission of India
- Association for Democratic Reforms (ADR)
- myneta.info for verified data

### Important Notes
- Never display unverified information
- Always cite sources
- Update data before each election
- Remove old election data after completion

## Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod`
- Check connection string in .env
- For Atlas, whitelist your IP address

### Audio Not Working
- Check browser permissions
- Supported browsers: Chrome, Edge, Safari
- Web Speech API may not work on all browsers

### CORS Errors
- Backend includes CORS middleware
- Check that proxy is configured in vite.config.js
- Verify API URLs match

## Security Considerations

### Production Checklist
- [ ] Add authentication for admin routes
- [ ] Implement rate limiting
- [ ] Use HTTPS only
- [ ] Validate all inputs
- [ ] Sanitize data before storage
- [ ] Set secure HTTP headers
- [ ] Use environment variables for secrets
- [ ] Regular security audits

### Privacy
- No user tracking
- No analytics (optional: privacy-friendly analytics only)
- No cookies except essential ones
- No third-party scripts

## Maintenance

### Regular Updates
- Update candidate information before elections
- Add new scenarios for misinformation game
- Update language translations
- Test all features before election season

### Database Backup
```bash
# Backup
mongodump --db voter-awareness --out ./backup

# Restore
mongorestore --db voter-awareness ./backup/voter-awareness
```

## Support

For questions about:
- **Technical issues**: Check console logs and errors
- **Data accuracy**: Verify with Election Commission sources
- **Accessibility**: Test with assistive technologies
- **Neutrality concerns**: Review ethical guidelines in README

---

Built with ❤️ for Indian democracy
