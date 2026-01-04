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
      // Demo data
      const demoScenarios = [
        {
          _id: '1',
          content: '"Vote for Party X or your ration card will be cancelled!"',
          type: 'whatsapp',
          correctAnswer: 'misleading',
          explanation: 'This is misleading. Your ration card cannot be cancelled based on how you vote. Your vote is secret.',
          emotionUsed: 'Fear',
          tip: 'Be careful of messages that threaten you or create fear about voting.'
        },
        {
          _id: '2',
          content: '"Breaking News: Voting date changed to next week!"',
          type: 'social',
          correctAnswer: 'misleading',
          explanation: 'This is false. Always check official Election Commission website for voting dates. Don\'t trust random messages.',
          emotionUsed: 'Confusion',
          tip: 'Verify important election information from official sources only.'
        },
        {
          _id: '3',
          content: '"Election on May 15th. Polling booths open 7 AM to 6 PM. - Election Commission of India"',
          type: 'information',
          correctAnswer: 'information',
          explanation: 'This is factual information from the official Election Commission. It provides clear facts without trying to influence your vote.',
          emotionUsed: 'None',
          tip: 'Official communications are clear, factual, and don\'t use emotional language.'
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
    
    if (isCorrect) {
      const correctText = getTranslation('correct', currentLanguage)
      speak(`${correctText} ${scenario.explanation}`, currentLanguage)
    } else {
      const incorrectText = getTranslation('incorrect', currentLanguage)
      speak(`${incorrectText} ${scenario.explanation}`, currentLanguage)
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
          Scenario {currentIndex + 1} of {scenarios.length}
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
              {scenario.type === 'whatsapp' ? '📱 WhatsApp Message' : 
               scenario.type === 'social' ? '📢 Social Media Post' : 
               '📰 Official Notice'}
            </span>
          </div>

          {/* Content */}
          <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 mb-8">
            {scenario.content ? (
              <p className="text-touch-lg leading-relaxed">
                {scenario.content}
              </p>
            ) : (
              <p className="text-touch-lg leading-relaxed text-red-500">
                [No content found - Debug: {JSON.stringify(scenario)}]
              </p>
            )}
          </div>

          {/* Question */}
          <h2 className="text-touch-xl font-bold mb-6 text-center">
            What do you think about this?
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
                  <span>Factual Information</span>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('emotional')}
                className="w-full touch-button bg-yellow-500 text-white hover:bg-yellow-600"
                aria-label="This uses emotional manipulation"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">⚠</span>
                  <span>Emotional Manipulation</span>
                </div>
              </button>

              <button
                onClick={() => handleAnswer('misleading')}
                className="w-full touch-button bg-orange-500 text-white hover:bg-orange-600"
                aria-label="This is misleading"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-3xl">❌</span>
                  <span>Misleading / False</span>
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
                  {selectedAnswer === scenario.correctAnswer ? '✅ Correct!' : '❌ Not quite'}
                </p>
                <p className="text-touch-base">
                  {scenario.explanation}
                </p>
              </div>

              {/* Learning Points */}
              <div className="bg-blue-50 p-6 rounded-2xl">
                <h3 className="text-touch-lg font-bold mb-3">What to Watch For:</h3>
                <p className="text-touch-base mb-3">
                  <strong>Emotion Used:</strong> {scenario.emotionUsed}
                </p>
                <p className="text-touch-base">
                  <strong>Tip:</strong> {scenario.tip}
                </p>
              </div>

              {/* Next Button */}
              <button
                onClick={handleNext}
                className="w-full touch-button bg-primary text-white hover:bg-primary-dark"
              >
                {currentIndex < scenarios.length - 1 ? 'Next Scenario' : 'Finish'}
              </button>
            </div>
          )}
        </div>

        {/* Learning Notice */}
        <div className="card-elevated bg-purple-50">
          <p className="text-touch-base text-center">
            💡 This is a learning tool. There's no scoring. Take your time to understand each scenario.
          </p>
        </div>
      </main>
    </div>
  )
}

export default MisinformationGame
