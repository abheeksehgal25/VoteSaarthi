import mongoose from 'mongoose'
import Scenario from './models/Scenario.js'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sehgalabheek:sCUD5ksQIETWQGnF@cluster0.nozc9is.mongodb.net/voter-awareness'

const seedScenarios = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear existing scenarios
    await Scenario.deleteMany({})
    console.log('Cleared existing scenarios')

    // Seed bilingual scenarios
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
        correctAnswer: 'misleading',
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
        correctAnswer: 'misleading',
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

    console.log('✅ 6 bilingual scenarios seeded successfully!')
    process.exit(0)
  } catch (error) {
    console.error('❌ Error seeding scenarios:', error)
    process.exit(1)
  }
}

seedScenarios()
