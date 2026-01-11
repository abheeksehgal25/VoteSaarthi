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
        content: {
          'en-IN': '"Vote for us or your ration card will be cancelled!"',
          'hi-IN': '"हमें वोट दें या आपका राशन कार्ड रद्द कर दिया जाएगा!"'
        },
        type: 'whatsapp',
        correctAnswer: 'misleading',
        explanation: {
          'en-IN': 'This is misleading and illegal. Your ration card cannot be cancelled based on how you vote. Your vote is completely secret.',
          'hi-IN': 'यह भ्रामक और अवैध है। आपके वोट के आधार पर आपका राशन कार्ड रद्द नहीं किया जा सकता। आपका वोट पूरी तरह से गुप्त है।'
        },
        emotionUsed: {
          'en-IN': 'Fear',
          'hi-IN': 'डर'
        },
        tip: {
          'en-IN': 'Be careful of messages that threaten you or create fear. No one can take away your benefits based on your vote.',
          'hi-IN': 'ऐसे संदेशों से सावधान रहें जो आपको धमकाते हैं या डर पैदा करते हैं। कोई भी आपके वोट के आधार पर आपके लाभ नहीं छीन सकता।'
        },
        language: 'en',
        isActive: true
      },
      {
        content: {
          'en-IN': '"Breaking: Election date changed to next week due to weather!"',
          'hi-IN': '"ब्रेकिंग: मौसम के कारण चुनाव की तारीख अगले सप्ताह के लिए बदल दी गई!"'
        },
        type: 'social',
        correctAnswer: 'false',
        explanation: {
          'en-IN': 'This is false. Election dates are official and announced by the Election Commission. Always verify from official sources.',
          'hi-IN': 'यह गलत है। चुनाव की तारीखें आधिकारिक होती हैं और चुनाव आयोग द्वारा घोषित की जाती हैं। हमेशा आधिकारिक स्रोतों से सत्यापित करें।'
        },
        emotionUsed: {
          'en-IN': 'Confusion',
          'hi-IN': 'भ्रम'
        },
        tip: {
          'en-IN': 'Important election information should always be verified from the Election Commission website or official channels.',
          'hi-IN': 'महत्वपूर्ण चुनाव जानकारी हमेशा चुनाव आयोग की वेबसाइट या आधिकारिक चैनलों से सत्यापित की जानी चाहिए।'
        },
        language: 'en',
        isActive: true
      },
      {
        content: {
          'en-IN': '"If you don\'t vote, your name will be removed from voter list permanently!"',
          'hi-IN': '"अगर आपने वोट नहीं किया, तो आपका नाम मतदाता सूची से हमेशा के लिए हटा दिया जाएगा!"'
        },
        type: 'whatsapp',
        correctAnswer: 'false',
        explanation: {
          'en-IN': 'This is false. Your name stays on the voter list even if you don\'t vote. Voting is your right, not a requirement.',
          'hi-IN': 'यह गलत है। आपका नाम मतदाता सूची में रहता है भले ही आप वोट न करें। वोट देना आपका अधिकार है, अनिवार्यता नहीं।'
        },
        emotionUsed: {
          'en-IN': 'Fear',
          'hi-IN': 'डर'
        },
        tip: {
          'en-IN': 'Voting is optional. You cannot be punished for not voting (except in rare places with mandatory voting laws).',
          'hi-IN': 'वोट देना वैकल्पिक है। वोट न देने के लिए आपको दंडित नहीं किया जा सकता (अनिवार्य मतदान कानून वाले दुर्लभ स्थानों को छोड़कर)।'
        },
        language: 'en',
        isActive: true
      },
      {
        content: {
          'en-IN': '"Election on May 15th, 2026. Polling booths open 7 AM to 6 PM. Carry your Voter ID. - Election Commission of India"',
          'hi-IN': '"15 मई 2026 को चुनाव। मतदान केंद्र सुबह 7 बजे से शाम 6 बजे तक खुले रहेंगे। अपना Voter ID (मतदाता पहचान पत्र) साथ लाएं। - भारत निर्वाचन आयोग"'
        },
        type: 'information',
        correctAnswer: 'information',
        explanation: {
          'en-IN': 'This is factual information from the official Election Commission. It provides clear facts without trying to influence your vote.',
          'hi-IN': 'यह आधिकारिक चुनाव आयोग से तथ्यात्मक जानकारी है। यह आपके वोट को प्रभावित करने की कोशिश किए बिना स्पष्ट तथ्य प्रदान करता है।'
        },
        emotionUsed: {
          'en-IN': 'None',
          'hi-IN': 'कोई नहीं'
        },
        tip: {
          'en-IN': 'Official communications are clear, factual, and provide practical information without emotional language.',
          'hi-IN': 'आधिकारिक संचार स्पष्ट, तथ्यात्मक होते हैं और भावनात्मक भाषा के बिना व्यावहारिक जानकारी प्रदान करते हैं।'
        },
        language: 'en',
        isActive: true
      },
      {
        content: {
          'en-IN': '"Our leader will give ₹15 lakhs to every family after winning!"',
          'hi-IN': '"जीतने के बाद हमारे नेता हर परिवार को ₹15 लाख देंगे!"'
        },
        type: 'social',
        correctAnswer: 'emotional',
        explanation: {
          'en-IN': 'This uses emotional manipulation through unrealistic promises. Such claims are often made during elections but rarely fulfilled.',
          'hi-IN': 'यह अवास्तविक वादों के माध्यम से भावनात्मक हेरफेर का उपयोग करता है। ऐसे दावे अक्सर चुनाव के दौरान किए जाते हैं लेकिन शायद ही पूरे होते हैं।'
        },
        emotionUsed: {
          'en-IN': 'Greed / Hope',
          'hi-IN': 'लालच / आशा'
        },
        tip: {
          'en-IN': 'Be skeptical of big promises that sound too good to be true. Check party manifestos and past records.',
          'hi-IN': 'बड़े वादों के प्रति संदेहास्पद रहें जो सच होने के लिए बहुत अच्छे लगते हैं। पार्टी के घोषणापत्र और पिछले रिकॉर्ड की जांच करें।'
        },
        language: 'en',
        isActive: true
      },
      {
        content: {
          'en-IN': '"Other community people are voting in large numbers against us! Everyone must vote!"',
          'hi-IN': '"दूसरे समुदाय के लोग हमारे खिलाफ बड़ी संख्या में वोट कर रहे हैं! सभी को वोट देना होगा!"'
        },
        type: 'whatsapp',
        correctAnswer: 'emotional',
        explanation: {
          'en-IN': 'This creates division and uses fear of "the other" to manipulate voting. Democracy works best when everyone votes based on issues, not fear.',
          'hi-IN': 'यह विभाजन पैदा करता है और मतदान में हेरफेर करने के लिए "दूसरे" के डर का उपयोग करता है। लोकतंत्र तब सबसे अच्छा काम करता है जब हर कोई मुद्दों के आधार पर वोट करता है, डर के आधार पर नहीं।'
        },
        emotionUsed: {
          'en-IN': 'Fear / Division',
          'hi-IN': 'डर / विभाजन'
        },
        tip: {
          'en-IN': 'Messages that create "us vs them" feelings are manipulative. Vote based on candidate qualifications and policies.',
          'hi-IN': 'जो संदेश "हम बनाम वे" की भावना पैदा करते हैं वे हेरफेर करने वाले होते हैं। उम्मीदवार की योग्यता और नीतियों के आधार पर वोट दें।'
        },
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
