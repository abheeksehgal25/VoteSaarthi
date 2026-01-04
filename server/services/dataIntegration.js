import axios from 'axios'
import Candidate from '../models/Candidate.js'
import Constituency from '../models/Constituency.js'
import State from '../models/State.js'

/**
 * Real Data Integration Service
 * Fetches candidate data from MyNeta.info (web scraping) and ECI
 * Ensures political neutrality and data accuracy
 */

class DataIntegrationService {
  constructor() {
    // MyNeta URLs (web scraping approach since no public API)
    this.MYNETA_BASE = 'https://myneta.info'
    
    // ECI doesn't have a REST API, but provides structured data downloads
    // We'll use pre-processed constituency and candidate data
    
    // Cache configuration
    this.cache = new Map()
    this.CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours
  }

  /**
   * Fetch candidates from MyNeta by scraping
   * MyNeta provides affidavit data in structured HTML format
   */
  async fetchMyNetaCandidates(stateName, constituencyName) {
    try {
      // MyNeta URL format: https://myneta.info/[state-abbreviation]/index.php?action=summary&subAction=candidates&constituency=[name]
      const stateCode = this.getStateCode(stateName)
      const constituencySlug = constituencyName.toLowerCase().replace(/\s+/g, '-')
      
      // Note: Since actual scraping requires libraries like cheerio/puppeteer,
      // this is a simplified version. In production, you'd use:
      // - cheerio for HTML parsing
      // - puppeteer for JavaScript-rendered pages
      
      const url = `${this.MYNETA_BASE}/${stateCode}/index.php?action=summary&subAction=candidates&constituency=${encodeURIComponent(constituencyName)}`
      
      console.log(`Fetching from MyNeta: ${url}`)
      
      const response = await axios.get(url, {
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      })
      
      // Parse HTML and extract candidate data
      // This would require cheerio or similar library
      // For now, returning empty to use database
      return []
      
    } catch (error) {
      console.error('MyNeta fetch failed:', error.message)
      return []
    }
  }
  
  /**
   * Get MyNeta state code abbreviation
   */
  getStateCode(stateName) {
    const stateCodes = {
      'Maharashtra': 'maharashtra2019',
      'Karnataka': 'karnataka2018',
      'Tamil Nadu': 'tamilnadu2021',
      'Uttar Pradesh': 'up2022',
      'West Bengal': 'westbengal2021',
      'Gujarat': 'gujarat2022',
      'Rajasthan': 'rajasthan2018',
      'Delhi': 'delhi2020'
    }
    return stateCodes[stateName] || stateName.toLowerCase()
  }

