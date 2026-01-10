import express from 'express'
import realDataService from '../services/realDataService.js'

const router = express.Router()

// Get candidates by constituency (supports both query param and path param)
// Important: Results are sorted alphabetically to maintain neutrality
router.get('/', async (req, res) => {
  try {
    const constituencyId = req.query.constituency
    console.log('🔍 API Request - Constituency ID:', constituencyId)
    if (!constituencyId) {
      return res.status(400).json({ error: 'Constituency parameter is required' })
    }
    const candidates = await realDataService.getCandidates(constituencyId)
    console.log('📤 Returning', candidates.length, 'candidates:', candidates.map(c => c.name).join(', '))
    res.json(candidates)
  } catch (error) {
    console.error('❌ Error fetching candidates:', error)
    res.status(500).json({ error: error.message })
  }
})

// Get candidates by constituency (path param version for backwards compatibility)
router.get('/:constituencyId', async (req, res) => {
  try {
    const candidates = await realDataService.getCandidates(req.params.constituencyId)
    res.json(candidates)
  } catch (error) {
    console.error('Error fetching candidates:', error)
    res.status(500).json({ error: error.message })
  }
})

// Create a new candidate (admin only - implement auth)
router.post('/', async (req, res) => {
  try {
    const candidate = new Candidate(req.body)
    await candidate.save()
    res.status(201).json(candidate)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

export default router
