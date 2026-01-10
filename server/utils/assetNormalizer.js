/**
 * Asset & Liability Normalization Utility
 * Converts raw numeric values to predefined ranges for political neutrality
 */

export const ASSET_RANGES = {
  VERY_LOW: '< ₹1 Lakh',
  LOW: '₹1–10 Lakh',
  MEDIUM: '₹10 Lakh–1 Crore',
  HIGH: '₹1–5 Crore',
  VERY_HIGH: '₹5 Crore+',
  NOT_AVAILABLE: 'Not Available'
}

/**
 * Normalize asset/liability amount to range
 * @param {number} amount - Raw amount in rupees
 * @returns {string} - Range string
 */
export function normalizeToRange(amount) {
  if (amount < 0) {
    throw new Error('Amount cannot be negative')
  }
  
  const LAKH = 100000
  const CRORE = 10000000
  
  if (amount < LAKH) {
    return ASSET_RANGES.VERY_LOW
  } else if (amount < 10 * LAKH) {
    return ASSET_RANGES.LOW
  } else if (amount < CRORE) {
    return ASSET_RANGES.MEDIUM
  } else if (amount < 5 * CRORE) {
    return ASSET_RANGES.HIGH
  } else {
    return ASSET_RANGES.VERY_HIGH
  }
}

/**
 * Parse MyNeta asset string to normalized range
 * Handles formats like "Rs 1,15,63,83,180 ~ 115 Crore+"
 * @param {string} assetString - Raw asset string from MyNeta
 * @returns {string} - Normalized range
 */
export function parseMyNetaAsset(assetString) {
  if (!assetString || assetString.trim() === '' || assetString === 'Rs 0' || assetString === '~') {
    return ASSET_RANGES.VERY_LOW
  }
  
  try {
    // Extract numeric value from formats like "Rs 1,15,63,83,180" or "Rs 9,500"
    const match = assetString.match(/Rs\s*([\d,]+)/)
    if (!match) {
      return ASSET_RANGES.VERY_LOW
    }
    
    // Remove commas and parse
    const amount = parseInt(match[1].replace(/,/g, ''), 10)
    return normalizeToRange(amount)
  } catch (error) {
    console.error('Error parsing asset string:', assetString, error)
    return ASSET_RANGES.VERY_LOW
  }
}

/**
 * Validate candidate data
 * @param {Object} candidate - Candidate object
 * @returns {Object} - { valid: boolean, errors: string[] }
 */
export function validateCandidate(candidate) {
  const errors = []
  
  // Required fields
  if (!candidate.name || candidate.name.trim() === '') {
    errors.push('Candidate name is required')
  }
  
  if (!candidate.party || candidate.party.trim() === '') {
    errors.push('Party name is required (use "Independent" if no party)')
  }
  
  // Age validation
  if (candidate.age !== undefined) {
    if (typeof candidate.age !== 'number' || candidate.age < 18) {
      errors.push('Age must be at least 18')
    }
    if (candidate.age > 120) {
      errors.push('Age must be realistic (< 120)')
    }
  }
  
  // Criminal cases validation
  if (candidate.criminalCases !== undefined) {
    if (typeof candidate.criminalCases !== 'number' || candidate.criminalCases < 0) {
      errors.push('Criminal cases must be 0 or positive number')
    }
  }
  
  // Asset range validation
  if (candidate.assets && !Object.values(ASSET_RANGES).includes(candidate.assets)) {
    errors.push('Assets must be one of the predefined ranges')
  }
  
  // Liability range validation
  if (candidate.liabilities && !Object.values(ASSET_RANGES).includes(candidate.liabilities)) {
    errors.push('Liabilities must be one of the predefined ranges')
  }
  
  // Data source validation
  const validSources = ['ADR', 'MyNeta', 'ECI', 'Manual']
  if (candidate.dataSource && !validSources.includes(candidate.dataSource)) {
    errors.push(`Data source must be one of: ${validSources.join(', ')}`)
  }
  
  return {
    valid: errors.length === 0,
    errors
  }
}
