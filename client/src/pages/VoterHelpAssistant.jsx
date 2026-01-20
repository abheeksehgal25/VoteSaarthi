import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'

import { helpCategories } from '../data/voterHelpData'

const VoterHelpAssistant = () => {
  const [view, setView] = useState('categories') // 'categories', 'questions', 'answer'
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const navigate = useNavigate()
  const { speak, stopSpeaking, currentLanguage } = useAudio()

  const categories = helpCategories[currentLanguage] || helpCategories['en-IN']

  useEffect(() => {
    const welcomeText = currentLanguage === 'hi-IN'
      ? 'मतदाता सहायता सहायक में आपका स्वागत है। मतदान के बारे में जानने के लिए एक श्रेणी चुनें।'
      : 'Welcome to Voter Help Assistant. Select a category to learn about voting.'
    speak(welcomeText, currentLanguage)
    
    // Cleanup: Stop speaking when component unmounts
    return () => {
      stopSpeaking()
    }
  }, [])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
    setView('questions')
    speak(category.title, currentLanguage)
  }

  const handleQuestionClick = (question) => {
    setSelectedQuestion(question)
    setView('answer')
    speak(`${question.question}. ${question.answer}`, currentLanguage)
  }

  const handleRelatedQuestionClick = (questionId) => {
    const question = selectedCategory.questions.find(q => q.id === questionId)
    if (question) {
      setSelectedQuestion(question)
      speak(`${question.question}. ${question.answer}`, currentLanguage)
    }
  }

  const handleBack = () => {
    if (view === 'answer') {
      setView('questions')
      setSelectedQuestion(null)
    } else if (view === 'questions') {
      setView('categories')
      setSelectedCategory(null)
    } else {
      navigate('/')
    }
  }

  const handleListenAgain = () => {
    if (selectedQuestion) {
      speak(`${selectedQuestion.question}. ${selectedQuestion.answer}`, currentLanguage)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
            {currentLanguage === 'hi-IN' ? 'मतदाता सहायता' : 'Voter Help Assistant'}
          </h1>
        </div>

        {/* Categories View */}
        {view === 'categories' && (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">❓</span>
              <h2 className="text-touch-2xl font-bold mb-2">
                {currentLanguage === 'hi-IN' ? 'आपकी सहायता के लिए' : 'How Can We Help You?'}
              </h2>
              <p className="text-touch-base text-neutral">
                {currentLanguage === 'hi-IN' 
                  ? 'मतदान के बारे में जानने के लिए एक विषय चुनें'
                  : 'Select a topic to learn about voting'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category)}
                  className="card-elevated bg-white hover:shadow-xl transition-shadow text-left p-6"
                  aria-label={`Learn about ${category.title}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl">{category.icon}</span>
                    <div>
                      <h3 className="text-touch-lg font-bold mb-1">{category.title}</h3>
                      <p className="text-touch-sm text-neutral">
                        {category.questions.length} {currentLanguage === 'hi-IN' ? 'प्रश्न' : 'questions'}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Help Notice */}
            <div className="mt-8 card-elevated bg-blue-50">
              <p className="text-touch-base text-center">
                💡 {currentLanguage === 'hi-IN'
                  ? 'सभी जानकारी आधिकारिक स्रोतों से सत्यापित है और राजनीतिक रूप से तटस्थ है।'
                  : 'All information is verified from official sources and politically neutral.'
                }
              </p>
            </div>
          </div>
        )}

        {/* Questions View */}
        {view === 'questions' && selectedCategory && (
          <div>
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block">{selectedCategory.icon}</span>
              <h2 className="text-touch-2xl font-bold mb-4">{selectedCategory.title}</h2>
              <p className="text-touch-base text-neutral">
                {currentLanguage === 'hi-IN' 
                  ? 'एक प्रश्न चुनें जिसका उत्तर आप जानना चाहते हैं'
                  : 'Select a question you want answered'
                }
              </p>
            </div>

            <div className="space-y-4">
              {selectedCategory.questions.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionClick(question)}
                  className="w-full card-elevated bg-white hover:shadow-xl transition-shadow text-left p-6"
                  aria-label={question.question}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-3xl flex-shrink-0">❔</span>
                    <p className="text-touch-lg font-semibold">{question.question}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Answer View */}
        {view === 'answer' && selectedQuestion && (
          <div>
            <div className="card-elevated mb-6">
              {/* Question */}
              <div className="bg-purple-100 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">❔</span>
                  <h2 className="text-touch-xl font-bold">{selectedQuestion.question}</h2>
                </div>
              </div>

              {/* Answer */}
              <div className="bg-green-50 rounded-2xl p-6 mb-6">
                <div className="flex items-start gap-4">
                  <span className="text-4xl flex-shrink-0">✅</span>
                  <div>
                    <p className="text-touch-lg leading-relaxed mb-4">{selectedQuestion.answer}</p>
                    
                    {/* Listen Again Button */}
                    <button
                      onClick={handleListenAgain}
                      className="touch-button bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-1"
                      aria-label="Listen to answer again"
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">🔊</span>
                        <span>{currentLanguage === 'hi-IN' ? 'फिर से सुनें' : 'Listen Again'}</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Related Questions */}
              {selectedQuestion.relatedQuestions && selectedQuestion.relatedQuestions.length > 0 && (
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-touch-lg font-bold mb-4">
                    {currentLanguage === 'hi-IN' ? '🔗 संबंधित प्रश्न' : '🔗 Related Questions'}
                  </h3>
                  <div className="space-y-3">
                    {selectedQuestion.relatedQuestions.map((relatedId) => {
                      const relatedQ = selectedCategory.questions.find(q => q.id === relatedId)
                      return relatedQ ? (
                        <button
                          key={relatedId}
                          onClick={() => handleRelatedQuestionClick(relatedId)}
                          className="w-full text-left p-4 bg-white rounded-xl hover:shadow-md transition-shadow"
                          aria-label={relatedQ.question}
                        >
                          <p className="text-touch-base font-semibold text-purple-600">
                            → {relatedQ.question}
                          </p>
                        </button>
                      ) : null
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setView('questions')
                  setSelectedQuestion(null)
                }}
                className="flex-1 touch-button bg-gray-200 text-neutral-dark hover:bg-gray-300"
                aria-label="Back to questions"
              >
                {currentLanguage === 'hi-IN' ? 'और प्रश्न देखें' : 'More Questions'}
              </button>
              <button
                onClick={() => {
                  setView('categories')
                  setSelectedCategory(null)
                  setSelectedQuestion(null)
                }}
                className="flex-1 touch-button bg-purple-600 text-white hover:bg-purple-700"
                aria-label="Back to categories"
              >
                {currentLanguage === 'hi-IN' ? 'अन्य विषय' : 'Other Topics'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default VoterHelpAssistant
