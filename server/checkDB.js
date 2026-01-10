import 'dotenv/config'
import mongoose from 'mongoose'
import Candidate from './models/Candidate.js'
import Constituency from './models/Constituency.js'

async function checkDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB\n')

    const candidates = await Candidate.find({}).limit(5)
    console.log('📊 First 5 candidates in database:')
    candidates.forEach((c, i) => {
      console.log(`${i + 1}. ${c.name} (${c.party})`)
    })

    console.log('\n📍 Constituencies:')
    const constituencies = await Constituency.find({})
    constituencies.forEach(c => {
      console.log(`  - ${c.name} (ID: ${c._id})`)
    })

    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

checkDB()
