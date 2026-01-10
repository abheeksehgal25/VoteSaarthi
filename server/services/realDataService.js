import axios from 'axios'
import * as cheerio from 'cheerio'
import Candidate from '../models/Candidate.js'
import Constituency from '../models/Constituency.js'

/**
 * Real Data Service - Fetches from MyNeta.info via web scraping
 * Primary Source: MyNeta.info (live scraping with caching)
 * Fallback: Seeded database
 * 
 * Includes rate limiting and caching to be respectful to MyNeta servers
 */

class RealDataService {
  constructor() {
    this.cache = new Map()
    this.CACHE_TTL = 6 * 60 * 60 * 1000 // 6 hours
    
    // Rate limiting
    this.lastRequestTime = 0
    this.MIN_REQUEST_INTERVAL = 2000 // 2 seconds between requests
    this.requestQueue = []
    this.isProcessingQueue = false
  }

  /**
   * Clear the cache - useful after re-seeding database
   */
  clearCache() {
    this.cache.clear()
    console.log('🧹 Cache cleared')
  }

  /**
   * Rate-limited request wrapper
   */
  async rateLimitedRequest(url) {
    return new Promise((resolve, reject) => {
      this.requestQueue.push({ url, resolve, reject })
      this.processQueue()
    })
  }

  async processQueue() {
    if (this.isProcessingQueue || this.requestQueue.length === 0) {
      return
    }

    this.isProcessingQueue = true

    while (this.requestQueue.length > 0) {
      const timeSinceLastRequest = Date.now() - this.lastRequestTime
      if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
        await new Promise(resolve => 
          setTimeout(resolve, this.MIN_REQUEST_INTERVAL - timeSinceLastRequest)
        )
      }

      const { url, resolve, reject } = this.requestQueue.shift()
      
      try {
        this.lastRequestTime = Date.now()
        const response = await axios.get(url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate',
            'Connection': 'keep-alive',
          }
        })
        resolve(response)
      } catch (error) {
        reject(error)
      }
    }

    this.isProcessingQueue = false
  }

  /**
   * Get candidates for a constituency
   * Tries cache → MyNeta scraping → database fallback
   */
  async getCandidates(constituencyId) {
    const cacheKey = `candidates_${constituencyId}`
    
    // Check cache
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)
      if (Date.now() - cached.timestamp < this.CACHE_TTL) {
        console.log('✅ Serving from cache:', constituencyId)
        return cached.data
      }
    }

    // Try to fetch constituency info for MyNeta scraping
    const constituency = await Constituency.findById(constituencyId).lean()
    
    // TEMPORARILY DISABLED - MyNeta scraping returns corrupt data
    // TODO: Fix URL patterns and HTML parsing before re-enabling
    /*
    if (constituency) {
      // Try scraping from MyNeta first
      try {
        const scrapedCandidates = await this.scrapeMyNetaCandidates(
          constituency.state,
          constituency.name
        )
        
        if (scrapedCandidates && scrapedCandidates.length > 0) {
          console.log(`🌐 Scraped ${scrapedCandidates.length} candidates from MyNeta for ${constituency.name}`)
          
          const neutralCandidates = this.enforceNeutrality(scrapedCandidates)
          
          // Cache results
          this.cache.set(cacheKey, {
            data: neutralCandidates,
            timestamp: Date.now()
          })
          
          return neutralCandidates
        }
      } catch (error) {
        console.error('⚠️ MyNeta scraping failed, falling back to database:', error.message)
      }
    }
    */

    // Fallback to database
    const candidates = await Candidate.find({ constituency: constituencyId })
      .sort({ name: 1 })
      .lean()
      .select('-__v -createdAt -updatedAt')

    const neutralCandidates = this.enforceNeutrality(candidates)

    // Cache results
    this.cache.set(cacheKey, {
      data: neutralCandidates,
      timestamp: Date.now()
    })

    console.log(`✅ Serving ${neutralCandidates.length} candidates from database for constituency ${constituencyId}`)
    return neutralCandidates
  }

  /**
   * Scrape candidates from MyNeta.info
   */
  async scrapeMyNetaCandidates(stateId, constituencyName) {
    try {
      // Get state info
      const state = await import('../models/State.js').then(m => m.default)
      const stateData = await state.findById(stateId).lean()
      
      if (!stateData) {
        throw new Error('State not found')
      }

      const stateCode = this.getMyNetaStateCode(stateData.name)
      
      // MyNeta URL patterns vary by state
      // Example: https://myneta.info/loksabha2019/candidate.php?candidate_id=xxxx
      // We'll try the constituency listing page
      const url = `${this.getMyNetaBaseUrl(stateCode)}/index.php?action=summary&subAction=constituencywise&constituency=${encodeURIComponent(constituencyName)}`
      
      console.log(`🔍 Attempting to scrape: ${url}`)
      
      const response = await this.rateLimitedRequest(url)
      const $ = cheerio.load(response.data)
      
      const candidates = []
      
      // MyNeta table structure (may vary, this is a common pattern)
      $('table tr').each((i, row) => {
        if (i === 0) return // Skip header
        
        const cols = $(row).find('td')
        if (cols.length >= 5) {
          const name = $(cols[0]).text().trim()
          const party = $(cols[1]).text().trim()
          const criminalCases = $(cols[2]).text().trim()
          const education = $(cols[3]).text().trim()
          const assets = $(cols[4]).text().trim()
          
          if (name && name !== 'Name') {
            candidates.push({
              name: name,
              party: party || 'Independent',
              symbol: this.getPartySymbol(party),
              education: education || 'Not Available',
              criminalCases: this.parseCriminalCases(criminalCases),
              criminalCasesDetails: criminalCases || 'No information',
              assets: assets || 'Not Disclosed',
              age: null,
              constituency: null // Will be set by caller
            })
          }
        }
      })
      
      return candidates
      
    } catch (error) {
      console.error('MyNeta scraping error:', error.message)
      return null
    }
  }

  /**
   * Get MyNeta base URL for a state
   */
  getMyNetaBaseUrl(stateCode) {
    return `https://myneta.info/${stateCode}`
  }

  /**
   * Get MyNeta state code
   */
  getMyNetaStateCode(stateName) {
    const codes = {
      'Maharashtra': 'maharashtra2024',
      'Karnataka': 'karnataka2023',
      'Tamil Nadu': 'tamilnadu2024',
      'Uttar Pradesh': 'uttarpradesh2024',
      'West Bengal': 'westbengal2024',
      'Gujarat': 'gujarat2024',
      'Rajasthan': 'rajasthan2023',
      'Delhi': 'delhi2024'
    }
    return codes[stateName] || 'loksabha2024'
  }

  /**
   * Parse criminal cases text
   */
  parseCriminalCases(text) {
    if (!text) return false
    const number = parseInt(text.match(/\d+/)?.[0] || '0')
    return number > 0
  }

  /**
   * Get party symbol
   */
  getPartySymbol(party) {
    const symbols = {
      'BJP': '🪷',
      'Bharatiya Janata Party': '🪷',
      'INC': '✋',
      'Congress': '✋',
      'Indian National Congress': '✋',
      'AAP': '🧹',
      'Aam Aadmi Party': '🧹',
      'TMC': '🌺',
      'Trinamool Congress': '🌺',
      'DMK': '🌅',
      'AIADMK': '🌿',
      'Shiv Sena': '🏹',
      'NCP': '⏰',
      'CPI(M)': '🔨',
      'CPI': '🌾',
      'BSP': '🐘',
      'SP': '🚲',
      'JD(U)': '↗️',
      'RJD': '🏮',
      'Independent': '⭐'
    }
    return symbols[party] || '⭐'
  }

  /**
   * Get constituencies for a state
   */
  async getConstituencies(stateId) {
    const cacheKey = `constituencies_${stateId}`
    
    if (this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)
      if (Date.now() - cached.timestamp < this.CACHE_TTL) {
        return cached.data
      }
    }

    const constituencies = await Constituency.find({ state: stateId })
      .sort({ name: 1 })
      .lean()
      .select('-__v -createdAt -updatedAt')

    this.cache.set(cacheKey, {
      data: constituencies,
      timestamp: Date.now()
    })

    return constituencies
  }

  /**
   * Enforce political neutrality
   * - Remove any ranking/popularity fields
   * - Ensure alphabetical order
   * - Normalize asset ranges
   */
  enforceNeutrality(candidates) {
    return candidates
      .sort((a, b) => a.name.localeCompare(b.name)) // Force alphabetical
      .map(candidate => ({
        _id: candidate._id,
        name: candidate.name,
        nameHi: candidate.nameHi,
        party: candidate.party || 'Independent',
        symbol: candidate.symbol || '⭐',
        education: candidate.education || 'Not Available',
        criminalCases: candidate.criminalCases || 0,
        criminalCasesDetails: candidate.criminalCasesDetails || 
          (candidate.criminalCases ? 'Has criminal cases' : 'No criminal cases'),
        assets: candidate.assets || 'Not Available',
        liabilities: candidate.liabilities || 'Not Available',
        age: candidate.age,
        constituency: candidate.constituency,
        dataSource: candidate.dataSource,
        isWinner: candidate.isWinner || false
        // Explicitly exclude: rankings, popularity, predictions, endorsements
      }))
  }

  /**
   * Normalize asset values to ranges for neutrality
   * Prevents exact comparisons that could bias voters
   */
  normalizeAssets(assets) {
    if (!assets || assets === 'Not disclosed') return 'Not Disclosed'
    
    // If already a range, return as is
    if (typeof assets === 'string' && assets.includes('-')) {
      return assets
    }

    // Convert to number if it's a string like "1500000"
    const amount = typeof assets === 'string' 
      ? parseFloat(assets.replace(/[^0-9.]/g, ''))
      : assets

    if (isNaN(amount)) return 'Not Disclosed'

    // Return ranges instead of exact amounts
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
   * Clear cache (useful for updates)
   */
  clearCache() {
    this.cache.clear()
    console.log('🗑️ Cache cleared')
  }

  /**
   * Get cache statistics
   */
  getCacheStats() {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    }
  }
}

// Export singleton instance
export default new RealDataService()
