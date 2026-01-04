/**
 * Enhanced Audio Context with Hindi and Multi-language Support
 * Fixes Hindi TTS issues and provides robust fallback mechanisms
 */

import { createContext, useContext, useState, useEffect } from 'react'

const AudioContext = createContext()

export const useAudio = () => {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

export const AudioProvider = ({ children }) => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(true)
  const [currentLanguage, setCurrentLanguage] = useState('en-IN')
  const [synth, setSynth] = useState(null)
  const [availableVoices, setAvailableVoices] = useState([])
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false)

  // Language configuration with detailed settings
  const languageConfig = {
    'en-IN': {
      code: 'en-IN',
      voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi', 'Lekha', 'Google UK English Female'],
      fallbackCode: 'en-US',
      rate: 0.9
    },
    'hi-IN': {
      code: 'hi-IN',
      voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi (India)', 'Lekha', 'Hemant'],
      fallbackCode: 'en-IN',
      rate: 0.85
    },
    'ta-IN': {
      code: 'ta-IN',
      voiceNames: ['Google தமிழ்', 'Microsoft Heera - Tamil'],
      fallbackCode: 'en-IN',
      rate: 0.85
    },
    'te-IN': {
      code: 'te-IN',
      voiceNames: ['Google తెలుగు', 'Microsoft Heera - Telugu'],
      fallbackCode: 'en-IN',
      rate: 0.85
    },
    'kn-IN': {
      code: 'kn-IN',
      voiceNames: ['Google ಕನ್ನಡ', 'Microsoft Heera - Kannada'],
      fallbackCode: 'en-IN',
      rate: 0.85
    },
    'ml-IN': {
      code: 'ml-IN',
      voiceNames: ['Google മലയാളം', 'Microsoft Heera - Malayalam'],
      fallbackCode: 'en-IN',
      rate: 0.85
    }
  }

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synthInstance = window.speechSynthesis
      setSynth(synthInstance)

      // Load voices
      const loadVoices = () => {
        const voices = synthInstance.getVoices()
        setAvailableVoices(voices)
        setIsVoicesLoaded(true)
        
        console.log('Available voices:', voices.map(v => `${v.name} (${v.lang})`))
      }

      // Voices might load asynchronously
      loadVoices()
      
      // Chrome requires this event listener
      if (synthInstance.onvoiceschanged !== undefined) {
        synthInstance.onvoiceschanged = loadVoices
      }

      // Retry voice loading after a delay (Chrome fix)
      setTimeout(loadVoices, 100)
      setTimeout(loadVoices, 500)
    }
  }, [])

  /**
   * Find the best voice for a given language
   * Priority: 
   * 1. Exact language match with preferred voice name
   * 2. Language code match
   * 3. Fallback language
   * 4. Default voice
   */
  const findBestVoice = (langCode) => {
    if (!isVoicesLoaded || availableVoices.length === 0) {
      console.warn('Voices not loaded yet')
      return null
    }

    const config = languageConfig[langCode] || languageConfig['en-IN']
    
    // Try exact voice name matches first
    for (const voiceName of config.voiceNames) {
      const voice = availableVoices.find(v => 
        v.name.includes(voiceName) || voiceName.includes(v.name)
      )
      if (voice) {
        console.log(`Found preferred voice: ${voice.name} for ${langCode}`)
        return voice
      }
    }

    // Try language code match
    const langVoice = availableVoices.find(v => v.lang.startsWith(config.code.split('-')[0]))
    if (langVoice) {
      console.log(`Found language match: ${langVoice.name} for ${langCode}`)
      return langVoice
    }

    // Try fallback language
    const fallbackVoice = availableVoices.find(v => v.lang.startsWith(config.fallbackCode.split('-')[0]))
    if (fallbackVoice) {
      console.log(`Using fallback voice: ${fallbackVoice.name} for ${langCode}`)
      return fallbackVoice
    }

    // Use first available voice
    console.warn(`No suitable voice found for ${langCode}, using default`)
    return availableVoices[0]
  }

  /**
   * Speak text with enhanced Hindi and multi-language support
   */
  const speak = (text, lang = currentLanguage) => {
    if (!isAudioEnabled || !synth || !text) return

    // Cancel any ongoing speech
    synth.cancel()

    // Wait for voices to load
    if (!isVoicesLoaded) {
      console.warn('Voices not loaded, retrying...')
      setTimeout(() => speak(text, lang), 500)
      return
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text)
      const config = languageConfig[lang] || languageConfig['en-IN']
      
      // Set language
      utterance.lang = config.code
      
      // Find best voice
      const voice = findBestVoice(lang)
      if (voice) {
        utterance.voice = voice
        console.log(`Speaking with voice: ${voice.name} (${voice.lang})`)
      }
      
      // Set speech parameters (slower for clarity)
      utterance.rate = config.rate // Slower for low-literacy users
      utterance.pitch = 1
      utterance.volume = 1

      // Error handling
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event)
        
        // Fallback: Try with default voice
        if (event.error === 'voice-unavailable') {
          console.log('Retrying with default voice...')
          const defaultUtterance = new SpeechSynthesisUtterance(text)
          defaultUtterance.lang = 'en-IN'
          defaultUtterance.rate = 0.9
          synth.speak(defaultUtterance)
        }
      }

      utterance.onstart = () => {
        console.log('Speech started')
      }

      utterance.onend = () => {
        console.log('Speech ended')
      }

      // Speak
      synth.speak(utterance)
    } catch (error) {
      console.error('Error in speak function:', error)
    }
  }

  /**
   * Test voice availability for a language
   */
  const testVoice = (langCode) => {
    const voice = findBestVoice(langCode)
    if (voice) {
      speak('परीक्षण', langCode) // "Test" in Hindi
      return true
    }
    return false
  }

  /**
   * Get available voices for a language
   */
  const getVoicesForLanguage = (langCode) => {
    const langPrefix = langCode.split('-')[0]
    return availableVoices.filter(v => v.lang.startsWith(langPrefix))
  }

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel()
    }
  }

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev)
    if (!isAudioEnabled) {
      // Use the correct language when re-enabling
      const config = languageConfig[currentLanguage]
      speak(currentLanguage === 'hi-IN' ? 'ऑडियो चालू' : 'Audio enabled', currentLanguage)
    } else {
      stopSpeaking()
    }
  }

  const changeLanguage = (newLang) => {
    setCurrentLanguage(newLang)
    
    // Test if voice is available
    const hasVoice = testVoice(newLang)
    if (!hasVoice) {
      console.warn(`No voice available for ${newLang}, using fallback`)
    }
  }

  return (
    <AudioContext.Provider
      value={{
        isAudioEnabled,
        currentLanguage,
        availableVoices,
        isVoicesLoaded,
        setCurrentLanguage: changeLanguage,
        speak,
        stopSpeaking,
        toggleAudio,
        testVoice,
        getVoicesForLanguage,
        languageConfig
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
