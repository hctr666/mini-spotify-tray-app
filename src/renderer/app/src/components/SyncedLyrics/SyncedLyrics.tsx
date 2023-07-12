import { usePlayback } from '~/hooks/usePlayback'
import { useSyncedLyrics } from '~/hooks/useSyncedLyrics'
import { Lyrics } from '~/types/lyrics'
import { SyncedLyricsLine } from './SyncedLyricsLine'

interface SyncedLyricsProps {
  lyrics?: Lyrics
}

// TODO: implement css animation based scroll into view
export const SyncedLyrics = ({ lyrics }: SyncedLyricsProps) => {
  const { playbackState, updateProgress } = usePlayback()
  const { progress, isPlaying } = playbackState
  const { activeLine, activeLineRef, lines } = useSyncedLyrics({
    isPlaying,
    lyrics,
    progress,
    updateProgress,
  })

  return (
    <div data-testid='synced-lyrics' className='synced-lyrics-container'>
      <div className='synced-lyrics-lines'>
        {lines.map(line => (
          <SyncedLyricsLine
            isActive={activeLine?.id === line.id}
            isPassed={line.passed}
            ref={activeLineRef}
            key={line.id}
          >
            {line.words}
          </SyncedLyricsLine>
        ))}
      </div>
    </div>
  )
}
