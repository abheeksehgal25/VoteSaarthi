import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import AudioToggle from '../components/AudioToggle'
import { getTranslation } from '../utils/translations'

const getCards = (lang) => {
  const isHindi = lang === 'hi-IN'
  
  return [
    {
      id: 1,
      title: isHindi ? 'वर्तमान चुनाव प्रणाली' : 'Current Election System',
      content: isHindi 
        ? 'वर्तमान प्रणाली में, राज्य चुनाव और लोकसभा चुनाव अलग-अलग समय पर आयोजित किए जाते हैं।\n\n• राज्य चुनाव विधायकों (MLAs) को चुनने के लिए होते हैं\n• लोकसभा चुनाव सांसदों (MPs) को चुनने के लिए होते हैं\n• प्रत्येक चुनाव अपने समय के अनुसार होता है\n• मतदाता चुनाव में भाग लेते हैं जब वे आयोजित होते हैं'
        : 'In the current system, State elections and Lok Sabha elections are conducted at different times.\n\n• State elections are held to elect MLAs\n• Lok Sabha elections are held to elect MPs\n• Each election follows its own schedule\n• Voters participate in elections as and when they are held',
      icon: '🏛️',
      audioText: isHindi
        ? 'कार्ड 1: वर्तमान चुनाव प्रणाली। वर्तमान प्रणाली में, राज्य चुनाव और लोकसभा चुनाव अलग-अलग समय पर आयोजित किए जाते हैं। राज्य चुनाव विधायकों को चुनने के लिए होते हैं। लोकसभा चुनाव सांसदों को चुनने के लिए होते हैं। प्रत्येक चुनाव अपने समय के अनुसार होता है। मतदाता चुनाव में भाग लेते हैं जब वे आयोजित होते हैं।'
        : 'Card 1: Current Election System. In the current system, State elections and Lok Sabha elections are conducted at different times. State elections are held to elect MLAs. Lok Sabha elections are held to elect MPs. Each election follows its own schedule. Voters participate in elections as and when they are held.'
    },
    {
      id: 2,
      title: isHindi ? 'एक साथ चुनाव' : 'Simultaneous Elections',
      content: isHindi
        ? 'एक साथ चुनाव का मतलब है राज्य चुनाव और लोकसभा चुनाव एक ही समय पर करना।\n\n• मतदाता एक ही अवधि में राज्य और राष्ट्रीय प्रतिनिधियों के लिए मतदान कर सकते हैं\n• चुनाव कार्यक्रम समन्वित होते हैं\n• मतदान प्रक्रिया स्वयं वही रहती है\n\nइस विषय पर अलग-अलग विचार मौजूद हैं।\nयह मंच किसी भी विचार का समर्थन या विरोध किए बिना प्रक्रिया को समझाता है।'
        : 'Simultaneous elections refer to conducting State elections and Lok Sabha elections at the same time.\n\n• Voters may vote for State and National representatives during the same period\n• Election schedules are aligned\n• The voting process itself remains the same\n\nDifferent views exist on this approach.\nThis platform explains the process without supporting or opposing any view.',
      icon: '🗳️',
      audioText: isHindi
        ? 'कार्ड 2: एक साथ चुनाव। एक साथ चुनाव का मतलब है राज्य चुनाव और लोकसभा चुनाव एक ही समय पर करना। मतदाता एक ही अवधि में राज्य और राष्ट्रीय प्रतिनिधियों के लिए मतदान कर सकते हैं। चुनाव कार्यक्रम समन्वित होते हैं। मतदान प्रक्रिया स्वयं वही रहती है। इस विषय पर अलग-अलग विचार मौजूद हैं। यह मंच किसी भी विचार का समर्थन या विरोध किए बिना प्रक्रिया को समझाता है।'
        : 'Card 2: Simultaneous Elections. Simultaneous elections refer to conducting State elections and Lok Sabha elections at the same time. Voters may vote for State and National representatives during the same period. Election schedules are aligned. The voting process itself remains the same. Different views exist on this approach. This platform explains the process without supporting or opposing any view.'
    },
    {
      id: 3,
      title: isHindi ? 'क्या नहीं बदलता' : 'What Does Not Change',
      content: isHindi
        ? 'चुनाव प्रणाली की परवाह किए बिना:\n\n• मतदान ईवीएम के माध्यम से किया जाता है\n• मतदान गुप्त और गोपनीय रहता है\n• निर्वाचन क्षेत्र आधारित प्रतिनिधित्व अपरिवर्तित रहता है\n• नागरिक प्रति चुनाव एक वोट डालते हैं\n• मतदाता अधिकार और पात्रता समान रहती है'
        : 'Regardless of the election system:\n\n• Voting is done using EVMs\n• Voting remains secret and confidential\n• Constituency-based representation remains unchanged\n• Citizens cast one vote per election\n• Voter rights and eligibility stay the same',
      icon: '⚖️',
      audioText: isHindi
        ? 'कार्ड 3: क्या नहीं बदलता। चुनाव प्रणाली की परवाह किए बिना: मतदान ईवीएम के माध्यम से किया जाता है। मतदान गुप्त और गोपनीय रहता है। निर्वाचन क्षेत्र आधारित प्रतिनिधित्व अपरिवर्तित रहता है। नागरिक प्रति चुनाव एक वोट डालते हैं। मतदाता अधिकार और पात्रता समान रहती है।'
        : 'Card 3: What Does Not Change. Regardless of the election system: Voting is done using EVMs. Voting remains secret and confidential. Constituency-based representation remains unchanged. Citizens cast one vote per election. Voter rights and eligibility stay the same.'
    },
    {
      id: 4,
      title: isHindi ? 'मतदाता जागरूकता क्यों महत्वपूर्ण है' : 'Why Voter Awareness Matters',
      content: isHindi
        ? 'जब चुनाव अलग-अलग समय पर या एक साथ होते हैं, स्पष्ट मतदाता समझ आवश्यक हो जाती है।\n\n• चुनाव के दौरान भ्रम को कम करता है\n• मतदाताओं को आत्मविश्वास से भाग लेने में मदद करता है\n• गलत सूचना और अफवाहों को रोकता है\n• लोकतांत्रिक भागीदारी को मजबूत करता है\n\nयह मंच शिक्षा और जागरूकता पर केंद्रित है, राय पर नहीं।'
        : 'When elections happen at different times or together, clear voter understanding becomes essential.\n\n• Reduces confusion during elections\n• Helps voters participate confidently\n• Prevents misinformation and rumours\n• Strengthens democratic participation\n\nThis platform focuses on education and awareness, not opinions.',
      icon: '📚',
      audioText: isHindi
        ? 'कार्ड 4: मतदाता जागरूकता क्यों महत्वपूर्ण है। जब चुनाव अलग-अलग समय पर या एक साथ होते हैं, स्पष्ट मतदाता समझ आवश्यक हो जाती है। चुनाव के दौरान भ्रम को कम करता है। मतदाताओं को आत्मविश्वास से भाग लेने में मदद करता है। गलत सूचना और अफवाहों को रोकता है। लोकतांत्रिक भागीदारी को मजबूत करता है। यह मंच शिक्षा और जागरूकता पर केंद्रित है, राय पर नहीं।'
        : 'Card 4: Why Voter Awareness Matters. When elections happen at different times or together, clear voter understanding becomes essential. Reduces confusion during elections. Helps voters participate confidently. Prevents misinformation and rumours. Strengthens democratic participation. This platform focuses on education and awareness, not opinions.'
    }
  ]
}

