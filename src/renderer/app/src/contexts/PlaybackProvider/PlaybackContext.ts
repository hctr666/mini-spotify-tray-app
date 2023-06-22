import { createContext } from 'react'

import { PlaybackContextValue } from '~/types/playback'

export const initialPlaybackState = {
  isPlaying: false,
  isInactive: true,
  progress: 0,
  trackId: '',
  imageUrl: '',
  deviceId: '',
}

export const PlaybackContext = createContext<PlaybackContextValue>({
  hasNewTrack: false,
  playbackState: initialPlaybackState,
  fetchPlaybackState: () => Promise.resolve(),
  playOrPause: () => Promise.resolve(),
  skipToNext: () => Promise.resolve(),
  skipToPrevious: () => Promise.resolve(),
  updateProgress: () => {},
  updatePlaybackState: () => {},
})
