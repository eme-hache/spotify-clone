import { create } from 'zustand'

import type { PlayerStore } from '@/utils/types'

export const usePlayerStore = create<PlayerStore>(set => ({
  isPlaying: false,
  currentMusic: {
    playlist: null,
    song: null,
    songs: []
  },
  setIsPlaying: (isPlaying: boolean) => set({ isPlaying }),
  setCurrentMusic: (currentMusic: any) => set({ currentMusic }),
}))