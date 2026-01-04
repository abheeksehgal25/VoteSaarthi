import { useAudio } from '../context/AudioContext'

const AudioToggle = () => {
  const { isAudioEnabled, toggleAudio } = useAudio()

  return (
    <button
      onClick={toggleAudio}
      className={`touch-target rounded-xl px-4 py-2 font-semibold transition-colors ${
        isAudioEnabled 
          ? 'bg-secondary text-white' 
          : 'bg-gray-300 text-gray-600'
      }`}
      aria-label={isAudioEnabled ? 'Turn audio off' : 'Turn audio on'}
      aria-pressed={isAudioEnabled}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl" role="img" aria-label="audio">
          {isAudioEnabled ? '🔊' : '🔇'}
        </span>
        <span className="text-touch-base">Audio</span>
      </div>
    </button>
  )
}

export default AudioToggle
