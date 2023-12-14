import { useState } from 'react'

import Range from '@/components/shared/Range'

import { Muted, VolumeLow, VolumeMedium, VolumeHigh } from '@/icons/react/Volume'

type VolumeControlProps = {
  audio: React.RefObject<HTMLAudioElement>
}

const VolumeControl: React.FC<VolumeControlProps> = ({ audio }) => {
  const [prevVolume, setPrevVolume] = useState<number>(0.2)
  const [volume, setVolume] = useState<number>(0.2)

  const handleVolume = (value: number): void => {
    setPrevVolume(Number(value))
    setVolume(Number(value))
    
    if (!audio.current) return
    audio.current.volume = Number(value)
  }

  const handleMute = (): void => {
    if (!audio.current) return

    audio.current.volume = volume === 0 ? prevVolume : 0

    setVolume(prev => (prev === 0 ? prevVolume : 0))
  }

  return (
    <div className='flex items-center gap-2 group'>
      <button
        onClick={handleMute}
        className='text-subdued hover:text-base-white cursor-default transition-colors duration-200 hover:scale-105'
      >
        {volume < 0.01
          ? <Muted />
          : volume < 0.33
            ? <VolumeLow />
            : volume < 0.66
              ? <VolumeMedium />
              : <VolumeHigh />}
      </button>

      <div className='w-[93px]'>
        <Range
          value={volume}
          onChange={handleVolume}
        />
      </div>
    </div>
  )
}

export default VolumeControl
