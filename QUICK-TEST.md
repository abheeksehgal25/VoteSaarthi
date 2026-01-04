# 🧪 Quick Test Guide

## Test Hindi Audio (2 minutes)

### Browser Console Test
```javascript
// 1. Check if Hindi voice is available
window.speechSynthesis.getVoices()
  .filter(v => v.lang.includes('hi'))
  .forEach(v => console.log('✅', v.name, v.lang))

// 2. Test Hindi speech
const msg = new SpeechSynthesisUtterance('नमस्ते, मतदाता जागरूकता')
msg.lang = 'hi-IN'
window.speechSynthesis.speak(msg)
```

**Expected Output:**
```
✅ Google हिन्दी hi-IN
✅ Microsoft Heera - Hindi (India) hi-IN
```

### UI Test
1. Open http://localhost:3000
2. Click language dropdown → select "हिंदी"
3. Listen for Hindi narration: "मतदाता जागरूकता में आपका स्वागत है"
4. Check DevTools console for logs

---

## Test Real Data API (2 minutes)

### Health Check
```bash
curl http://localhost:5000/api/health
```

**Expected:**
```json
{
  "status": "ok",
  "message": "Voter Awareness API is running"
}
```

### Get Candidates
```bash
curl http://localhost:5000/api/candidates/CONSTITUENCY_ID
```

**Expected:**
```json
[
  {
    "_id": "...",
    "name": "Anjali Kumar",  // Alphabetically sorted
    "party": "Independent",
    "education": "Graduate",
    "criminalCases": false,
    "assets": "₹5-10 Lakhs"
    // NO _ranking, _bias_score, etc.
  },
  {
    "name": "Rajesh Sharma",  // Next alphabetically
    ...
  }
]
```

---

## Test Neutrality (3 minutes)

### 1. Check Alphabetical Sorting
```bash
curl http://localhost:5000/api/candidates/YOUR_ID | \
  jq 'map(.name) | sort == .'
# Should return: true
```

### 2. Check for Bias Fields
```bash
curl http://localhost:5000/api/candidates/YOUR_ID | \
  jq '.[0] | keys' | grep -E "ranking|bias|popular"
# Should return: nothing (no matches)
```

### 3. Visual Test
- Open candidate listing
- Verify all cards are same size
- Verify all cards are same color
- Verify alphabetical order

---

## Test Accessibility (5 minutes)

### Keyboard Navigation
1. Press Tab → should highlight first interactive element
2. Press Tab repeatedly → should cycle through all buttons
3. Press Enter → should activate focused element
4. Press Escape → should go back/cancel

### Screen Reader (if available)
1. Enable NVDA/JAWS
2. Navigate with Tab
3. Verify ARIA labels are read
4. Verify all content is accessible

### Audio
1. Toggle audio off → verify audio stops
2. Toggle audio on → verify audio resumes
3. Change language → verify audio switches
4. Navigate pages → verify auto-narration

---

## Test Error Handling (3 minutes)

### Network Failure
```javascript
// In DevTools Console
// Simulate offline
window.fetch = () => Promise.reject('Network error')

// Reload page
location.reload()

// Should show error message, not crash
```

### Missing Data
```bash
# Request non-existent constituency
curl http://localhost:5000/api/candidates/INVALID_ID
```

**Expected:**
```json
{
  "error": "Unable to fetch candidate data",
  "message": "Please try again later...",
  "candidates": []
}
```

---

## Performance Test (5 minutes)

### Lighthouse Audit
1. Open Chrome DevTools
2. Lighthouse tab
3. Select:
   - Performance
   - Accessibility
   - Best Practices
4. Click "Generate report"

**Target Scores:**
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+

### Load Time
```bash
# Measure API response time
time curl http://localhost:5000/api/candidates/YOUR_ID

# Should be < 500ms (with caching)
```

---

## Cross-Browser Test (10 minutes)

### Chrome (Primary)
- [ ] Audio works
- [ ] Hindi voice available
- [ ] All features functional

### Edge
- [ ] Audio works
- [ ] Hindi voice available
- [ ] All features functional

### Firefox
- [ ] Audio works (may be limited)
- [ ] Basic functionality works
- [ ] Fallback to English if needed

### Mobile Chrome (Android)
- [ ] Touch targets large enough
- [ ] Audio works
- [ ] Hindi voice via Google TTS
- [ ] Readable in sunlight

---

## Quick Fix Commands

### Restart Services
```bash
# Kill and restart backend
pkill -f "node.*server.js"
cd server && npm run dev

# Kill and restart frontend
pkill -f "vite"
cd client && npm run dev
```

### Clear Cache
```bash
# Clear API cache
curl -X POST http://localhost:5000/api/candidates/refresh-cache/YOUR_ID

# Clear browser cache
# Chrome: Ctrl+Shift+Del → Clear browsing data
```

### Reset Database
```bash
cd server
npm run seed
```

---

## Troubleshooting

### "Hindi voice not found"
1. Install Windows Hindi language pack
2. Restart browser
3. Check console: `window.speechSynthesis.getVoices()`
4. Use Chrome/Edge (best support)

### "API returns 500 error"
1. Check MongoDB is running: `mongod`
2. Check `.env` file has correct MONGODB_URI
3. Check server console for errors
4. Verify database has data: `npm run seed`

### "Candidates not alphabetically sorted"
1. Check neutrality middleware is applied
2. Check server console for violations
3. Clear cache and retry
4. Check Candidate model has correct sorting

---

## Success Checklist

**Hindi Audio ✅**
- [ ] Hindi voice detected in console
- [ ] Hindi narration plays correctly
- [ ] Fallback to English if voice unavailable
- [ ] No errors in console

**Real Data ✅**
- [ ] API returns candidate data
- [ ] Data is alphabetically sorted
- [ ] No bias fields present
- [ ] Error handling works

**Neutrality ✅**
- [ ] All candidates equal size/color
- [ ] Alphabetical ordering verified
- [ ] No rankings or recommendations
- [ ] Factual information only

**Accessibility ✅**
- [ ] Keyboard navigation works
- [ ] Audio narration on all screens
- [ ] Large touch targets (48px+)
- [ ] High contrast colors
- [ ] Screen reader compatible

---

## Quick Reference

**API Endpoints:**
- `/api/health` - Health check
- `/api/states` - All states
- `/api/constituencies/:stateId` - Constituencies by state
- `/api/candidates/:constituencyId` - Candidates by constituency
- `/api/game/scenarios` - Misinformation scenarios

**Test URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health

**Log Files:**
- Backend: Terminal running `npm run dev`
- Frontend: Browser DevTools Console (F12)
- MongoDB: `mongod` terminal

---

**Time to Test:** ~20 minutes total
**Priority:** Hindi audio → Real data → Neutrality → Accessibility

🎯 **Goal**: Verify all enhancements work before deployment
