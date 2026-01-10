import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import AudioToggle from '../components/AudioToggle'
import { getTranslation } from '../utils/translations'

const getSteps = (lang) => {
  const isHindi = lang === 'hi-IN'
  
  return [
    {
      id: 1,
      title: isHindi ? 'अपना मतदाता पहचान पत्र लें' : 'Get Your Voter ID',
      description: isHindi ? 'मतदान केंद्र पर अपना मतदाता पहचान पत्र लाएं' : 'Bring your Voter ID card to the polling booth',
      audioText: isHindi 
        ? 'चरण 1: अपना मतदाता पहचान पत्र लें। चुनाव के दिन मतदान केंद्र पर अपना मतदाता पहचान पत्र लाएं।'
        : 'Step 1: Get Your Voter ID. Bring your Voter ID card to the polling booth on election day.',
      icon: '🪪',
      details: isHindi ? [
        'जांच लें कि आपका नाम मतदाता सूची में है',
        'अपना मतदाता पहचान पत्र साथ रखें',
        'आप आधार, पासपोर्ट या ड्राइविंग लाइसेंस जैसे अन्य स्वीकृत पहचान पत्र भी इस्तेमाल कर सकते हैं'
      ] : [
        'Check your name is on the voter list',
        'Carry your Voter ID card',
        'You can also use other approved IDs like Aadhaar, Passport, or Driving License'
      ]
    },
    {
      id: 2,
      title: isHindi ? 'मतदान केंद्र में प्रवेश करें' : 'Enter the Polling Booth',
      description: isHindi ? 'अधिकारी को अपना पहचान पत्र दिखाएं और अपनी उंगली पर निशान लगवाएं' : 'Show your ID to the officer and get your finger marked',
      audioText: isHindi
        ? 'चरण 2: मतदान केंद्र में प्रवेश करें। अधिकारी को अपना पहचान पत्र दिखाएं। वे आपका नाम जांचेंगे और आपकी उंगली पर स्याही लगाएंगे।'
        : 'Step 2: Enter the Polling Booth. Show your ID to the officer. They will check your name and put ink on your finger.',
      icon: '🏢',
      details: isHindi ? [
        'अपने निर्धारित मतदान केंद्र पर लाइन में लगें',
        'अधिकारी को अपना मतदाता पहचान पत्र दिखाएं',
        'अधिकारी आपकी उंगली पर अमिट स्याही लगाएंगे',
        'यह एक से अधिक बार मतदान को रोकता है'
      ] : [
        'Queue in line at your designated polling station',
        'Show your Voter ID to the officer',
        'Officer will put indelible ink on your finger',
        'This prevents voting more than once'
      ]
    },
    {
      id: 3,
      title: isHindi ? 'ईवीएम मशीन का उपयोग करें' : 'Use the EVM Machine',
      description: isHindi ? 'अपने चुने हुए उम्मीदवार के बगल में बटन दबाएं' : 'Press the button next to your chosen candidate',
      audioText: isHindi
        ? 'चरण 3: ईवीएम मशीन का उपयोग करें। आपको प्रतीकों के साथ उम्मीदवारों की सूची दिखाई देगी। जिस उम्मीदवार को आप वोट देना चाहते हैं उसके बगल में नीले बटन को दबाएं। एक बीप की आवाज़ आपके वोट की पुष्टि करेगी।'
        : 'Step 3: Use the EVM Machine. You will see a list of candidates with symbols. Press the blue button next to the candidate you want to vote for. A beep sound will confirm your vote.',
      icon: '🖲️',
      details: isHindi ? [
        'इलेक्ट्रॉनिक वोटिंग मशीन (ईवीएम) सभी उम्मीदवारों को दिखाती है',
        'प्रत्येक उम्मीदवार का नाम, प्रतीक और बटन होता है',
        'नीले बटन को एक बार मजबूती से दबाएं',
        'आपको एक बीप की आवाज़ सुनाई देगी',
        'एक लाल बत्ती जलेगी जो आपके वोट की पुष्टि करेगी'
      ] : [
        'The Electronic Voting Machine (EVM) shows all candidates',
        'Each candidate has a name, symbol, and button',
        'Press the blue button firmly once',
        'You will hear a beep sound',
        'A red light will glow confirming your vote'
      ]
    },
    {
      id: 4,
      title: isHindi ? 'आपका वोट गुप्त है' : 'Your Vote is Secret',
      description: isHindi ? 'कोई नहीं देख सकता कि आपने किसे वोट दिया' : 'No one can see who you voted for',
      audioText: isHindi
        ? 'चरण 4: आपका वोट गुप्त है। याद रखें, आपका वोट पूरी तरह से गुप्त है। कोई नहीं देख सकता कि आपने किसे वोट दिया। सरकार या पुलिस भी नहीं पता लगा सकती।'
        : 'Step 4: Your Vote is Secret. Remember, your vote is completely secret. No one can see who you voted for. Not even the government or police can find out.',
      icon: '🔒',
      details: isHindi ? [
        'ईवीएम रिकॉर्ड नहीं करती कि किसने किसे वोट दिया',
        'आपका वोट पूरी तरह से गोपनीय है',
        'बिना किसी डर के स्वतंत्र रूप से वोट दें',
        'कोई भी आप पर दबाव नहीं डाल सकता',
        'यह केवल आपकी पसंद है'
      ] : [
        'EVMs do not record who voted for whom',
        'Your vote is completely confidential',
        'Vote freely without fear',
        'No one can pressure you',
        'It is your choice alone'
      ]
    }
  ]
}

