import express from 'express'
import realDataService from '../services/realDataService.js'

const router = express.Router()

// Get constituencies by state (supports both query param and path param)
router.get('/', async (req, res) => {
  try {
    const stateId = req.query.state
    if (!stateId) {
      return res.status(400).json({ error: 'State parameter is required' })
    }
    const constituencies = await realDataService.getConstituencies(stateId)
    res.json(constituencies)
  } catch (error) {
    console.error('Error fetching constituencies:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get constituencies by state (path param version for backwards compatibility)
router.get('/:stateId', async (req, res) => {
  try {
    const constituencies = await realDataService.getConstituencies(req.params.stateId)
    res.json(constituencies)
  } catch (error) {
    console.error('Error fetching constituencies:', error)
    res.status(500).json({ error: error.message })
  }
})

// Create a new constituency (admin only)
router.post('/', async (req, res) => {
  try {
    const constituency = new Constituency(req.body)
    await constituency.save()
    res.status(201).json(constituency)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