  /**
   * Fetch and normalize candidate data from public sources
   * Ensures neutrality by alphabetical sorting and equal treatment
   */
  async fetchCandidatesForConstituency(constituencyId) {
    try {
      // Check cache first
      const cacheKey = `candidates_${constituencyId}`
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        if (Date.now() - cached.timestamp < this.CACHE_TTL) {
          return cached.data
        }
      }

      // Fetch from database first
      let candidates = await Candidate.find({ constituency: constituencyId })
        .sort({ name: 1 }) // CRITICAL: Alphabetical only - no ranking
        .lean()

      // If no data in DB, fetch from external sources
      if (candidates.length === 0) {
        candidates = await this.fetchFromExternalSources(constituencyId)
      }

      // Apply neutrality filters
      candidates = this.applyNeutralityFilters(candidates)

      // Cache the results
      this.cache.set(cacheKey, {
        data: candidates,
        timestamp: Date.now()
      })

      return candidates
    } catch (error) {
      console.error('Error fetching candidates:', error)
      throw new Error('Unable to fetch candidate data')
    }
  }

  /**
   * Fetch from external public sources
   */
  async fetchFromExternalSources(constituencyId) {
    // Try MyNeta first (structured affidavit data)
    try {
      const constituency = await Constituency.findById(constituencyId)
      if (!constituency) {
        throw new Error('Constituency not found')
      }

      // Option 1: MyNeta API (if available)
      const mynetaData = await this.fetchFromMyNeta(constituency.code)
      if (mynetaData && mynetaData.length > 0) {
        return this.normalizeMyNetaData(mynetaData)
      }

      // Option 2: ECI Open Data (CSV/JSON)
      const eciData = await this.fetchFromECI(constituency.code)
      if (eciData && eciData.length > 0) {
        return this.normalizeECIData(eciData)
      }

      // No data found
      return []
    } catch (error) {
      console.error('External source fetch failed:', error)
      return []
    }
  }

  /**
   * Fetch from MyNeta.info
   */
  async fetchFromMyNeta(constituencyCode) {
    try {
      // Note: Replace with actual MyNeta API endpoint
      // This is a placeholder structure
      const response = await axios.get(
        `${this.MYNETA_API}/candidates`,
        {
          params: { constituency: constituencyCode },
          timeout: 10000
        }
      )
      return response.data
    } catch (error) {
      console.error('MyNeta fetch failed:', error)
      return null
    }
  }

  /**
   * Fetch from Election Commission of India
   */
  async fetchFromECI(constituencyCode) {
    try {
      // Note: ECI typically provides CSV/PDF data
      // You may need to parse CSV or use pre-processed data
      const response = await axios.get(
        `${this.ECI_API}/affidavits`,
        {
          params: { constituency: constituencyCode },
          timeout: 10000
        }
      )
      return response.data
    } catch (error) {
      console.error('ECI fetch failed:', error)
      return null
    }
  }

  /**
   * Normalize MyNeta data to our schema
   */
  normalizeMyNetaData(data) {
    return data.map(candidate => ({
      name: this.sanitize(candidate.candidate_name),
      party: this.sanitize(candidate.party),
      symbol: this.getPartySymbol(candidate.party),
      education: this.normalizeEducation(candidate.education),
      criminalCases: candidate.criminal_cases > 0,
      criminalCasesDetails: candidate.criminal_cases > 0 
        ? `${candidate.criminal_cases} cases` 
        : 'No criminal cases',
      assets: this.normalizeAssets(candidate.total_assets),
      age: candidate.age,
      affidavitUrl: candidate.affidavit_url || ''
    }))
  }

  /**
   * Normalize ECI data to our schema
   */
  normalizeECIData(data) {
    return data.map(candidate => ({
      name: this.sanitize(candidate.name),
      party: this.sanitize(candidate.party_name),
      symbol: this.getPartySymbol(candidate.party_name),
      education: this.normalizeEducation(candidate.education),
      criminalCases: parseInt(candidate.criminal_cases || 0) > 0,
      criminalCasesDetails: candidate.criminal_cases_detail || 'No information',
      assets: this.normalizeAssets(candidate.assets),
      age: parseInt(candidate.age) || null,
      affidavitUrl: candidate.affidavit_link || ''
    }))
  }

  /**
   * Apply neutrality filters to ensure no bias
   */
  applyNeutralityFilters(candidates) {
    return candidates
      .map(candidate => ({
        ...candidate,
        // Remove any fields that could introduce bias
        _bias_score: undefined,
        _ranking: undefined,
        _popularity: undefined,
        // Ensure consistent formatting
        name: this.sanitize(candidate.name),
        party: this.sanitize(candidate.party)
      }))
      .sort((a, b) => a.name.localeCompare(b.name)) // Alphabetical only
  }

  /**
   * Sanitize text input
   */
  sanitize(text) {
    if (!text) return 'Not Available'
    return text
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML
      .substring(0, 200) // Limit length
  }

  /**
   * Normalize education data
   */
  normalizeEducation(education) {
    if (!education) return 'Not Declared'
    
    const edu = education.toLowerCase()
    if (edu.includes('phd') || edu.includes('doctorate')) return 'Doctorate'
    if (edu.includes('post graduate') || edu.includes('master')) return 'Post Graduate'
    if (edu.includes('graduate') || edu.includes('degree')) return 'Graduate'
    if (edu.includes('12th') || edu.includes('intermediate')) return '12th Pass'
    if (edu.includes('10th') || edu.includes('matriculation')) return '10th Pass'
    if (edu.includes('8th') || edu.includes('primary')) return '8th Pass'
    if (edu.includes('5th')) return '5th Pass'
    
    return this.sanitize(education)
  }

  /**
   * Normalize assets into readable ranges
   */
  normalizeAssets(assets) {
    if (!assets || assets === 0) return 'Not Declared'
    
    const amount = parseInt(assets)
    if (isNaN(amount)) return 'Not Declared'
    
    if (amount < 100000) return '₹0-1 Lakh'
    if (amount < 500000) return '₹1-5 Lakhs'
    if (amount < 1000000) return '₹5-10 Lakhs'
    if (amount < 2000000) return '₹10-20 Lakhs'
    if (amount < 5000000) return '₹20-50 Lakhs'
    if (amount < 10000000) return '₹50 Lakhs - 1 Crore'
    if (amount < 50000000) return '₹1-5 Crores'
    if (amount < 100000000) return '₹5-10 Crores'
    
    return '₹10+ Crores'
  }

  /**
   * Get party symbol (emoji or image URL)
   */
  getPartySymbol(partyName) {
    const symbols = {
      'independent': '🌟',
      'bjp': '🪷',
      'congress': '✋',
      'aap': '🧹',
      // Add more party symbols
    }
    
    const party = partyName.toLowerCase()
    return symbols[party] || '🎯'
  }

  /**
   * Clear cache (useful for data updates)
   */
  clearCache() {
    this.cache.clear()
  }
}

export default new DataIntegrationService()
