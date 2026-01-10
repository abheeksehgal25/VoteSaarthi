import 'dotenv/config'
import mongoose from 'mongoose'
import Candidate from './models/Candidate.js'
import Constituency from './models/Constituency.js'

async function findOrphans() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected\n')

    // Get all valid constituency IDs
    const validConstituencies = await Constituency.find({}).distinct('_id')
    console.log('Valid constituency IDs:', validConstituencies.map(id => id.toString()))
    
    // Find all candidates
    const allCandidates = await Candidate.find({})
    console.log(`\n📊 Total candidates: ${allCandidates.length}`)
    
    // Find orphaned candidates (constituency ID doesn't exist)
    const orphans = allCandidates.filter(c => {
      return !validConstituencies.some(vid => vid.equals(c.constituency))
    })
    
    console.log(`\n⚠️ Orphaned candidates: ${orphans.length}`)
    orphans.forEach(c => {
      console.log(`  - ${c.name} (${c.party}) - Constituency: ${c.constituency}`)
    })

    if (orphans.length > 0) {
      console.log('\n🗑️ Deleting orphans...')
      await Candidate.deleteMany({
        _id: { $in: orphans.map(o => o._id) }
      })
      console.log('✅ Orphans deleted')
    }

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

findOrphans()
