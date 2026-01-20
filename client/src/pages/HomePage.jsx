import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import { getTranslation } from '../utils/translations'

const HomePage = () => {
  const navigate = useNavigate()
  const { currentLanguage } = useAudio()

  const handleNavigate = (path) => {
    navigate(path)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            role="heading"
            aria-level="1"
          >
            {getTranslation('homeTitle', currentLanguage)}
          </h1>
          <p className="text-touch-lg text-neutral">
            {getTranslation('homeSubtitle', currentLanguage)}
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="space-y-6">
          {/* How Voting Works */}
          <button
            onClick={() => handleNavigate('/how-voting-works')}
            className="w-full touch-button bg-primary text-white hover:bg-primary-dark shadow-xl"
            aria-label="Learn how voting works step by step"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl" role="img" aria-label="ballot box">
                🗳️
              </span>
              <span>{getTranslation('howVotingWorks', currentLanguage)}</span>
            </div>
          </button>

          {/* Know Your Candidates */}
          <button
            onClick={() => handleNavigate('/know-your-candidates')}
            className="w-full touch-button bg-secondary text-white hover:bg-secondary-dark shadow-xl"
            aria-label="View information about candidates in your area"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl" role="img" aria-label="people">
                👥
              </span>
              <span>{getTranslation('knowYourCandidates', currentLanguage)}</span>
            </div>
          </button>

          {/* Misinformation Game */}
          <button
            onClick={() => handleNavigate('/game')}
            className="w-full touch-button bg-amber-500 text-white hover:bg-amber-600 shadow-xl"
            aria-label="Learn to spot misinformation through an interactive game"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl" role="img" aria-label="shield">
                🛡️
              </span>
              <span>{getTranslation('spotMisinformation', currentLanguage)}</span>
            </div>
          </button>

          {/* Understanding Election Systems */}
          <button
            onClick={() => handleNavigate('/election-cycles')}
            className="w-full touch-button bg-indigo-500 text-white hover:bg-indigo-600 shadow-xl"
            aria-label="Learn about election systems in India"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl" role="img" aria-label="calendar">
                📅
              </span>
              <span>{getTranslation('electionCycles', currentLanguage)}</span>
            </div>
          </button>

          {/* Voter Help Assistant */}
          <button
            onClick={() => handleNavigate('/voter-help')}
            className="w-full touch-button bg-purple-500 text-white hover:bg-purple-600 shadow-xl"
            aria-label="Get answers to common voting questions"
          >
            <div className="flex items-center justify-center gap-4">
              <span className="text-4xl" role="img" aria-label="help">
                ❓
              </span>
              <span>{getTranslation('voterHelp', currentLanguage)}</span>
            </div>
          </button>
        </div>

        {/* Footer Notice */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral">
            {getTranslation('neutralPlatform', currentLanguage)}
          </p>
        </div>
      </main>
    </div>
  )
}

export default HomePage
