import mongoose from 'mongoose'
import dotenv from 'dotenv'
import State from './models/State.js'
import Constituency from './models/Constituency.js'
import Candidate from './models/Candidate.js'
import Scenario from './models/Scenario.js'

dotenv.config()

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/voter-awareness')
    console.log('Connected to MongoDB')

    // Clear existing data
    await State.deleteMany({})
    await Constituency.deleteMany({})
    await Candidate.deleteMany({})
    await Scenario.deleteMany({})
    console.log('Cleared existing data')

    // Seed States
    const states = await State.insertMany([
      { name: 'Maharashtra', code: 'MH' },
      { name: 'Karnataka', code: 'KA' },
      { name: 'Tamil Nadu', code: 'TN' },
    ])
    console.log('✅ States seeded')

    // Seed Constituencies
    const constituencies = await Constituency.insertMany([
      { name: 'Mumbai South', state: states[0]._id, code: 'MH-S01' },
      { name: 'Mumbai North', state: states[0]._id, code: 'MH-S02' },
      { name: 'Bangalore South', state: states[1]._id, code: 'KA-S01' },
      { name: 'Chennai Central', state: states[2]._id, code: 'TN-S01' },
    ])
    console.log('✅ Constituencies seeded')

    // Seed Candidates (Sample data - replace with real affidavit data)
    await Candidate.insertMany([
      {
        name: 'Anjali Kumar',
        constituency: constituencies[0]._id,
        party: 'Independent',
        symbol: '🌟',
        education: 'Graduate (B.A.)',
        criminalCases: false,
        assets: '₹5-10 Lakhs',
        age: 45,
        profession: 'Social Worker',
        previousPositions: ['Ward Councilor (2015-2020)', 'NGO Founder'],
        keyIssues: [
          { issue: 'Education', stance: 'Free quality education in government schools with better infrastructure' },
          { issue: 'Healthcare', stance: 'Primary health centers in every 5km radius' },
          { issue: 'Infrastructure', stance: 'Better roads and public transport connectivity' }
        ],
        manifesto: 'Focus on grassroots development with emphasis on education and healthcare for all.',
        contactInfo: {
          phone: '+91-9876543210',
          email: 'anjali.kumar@example.com',
          website: 'www.anjalikumar2024.com'
        }
      },
      {
        name: 'Rajesh Sharma',
        constituency: constituencies[0]._id,
        party: 'Independent',
        symbol: '🏠',
        education: 'Post Graduate (M.Com)',
        criminalCases: false,
        assets: '₹50 Lakhs - 1 Crore',
        age: 52,
        profession: 'Business Owner',
        previousPositions: ['President of Chamber of Commerce', 'Municipal Committee Member'],
        keyIssues: [
          { issue: 'Employment', stance: 'Create 10,000 local jobs through industrial parks' },
          { issue: 'Small Business', stance: 'Easy loans and tax breaks for small businesses' },
          { issue: 'Infrastructure', stance: 'Modern market complexes and business hubs' }
        ],
        manifesto: 'Economic development through job creation and supporting local businesses.',
        contactInfo: {
          phone: '+91-9876543211',
          email: 'rajesh.sharma@example.com'
        }
      },
      {
        name: 'Meera Patel',
        constituency: constituencies[0]._id,
        party: 'Independent',
        symbol: '🌺',
        education: '10th Pass',
        criminalCases: false,
        assets: '₹2-5 Lakhs',
        age: 38,
        profession: 'Community Organizer',
        previousPositions: ['Self-Help Group Leader', 'Anganwadi Worker (10 years)'],
        keyIssues: [
          { issue: 'Women Empowerment', stance: 'Skill training and microfinance for women' },
          { issue: 'Child Nutrition', stance: 'Nutritious meals in all anganwadis' },
          { issue: 'Rural Development', stance: 'Better water supply and sanitation facilities' }
        ],
        manifesto: 'Empowering women and ensuring child welfare through community-driven programs.',
        contactInfo: {
          phone: '+91-9876543212',
          email: 'meera.patel@example.com'
        }
      },
      {
        name: 'Vikram Singh',
        constituency: constituencies[1]._id,
        party: 'Independent',
        symbol: '⚡',
        education: 'Doctorate (Ph.D.)',
        criminalCases: true,
        criminalCasesDetails: '2 pending cases',
        assets: '₹2-5 Crores',
        age: 58,
        profession: 'University Professor (Retired)',
        previousPositions: ['State Education Advisory Board Member', 'University Vice Chancellor'],
        keyIssues: [
          { issue: 'Education Reform', stance: 'Modernize curriculum and increase teacher training' },
          { issue: 'Youth Employment', stance: 'Skill development centers in every district' },
          { issue: 'Technology', stance: 'Digital literacy programs for all age groups' }
        ],
        manifesto: 'Building a knowledge-based economy through quality education and skill development.',
        contactInfo: {
          phone: '+91-9876543213',
          email: 'vikram.singh@example.com',
          website: 'www.vikramsingh.in'
        },
        socialMedia: {
          twitter: '@vikramsingh',
          facebook: 'VikramSinghOfficial'
        }
      },
    ])
    console.log('✅ Candidates seeded')

    // Seed Misinformation Game Scenarios
    await Scenario.insertMany([
      {
        content: '"Vote for us or your ration card will be cancelled!"',
        type: 'whatsapp',
        correctAnswer: 'misleading',
        explanation: 'This is misleading and illegal. Your ration card cannot be cancelled based on how you vote. Your vote is completely secret.',
        emotionUsed: 'Fear',
        tip: 'Be careful of messages that threaten you or create fear. No one can take away your benefits based on your vote.',
        language: 'en',
        isActive: true
      },
      {
        content: '"Breaking: Election date changed to next week due to weather!"',
        type: 'social',
        correctAnswer: 'false',
        explanation: 'This is false. Election dates are official and announced by the Election Commission. Always verify from official sources.',
        emotionUsed: 'Confusion',
        tip: 'Important election information should always be verified from the Election Commission website or official channels.',
        language: 'en',
        isActive: true
      },
      {
        content: '"If you don\'t vote, your name will be removed from voter list permanently!"',
        type: 'whatsapp',
        correctAnswer: 'false',
        explanation: 'This is false. Your name stays on the voter list even if you don\'t vote. Voting is your right, not a requirement.',
        emotionUsed: 'Fear',
        tip: 'Voting is optional. You cannot be punished for not voting (except in rare places with mandatory voting laws).',
        language: 'en',
        isActive: true
      },
      {
        content: '"Election on May 15th, 2026. Polling booths open 7 AM to 6 PM. Carry your Voter ID. - Election Commission of India"',
        type: 'information',
        correctAnswer: 'information',
        explanation: 'This is factual information from the official Election Commission. It provides clear facts without trying to influence your vote.',
        emotionUsed: 'None',
        tip: 'Official communications are clear, factual, and provide practical information without emotional language.',
        language: 'en',
        isActive: true
      },
      {
        content: '"Our leader will give ₹15 lakhs to every family after winning!"',
        type: 'social',
        correctAnswer: 'emotional',
        explanation: 'This uses emotional manipulation through unrealistic promises. Such claims are often made during elections but rarely fulfilled.',
        emotionUsed: 'Greed / Hope',
        tip: 'Be skeptical of big promises that sound too good to be true. Check party manifestos and past records.',
        language: 'en',
        isActive: true
      },
      {
        content: '"Other community people are voting in large numbers against us! Everyone must vote!"',
        type: 'whatsapp',
        correctAnswer: 'emotional',
        explanation: 'This creates division and uses fear of "the other" to manipulate voting. Democracy works best when everyone votes based on issues, not fear.',
        emotionUsed: 'Fear / Division',
        tip: 'Messages that create "us vs them" feelings are manipulative. Vote based on candidate qualifications and policies.',
        language: 'en',
        isActive: true
      },
    ])
    console.log('✅ Game scenarios seeded')

    console.log('🎉 All data seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

seedData()
