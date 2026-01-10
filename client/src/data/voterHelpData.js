/**
 * Voter Help Assistant - Pre-defined Questions and Answers
 * Politically neutral, factual information only
 * No AI generation - all content is static and verified
 */

export const helpCategories = {
  'en-IN': [
    {
      id: 'voting-basics',
      title: 'Voting Basics',
      icon: '📋',
      questions: [
        {
          id: 'what-is-voting',
          question: 'What is voting?',
          answer: 'Voting is your right to choose leaders who will represent you in government. Every adult citizen can vote to elect representatives in local, state, and national elections.',
          relatedQuestions: ['why-vote-important', 'who-can-vote']
        },
        {
          id: 'why-vote-important',
          question: 'Why is voting important?',
          answer: 'Voting gives you a voice in how your area is governed. Elected leaders make decisions about schools, roads, healthcare, and other services. Your vote helps choose who makes these decisions.',
          relatedQuestions: ['what-is-voting', 'vote-secret']
        },
        {
          id: 'who-can-vote',
          question: 'Who can vote in India?',
          answer: 'Any Indian citizen who is 18 years or older can vote. You must be registered on the voter list of your area. There is no upper age limit - even elderly citizens can vote.',
          relatedQuestions: ['how-register', 'voter-id-card']
        },
        {
          id: 'vote-secret',
          question: 'Is my vote secret?',
          answer: 'Yes. Your vote is completely secret. The voting machine does not record who voted for whom. No one can find out who you voted for - not the government, police, or anyone else.',
          relatedQuestions: ['why-vote-important', 'can-vote-forced']
        }
      ]
    },
    {
      id: 'how-voting-works',
      title: 'How Voting Works',
      icon: '🗳️',
      questions: [
        {
          id: 'how-to-vote',
          question: 'How do I vote?',
          answer: 'Go to your polling station on election day with your Voter ID. Show your ID to the officer. They will mark your finger with ink. Then use the EVM machine to press the button next to your chosen candidate.',
          relatedQuestions: ['what-is-evm', 'polling-station-timings', 'what-to-bring']
        },
        {
          id: 'what-is-evm',
          question: 'What is an EVM?',
          answer: 'EVM stands for Electronic Voting Machine. It shows all candidates with their symbols. You press a blue button next to the candidate you choose. A beep sound confirms your vote.',
          relatedQuestions: ['how-to-vote', 'evm-safe']
        },
        {
          id: 'evm-safe',
          question: 'Is the EVM machine safe and accurate?',
          answer: 'Yes. EVMs are tested multiple times before elections. They cannot be hacked or tampered with because they are not connected to the internet. Your vote is recorded securely.',
          relatedQuestions: ['what-is-evm', 'vote-secret']
        },
        {
          id: 'polling-station-timings',
          question: 'What time is the polling station open?',
          answer: 'Polling stations usually open at 7 AM and close at 6 PM. You can vote anytime during these hours. Check your area\'s specific timings on the Election Commission website.',
          relatedQuestions: ['how-to-vote', 'what-to-bring']
        },
        {
          id: 'what-to-bring',
          question: 'What should I bring to vote?',
          answer: 'Bring your Voter ID card. If you don\'t have it, you can use other ID cards like Aadhaar, Passport, Driving License, or PAN card. Just one valid ID is enough.',
          relatedQuestions: ['how-to-vote', 'voter-id-card']
        }
      ]
    },
    {
      id: 'voter-id-eligibility',
      title: 'Voter ID & Eligibility',
      icon: '🪪',
      questions: [
        {
          id: 'voter-id-card',
          question: 'What is a Voter ID card?',
          answer: 'A Voter ID card (also called EPIC - Electors Photo Identity Card) is an identity card issued by the Election Commission. It proves you are registered to vote and helps you vote on election day.',
          relatedQuestions: ['how-register', 'voter-id-lost']
        },
        {
          id: 'how-register',
          question: 'How do I register to vote?',
          answer: 'You can register online on the National Voter Service Portal (nvsp.in) or visit your local Election Office. You need to be 18 years old and provide address proof. Registration is free.',
          relatedQuestions: ['voter-id-card', 'check-name-list']
        },
        {
          id: 'check-name-list',
          question: 'How do I check if my name is on the voter list?',
          answer: 'Visit nvsp.in and click "Search in Electoral Roll". Enter your details to check. You can also call 1950 (toll-free helpline) or visit your local Election Office.',
          relatedQuestions: ['how-register', 'name-not-list']
        },
        {
          id: 'name-not-list',
          question: 'What if my name is not on the voter list?',
          answer: 'You need to register as a new voter or submit a correction form. Visit nvsp.in to apply online, or go to your local Election Office. Do this well before the election date.',
          relatedQuestions: ['how-register', 'check-name-list']
        },
        {
          id: 'voter-id-lost',
          question: 'What if I lost my Voter ID card?',
          answer: 'You can still vote using other ID cards like Aadhaar, Passport, Driving License, or PAN card. To get a duplicate Voter ID, apply online at nvsp.in or visit your Election Office.',
          relatedQuestions: ['what-to-bring', 'voter-id-card']
        }
      ]
    },
    {
      id: 'elections-government',
      title: 'Elections & Government',
      icon: '🏛️',
      questions: [
        {
          id: 'types-elections',
          question: 'What types of elections are there?',
          answer: 'There are three main types: Lok Sabha (national parliament), Vidhan Sabha (state assembly), and local body elections (municipal/panchayat). Each election chooses representatives for different levels of government.',
          relatedQuestions: ['who-is-candidate', 'election-commission']
        },
        {
          id: 'who-is-candidate',
          question: 'Who is a candidate?',
          answer: 'A candidate is a person who wants to be elected as your representative. They compete in elections. You vote for the candidate you think will serve your area best.',
          relatedQuestions: ['types-elections', 'how-choose-candidate']
        },
        {
          id: 'how-choose-candidate',
          question: 'How do I choose which candidate to vote for?',
          answer: 'Look at the candidate\'s education, experience, and past work. Check if they have criminal cases. See what they promise to do. Choose based on who you think will work for your area, not based on pressure or gifts.',
          relatedQuestions: ['who-is-candidate', 'can-vote-forced']
        },
        {
          id: 'election-commission',
          question: 'What is the Election Commission?',
          answer: 'The Election Commission of India is an independent body that conducts all elections in India. They ensure elections are fair and free. They announce election dates, make rules, and handle complaints.',
          relatedQuestions: ['types-elections', 'election-complaint']
        },
        {
          id: 'election-complaint',
          question: 'What if I see something wrong during elections?',
          answer: 'You can complain to the Election Commission by calling 1950 (toll-free) or through the cVIGIL mobile app. Report issues like vote buying, violence, or violation of rules. Your complaint will be investigated.',
          relatedQuestions: ['election-commission', 'can-vote-forced']
        }
      ]
    },
    {
      id: 'misinformation',
      title: 'Misinformation Awareness',
      icon: '⚠️',
      questions: [
        {
          id: 'fake-messages',
          question: 'How do I spot fake election messages?',
          answer: 'Be careful of messages that create fear, make big promises, or spread hate. Verify information from official sources like eci.gov.in. Don\'t believe everything on WhatsApp or social media.',
          relatedQuestions: ['voting-threats', 'verify-info']
        },
        {
          id: 'voting-threats',
          question: 'Can my benefits be cancelled if I don\'t vote a certain way?',
          answer: 'No. This is completely false. Your ration card, Aadhaar, pension, or any government benefit cannot be cancelled based on how you vote. Your vote is secret. Anyone threatening this is breaking the law.',
          relatedQuestions: ['fake-messages', 'can-vote-forced']
        },
        {
          id: 'can-vote-forced',
          question: 'Can anyone force me to vote for someone?',
          answer: 'No. Forcing someone to vote is illegal. Your vote is your choice alone. Vote freely based on your own decision. If someone threatens or forces you, report it to the police or Election Commission at 1950.',
          relatedQuestions: ['voting-threats', 'election-complaint']
        },
        {
          id: 'verify-info',
          question: 'Where can I verify election information?',
          answer: 'Check the Election Commission website (eci.gov.in) or call 1950. You can also visit your local Election Office. Don\'t trust random messages - always verify from official sources.',
          relatedQuestions: ['fake-messages', 'election-commission']
        },
        {
          id: 'gifts-for-votes',
          question: 'Should I accept gifts or money for my vote?',
          answer: 'No. Accepting money or gifts for votes is illegal and harms democracy. Vote based on who you think is best, not who gives you something. Report vote buying to the Election Commission.',
          relatedQuestions: ['can-vote-forced', 'election-complaint']
        }
      ]
    }
  ],
  'hi-IN': [
    {
      id: 'voting-basics',
      title: 'मतदान की मूल बातें',
      icon: '📋',
      questions: [
        {
          id: 'what-is-voting',
          question: 'मतदान क्या है?',
          answer: 'मतदान आपका अधिकार है जिससे आप अपने नेता चुनते हैं जो सरकार में आपका प्रतिनिधित्व करेंगे। हर वयस्क नागरिक स्थानीय, राज्य और राष्ट्रीय चुनावों में प्रतिनिधि चुनने के लिए मतदान कर सकता है।',
          relatedQuestions: ['why-vote-important', 'who-can-vote']
        },
        {
          id: 'why-vote-important',
          question: 'मतदान क्यों महत्वपूर्ण है?',
          answer: 'मतदान से आपको अपने क्षेत्र के शासन में आवाज़ मिलती है। चुने हुए नेता स्कूलों, सड़कों, स्वास्थ्य सेवा और अन्य सेवाओं के बारे में निर्णय लेते हैं। आपका वोट यह तय करने में मदद करता है कि ये निर्णय कौन लेगा।',
          relatedQuestions: ['what-is-voting', 'vote-secret']
        },
        {
          id: 'who-can-vote',
          question: 'भारत में कौन वोट कर सकता है?',
          answer: 'कोई भी भारतीय नागरिक जो 18 वर्ष या उससे अधिक उम्र का है वोट कर सकता है। आपका नाम आपके क्षेत्र की मतदाता सूची में होना चाहिए। कोई अधिकतम आयु सीमा नहीं है - बुजुर्ग नागरिक भी वोट कर सकते हैं।',
          relatedQuestions: ['how-register', 'voter-id-card']
        },
        {
          id: 'vote-secret',
          question: 'क्या मेरा वोट गुप्त है?',
          answer: 'हां। आपका वोट पूरी तरह से गुप्त है। वोटिंग मशीन यह रिकॉर्ड नहीं करती कि किसने किसे वोट दिया। कोई नहीं जान सकता कि आपने किसे वोट दिया - न सरकार, न पुलिस, न कोई और।',
          relatedQuestions: ['why-vote-important', 'can-vote-forced']
        }
      ]
    },
    {
      id: 'how-voting-works',
      title: 'मतदान कैसे काम करता है',
      icon: '🗳️',
      questions: [
        {
          id: 'how-to-vote',
          question: 'मैं वोट कैसे करूं?',
          answer: 'चुनाव के दिन अपने मतदान केंद्र पर अपना मतदाता पहचान पत्र लेकर जाएं। अधिकारी को अपना पहचान पत्र दिखाएं। वे आपकी उंगली पर स्याही लगाएंगे। फिर ईवीएम मशीन का उपयोग करके अपने चुने हुए उम्मीदवार के बगल में बटन दबाएं।',
          relatedQuestions: ['what-is-evm', 'polling-station-timings', 'what-to-bring']
        },
        {
          id: 'what-is-evm',
          question: 'ईवीएम क्या है?',
          answer: 'ईवीएम का मतलब है इलेक्ट्रॉनिक वोटिंग मशीन। यह सभी उम्मीदवारों को उनके प्रतीकों के साथ दिखाती है। आप उस उम्मीदवार के बगल में नीला बटन दबाते हैं जिसे आप चुनते हैं। एक बीप की आवाज़ आपके वोट की पुष्टि करती है।',
          relatedQuestions: ['how-to-vote', 'evm-safe']
        },
        {
          id: 'evm-safe',
          question: 'क्या ईवीएम मशीन सुरक्षित और सटीक है?',
          answer: 'हां। ईवीएम का चुनाव से पहले कई बार परीक्षण किया जाता है। इन्हें हैक या छेड़छाड़ नहीं की जा सकती क्योंकि ये इंटरनेट से जुड़े नहीं हैं। आपका वोट सुरक्षित रूप से रिकॉर्ड होता है।',
          relatedQuestions: ['what-is-evm', 'vote-secret']
        },
        {
          id: 'polling-station-timings',
          question: 'मतदान केंद्र किस समय खुला रहता है?',
          answer: 'मतदान केंद्र आमतौर पर सुबह 7 बजे खुलते हैं और शाम 6 बजे बंद होते हैं। आप इन घंटों के दौरान कभी भी वोट कर सकते हैं। चुनाव आयोग की वेबसाइट पर अपने क्षेत्र का विशिष्ट समय जांचें।',
          relatedQuestions: ['how-to-vote', 'what-to-bring']
        },
        {
          id: 'what-to-bring',
          question: 'वोट करने के लिए मुझे क्या लाना चाहिए?',
          answer: 'अपना मतदाता पहचान पत्र लाएं। अगर आपके पास नहीं है, तो आप आधार, पासपोर्ट, ड्राइविंग लाइसेंस या पैन कार्ड जैसे अन्य पहचान पत्र उपयोग कर सकते हैं। बस एक वैध पहचान पत्र पर्याप्त है।',
          relatedQuestions: ['how-to-vote', 'voter-id-card']
        }
      ]
    },
    {
      id: 'voter-id-eligibility',
      title: 'मतदाता पहचान पत्र और पात्रता',
      icon: '🪪',
      questions: [
        {
          id: 'voter-id-card',
          question: 'मतदाता पहचान पत्र क्या है?',
          answer: 'मतदाता पहचान पत्र (जिसे ईपीआईसी भी कहा जाता है) चुनाव आयोग द्वारा जारी एक पहचान पत्र है। यह साबित करता है कि आप वोट करने के लिए पंजीकृत हैं और चुनाव के दिन वोट करने में मदद करता है।',
          relatedQuestions: ['how-register', 'voter-id-lost']
        },
        {
          id: 'how-register',
          question: 'मैं वोट करने के लिए कैसे पंजीकरण करूं?',
          answer: 'आप राष्ट्रीय मतदाता सेवा पोर्टल (nvsp.in) पर ऑनलाइन पंजीकरण कर सकते हैं या अपने स्थानीय चुनाव कार्यालय जा सकते हैं। आपकी उम्र 18 वर्ष होनी चाहिए और पता प्रमाण देना होगा। पंजीकरण मुफ्त है।',
          relatedQuestions: ['voter-id-card', 'check-name-list']
        },
        {
          id: 'check-name-list',
          question: 'मैं कैसे जांचूं कि मेरा नाम मतदाता सूची में है?',
          answer: 'nvsp.in पर जाएं और "मतदाता सूची में खोजें" पर क्लिक करें। जांचने के लिए अपना विवरण दर्ज करें। आप 1950 (टॉल-फ्री हेल्पलाइन) पर भी कॉल कर सकते हैं या अपने स्थानीय चुनाव कार्यालय जा सकते हैं।',
          relatedQuestions: ['how-register', 'name-not-list']
        },
        {
          id: 'name-not-list',
          question: 'यदि मेरा नाम मतदाता सूची में नहीं है तो क्या करें?',
          answer: 'आपको नए मतदाता के रूप में पंजीकरण करना होगा या सुधार फॉर्म जमा करना होगा। ऑनलाइन आवेदन करने के लिए nvsp.in पर जाएं, या अपने स्थानीय चुनाव कार्यालय जाएं। यह चुनाव की तारीख से पहले करें।',
          relatedQuestions: ['how-register', 'check-name-list']
        },
        {
          id: 'voter-id-lost',
          question: 'यदि मैंने अपना मतदाता पहचान पत्र खो दिया तो क्या करें?',
          answer: 'आप आधार, पासपोर्ट, ड्राइविंग लाइसेंस या पैन कार्ड जैसे अन्य पहचान पत्र का उपयोग करके भी वोट कर सकते हैं। डुप्लीकेट मतदाता पहचान पत्र प्राप्त करने के लिए nvsp.in पर ऑनलाइन आवेदन करें या अपने चुनाव कार्यालय जाएं।',
          relatedQuestions: ['what-to-bring', 'voter-id-card']
        }
      ]
    },
    {
      id: 'elections-government',
      title: 'चुनाव और सरकार',
      icon: '🏛️',
      questions: [
        {
          id: 'types-elections',
          question: 'चुनाव कितने प्रकार के होते हैं?',
          answer: 'तीन मुख्य प्रकार हैं: लोकसभा (राष्ट्रीय संसद), विधानसभा (राज्य विधानसभा), और स्थानीय निकाय चुनाव (नगरपालिका/पंचायत)। प्रत्येक चुनाव सरकार के विभिन्न स्तरों के लिए प्रतिनिधि चुनता है।',
          relatedQuestions: ['who-is-candidate', 'election-commission']
        },
        {
          id: 'who-is-candidate',
          question: 'उम्मीदवार कौन होता है?',
          answer: 'उम्मीदवार वह व्यक्ति है जो आपके प्रतिनिधि के रूप में चुना जाना चाहता है। वे चुनावों में प्रतिस्पर्धा करते हैं। आप उस उम्मीदवार को वोट देते हैं जो आपको लगता है कि आपके क्षेत्र की सबसे अच्छी सेवा करेगा।',
          relatedQuestions: ['types-elections', 'how-choose-candidate']
        },
        {
          id: 'how-choose-candidate',
          question: 'मैं किस उम्मीदवार को वोट देना चाहूं यह कैसे तय करूं?',
          answer: 'उम्मीदवार की शिक्षा, अनुभव और पिछले काम को देखें। जांचें कि क्या उन पर आपराधिक मामले हैं। देखें कि वे क्या करने का वादा करते हैं। दबाव या उपहार के आधार पर नहीं, बल्कि इस आधार पर चुनें कि आपको कौन लगता है कि आपके क्षेत्र के लिए काम करेगा।',
          relatedQuestions: ['who-is-candidate', 'can-vote-forced']
        },
        {
          id: 'election-commission',
          question: 'चुनाव आयोग क्या है?',
          answer: 'भारत निर्वाचन आयोग एक स्वतंत्र निकाय है जो भारत में सभी चुनाव संचालित करता है। वे सुनिश्चित करते हैं कि चुनाव निष्पक्ष और स्वतंत्र हों। वे चुनाव की तारीखें घोषित करते हैं, नियम बनाते हैं और शिकायतों को संभालते हैं।',
          relatedQuestions: ['types-elections', 'election-complaint']
        },
        {
          id: 'election-complaint',
          question: 'यदि मुझे चुनाव के दौरान कुछ गलत दिखे तो क्या करें?',
          answer: 'आप 1950 (टॉल-फ्री) पर कॉल करके या सीविजिल मोबाइल ऐप के माध्यम से चुनाव आयोग को शिकायत कर सकते हैं। वोट खरीदने, हिंसा या नियमों के उल्लंघन जैसे मुद्दों की रिपोर्ट करें। आपकी शिकायत की जांच की जाएगी।',
          relatedQuestions: ['election-commission', 'can-vote-forced']
        }
      ]
    },
    {
      id: 'misinformation',
      title: 'गलत सूचना जागरूकता',
      icon: '⚠️',
      questions: [
        {
          id: 'fake-messages',
          question: 'मैं नकली चुनाव संदेशों को कैसे पहचानूं?',
          answer: 'ऐसे संदेशों से सावधान रहें जो डर पैदा करते हैं, बड़े वादे करते हैं या नफरत फैलाते हैं। eci.gov.in जैसे आधिकारिक स्रोतों से जानकारी सत्यापित करें। व्हाट्सएप या सोशल मीडिया पर सब कुछ विश्वास न करें।',
          relatedQuestions: ['voting-threats', 'verify-info']
        },
        {
          id: 'voting-threats',
          question: 'क्या मेरे लाभ रद्द हो सकते हैं अगर मैं किसी खास तरीके से वोट नहीं करता?',
          answer: 'नहीं। यह पूरी तरह से गलत है। आपका राशन कार्ड, आधार, पेंशन या कोई भी सरकारी लाभ इस आधार पर रद्द नहीं किया जा सकता कि आप कैसे वोट करते हैं। आपका वोट गुप्त है। कोई भी ऐसा धमकी देता है तो कानून तोड़ रहा है।',
          relatedQuestions: ['fake-messages', 'can-vote-forced']
        },
        {
          id: 'can-vote-forced',
          question: 'क्या कोई मुझे किसी के लिए वोट करने के लिए मजबूर कर सकता है?',
          answer: 'नहीं। किसी को वोट करने के लिए मजबूर करना अवैध है। आपका वोट केवल आपकी पसंद है। अपने स्वयं के निर्णय के आधार पर स्वतंत्र रूप से वोट करें। यदि कोई आपको धमकाता या मजबूर करता है, तो पुलिस या 1950 पर चुनाव आयोग को रिपोर्ट करें।',
          relatedQuestions: ['voting-threats', 'election-complaint']
        },
        {
          id: 'verify-info',
          question: 'मैं चुनाव की जानकारी कहां सत्यापित कर सकता हूं?',
          answer: 'चुनाव आयोग की वेबसाइट (eci.gov.in) देखें या 1950 पर कॉल करें। आप अपने स्थानीय चुनाव कार्यालय भी जा सकते हैं। यादृच्छिक संदेशों पर भरोसा न करें - हमेशा आधिकारिक स्रोतों से सत्यापित करें।',
          relatedQuestions: ['fake-messages', 'election-commission']
        },
        {
          id: 'gifts-for-votes',
          question: 'क्या मुझे अपने वोट के लिए उपहार या पैसे स्वीकार करने चाहिए?',
          answer: 'नहीं। वोट के लिए पैसे या उपहार स्वीकार करना अवैध है और लोकतंत्र को नुकसान पहुंचाता है। इस आधार पर वोट दें कि आपको कौन सबसे अच्छा लगता है, न कि कौन आपको कुछ देता है। वोट खरीदने की रिपोर्ट चुनाव आयोग को करें।',
          relatedQuestions: ['can-vote-forced', 'election-complaint']
        }
      ]
    }
  ]
}
