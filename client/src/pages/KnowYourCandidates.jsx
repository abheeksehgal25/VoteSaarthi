import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAudio } from '../context/AudioContext'
import api from '../utils/api'
import { getTranslation, translateAssetRange, translateStateName, translateConstituencyName, translateEducation, formatPartyForAudio } from '../utils/translations'

const KnowYourCandidates = () => {
  const [states, setStates] = useState([])
  const [constituencies, setConstituencies] = useState([])
  const [candidates, setCandidates] = useState([])
  const [selectedState, setSelectedState] = useState('')
  const [selectedConstituency, setSelectedConstituency] = useState('')
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [expandedCandidate, setExpandedCandidate] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { speak, stopSpeaking, currentLanguage } = useAudio()

  useEffect(() => {
    const text = getTranslation('candidatesSubtitle', currentLanguage)
    speak(text, currentLanguage)
    fetchStates()
    
    // Cleanup: Stop speaking when component unmounts
    return () => {
      stopSpeaking()
    }
  }, [])

  const fetchStates = async () => {
    try {
      const response = await api.get('/api/states')
      setStates(response.data)
    } catch (error) {
      console.error('Error fetching states:', error)
      setStates([
        { _id: '1', name: 'Maharashtra' },
        { _id: '2', name: 'Karnataka' },
        { _id: '3', name: 'Tamil Nadu' },
        // Demo data - replace with API call
      ])
    }
  }

  const handleStateChange = async (stateId) => {
    setSelectedState(stateId)
    setSelectedConstituency('')
    setCandidates([])
    const text = getTranslation('loadingConstituencies', currentLanguage)
    speak(text, currentLanguage)
    
    try {
      const response = await api.get(`/api/constituencies?state=${stateId}`)
      setConstituencies(response.data)
    } catch (error) {
      console.error('Error fetching constituencies:', error)
      // Demo data
      setConstituencies([
        { _id: '1', name: 'Constituency 1' },
        { _id: '2', name: 'Constituency 2' },
      ])
    }
  }

  const handleConstituencyChange = async (constituencyId) => {
    setSelectedConstituency(constituencyId)
    setLoading(true)
    const text = getTranslation('loadingCandidates', currentLanguage)
    speak(text, currentLanguage)

    try {
      const response = await api.get(`/api/candidates?constituency=${constituencyId}`)
      console.log('✅ Candidates loaded:', response.data)
      setCandidates(response.data)
    } catch (error) {
      console.error('❌ Error fetching candidates:', error)
      console.error('Error details:', error.response?.data || error.message)
      // Demo data
      setCandidates([
        {
          _id: '1',
          name: 'Candidate A',
          party: 'Independent',
          symbol: '🌟',
          education: 'Graduate',
          criminalCases: false,
          assets: '₹10-20 Lakhs'
        },
        {
          _id: '2',
          name: 'Candidate B',
          party: 'Independent',
          symbol: '🏠',
          education: 'Post Graduate',
          criminalCases: true,
          assets: '₹1-5 Crores'
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate)
    
    // Create comprehensive audio narration
    const isHindi = currentLanguage === 'hi-IN'
    const candidateName = isHindi && candidate.nameHi ? candidate.nameHi : candidate.name
    const partyName = formatPartyForAudio(candidate.party, currentLanguage)
    
    // Build the narration
    let narration = []
    
    // Name and party
    if (isHindi) {
      narration.push(`${candidateName}, ${partyName} पार्टी से`)
    } else {
      narration.push(`${candidateName}, from ${partyName} party`)
    }
    
    // Age
    if (candidate.age) {
      narration.push(isHindi ? `उम्र ${candidate.age} साल` : `Age ${candidate.age} years`)
    }
    
    // Education
    const education = translateEducation(candidate.education, currentLanguage)
    narration.push(isHindi ? `शिक्षा: ${education}` : `Education: ${education}`)
    
    // Criminal cases
    if (candidate.criminalCases > 0) {
      narration.push(isHindi ? `${candidate.criminalCases} आपराधिक मामले हैं` : `Has ${candidate.criminalCases} criminal case${candidate.criminalCases > 1 ? 's' : ''}`)
    } else {
      narration.push(isHindi ? 'कोई आपराधिक मामला नहीं है' : 'No criminal cases')
    }
    
    // Assets
    const assets = translateAssetRange(candidate.assets, currentLanguage)
    narration.push(isHindi ? `संपत्ति: ${assets}` : `Assets: ${assets}`)
    
    // Liabilities
    const liabilities = translateAssetRange(candidate.liabilities, currentLanguage)
    narration.push(isHindi ? `देनदारियां: ${liabilities}` : `Liabilities: ${liabilities}`)
    
    // Previous positions if available
    if (candidate.previousPositions && candidate.previousPositions.length > 0) {
      if (isHindi) {
        narration.push(`पिछले पद: ${candidate.previousPositions.join(', ')}`)
      } else {
        narration.push(`Previous positions: ${candidate.previousPositions.join(', ')}`)
      }
    }
    
    const fullNarration = narration.join('. ')
    speak(fullNarration, currentLanguage)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-2">
            {getTranslation('candidatesTitle', currentLanguage)}
          </h1>
        </div>

        {/* Selection Section */}
        <div className="card-elevated mb-8">
          <h2 className="text-touch-xl font-bold mb-6">{currentLanguage === 'hi-IN' ? 'अपना क्षेत्र चुनें' : 'Select Your Area'}</h2>
          
          {/* State Selector */}
          <div className="mb-6">
            <label className="block text-touch-lg font-semibold mb-3">
              {getTranslation('selectState', currentLanguage)}
            </label>
            <select
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full touch-button bg-white border-2 border-gray-300 text-neutral-dark"
              aria-label="Select your state"
            >
              <option value="">{getTranslation('chooseState', currentLanguage)}</option>
              {states.map((state) => (
                <option key={state._id} value={state._id}>
                  {translateStateName(state.name, currentLanguage)}
                </option>
              ))}
            </select>
          </div>

          {/* Constituency Selector */}
          {constituencies.length > 0 && (
            <div className="mb-6">
              <label className="block text-touch-lg font-semibold mb-3">
                {getTranslation('selectConstituency', currentLanguage)}
              </label>
              <select
                value={selectedConstituency}
                onChange={(e) => handleConstituencyChange(e.target.value)}
                className="w-full touch-button bg-white border-2 border-gray-300 text-neutral-dark"
                aria-label="Select your constituency"
              >
                <option value="">{getTranslation('chooseConstituency', currentLanguage)}</option>
                {constituencies.map((constituency) => (
                  <option key={constituency._id} value={constituency._id}>
                    {translateConstituencyName(constituency.name, currentLanguage)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Candidates Grid */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-touch-lg">Loading candidates...</p>
          </div>
        )}

        {candidates.length > 0 && (
          <div>
            <div className="mb-4">
              <p className="text-touch-base text-neutral">
                {getTranslation('allCandidatesEqual', currentLanguage)}
              </p>
            </div>
            
            <div className="space-y-4">
              {candidates.map((candidate, index) => (
                <div key={candidate._id || `candidate-${index}`} className="card-elevated bg-white">
                  <button
                    onClick={() => {
                      if (expandedCandidate === candidate._id) {
                        setExpandedCandidate(null)
                      } else {
                        setExpandedCandidate(candidate._id)
                        handleCandidateClick(candidate)
                      }
                    }}
                    className="w-full text-left"
                    aria-label={`View details for ${candidate.name}`}
                  >
                    {/* Candidate Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-6xl" role="img">
                          {candidate.symbol}
                        </span>
                        <div>
                          <h3 className="text-touch-xl font-bold">
                            {currentLanguage === 'hi-IN' && candidate.nameHi ? candidate.nameHi : candidate.name}
                          </h3>
                          <p className="text-touch-base text-neutral">{candidate.party}</p>
                          {candidate.age && <p className="text-touch-sm text-neutral">{getTranslation('age', currentLanguage)}: {candidate.age}</p>}
                        </div>
                      </div>
                      <div className="text-2xl mt-2">
                        {expandedCandidate === candidate._id ? '▲' : '▼'}
                      </div>
                    </div>

                    {/* Basic Info - Always Visible */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-touch-sm text-neutral block">{getTranslation('education', currentLanguage)}:</span>
                        <span className="text-touch-base font-semibold">{translateEducation(candidate.education, currentLanguage)}</span>
                      </div>
                      <div>
                        <span className="text-touch-sm text-neutral block">{getTranslation('criminalCases', currentLanguage)}:</span>
                        <span className={`text-touch-base font-semibold ${candidate.criminalCases > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {candidate.criminalCases > 0 ? `${candidate.criminalCases} ${currentLanguage === 'hi-IN' ? 'मामले' : 'case'}${candidate.criminalCases > 1 && currentLanguage === 'en-IN' ? 's' : ''}` : getTranslation('noCriminalCases', currentLanguage)}
                        </span>
                      </div>
                      <div>
                        <span className="text-touch-sm text-neutral block">{getTranslation('assets', currentLanguage)}:</span>
                        <span className="text-touch-base font-semibold">{translateAssetRange(candidate.assets, currentLanguage)}</span>
                      </div>
                      <div>
                        <span className="text-touch-sm text-neutral block">{getTranslation('liabilities', currentLanguage)}:</span>
                        <span className="text-touch-base font-semibold">{translateAssetRange(candidate.liabilities, currentLanguage)}</span>
                      </div>
                      {candidate.age && (
                        <div>
                          <span className="text-touch-sm text-neutral block">{getTranslation('age', currentLanguage)}:</span>
                          <span className="text-touch-base font-semibold">{candidate.age}</span>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {expandedCandidate === candidate._id && (
                    <div className="pt-4 border-t border-neutral/20 space-y-6">
                      {/* Previous Positions */}
                      {candidate.previousPositions && candidate.previousPositions.length > 0 && (
                        <div>
                          <h4 className="text-touch-lg font-bold mb-3 flex items-center gap-2">
                            <span>📜</span>
                            <span>{getTranslation('previousPositions', currentLanguage)}</span>
                          </h4>
                          <ul className="list-disc list-inside space-y-2 pl-4">
                            {candidate.previousPositions.map((position, idx) => (
                              <li key={idx} className="text-touch-base text-neutral">{position}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Key Issues & Stance */}
                      {candidate.keyIssues && candidate.keyIssues.length > 0 && (
                        <div>
                          <h4 className="text-touch-lg font-bold mb-3 flex items-center gap-2">
                            <span>🎯</span>
                            <span>{getTranslation('keyIssues', currentLanguage)}</span>
                          </h4>
                          <div className="space-y-3">
                            {candidate.keyIssues.map((item, idx) => (
                              <div key={idx} className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                <p className="text-touch-base font-bold mb-1">{item.issue}</p>
                                <p className="text-touch-base text-neutral">{item.stance}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Manifesto */}
                      {candidate.manifesto && (
                        <div>
                          <h4 className="text-touch-lg font-bold mb-3 flex items-center gap-2">
                            <span>📋</span>
                            <span>{getTranslation('manifesto', currentLanguage)}</span>
                          </h4>
                          <p className="text-touch-base text-neutral bg-gray-50 p-4 rounded-lg">{candidate.manifesto}</p>
                        </div>
                      )}

                      {/* Contact Information */}
                      {candidate.contactInfo && (
                        <div>
                          <h4 className="text-touch-lg font-bold mb-3 flex items-center gap-2">
                            <span>📞</span>
                            <span>{getTranslation('contactInfo', currentLanguage)}</span>
                          </h4>
                          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                            {candidate.contactInfo.phone && (
                              <p className="text-touch-base flex items-center gap-2">
                                <span className="font-semibold">Phone:</span>
                                <span>{candidate.contactInfo.phone}</span>
                              </p>
                            )}
                            {candidate.contactInfo.email && (
                              <p className="text-touch-base flex items-center gap-2">
                                <span className="font-semibold">Email:</span>
                                <span className="break-all">{candidate.contactInfo.email}</span>
                              </p>
                            )}
                            {candidate.contactInfo.website && (
                              <p className="text-touch-base flex items-center gap-2">
                                <span className="font-semibold">Website:</span>
                                <span className="break-all">{candidate.contactInfo.website}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Social Media */}
                      {candidate.socialMedia && (candidate.socialMedia.twitter || candidate.socialMedia.facebook) && (
                        <div>
                          <h4 className="text-touch-lg font-bold mb-3 flex items-center gap-2">
                            <span>📱</span>
                            <span>{getTranslation('socialMedia', currentLanguage)}</span>
                          </h4>
                          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                            {candidate.socialMedia.twitter && (
                              <p className="text-touch-base flex items-center gap-2">
                                <span className="font-semibold">Twitter:</span>
                                <span>{candidate.socialMedia.twitter}</span>
                              </p>
                            )}
                            {candidate.socialMedia.facebook && (
                              <p className="text-touch-base flex items-center gap-2">
                                <span className="font-semibold">Facebook:</span>
                                <span>{candidate.socialMedia.facebook}</span>
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Neutral Notice */}
        {candidates.length > 0 && (
          <div className="mt-8 card-elevated bg-yellow-50">
            <p className="text-touch-base text-center">
              ℹ️ {getTranslation('platformDisclaimer', currentLanguage)}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default KnowYourCandidates
