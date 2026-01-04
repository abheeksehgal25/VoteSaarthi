import express from 'express'
import State from '../models/State.js'

const router = express.Router()

// Get all states
router.get('/', async (req, res) => {
  try {
    const states = await State.find().sort({ name: 1 }).lean()
    res.json(states)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create a new state (admin only - implement auth in production)
router.post('/', async (req, res) => {
  try {
    const state = new State(req.body)
    await state.save()
    res.status(201).json(state)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
