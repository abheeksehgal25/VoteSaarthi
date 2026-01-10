import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AudioProvider } from './context/AudioContext'
import HomePage from './pages/HomePage'
import HowVotingWorks from './pages/HowVotingWorks'
import KnowYourCandidates from './pages/KnowYourCandidates'
import MisinformationGame from './pages/MisinformationGame'
import VoterHelpAssistant from './pages/VoterHelpAssistant'

function App() {
  return (
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-voting-works" element={<HowVotingWorks />} />
          <Route path="/candidates" element={<KnowYourCandidates />} />
          <Route path="/know-your-candidates" element={<KnowYourCandidates />} />
          <Route path="/game" element={<MisinformationGame />} />
          <Route path="/voter-help" element={<VoterHelpAssistant />} />
        </Routes>
      </Router>
    </AudioProvider>
  )
}

export default App
