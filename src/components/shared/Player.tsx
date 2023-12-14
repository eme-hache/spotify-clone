import { useState, useRef, useEffect } from 'react'

import VolumeControl from '@/components/shared/VolumeControl'
import SongControl from '@/components/shared/SongControl'

import { usePlayerStore } from '@/store/playerStore'

import { PictureInPicture } from '@/icons/react/PictureInPicture'
import { Heart, HeartOutline } from '@/icons/react/Heart'

import { NowPlaying } from '@/icons/react/NowPlaying'
import { FullScreen } from '@/icons/react/FullScreen'

import { Lyrics } from '@/icons/react/Lyrics'
import { Device } from '@/icons/react/Device'
import { Queue } from '@/icons/react/Queue'

const Player = () => {
  const { currentMusic } = usePlayerStore(state => state)

  const [isFavorite, setIsFavorite] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFavorite = (): void => {
    setIsFavorite(!isFavorite)
  }

  return (
    <section className='flex w-full px-2 z-50'>
      <div className='min-w-[180px] w-[30%] flex gap-4 items-center'>
        <picture className='h-14 w-14 flex-none'>
          <img
            src={currentMusic?.song?.image}
            alt={`Cover of ${currentMusic?.song?.album}`}
            className='object-cover w-full h-full rounded'
          />
        </picture>

        <div className='flex justify-center flex-col'>
          <p className='text-sm font-medium'>{currentMusic?.song?.title}</p>
          <p className='text-xs text-subdued'>{currentMusic?.song?.artists.join(', ')}</p>
        </div>

        <button onClick={handleFavorite} className={`${isFavorite ? 'text-bright-accent' : 'text-subdued hover:text-base-white'} transition-colors duration-200`}>
          {isFavorite ? <Heart /> : <HeartOutline />}
        </button>
      </div>

      <SongControl audio={audioRef} /> 

      <div className='min-w-[180px] w-[30%] flex items-center justify-end gap-4'>
        <button className='text-subdued hover:text-base-white hover:cursor-pointer transition-colors duration-200 hover:scale-105'>
          <NowPlaying />
        </button>

        <button className='text-subdued hover:text-base-white hover:cursor-pointer transition-colors duration-200 hover:scale-105'>
          <Lyrics />
        </button>

        <button className='text-subdued hover:text-base-white hover:cursor-pointer transition-colors duration-200 hover:scale-105'>
          <Queue />
        </button>

        <button className='text-subdued hover:text-base-white cursor-default transition-colors duration-200 hover:scale-105'>
          <Device />
        </button>

        <VolumeControl audio={audioRef} />

        <button className='text-subdued hover:text-base-white hover:cursor-pointer transition-colors duration-200 hover:scale-105'>
          <PictureInPicture />
        </button>

        <button className='text-subdued hover:text-base-white hover:cursor-pointer transition-colors duration-200 hover:scale-105'>
          <FullScreen />
        </button>
      </div>

      <audio ref={audioRef} />
    </section>
  )
}

export default Player