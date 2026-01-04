import { useEffect } from 'react'
import { useAudio } from '../context/AudioContext'

/**
 * Language Selector with Voice Testing
 * Validates that Hindi and other Indian language voices are available
 */

const languages = [
  { code: 'en-IN', name: 'English', nativeName: 'English', icon: '🇬🇧' },
  { code: 'hi-IN', name: 'Hindi', nativeName: 'हिंदी', icon: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', nativeName: 'தமிழ்', icon: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu', nativeName: 'తెలుగు', icon: '🇮🇳' },
  { code: 'kn-IN', name: 'Kannada', nativeName: 'ಕನ್ನಡ', icon: '🇮🇳' },
  { code: 'ml-IN', name: 'Malayalam', nativeName: 'മലയാളം', icon: '🇮🇳' },
]

// Test phrases for each language
const testPhrases = {
  'en-IN': 'Welcome to voter awareness',
  'hi-IN': 'मतदाता जागरूकता में आपका स्वागत है',
  'ta-IN': 'வாக்காளர் விழிப்புணர்வுக்கு வரவேற்கிறோம்',
  'te-IN': 'ఓటరు అవగాహనకు స్వాగతం',
  'kn-IN': 'ಮತದಾರರ ಜಾಗೃತಿಗೆ ಸ್ವಾಗತ',
  'ml-IN': 'വോട്ടർ അവബോധത്തിലേക്ക് സ്വാഗതം',
}

const LanguageSelector = () => {
  const { 
    currentLanguage, 
    setCurrentLanguage, 
    speak, 
    isVoicesLoaded,
    getVoicesForLanguage,
    testVoice
  } = useAudio()

  useEffect(() => {
    // Log available voices when component mounts
    if (isVoicesLoaded) {
      console.log('Languages with voices:')
      languages.forEach(lang => {
        const voices = getVoicesForLanguage(lang.code)
        console.log(`${lang.name} (${lang.code}):`, voices.length > 0 ? voices.map(v => v.name) : 'No voices available')
      })
    }
  }, [isVoicesLoaded])

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode)
    
    // Speak the test phrase in the selected language
    const phrase = testPhrases[langCode] || testPhrases['en-IN']
    speak(phrase, langCode)
    
    // Log voice information
    const voices = getVoicesForLanguage(langCode)
    if (voices.length === 0) {
      console.warn(`⚠️ No voice available for ${langCode}. Speech may not work correctly.`)
      
      // Show user-friendly message if Hindi voice is missing
      if (langCode === 'hi-IN') {
        console.warn('Hindi voice not found. Please ensure:')
        console.warn('1. Your device supports Hindi TTS')
        console.warn('2. Hindi language pack is installed')
        console.warn('3. Using Chrome/Edge browser for best support')
      }
    } else {
      console.log(`✅ Using voice: ${voices[0].name} for ${langCode}`)
    }
  }

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="touch-target bg-white border-2 border-primary rounded-xl px-4 py-2 text-touch-base font-semibold appearance-none pr-10 cursor-pointer"
        aria-label="Select language"
      >
        {languages.map((lang) => {
          const voices = isVoicesLoaded ? getVoicesForLanguage(lang.code) : []
          const hasVoice = voices.length > 0
          
          return (
            <option key={lang.code} value={lang.code}>
              {lang.icon} {lang.nativeName}
              {!hasVoice && ' (⚠️ Voice unavailable)'}
            </option>
          )
        })}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <span className="text-primary">▼</span>
      </div>
      
      {/* Voice availability indicator */}
      {!isVoicesLoaded && (
        <div className="absolute -bottom-6 left-0 text-xs text-yellow-600">
          Loading voices...
        </div>
      )}
    </div>
  )
}

export default LanguageSelector
