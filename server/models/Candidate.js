import mongoose from 'mongoose'

const candidateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nameHi: {
    type: String,
    default: ''
  },
  constituency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Constituency',
    required: true
  },
  party: {
    type: String,
    required: true
  },
  symbol: {
    type: String,
    required: true
  },
  education: {
    type: String,
    required: true
  },
  criminalCases: {
    type: Number,  // Changed from Boolean to Number to store count
    default: 0,
    min: 0  // Cannot be negative
  },
  criminalCasesDetails: {
    type: String,
    default: ''
  },
  assets: {
    type: String,
    required: true,
    enum: [
      '< ₹1 Lakh',
      '₹1–10 Lakh',
      '₹10 Lakh–1 Crore',
      '₹1–5 Crore',
      '₹5 Crore+',
      'Not Available'
    ]
  },
  liabilities: {
    type: String,
    default: '< ₹1 Lakh',
    enum: [
      '< ₹1 Lakh',
      '₹1–10 Lakh',
      '₹10 Lakh–1 Crore',
      '₹1–5 Crore',
      '₹5 Crore+',
      'Not Available'
    ]
  },
  age: {
    type: Number,
    min: 18,  // Minimum voting age
    max: 120  // Realistic upper limit
  },
  dataSource: {
    type: String,
    enum: ['ADR', 'MyNeta', 'ECI', 'Manual'],
    default: 'Manual'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  isWinner: {
    type: Boolean,
    default: false
  },
  // Detailed information
  profession: {
    type: String,
    default: 'Not Available'
  },
  previousPositions: [{
    type: String
  }],
  keyIssues: [{
    issue: String,
    stance: String
  }],
  manifesto: {
    type: String,
    default: ''
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  socialMedia: {
    twitter: String,
    facebook: String
  },
  // All data must be from official affidavits
  affidavitUrl: {
    type: String
  }
}, {
  timestamps: true
})

// Ensure neutral ordering (no ranking)
candidateSchema.index({ constituency: 1, name: 1 })

// Pre-save hook: Validate neutrality
candidateSchema.pre('save', function(next) {
  // Remove any bias fields if accidentally added
  this._bias_score = undefined
  this._ranking = undefined
  this._popularity = undefined
  this._rating = undefined
  this._votes = undefined
  
  // Validate required fields
  if (!this.name || !this.constituency) {
    return next(new Error('Name and constituency are required'))
  }
  
  // Ensure name is properly formatted (no all caps)
  if (this.name === this.name.toUpperCase() && this.name.length > 3) {
    this.name = this.name.charAt(0) + this.name.slice(1).toLowerCase()
      .replace(/\b\w/g, char => char.toUpperCase())
  }
  
  next()
})

// Method to get neutral representation
candidateSchema.methods.toNeutralJSON = function() {
  return {
    _id: this._id,
    name: this.name,
    party: this.party,
    symbol: this.symbol,
    education: this.education,
    criminalCases: this.criminalCases,
    criminalCasesDetails: this.criminalCasesDetails,
    assets: this.assets,
    age: this.age,
    affidavitUrl: this.affidavitUrl
    // CRITICAL: No ranking, score, or popularity fields
  }
}

export default mongoose.model('Candidate', candidateSchema)
