import express from 'express'
import Candidate from '../models/Candidate.js'
import dataIntegrationService from '../services/dataIntegration.js'

const router = express.Router()

/**
 * Enhanced Candidates API with real data integration
 * Features:
 * - Real data from MyNeta/ECI
 * - Response caching
 * - Neutrality validation
 * - Graceful error handling
 */

// Get candidates by constituency
router.get('/:constituencyId', async (req, res) => {
  try {
    const { constituencyId } = req.params
    
    // Fetch candidates with real data integration
    const candidates = await dataIntegrationService.fetchCandidatesForConstituency(constituencyId)
    
    // Validate neutrality (no bias should be present)
    const validatedCandidates = candidates.map(candidate => ({
      _id: candidate._id,
      name: candidate.name,
      party: candidate.party,
      symbol: candidate.symbol,
      education: candidate.education,
      criminalCases: candidate.criminalCases,
      criminalCasesDetails: candidate.criminalCasesDetails,
      assets: candidate.assets,
      age: candidate.age,
      affidavitUrl: candidate.affidavitUrl
      // CRITICAL: Do not include any ranking, score, or popularity fields
    }))
    
    // Set cache headers
    res.set('Cache-Control', 'public, max-age=86400') // 24 hours
    
    res.json(validatedCandidates)
  } catch (error) {
    console.error('Error fetching candidates:', error)
    
    // Graceful degradation
    res.status(500).json({ 
      error: 'Unable to fetch candidate data',
      message: 'Please try again later or check your internet connection',
      candidates: [] // Return empty array for frontend to handle
    })
  }
})

// Get candidate by ID
router.get('/detail/:candidateId', async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId)
    
    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' })
    }
    
    // Return only neutral, factual information
    res.json({
      _id: candidate._id,
      name: candidate.name,
      party: candidate.party,
      symbol: candidate.symbol,
      education: candidate.education,
      criminalCases: candidate.criminalCases,
      criminalCasesDetails: candidate.criminalCasesDetails,
      assets: candidate.assets,
      age: candidate.age,
      affidavitUrl: candidate.affidavitUrl
    })
  } catch (error) {
    console.error('Error fetching candidate:', error)
    res.status(500).json({ error: 'Unable to fetch candidate details' })
  }
})

// Create a new candidate (admin only - add auth middleware in production)
router.post('/', async (req, res) => {
  try {
    // Validate input data
    const candidateData = {
      name: req.body.name,
      constituency: req.body.constituency,
      party: req.body.party,
      symbol: req.body.symbol || '🎯',
      education: req.body.education,
      criminalCases: Boolean(req.body.criminalCases),
      criminalCasesDetails: req.body.criminalCasesDetails || '',
      assets: req.body.assets,
      age: req.body.age,
      affidavitUrl: req.body.affidavitUrl || ''
    }
    
    const candidate = new Candidate(candidateData)
    await candidate.save()
    
    // Clear cache after adding new candidate
    dataIntegrationService.clearCache()
    
    res.status(201).json(candidate)
  } catch (error) {
    console.error('Error creating candidate:', error)
    res.status(400).json({ error: error.message })
  }
})

// Bulk import candidates from external source (admin only)
router.post('/bulk-import', async (req, res) => {
  try {
    const { constituencyId, source } = req.body
    
    if (!constituencyId) {
      return res.status(400).json({ error: 'Constituency ID required' })
    }
    
    // Fetch from external source
    const candidates = await dataIntegrationService.fetchFromExternalSources(constituencyId)
    
    if (candidates.length === 0) {
      return res.status(404).json({ 
        error: 'No candidates found',
        message: 'Unable to fetch data from external sources'
      })
    }
    
    // Save to database
    const savedCandidates = []
    for (const candidateData of candidates) {
      const candidate = new Candidate({
        ...candidateData,
        constituency: constituencyId
      })
      await candidate.save()
      savedCandidates.push(candidate)
    }
    
    // Clear cache
    dataIntegrationService.clearCache()
    
    res.status(201).json({
      message: `${savedCandidates.length} candidates imported successfully`,
      candidates: savedCandidates
    })
  } catch (error) {
    console.error('Error bulk importing candidates:', error)
    res.status(500).json({ error: error.message })
  }
})

// Refresh cache for a constituency
router.post('/refresh-cache/:constituencyId', async (req, res) => {
  try {
    dataIntegrationService.clearCache()
    const candidates = await dataIntegrationService.fetchCandidatesForConstituency(req.params.constituencyId)
    
    res.json({
      message: 'Cache refreshed successfully',
      count: candidates.length
    })
  } catch (error) {
    console.error('Error refreshing cache:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
