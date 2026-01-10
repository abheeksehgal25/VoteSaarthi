import mongoose from 'mongoose'

const scenarioSchema = new mongoose.Schema({
  content: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  type: {
    type: String,
    enum: ['whatsapp', 'social', 'poster', 'information'],
    required: true
  },
  correctAnswer: {
    type: String,
    enum: ['information', 'emotional', 'misleading', 'false'],
    required: true
  },
  explanation: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  emotionUsed: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  tip: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  language: {
    type: String,
    default: 'en'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
})

export default mongoose.model('Scenario', scenarioSchema)
