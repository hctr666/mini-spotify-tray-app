import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Page } from '~/components'
import { LyricsViewer } from '~/components/LyricsViewer'
import { Playback } from '~/components/Playback'
import { usePlayback } from '~/hooks/usePlayback'
import { useLyricsServiceState } from '~/hooks/useLyricsServiceState/useLyricsServiceState'
import { PlaybackInactiveMessage } from '~/components/PlaybackInactiveMessage'
import { LyricsNotConnected } from '~/components/LyricsNotConnected'
import { LyricsProvider } from '~/contexts/LyricsProvider'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon/Icon'

export const PageHome = () => {
  const navigate = useNavigate()
  const { playbackState: playback } = usePlayback()
  const lyricsService = useLyricsServiceState()

  const handleSettingsClick = () => {
    navigate('/settings')
  }

  const pageContent = useMemo(() => {
    if (playback.isInactive) {
      return <PlaybackInactiveMessage />
    }

    return (
      <>
        {lyricsService.isConnected ? (
          <LyricsProvider>
            <LyricsViewer />
          </LyricsProvider>
        ) : (
          <LyricsNotConnected />
        )}
        <Playback />
      </>
    )
  }, [lyricsService, playback])

  return (
    <Page>
      <Page.Header>
        <div className='fixed top-3 right-2'>
          <Button variant='transparent' onClick={handleSettingsClick}>
            <Icon name='outline-cog' className='text-gray-200' />
          </Button>
        </div>
      </Page.Header>
      <Page.Content noHeader noPaddingX>
        {pageContent}
      </Page.Content>
    </Page>
  )
}
