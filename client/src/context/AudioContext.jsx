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
  const [isAudioEnabled, setIsAudioEnabled] = useState(() => {
    const saved = localStorage.getItem('audioEnabled')
    return saved !== null ? JSON.parse(saved) : true
  })
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    const saved = localStorage.getItem('selectedLanguage')
    return saved || 'en-IN'
  })
  const [synth, setSynth] = useState(null)
  const [availableVoices, setAvailableVoices] = useState([])
  const [isVoicesLoaded, setIsVoicesLoaded] = useState(false)

  // Language configuration
  const languageConfig = {
    'en-IN': { code: 'en-IN', voiceNames: ['Google UK English', 'Microsoft Heera', 'English (India)'], fallbackCode: 'en-US', rate: 0.9 },
    'hi-IN': { code: 'hi-IN', voiceNames: ['Google हिन्दी', 'Microsoft Heera - Hindi', 'Lekha', 'Hemant', 'Hindi', 'हिन्दी'], fallbackCode: 'en-IN', rate: 0.85 },
    'ta-IN': { code: 'ta-IN', voiceNames: ['Google தமிழ்', 'Microsoft Heera - Tamil', 'Tamil'], fallbackCode: 'en-IN', rate: 0.85 },
    'te-IN': { code: 'te-IN', voiceNames: ['Google తెలుగు', 'Microsoft Heera - Telugu', 'Telugu'], fallbackCode: 'en-IN', rate: 0.85 },
    'kn-IN': { code: 'kn-IN', voiceNames: ['Google ಕನ್ನಡ', 'Microsoft Heera - Kannada', 'Kannada'], fallbackCode: 'en-IN', rate: 0.85 },
    'ml-IN': { code: 'ml-IN', voiceNames: ['Google മലയാളം', 'Microsoft Heera - Malayalam', 'Malayalam'], fallbackCode: 'en-IN', rate: 0.85 }
  }

  useEffect(() => {
    if ('speechSynthesis' in window) {
      const synthInstance = window.speechSynthesis
      setSynth(synthInstance)

      const loadVoices = () => {
        const voices = synthInstance.getVoices()
        setAvailableVoices(voices)
        setIsVoicesLoaded(true)
        console.log('📢 Available voices:', voices.map(v => `${v.name} (${v.lang})`))
        
        // Show Hindi-specific voices
        const hindiVoices = voices.filter(v => v.lang.includes('hi') || v.name.toLowerCase().includes('hindi'))
        console.log('🇮🇳 Hindi voices found:', hindiVoices.length > 0 ? hindiVoices.map(v => `${v.name} (${v.lang})`) : 'NONE - Hindi voices not installed!')
      }

      loadVoices()
      if (synthInstance.onvoiceschanged !== undefined) {
        synthInstance.onvoiceschanged = loadVoices
      }
      setTimeout(loadVoices, 100)
      setTimeout(loadVoices, 500)
    }
  }, [])

  // Save audio enabled state to localStorage
  useEffect(() => {
    localStorage.setItem('audioEnabled', JSON.stringify(isAudioEnabled))
  }, [isAudioEnabled])

  // Save language to localStorage
  useEffect(() => {
    localStorage.setItem('selectedLanguage', currentLanguage)
  }, [currentLanguage])

  const findBestVoice = (langCode) => {
    if (!isVoicesLoaded || availableVoices.length === 0) return null
    
    const config = languageConfig[langCode] || languageConfig['en-IN']
    
    console.log(`🔍 Looking for voice for: ${langCode}`)
    
    // Try exact language code match first (most accurate)
    const exactMatch = availableVoices.find(v => v.lang === langCode)
    if (exactMatch) {
      console.log(`✅ Found exact match: ${exactMatch.name} (${exactMatch.lang})`)
      return exactMatch
    }
    
    // Try language code prefix match (e.g., 'hi' matches 'hi-IN')
    const langPrefix = langCode.split('-')[0]
    const prefixMatch = availableVoices.find(v => v.lang.startsWith(langPrefix))
    if (prefixMatch) {
      console.log(`✅ Found prefix match: ${prefixMatch.name} (${prefixMatch.lang})`)
      return prefixMatch
    }
    
    // Try voice name matches
    for (const voiceName of config.voiceNames) {
      const voice = availableVoices.find(v => 
        v.name.includes(voiceName) || 
        voiceName.includes(v.name) ||
        v.name.toLowerCase().includes(voiceName.toLowerCase())
      )
      if (voice) {
        console.log(`✅ Found voice by name: ${voice.name} (${voice.lang})`)
        return voice
      }
    }
    
    // Fallback to another language
    console.log(`⚠️ No ${langCode} voice found, trying fallback: ${config.fallbackCode}`)
    const fallbackVoice = availableVoices.find(v => v.lang.startsWith(config.fallbackCode.split('-')[0]))
    if (fallbackVoice) {
      console.log(`⚠️ Using fallback: ${fallbackVoice.name}`)
      return fallbackVoice
    }
    
    return availableVoices[0]
  }

  const speak = (text, lang = currentLanguage) => {
    if (!isAudioEnabled || !synth || !text) return

    // Check if Web Speech API is supported
    if (!('speechSynthesis' in window)) {
      console.error('Web Speech API not supported in this browser')
      return
    }

    synth.cancel()

    if (!isVoicesLoaded) {
      console.log('⏳ Voices not loaded yet, retrying...')
      setTimeout(() => speak(text, lang), 500)
      return
    }

    try {
      const utterance = new SpeechSynthesisUtterance(text)
      const config = languageConfig[lang] || languageConfig['en-IN']
      
      utterance.lang = config.code
      const voice = findBestVoice(lang)
      if (voice) {
        utterance.voice = voice
        console.log(`🗣️ Speaking with: ${voice.name} (${voice.lang})`)
      } else {
        console.warn(`⚠️ No voice found for ${lang}, using default`)
      }
      
      utterance.rate = config.rate
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onerror = (event) => {
        console.error('❌ Speech error:', event.error, event)
        
        // Try fallback to English if Hindi fails
        if (event.error === 'voice-unavailable' || event.error === 'not-allowed') {
          console.log('🔄 Trying fallback voice...')
          const fallbackUtterance = new SpeechSynthesisUtterance(text)
          fallbackUtterance.lang = 'en-US'
          fallbackUtterance.rate = 0.9
          synth.speak(fallbackUtterance)
        }
      }

      utterance.onstart = () => {
        console.log(`▶️ Started speaking: "${text.substring(0, 50)}..."`)
      }

      utterance.onend = () => {
        console.log('✅ Finished speaking')
      }

      synth.speak(utterance)
    } catch (error) {
      console.error('❌ Error in speak:', error)
      // Last resort fallback
      alert('Audio not available. Please check your browser settings or use a different browser.')
    }
  }

  const stopSpeaking = () => {
    if (synth) {
      synth.cancel()
    }
  }

  const toggleAudio = () => {
    setIsAudioEnabled(prev => !prev)
    if (!isAudioEnabled) {
      speak(currentLanguage === 'hi-IN' ? 'ऑडियो चालू' : 'Audio enabled')
    } else {
      stopSpeaking()
    }
  }

  const changeLanguage = (newLang) => {
    setCurrentLanguage(newLang)
    const config = languageConfig[newLang]
    const testPhrase = {
      'en-IN': 'Language changed to English',
      'hi-IN': 'भाषा हिंदी में बदल गई',
      'ta-IN': 'மொழி தமிழுக்கு மாற்றப்பட்டது',
      'te-IN': 'భాష తెలుగులోకి మార్చబడింది',
      'kn-IN': 'ಭಾಷೆಯನ್ನು ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಲಾಗಿದೆ',
      'ml-IN': 'ഭാഷ മലയാളത്തിലേക്ക് മാറ്റി'
    }
    speak(testPhrase[newLang] || testPhrase['en-IN'], newLang)
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
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}