const ElectionCycles = () => {
  const navigate = useNavigate()
  const { speak, currentLanguage } = useAudio()
  const [currentCard, setCurrentCard] = useState(0)
  
  const cards = getCards(currentLanguage)
  const card = cards[currentCard]

  // Auto-speak card content when it changes
  useEffect(() => {
    if (card) {
      setTimeout(() => {
        speak(card.audioText, currentLanguage)
      }, 300)
    }
  }, [currentCard, currentLanguage])

  const handleNext = () => {
    if (currentCard < cards.length - 1) {
      setCurrentCard(currentCard + 1)
    }
  }

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1)
    }
  }

  const handleListenAgain = () => {
    speak(card.audioText, currentLanguage)
  }

  const handleBack = () => {
    const backText = currentLanguage === 'hi-IN' ? 'वापस होमपेज पर जा रहे हैं' : 'Going back to homepage'
    speak(backText, currentLanguage)
    setTimeout(() => navigate('/'), 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-white shadow-sm">
        <button
          onClick={handleBack}
          className="touch-target p-3 rounded-lg hover:bg-neutral-light"
          aria-label={currentLanguage === 'hi-IN' ? 'वापस जाएं' : 'Go back'}
        >
          <span className="text-2xl">←</span>
        </button>
        <AudioToggle />
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 
            className="text-3xl md:text-4xl font-bold text-primary mb-2"
            role="heading"
            aria-level="1"
          >
            {getTranslation('electionCyclesTitle', currentLanguage)}
          </h1>
          <p className="text-neutral text-touch-base">
            {getTranslation('electionCyclesSubtitle', currentLanguage)}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mb-8">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index === currentCard 
                  ? 'w-12 bg-primary' 
                  : 'w-8 bg-neutral-light'
              }`}
              role="progressbar"
              aria-valuenow={currentCard + 1}
              aria-valuemin="1"
              aria-valuemax={cards.length}
            />
          ))}
        </div>

        {/* Card Display */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          {/* Card Icon */}
          <div className="text-center mb-6">
            <span className="text-6xl" role="img" aria-hidden="true">
              {card.icon}
            </span>
          </div>

          {/* Card Title */}
          <h2 className="text-2xl font-bold text-primary text-center mb-6">
            {card.title}
          </h2>

          {/* Card Content */}
          <p className="text-touch-lg text-neutral leading-relaxed text-left whitespace-pre-line">
            {card.content}
          </p>

          {/* Listen Again Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleListenAgain}
              className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              aria-label={currentLanguage === 'hi-IN' ? 'फिर से सुनें' : 'Listen again'}
            >
              <span className="text-xl">🔊</span>
              <span className="font-semibold">
                {currentLanguage === 'hi-IN' ? 'फिर से सुनें' : 'Listen Again'}
              </span>
            </button>
          </div>
        </div>

        {/* Card Counter */}
        <div className="text-center text-neutral mb-6">
          <span className="text-touch-base">
            {currentLanguage === 'hi-IN' 
              ? `कार्ड ${currentCard + 1} / ${cards.length}`
              : `Card ${currentCard + 1} of ${cards.length}`
            }
          </span>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className={`flex-1 touch-button ${
              currentCard === 0
                ? 'bg-neutral-light text-neutral cursor-not-allowed'
                : 'bg-secondary text-white hover:bg-secondary-dark'
            }`}
            aria-label={currentLanguage === 'hi-IN' ? 'पिछला कार्ड' : 'Previous card'}
          >
            {currentLanguage === 'hi-IN' ? '← पिछला' : '← Previous'}
          </button>

          {currentCard === cards.length - 1 ? (
            <button
              onClick={handleBack}
              className="flex-1 touch-button bg-green-500 text-white hover:bg-green-600"
              aria-label={currentLanguage === 'hi-IN' ? 'समाप्त करें और होम पर जाएं' : 'Finish and go to home'}
            >
              {currentLanguage === 'hi-IN' ? 'समाप्त करें ✓' : 'Finish ✓'}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-1 touch-button bg-primary text-white hover:bg-primary-dark"
              aria-label={currentLanguage === 'hi-IN' ? 'अगला कार्ड' : 'Next card'}
            >
              {currentLanguage === 'hi-IN' ? 'अगला →' : 'Next →'}
            </button>
          )}
        </div>

        {/* Neutral Disclaimer */}
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
          <p className="text-sm text-neutral text-center leading-relaxed">
            {currentLanguage === 'hi-IN'
              ? '⚖️ यह मंच पूर्णतः तटस्थ और शैक्षिक है। हम किसी भी राजनीतिक विचार का समर्थन या विरोध नहीं करते हैं।'
              : '⚖️ This platform is completely neutral and educational. We do not support or oppose any political viewpoint.'
            }
          </p>
        </div>
      </main>
    </div>
  )
}

export default ElectionCycles
