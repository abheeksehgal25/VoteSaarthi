import express from 'express'
import Scenario from '../models/Scenario.js'

const router = express.Router()

// Get all active scenarios
router.get('/scenarios', async (req, res) => {
  try {
    const language = req.query.lang || 'en'
    const scenarios = await Scenario.find({ 
      isActive: true,
      language: language
    }).lean() // Convert to plain JavaScript objects
    
    // Randomize order to prevent memorization
    const shuffled = scenarios.sort(() => Math.random() - 0.5)
    res.json(shuffled)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new scenario (admin only)
router.post('/scenarios', async (req, res) => {
  try {
    const scenario = new Scenario(req.body)
    await scenario.save()
    res.status(201).json(scenario)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
