import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import AudioToggle from '../components/AudioToggle'
import api from '../utils/api'
import { getTranslation } from '../utils/translations'

const MisinformationGame = () => {
  const [scenarios, setScenarios] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { speak, currentLanguage } = useAudio()

  useEffect(() => {
    const text = getTranslation('gameSubtitle', currentLanguage)
    speak(text, currentLanguage)
    fetchScenarios()
  }, [])

  useEffect(() => {
    // Speak the scenario content when scenario changes or language changes
    if (scenarios.length > 0 && !showExplanation) {
      const scenario = scenarios[currentIndex]
      const content = typeof scenario.content === 'object' 
        ? scenario.content[currentLanguage] || scenario.content['en-IN'] 
        : scenario.content
      
      const questionText = getTranslation('whatDoYouThink', currentLanguage)
      speak(`${content}. ${questionText}`, currentLanguage)
    }
  }, [currentIndex, currentLanguage, scenarios, showExplanation])

  const handleListenAgain = () => {
    const scenario = scenarios[currentIndex]
    const content = typeof scenario.content === 'object' 
      ? scenario.content[currentLanguage] || scenario.content['en-IN'] 
      : scenario.content
    
    const questionText = getTranslation('whatDoYouThink', currentLanguage)
    speak(`${content}. ${questionText}`, currentLanguage)
  }

  const fetchScenarios = async () => {
    try {
      const response = await api.get('/api/game/scenarios')
      console.log('Fetched scenarios:', response.data)
      console.log('First scenario:', response.data[0])
      console.log('First scenario content:', response.data[0]?.content)
      setScenarios(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching scenarios:', error)
      // Demo data with bilingual content
      const demoScenarios = [
        {
          _id: '1',
          content: {
            'en-IN': '"Vote for us or your ration card will be cancelled!"',
            'hi-IN': '"हमें वोट दें या आपका राशन कार्ड रद्द कर दिया जाएगा!"'
          },
          type: 'whatsapp',
          correctAnswer: 'misleading',
          explanation: {
            'en-IN': 'This is misleading. Your ration card cannot be cancelled based on how you vote. Your vote is secret.',
            'hi-IN': 'यह भ्रामक है। आपके वोट के आधार पर आपका राशन कार्ड रद्द नहीं किया जा सकता। आपका वोट गुप्त है।'
          },
          emotionUsed: {
            'en-IN': 'Fear',
            'hi-IN': 'डर'
          },
          tip: {
            'en-IN': 'Be careful of messages that threaten you or create fear about voting.',
            'hi-IN': 'ऐसे संदेशों से सावधान रहें जो आपको धमकाते हैं या वोटिंग के बारे में डर पैदा करते हैं।'
          }
        },
        {
          _id: '2',
          content: {
            'en-IN': '"Breaking News: Voting date changed to next week!"',
            'hi-IN': '"ब्रेकिंग न्यूज़: वोटिंग की तारीख अगले सप्ताह के लिए बदल दी गई!"'
          },
          type: 'social',
          correctAnswer: 'misleading',
          explanation: {
            'en-IN': 'This is false. Always check official Election Commission website for voting dates. Don\'t trust random messages.',
            'hi-IN': 'यह गलत है। वोटिंग की तारीखों के लिए हमेशा आधिकारिक चुनाव आयोग की वेबसाइट देखें। अनजान संदेशों पर भरोसा न करें।'
          },
          emotionUsed: {
            'en-IN': 'Confusion',
            'hi-IN': 'भ्रम'
          },
          tip: {
            'en-IN': 'Verify important election information from official sources only.',
            'hi-IN': 'महत्वपूर्ण चुनाव जानकारी केवल आधिकारिक स्रोतों से सत्यापित करें।'
          }
        },
        {
          _id: '3',
          content: {
            'en-IN': '"Election on May 15th. Polling booths open 7 AM to 6 PM. - Election Commission of India"',
            'hi-IN': '"15 मई को चुनाव। मतदान केंद्र सुबह 7 बजे से शाम 6 बजे तक खुले रहेंगे। - भारत निर्वाचन आयोग"'
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
            'en-IN': 'Official communications are clear, factual, and don\'t use emotional language.',
            'hi-IN': 'आधिकारिक संचार स्पष्ट, तथ्यात्मक होते हैं और भावनात्मक भाषा का उपयोग नहीं करते।'
          }
        },
      ]
      console.log('Using demo scenarios:', demoScenarios)
      setScenarios(demoScenarios)
      setLoading(false)
    }
  }

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)
    
    const scenario = scenarios[currentIndex]
    const isCorrect = answer === scenario.correctAnswer
    
    const explanation = typeof scenario.explanation === 'object' 
      ? scenario.explanation[currentLanguage] || scenario.explanation['en-IN'] 
      : scenario.explanation
    
    if (isCorrect) {
      const correctText = getTranslation('correctAnswer', currentLanguage)
      speak(`${correctText} ${explanation}`, currentLanguage)
    } else {
      const incorrectText = getTranslation('notQuite', currentLanguage)
      speak(`${incorrectText} ${explanation}`, currentLanguage)
    }
  }

  const handleNext = () => {
    if (currentIndex < scenarios.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      const text = currentLanguage === 'hi-IN'
        ? 'आपने सभी परिदृश्य पूरे कर लिए! गलत सूचना के बारे में सीखने के लिए बहुत बढ़िया!'
        : 'You have completed all scenarios. Great job learning about misinformation!'
      speak(text, currentLanguage)
      setTimeout(() => navigate('/'), 1500)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-touch-xl">Loading game...</p>
      </div>
    )
  }

  if (!scenarios || scenarios.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-touch-xl">No scenarios available</p>
      </div>
    )
  }

  const scenario = scenarios[currentIndex]

  if (!scenario) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-touch-xl">Loading scenario...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <button
          onClick={() => navigate('/')}
          className="touch-target text-amber-600 hover:text-amber-700"
          aria-label="Go back to home"
        >
          <span className="text-3xl">←</span>
        </button>
        <h1 className="text-touch-xl font-bold">{getTranslation('gameTitle', currentLanguage)}</h1>
        <AudioToggle />
      </header>

      {/* Progress */}
      <div className="px-4 py-6">
        <div className="flex justify-center gap-2">
          {scenarios.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-12 rounded-full transition-colors ${
                index === currentIndex ? 'bg-amber-500' : index < currentIndex ? 'bg-green-500' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-center mt-2 text-neutral text-touch-base">
          {getTranslation('scenarioOf', currentLanguage).replace('{{current}}', currentIndex + 1).replace('{{total}}', scenarios.length)}
        </p>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Debug info */}
        {console.log('Current scenario:', scenario)}
        {console.log('Scenario content:', scenario.content)}
        
        {/* Scenario Card */}
        <div className="card-elevated mb-8">
          <div className="mb-6">
            <span className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold">
              {scenario.type === 'whatsapp' ? `📱 ${getTranslation('whatsappMessage', currentLanguage)}` : 
               scenario.type === 'social' ? `📢 ${getTranslation('socialMediaPost', currentLanguage)}` : 
               `📰 ${getTranslation('officialNotice', currentLanguage)}`}
            </span>
          </div>

          {/* Content */}
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 mb-6">
            {scenario.content ? (
              <p className="text-touch-lg leading-relaxed">
                {typeof scenario.content === 'object' ? scenario.content[currentLanguage] || scenario.content['en-IN'] : scenario.content}
              </p>
            ) : (
              <p className="text-touch-lg leading-relaxed text-red-500">
                [No content found - Debug: {JSON.stringify(scenario)}]
              </p>
            )}
          </div>

          {/* Listen Again Button */}
          {!showExplanation && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleListenAgain}
                className="touch-button bg-green-500 text-white hover:bg-green-600 flex items-center gap-2 px-2 py-2"
                aria-label="Listen to this scenario again"
              >
                <span className="text-xl">🔊</span>
                <span>{getTranslation('listenAgain', currentLanguage)}</span>
              </button>
            </div>
          )}

          {/* Question */}
          <h2 className="text-touch-xl font-bold mb-6 text-center">
            {getTranslation('whatDoYouThink', currentLanguage)}
          </h2>

          {/* Answer Buttons */}
          {!showExplanation && (
            <div className="space-y-4">
              <button
                onClick={() => handleAnswer('information')}
                className="w-full touch-button bg-green-500 text-white hover:bg-green-600"
                aria-label="This is factual information"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">✔</span>
                  <span>{getTranslation('factualInformation', currentLanguage)}</span>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('emotional')}
                className="w-full touch-button bg-yellow-500 text-white hover:bg-yellow-600"
                aria-label="This uses emotional manipulation"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">⚠</span>
                  <span>{getTranslation('emotionalManipulation', currentLanguage)}</span>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('misleading')}
                className="w-full touch-button bg-orange-500 text-white hover:bg-orange-600"
                aria-label="This is misleading"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">❌</span>
                  <span>{getTranslation('misleadingFalse', currentLanguage)}</span>
                </div>
              </button>
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className="space-y-6">
              {/* Correct Answer Indicator */}
              <div className={`p-6 rounded-2xl ${
                selectedAnswer === scenario.correctAnswer 
                  ? 'bg-green-100 border-2 border-green-500' 
                  : 'bg-red-100 border-2 border-red-500'
              }`}>
                <p className="text-touch-lg font-bold mb-2">
                  {selectedAnswer === scenario.correctAnswer ? `✅ ${getTranslation('correctAnswer', currentLanguage)}` : `❌ ${getTranslation('notQuite', currentLanguage)}`}
                </p>
                <p className="text-touch-base">
                  {typeof scenario.explanation === 'object' ? scenario.explanation[currentLanguage] || scenario.explanation['en-IN'] : scenario.explanation}
                </p>
              </div>

              {/* Learning Points */}
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-touch-lg font-bold mb-3">{getTranslation('whatToWatchFor', currentLanguage)}</h3>
                <p className="text-touch-base mb-3">
                  <strong>{getTranslation('emotionUsed', currentLanguage)}</strong> {typeof scenario.emotionUsed === 'object' ? scenario.emotionUsed[currentLanguage] || scenario.emotionUsed['en-IN'] : scenario.emotionUsed}
                </p>
                <p className="text-touch-base">
                  <strong>{getTranslation('tip', currentLanguage)}</strong> {typeof scenario.tip === 'object' ? scenario.tip[currentLanguage] || scenario.tip['en-IN'] : scenario.tip}
                </p>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full touch-button bg-primary text-white hover:bg-primary-dark"
              >
                {currentIndex < scenarios.length - 1 ? getTranslation('nextScenarioButton', currentLanguage) : getTranslation('finishButton', currentLanguage)}
              </button>
            </div>
          )}
        </div>

        {/* Learning Notice */}
        <div className="card-elevated bg-purple-50">
          <p className="text-touch-base text-center">
            💡 {getTranslation('learningToolMessage', currentLanguage)}
          </p>
        </div>
      </main>
    </div>
  )
}

export default MisinformationGame
