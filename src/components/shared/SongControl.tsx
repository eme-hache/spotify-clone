import { useState, useEffect, useRef } from 'react'

import { usePlayerStore } from '@/store/playerStore'

import { PlayMini, PauseMini } from '@/icons/react/PlayPause'
import { Repeat, RepeatOne } from '@/icons/react/Repeat'
import { Random } from '@/icons/react/Random'
import Range from '@/components/shared/Range'
import { Next } from '@/icons/react/Next'

enum RepeatMode {
  OFF = 0,
  ON = 1,
  ONCE = 2,
}

const SongControl = ({ audio }: { audio: React.RefObject<HTMLAudioElement> }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)

  const [isRepeating, setIsRepeating] = useState<RepeatMode>(0)
  const [repeatedTimes, setRepeatedTimes] = useState<number>(0)
  const [isRandom, setIsRandom] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<number>(0)

  useEffect(() => {
    const { playlist, song } = currentMusic

    if (song && audio.current) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`
      audio.current.src = src
      audio.current.volume = 0.2
      audio.current.play()
    }
  }, [currentMusic])

  useEffect(() => {
    isPlaying
      ? audio?.current?.play()
      : audio?.current?.pause()
  }, [isPlaying])

  useEffect(() => {
    audio.current?.addEventListener('ended', handleSkipSong)

    return () => {
      audio.current?.removeEventListener('ended', handleSkipSong)
    }
  })

  useEffect(() => {
    audio.current?.addEventListener('timeupdate', handleTimeUpdate)

    return () => {
      audio.current?.removeEventListener('timeupdate', handleTimeUpdate)
    }
  })

  const handleTimeUpdate = (): void => {
    if (!audio.current) return

    setCurrentTime(audio.current?.currentTime)
  }

  const handleTimeChange = (value: number): void => {
    if (!audio.current) return

    audio.current.currentTime = Number(value)
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const repeatSong = (): void => {
    if (!audio.current) return

    audio.current.currentTime = 0
    audio.current.play()
  }

  const handleRepeatType = (): void => {
    if (!audio.current) return

    switch (isRepeating) {
      case RepeatMode.OFF:
        setIsRepeating(RepeatMode.ON)
        break
      case RepeatMode.ON:
        setIsRepeating(RepeatMode.ONCE)
        break
      case RepeatMode.ONCE:
        setIsRepeating(RepeatMode.OFF)
        break
    }
  }

  const previousSong = (): void => {
    const currentIndex = currentMusic.songs.findIndex(song => song.id === currentMusic.song?.id)

    if (currentIndex === -1 || currentIndex === 0) return

    const prevIndex = (currentIndex - 1 + currentMusic.songs.length) % currentMusic.songs.length
    const prevSong = currentMusic.songs[prevIndex]

    setCurrentMusic({ songs: currentMusic.songs, playlist: currentMusic.playlist, song: prevSong })
  }

  const skipSong = (): void => {
    const currentIndex = currentMusic.songs.findIndex(song => song.id === currentMusic.song?.id)

    if (currentIndex === -1 || currentIndex === currentMusic.songs.length - 1) return

    const nextIndex = (currentIndex + 1) % currentMusic.songs.length
    const nextSong = currentMusic.songs[nextIndex]

    setCurrentMusic({ songs: currentMusic.songs, playlist: currentMusic.playlist, song: nextSong })
  }

  const handleSkipSong = (): void => {
    if (isRepeating === RepeatMode.ON || (isRepeating === RepeatMode.ONCE && repeatedTimes === 0)) {
      if (isRepeating === RepeatMode.ONCE) {
        setRepeatedTimes(repeatedTimes + 1)
      }

      repeatSong()
      return
    }

    setRepeatedTimes(0)
    skipSong()
  }

  const handleRandom = (): void => {
    setIsRandom(!isRandom)
  }

  const formatTime = (time: number): string => {
    if (time == null) return '00:00'

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className='max-w-[722px] w-[40%] flex flex-col justify-center gap-[6px] flex-1 pt-[1px]'>
      <div className='flex jutify-center gap-6 self-center'>
        <button
          onClick={handleRandom}
          className={`${isRandom
            ? 'text-button-active hover:text-button-active-hover after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-[4px] after:h-[4px] after:rounded-full after:bg-button-active'
            : 'text-subdued hover:text-base-white'}  cursor-default transition-colors duration-200 relative`}
        >
          <Random />
        </button>

        <button
          onClick={repeatSong}
          onDoubleClick={previousSong}
          className='text-subdued hover:text-base-white cursor-default transition-colors duration-200 rotate-180'
        >
          <Next />
        </button>

        <button className='bg-white rounded-full cursor-default p-2 text-black hover:scale-105' onClick={handlePlayPause}>
          {isPlaying ? <PauseMini /> : <PlayMini />}
        </button>

        <button
          onClick={skipSong}
          className='text-subdued hover:text-base-white cursor-default transition-colors duration-200'
        >
          <Next />
        </button>

        <button
          onClick={handleRepeatType}
          className={`${(isRepeating === RepeatMode.ON || isRepeating === RepeatMode.ONCE)
            ? 'text-button-active hover:text-button-active-hover after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-[4px] after:h-[4px] after:rounded-full after:bg-button-active'
            : 'text-subdued hover:text-base-white'} cursor-default transition-colors duration-200 relative`}
        >
          {(isRepeating === RepeatMode.OFF || isRepeating === RepeatMode.ON)
            ? <Repeat />
            : <RepeatOne />}
        </button>
      </div>

      <div className='flex items-center gap-2 flex-1'>
        <span className='text-xs text-subdued min-w-[40px] text-right'>
          {formatTime(currentTime)}
        </span>

        <Range
          min={0}
          max={(audio.current?.duration || 0)}
          value={currentTime}
          onChange={handleTimeChange}
        />

        <span className='text-xs text-subdued min-w-[40px]'>
          {formatTime(audio.current?.duration || 0)}
        </span>
      </div>
    </div>

  )
}

export default SongControl
