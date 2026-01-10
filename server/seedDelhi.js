/**
 * Seed Script with Real Delhi Candidate Data
 * Run: npm run seed:delhi
 */

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import State from './models/State.js'
import Constituency from './models/Constituency.js'
import Candidate from './models/Candidate.js'
import { delhiData } from './data/delhiCandidates.js'
import { validateCandidate } from './utils/assetNormalizer.js'

dotenv.config()

const PARTY_SYMBOLS = {
  'BJP': '🪷',
  'AAP': '🧹',
  'INC': '✋',
  'BSP': '🐘',
  'Independent': '⭐',
  'Default': '📋'
}

const getPartySymbol = (partyName) => {
  return PARTY_SYMBOLS[partyName] || PARTY_SYMBOLS['Default']
}

async function seedDelhiData() {
  try {
    console.log('Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing Delhi data - NUCLEAR OPTION
    console.log('Clearing ALL data (nuclear cleanup)...')
    await Candidate.deleteMany({})
    await Constituency.deleteMany({})
    await State.deleteMany({})
    console.log('✅ All data cleared')

    // Create Delhi state
    console.log('Creating Delhi state...')
    const state = await State.create({
      name: delhiData.state.name,
      code: delhiData.state.code
    })

    // Create constituencies and candidates
    for (const constData of delhiData.constituencies) {
      console.log(`\n📍 Processing ${constData.name}...`)
      
      // Create constituency
      const constituency = await Constituency.create({
        name: constData.name,
        state: state._id,
        code: constData.name.toUpperCase().replace(/\s+/g, '_')  // Generate code from name
      })

      // Create candidates
      let validCount = 0
      let invalidCount = 0

      for (const candidateData of constData.candidates) {
        // Validate candidate data
        const validation = validateCandidate({
          ...candidateData,
          constituency: constituency._id
        })

        if (!validation.valid) {
          console.log(`❌ Invalid data for ${candidateData.name}:`, validation.errors)
          invalidCount++
          continue
        }

        // Create candidate
        await Candidate.create({
          name: candidateData.name,
          constituency: constituency._id,
          party: candidateData.party,
          symbol: getPartySymbol(candidateData.party),
          education: candidateData.education,
          criminalCases: candidateData.criminalCases,
          assets: candidateData.assets,
          liabilities: candidateData.liabilities || '< ₹1 Lakh',
          age: candidateData.age,
          dataSource: candidateData.dataSource || 'MyNeta',
          isWinner: candidateData.isWinner || false,
          lastUpdated: new Date()
        })

        validCount++
      }

      console.log(`✅ ${validCount} candidates added, ${invalidCount} skipped`)
    }

    console.log('\n🎉 Delhi data seeded successfully!')
    console.log(`📊 Total: ${delhiData.constituencies.length} constituencies`)
    
    const totalCandidates = await Candidate.countDocuments()
    console.log(`👥 Total candidates: ${totalCandidates}`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding Delhi data:', error)
    process.exit(1)
  }
}

seedDelhiData()
