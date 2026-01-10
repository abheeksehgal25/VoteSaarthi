import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import stateRoutes from './routes/states.js'
import constituencyRoutes from './routes/constituencies.js'
import candidateRoutes from './routes/candidates.js'
import gameRoutes from './routes/game.js'
import realDataService from './services/realDataService.js'
import { validateNeutrality, validateQueryNeutrality } from './middleware/neutrality.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Log all requests
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.url}`)
  next()
})

// Apply neutrality validation to all API routes
app.use('/api', validateQueryNeutrality)
app.use('/api', validateNeutrality)

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/voter-awareness')
  .then(() => {
    console.log('✅ MongoDB connected successfully')
    // Clear cache on server start to ensure fresh data
    realDataService.clearCache()
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err))

// Routes
app.use('/api/states', stateRoutes)
app.use('/api/constituencies', constituencyRoutes)
app.use('/api/candidates', candidateRoutes)
app.use('/api/game', gameRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Voter Awareness API is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
