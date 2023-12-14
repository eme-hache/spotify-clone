import { colors } from '@/lib/colors'

export type PlayerStore = {
  isPlaying: boolean
  currentMusic: {
    playlist: Playlist | null
    song: Song | null
    songs: Song[]
  }
  setIsPlaying: (isPlaying: boolean) => void
  setCurrentMusic: (currentMusic: any) => void
}

export interface Playlist {
  id: string
  albumId: number
  title: string
  color: (typeof colors)[keyof typeof colors]
  cover: string
  artists: string[]
}

export interface Song {
  id: number
  albumId: number
  title: string
  image: string
  artists: string[]
  album: string
  duration: string
}