import { useAudio } from '../context/AudioContext'

const languages = [
  { code: 'en-IN', name: 'English', icon: '🇬🇧' },
  { code: 'hi-IN', name: 'हिंदी', icon: '🇮🇳' }
]

const LanguageSelector = () => {
  const { currentLanguage, setCurrentLanguage } = useAudio()

  const handleLanguageChange = (langCode) => {
    setCurrentLanguage(langCode)
  }

  return (
    <div className="relative">
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="touch-target bg-white border-2 border-primary rounded-xl px-4 py-2 text-touch-base font-semibold appearance-none pr-10 cursor-pointer"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.icon} {lang.name}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
        <span className="text-primary">▼</span>
      </div>
    </div>
  )
}

export default LanguageSelector