const HowVotingWorks = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()
  const { speak, currentLanguage } = useAudio()
  
  const steps = getSteps(currentLanguage)

  useEffect(() => {
    // Speak the current step when it changes
    speak(steps[currentStep].audioText, currentLanguage)
  }, [currentStep, currentLanguage])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const text = currentLanguage === 'hi-IN'
        ? 'आपने सभी चरण पूरे कर लिए। घर पर वापस जा रहे हैं।'
        : 'You have completed all steps. Returning to home.'
      speak(text, currentLanguage)
      setTimeout(() => navigate('/'), 1000)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const step = steps[currentStep]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="touch-target text-primary hover:text-primary-dark"
          aria-label="Go back to home"
        >
          <span className="text-3xl">←</span>
        </button>
        <h1 className="text-touch-xl font-bold">{getTranslation('votingTitle', currentLanguage)}</h1>
        <AudioToggle />
      </header>

      {/* Progress Indicator */}
      <div className="px-4 py-6">
        <div className="flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full transition-colors ${
                index === currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Step ${index + 1} ${index === currentStep ? 'current' : ''}`}
            />
          ))}
        </div>
        <p className="text-center mt-2 text-neutral text-touch-base">
          {currentLanguage === 'hi-IN' 
            ? `चरण ${currentStep + 1} / ${steps.length}`
            : `Step ${currentStep + 1} of ${steps.length}`
          }
        </p>
      </div>

      {/* Step Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="card-elevated">
          {/* Two Column Layout: Video and Content Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: Video */}
            <div className="rounded-2xl overflow-hidden bg-black">
              <video
                key={currentStep}
                className="w-full h-full object-cover"
                controls
                autoPlay
                muted
                playsInline
              >
                <source src={`/videos/step${currentStep + 1}.mp4`} type="video/mp4" />
                <p className="text-white p-4">
                  {currentLanguage === 'hi-IN' 
                    ? 'आपका ब्राउज़र वीडियो टैग का समर्थन नहीं करता है।'
                    : 'Your browser does not support the video tag.'
                  }
                </p>
              </video>
            </div>

            {/* Right Column: Content */}
            <div className="flex flex-col justify-center">
              {/* Icon */}
              <div className="text-center mb-4">
                <span className="text-6xl" role="img" aria-label={step.title}>
                  {step.icon}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-touch-2xl font-bold text-center mb-4">
                {step.title}
              </h2>

              {/* Description */}
              <p className="text-touch-lg text-neutral text-center mb-6">
                {step.description}
              </p>

              {/* Details */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <ul className="space-y-3">
                  {step.details.map((detail, index) => (
                    <li key={index} className="flex gap-3 text-touch-base">
                      <span className="text-secondary text-xl flex-shrink-0">✓</span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            {currentStep > 0 && (
              <button
                onClick={handlePrevious}
                className="touch-button bg-gray-200 text-neutral-dark hover:bg-gray-300 w-40"
                aria-label="Go to previous step"
              >
                {currentLanguage === 'hi-IN' ? 'पिछला' : 'Previous'}
              </button>
            )}
            <button
              onClick={handleNext}
              className="touch-button bg-primary text-white hover:bg-primary-dark w-40"
              aria-label={currentStep < steps.length - 1 ? 'Go to next step' : 'Finish and return home'}
            >
              {currentStep < steps.length - 1 
                ? (currentLanguage === 'hi-IN' ? 'अगला' : 'Next')
                : (currentLanguage === 'hi-IN' ? 'समाप्त' : 'Finish')
              }
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HowVotingWorks
