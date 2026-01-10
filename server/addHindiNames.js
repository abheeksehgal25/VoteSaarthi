import mongoose from 'mongoose'
import Candidate from './models/Candidate.js'

const MONGODB_URI = 'mongodb+srv://sehgalabheek:sCUD5ksQIETWQGnF@cluster0.nozc9is.mongodb.net/voter-awareness'

// Hindi name mappings for all 57 candidates
const hindiNames = {
  // NEW DELHI
  'Anita': 'अनिता',
  'Anuradha Rana': 'अनुराधा राणा',
  'Arun Kumar Sharma': 'अरुण कुमार शर्मा',
  'Arvind Kejriwal': 'अरविंद केजरीवाल',
  'Bhawana': 'भावना',
  'Dr. Abhilasha': 'डॉ. अभिलाषा',
  'Dr. Munish Kumar Raizada': 'डॉ. मुनीश कुमार रायजादा',
  'Duggirala Nageswara Rao': 'दुग्गिराला नागेश्वर राव',
  'Haider Ali': 'हैदर अली',
  'Ishwar Chand': 'ईश्वर चंद',
  'Jagdeesh Prasad': 'जगदीश प्रसाद',
  'Mukesh Jain': 'मुकेश जैन',
  'Naresh Kumar': 'नरेश कुमार',
  'Nitya Nand Singh': 'नित्य नंद सिंह',
  'Pankaj Sharma': 'पंकज शर्मा',
  'Parvesh Sahib Singh': 'परवेश साहिब सिंह',
  'Ravinder Singh Rawat': 'रवींद्र सिंह रावत',
  'Sandeep Dikshit': 'संदीप दीक्षित',
  'Sangha Nand Bauddh': 'संघा नंद बौद्ध',
  'Sanjay Rawat': 'संजय रावत',
  'Santosh Kumar': 'संतोष कुमार',
  'Santosh Rai': 'संतोष राय',
  'Virender': 'वीरेंद्र',
  
  // RAJINDER NAGAR
  'Durgesh Pathak': 'दुर्गेश पाठक',
  'Pankaj Jagya': 'पंकज जाग्या',
  'Praveen Kumar Bharti': 'प्रवीण कुमार भारती',
  'Shiv Prasad Verma': 'शिव प्रसाद वर्मा',
  'Umang': 'उमंग',
  'Umang Bajaj': 'उमंग बजाज',
  'Vineet Yadav': 'विनीत यादव',
  
  // PATEL NAGAR
  'Ashok Kumar': 'अशोक कुमार',
  'Krishna Tirath': 'कृष्णा तीरथ',
  'Pravesh Ratn': 'प्रवेश रत्न',
  'Raaj Kumar Anand': 'राज कुमार आनंद',
  'Ram Avtar': 'राम अवतार',
  
  // R K PURAM
  'Abha Jha': 'आभा झा',
  'Anil Kumar Sharma': 'अनिल कुमार शर्मा',
  'Kuldeep Singh Ahlawat': 'कुलदीप सिंह अहलावत',
  'Lokesh Kumar Masterji': 'लोकेश कुमार मास्टरजी',
  'Neeraj Chourasiya': 'नीरज चौरसिया',
  'Permila': 'परमिला',
  'Pramila Tokas': 'प्रमिला टोकस',
  'Rai Singh': 'राय सिंह',
  'Ramesh Advocate': 'रमेश एडवोकेट',
  
  // GREATER KAILASH
  'Garvit Singhvi': 'गर्विट सिंघवी',
  'Niyati Choudhary': 'नियति चौधरी',
  'Ramesh Jagannath Shah': 'रमेश जगन्नाथ शाह',
  'Satish Kumar Gulliya': 'सतीश कुमार गुल्लिया',
  'Saurabh Bharadwaj': 'सौरभ भारद्वाज',
  'Shikha Roy': 'शिखा रॉय',
  
  // DELHI CANTT
  'Ashok Agyani': 'अशोक अज्ञानी',
  'Bhuvan Tanwar': 'भुवन तंवर',
  'Namit Kumar Gautam': 'नमित कुमार गौतम',
  'Pradeep Kumar Upmanyu': 'प्रदीप कुमार उपमन्यु',
  'Rohit Kumar': 'रोहित कुमार',
  'Satbir Singh Toor': 'सतबीर सिंह तूर',
  'Virender Singh Kadian': 'वीरेंद्र सिंह कादयान'
}

const addHindiNames = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to MongoDB')

    const candidates = await Candidate.find({})
    console.log(`Found ${candidates.length} candidates`)

    let updated = 0
    for (const candidate of candidates) {
      const hindiName = hindiNames[candidate.name]
      if (hindiName) {
        candidate.nameHi = hindiName
        await candidate.save()
        updated++
        console.log(`✅ Updated: ${candidate.name} → ${hindiName}`)
      } else {
        console.log(`⚠️ No Hindi name found for: ${candidate.name}`)
      }
    }

    console.log(`\n🎉 Updated ${updated} out of ${candidates.length} candidates with Hindi names`)
    process.exit(0)
  } catch (error) {
    console.error('❌ Error:', error)
    process.exit(1)
  }
}

addHindiNames()
