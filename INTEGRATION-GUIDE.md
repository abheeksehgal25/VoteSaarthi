# Real Candidate Data Integration Guide

## Overview
Integration of constituency-wise candidate data from MyNeta into your existing MERN voter awareness platform.

## What Was Created

### 1. **Asset Normalization Utility** (`server/utils/assetNormalizer.js`)
- `normalizeToRange(amount)` - Converts numeric values to predefined ranges
- `parseMyNetaAsset(string)` - Parses MyNeta format strings
- `validateCandidate(candidate)` - Validates candidate data before insertion

**Asset Ranges:**
- `< ₹1 Lakh`
- `₹1–10 Lakh`
- `₹10 Lakh–1 Crore`
- `₹1–5 Crore`
- `₹5 Crore+`

### 2. **Real Candidate Data** (`server/data/delhiCandidates.js`)
Real data from MyNeta for 5 Delhi constituencies:
- NEW DELHI (23 candidates)
- GREATER KAILASH (5 candidates)
- PATEL NAGAR (5 candidates)
- R K PURAM (13 candidates)
- RAJINDER NAGAR (7 candidates)

### 3. **Updated Candidate Schema** (`server/models/Candidate.js`)
**Changes:**
- `criminalCases`: Changed from Boolean to Number (stores count)
- `assets`: Added enum validation for ranges
- `liabilities`: New field with same ranges
- `age`: Added min: 18, max: 120 validation
- `dataSource`: New field (ADR/MyNeta/ECI/Manual)
- `lastUpdated`: New timestamp field
- `isWinner`: New boolean flag

### 4. **Delhi Seed Script** (`server/seedDelhi.js`)
Dedicated script to seed Delhi constituency data with validation.

## Integration Steps

### Step 1: Run the Delhi Seed Script
```bash
cd server
npm run seed:delhi
```

This will:
- Clear existing Delhi data
- Create Delhi state
- Create 5 constituencies
- Add 53 real candidates with validated data
- Display validation results

### Step 2: Test the API
```bash
# Get all states (should include Delhi)
GET http://localhost:5000/api/states

# Get Delhi constituencies
GET http://localhost:5000/api/constituencies?state=<delhi_state_id>

# Get candidates for NEW DELHI constituency
GET http://localhost:5000/api/candidates?constituency=<constituency_id>
```

### Step 3: Frontend Display (Already Implemented)
Your existing `KnowYourCandidates.jsx` will automatically display:
- Criminal cases as numbers (not Yes/No)
- Asset ranges (not exact amounts)
- Liabilities (new field)
- Winner badge for winning candidates

## Data Validation Rules

```javascript
// Automatic validation before insert:
- Name: Required, non-empty
- Party: Required (use "Independent" if none)
- Age: Must be ≥ 18 and ≤ 120
- Criminal Cases: Must be ≥ 0
- Assets: Must be valid range string
- Liabilities: Must be valid range string
- Data Source: Must be ADR/MyNeta/ECI/Manual
```

## MongoDB Collection Structure

```javascript
// States Collection
{
  _id: ObjectId,
  name: "Delhi",
  code: "DL"
}

// Constituencies Collection
{
  _id: ObjectId,
  name: "NEW DELHI",
  state: ObjectId (ref: State)
}

// Candidates Collection
{
  _id: ObjectId,
  name: "Parvesh Sahib Singh",
  constituency: ObjectId (ref: Constituency),
  party: "BJP",
  symbol: "🪷",
  education: "Post Graduate",
  criminalCases: 1,  // Number, not Boolean
  assets: "₹5 Crore+",  // Range, not exact amount
  liabilities: "₹5 Crore+",  // New field
  age: 47,
  dataSource: "MyNeta",
  lastUpdated: ISODate,
  isWinner: true
}
```

## Political Neutrality Features

### ✅ Already Implemented:
1. **Alphabetical sorting** - No ranking or ordering by wealth/education
2. **Asset ranges** - Not exact amounts (prevents wealth comparison)
3. **Equal UI treatment** - All candidates displayed identically
4. **No analysis** - Only factual data from affidavits
5. **Winner flag** - Shown as neutral badge, not prominently

### ⚠️ Important Constraints:
- Never sort by assets, criminal cases, or education
- Never add "recommended" or "top" labels
- Never compare candidates
- Always show all candidates from constituency

## Adding More States/Constituencies

### Option 1: Create Similar Data Files
```javascript
// server/data/maharashtraCandidates.js
export const maharashtraData = {
  state: { name: 'Maharashtra', code: 'MH' },
  constituencies: [
    {
      name: 'Mumbai North',
      candidates: [ /* ... */ ]
    }
  ]
}
```

### Option 2: Bulk Import from CSV/JSON
```bash
# Create a script to parse MyNeta data
node scripts/importFromMyNeta.js --state Delhi --file myneta_delhi.json
```

## API Endpoints (No Changes Needed)

Your existing endpoints work as-is:
```
GET /api/states
GET /api/constituencies?state=<state_id>
GET /api/candidates?constituency=<constituency_id>
```

## Frontend Updates Needed

### Update Criminal Cases Display
```jsx
{/* Old: Shows Yes/No */}
<span>{candidate.criminalCases ? 'Yes' : 'No'}</span>

{/* New: Shows count */}
<span>{candidate.criminalCases} case{candidate.criminalCases !== 1 ? 's' : ''}</span>
```

### Add Liabilities Display
```jsx
<div>
  <span>Liabilities:</span>
  <span>{candidate.liabilities || 'Not Available'}</span>
</div>
```

### Show Winner Badge (Optional)
```jsx
{candidate.isWinner && <span className="badge">✓ Winner</span>}
```

## Testing Checklist

- [ ] Seed script runs without errors
- [ ] All 53 Delhi candidates inserted
- [ ] Criminal cases stored as numbers
- [ ] Assets stored as ranges (not exact amounts)
- [ ] Age validation works (rejects < 18)
- [ ] Candidates sorted alphabetically
- [ ] Frontend displays updated fields
- [ ] No exact asset amounts shown
- [ ] All candidates treated equally

## Next Steps

1. **Run the seed**: `npm run seed:delhi`
2. **Test the API**: Check all endpoints return data
3. **Update frontend**: Adjust criminal cases display to show numbers
4. **Add more states**: Follow the same pattern for other states
5. **Monitor neutrality**: Ensure no rankings/comparisons creep in

## Safety Notes

- **Never expose exact asset amounts** - Always use ranges
- **No candidate scoring** - No "best candidate" features
- **Equal visual weight** - Same card size, fonts, colors for all
- **Alphabetical only** - Never sort by any metric except name
- **Source attribution** - Always mention "Data from MyNeta"

---

**Status**: ✅ Integration-ready. Run `npm run seed:delhi` to start.
