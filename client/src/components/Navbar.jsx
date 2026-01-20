import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import LanguageSelector from './LanguageSelector'
import AudioToggle from './AudioToggle'
import { getTranslation } from '../utils/translations'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { currentLanguage } = useAudio()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { path: '/', labelKey: 'homeTitle', icon: '' },
    { path: '/how-voting-works', labelKey: 'howVotingWorks', icon: '' },
    { path: '/know-your-candidates', labelKey: 'knowYourCandidates', icon: '' },
    { path: '/game', labelKey: 'spotMisinformation', icon: '' },
    { path: '/election-cycles', labelKey: 'electionCycles', icon: '' },
    { path: '/voter-help', labelKey: 'voterHelp', icon: '' }
  ]

  const handleNavClick = (path) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Home Button */}
          <button
            onClick={() => handleNavClick('/')}
            className="flex items-center gap-2 font-bold text-primary hover:text-primary-dark transition-colors"
            aria-label="Go to home"
          >
            {/* <span className="text-2xl">🗳️</span> */}
            <span className="hidden sm:inline text-xl">
              {currentLanguage === 'hi-IN' ? 'मतदाता जागरूकता' : 'Voter Awareness'}
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.slice(1).map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-neutral hover:bg-neutral-light'
                }`}
                aria-label={getTranslation(item.labelKey, currentLanguage)}
              >
                <span>{item.icon}</span>
                <span className="text-base font-medium">
                  {getTranslation(item.labelKey, currentLanguage)}
                </span>
              </button>
            ))}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            <LanguageSelector />
            <AudioToggle />
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-neutral-light"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <span className="text-2xl">{isMenuOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-light">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
                    isActive(item.path)
                      ? 'bg-primary text-white'
                      : 'text-neutral hover:bg-neutral-light'
                  }`}
                  aria-label={getTranslation(item.labelKey, currentLanguage)}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-base font-medium">
                    {getTranslation(item.labelKey, currentLanguage)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
