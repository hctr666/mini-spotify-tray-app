import { LyricsNotConnected, LyricsViewer } from '~/components'
import { useLyricsServiceState } from '~/hooks/useLyricsServiceState/useLyricsServiceState'

export const PageLyrics = () => {
  const lyricsService = useLyricsServiceState()

  if (lyricsService.isConnected) {
    return <LyricsViewer />
  }

  return <LyricsNotConnected />
}
