import type { IpcRendererEvent } from 'electron'
import type { AuthState } from '../contexts/AuthStateProvider/AuthStateContext'
import type { Lyrics, LyricsColors } from './track-lyrics'
import type { PlaybackState } from './playback-state'
import type { LyricsServiceState } from './lyrics-service'

declare global {
  type ElectronRendererListener<T> = (event: IpcRendererEvent, value: T) => void
  type UnsubscribeFunction = () => void
  type LogPayload = string | Record<string, string>
  type AuthStateListener = ElectronRendererListener<AuthState>
  type LyricsServiceStateListener = ElectronRendererListener<LyricsServiceState>
  type RGBObject = {
    r: string
    g: string
    b: string
  }

  type TrackLyricsRequestListener = (
    event: IpcRendererEvent,
    value: {
      lyrics: Lyrics
      colors: LyricsColors
    },
    error: string
  ) => void

  type PlaybackStateListener = ElectronRendererListener<PlaybackState>

  interface Window {
    Auth: {
      signIn: () => void
      signOut: () => void
      subscribe: (listener: AuthStateListener) => UnsubscribeFunction
    }
    Core: {
      log: (payload: LogPayload, level: 'info' | 'error') => void
      isDev: () => boolean
    }
    LyricsService: {
      connect: () => void
      requestServiceState: () => void
      subscribeOnServiceState: (
        listener: LyricsServiceStateListener
      ) => UnsubscribeFunction
    }
    Track: {
      requestLyrics: (trackId: string, imageUrl: string) => void
      subscribeOnLyrics: (
        listener: TrackLyricsRequestListener
      ) => UnsubscribeFunction
    }
    PlaybackState: {
      getState: () => Promise<PlaybackState>
      subscribeOnState: (listener: PlaybackStateListener) => UnsubscribeFunction
    }
  }
}
