import mongoose from 'mongoose'

const scenarioSchema = new mongoose.Schema({
  content: {
    type: String,
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
    type: String,
    required: true
  },
  emotionUsed: {
    type: String,
    required: true
  },
  tip: {
    type: String,
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
