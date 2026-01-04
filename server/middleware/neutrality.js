/**
 * Neutrality Validation Middleware
 * Ensures all API responses maintain political neutrality
 * 
 * Government-grade standards:
 * - No candidate rankings
 * - No bias indicators
 * - Alphabetical ordering only
 * - Equal treatment of all candidates
 */

export const validateNeutrality = (req, res, next) => {
  const originalJson = res.json.bind(res)
  
  res.json = function(data) {
    // Apply neutrality filters
    const neutralData = applyNeutralityFilters(data)
    
    // Log for monitoring (no personal data)
    if (process.env.NODE_ENV === 'production') {
      logNeutralityCheck(req.path, neutralData)
    }
    
    return originalJson(neutralData)
  }
  
  next()
}

/**
 * Apply neutrality filters to response data
 */
function applyNeutralityFilters(data) {
  if (!data) return data
  
  // Handle arrays (lists of candidates, constituencies, etc.)
  if (Array.isArray(data)) {
    return data
      .map(item => removeBiasFields(item))
      .sort(sortAlphabetically)
  }
  
  // Handle single object
  if (typeof data === 'object') {
    return removeBiasFields(data)
  }
  
  return data
}

/**
 * Remove any fields that could introduce bias
 */
function removeBiasFields(item) {
  if (!item || typeof item !== 'object') return item
  
  // Create a clean copy
  const cleanItem = { ...item }
  
  // Remove bias-introducing fields
  const biasFields = [
    '_bias_score',
    '_ranking',
    '_popularity',
    '_recommendation',
    '_winChance',
    '_rating',
    '_votes',
    '_support',
    'highlighted',
    'featured',
    'recommended',
    'trending',
    'popular'
  ]
  
  biasFields.forEach(field => {
    delete cleanItem[field]
  })
  
  return cleanItem
}

/**
 * Sort items alphabetically by name
 * CRITICAL: This is the ONLY acceptable sorting method
 */
function sortAlphabetically(a, b) {
  const nameA = a.name || a.title || ''
  const nameB = b.name || b.title || ''
  
  return nameA.localeCompare(nameB, 'en', { sensitivity: 'base' })
}

/**
 * Log neutrality checks for monitoring
 * NO personal data, NO user identification
 */
function logNeutralityCheck(path, data) {
  const violations = detectNeutralityViolations(data)
  
  if (violations.length > 0) {
    console.error('⚠️ NEUTRALITY VIOLATION DETECTED', {
      path,
      violations,
      timestamp: new Date().toISOString()
    })
    
    // In production, send alert to monitoring system
    if (process.env.SENTRY_DSN) {
      // Sentry.captureMessage('Neutrality violation', { level: 'warning' })
    }
  }
}

/**
 * Detect potential neutrality violations
 */
function detectNeutralityViolations(data) {
  const violations = []
  
  if (Array.isArray(data)) {
    // Check if data is sorted alphabetically
    for (let i = 0; i < data.length - 1; i++) {
      const current = data[i].name || ''
      const next = data[i + 1].name || ''
      
      if (current.localeCompare(next) > 0) {
        violations.push({
          type: 'INCORRECT_SORTING',
          message: 'Data not sorted alphabetically',
          items: [current, next]
        })
        break
      }
    }
    
    // Check for bias fields
    data.forEach((item, index) => {
      const biasFields = Object.keys(item).filter(key => 
        key.includes('ranking') || 
        key.includes('score') || 
        key.includes('rating') ||
        key.includes('popular')
      )
      
      if (biasFields.length > 0) {
        violations.push({
          type: 'BIAS_FIELD_PRESENT',
          message: 'Bias-introducing fields detected',
          index,
          fields: biasFields
        })
      }
    })
  }
  
  return violations
}

/**
 * Validate request data for neutrality
 * Use this for POST/PUT requests
 */
export const validateRequestNeutrality = (req, res, next) => {
  const { body } = req
  
  // Check for bias fields in request
  const biasFields = [
    'ranking',
    'bias_score',
    'rating',
    'popularity',
    'recommendation'
  ]
  
  const foundBiasFields = biasFields.filter(field => body[field] !== undefined)
  
  if (foundBiasFields.length > 0) {
    return res.status(400).json({
      error: 'Invalid request',
      message: 'Bias-introducing fields are not allowed',
      fields: foundBiasFields
    })
  }
  
  next()
}

/**
 * Middleware to prevent bias-based queries
 */
export const validateQueryNeutrality = (req, res, next) => {
  const { query } = req
  
  // Disallow sorting by anything other than name
  if (query.sort && query.sort !== 'name' && query.sort !== 'alphabetical') {
    return res.status(400).json({
      error: 'Invalid sort parameter',
      message: 'Only alphabetical sorting is allowed'
    })
  }
  
  // Disallow filtering by popularity, rating, etc.
  const biasParams = ['popular', 'rating', 'recommended', 'trending']
  const foundBiasParams = biasParams.filter(param => query[param] !== undefined)
  
  if (foundBiasParams.length > 0) {
    return res.status(400).json({
      error: 'Invalid query parameters',
      message: 'Bias-based filtering is not allowed',
      params: foundBiasParams
    })
  }
  
  next()
}

export default {
  validateNeutrality,
  validateRequestNeutrality,
  validateQueryNeutrality
}
