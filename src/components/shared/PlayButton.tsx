import { useCallback } from 'react'

import { usePlayerStore } from '@/store/playerStore'

import { Play, PlayMini, Pause, PauseMini } from '@/icons/react/PlayPause'

enum ButtonSize {
  mini = 'w-8 h-8',
  normal = 'w-12 h-12',
  large = 'w-14 h-14',
}

enum ButtonColor {
  green = 'bg-bright-accent',
  white = 'bg-white',
}

type Color = keyof typeof ButtonColor

type Size = keyof typeof ButtonSize

type PlayButtonProps = {
  id: string
  size: Size
  color: Color
}

const PlayButton: React.FC<PlayButtonProps> = ({ id, size, color }) => {
  const { isPlaying, currentMusic, setIsPlaying, setCurrentMusic } = usePlayerStore(state => state)
  
  const isPlayingPlaylist = isPlaying && currentMusic?.playlist?.id === id

  const handleClick = (): void => {
    if (isPlayingPlaylist) {
      setIsPlaying(false)
      return
    }

    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then(res => res.json())
      .then(data => {
        const { songs, playlist } = data

        setIsPlaying(true)
        setCurrentMusic({ songs, playlist, song: songs[0] })
      })
  }

  return (
    <button
      onClick={handleClick}
      className={`${ButtonColor[color]} ${ButtonSize[size]} hover:scale-105 shadow-md shadow-black/40 rounded-full flex items-center justify-center text-black cursor-default`}
    >
      {/* {isPlayingPlaylist.toString()} */}
      {isPlayingPlaylist
        ? size === 'mini'
          ? <PauseMini />
          : <Pause />
        : size === 'mini'
          ? <PlayMini />
          : <Play />}
    </button>
  )
}

export default PlayButton