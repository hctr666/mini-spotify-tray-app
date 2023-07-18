import { useMemo } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import {
  Button,
  Icon,
  Page,
  Playback,
  PlaybackInactiveMessage,
} from '~/components'
import { usePlayback } from '~/hooks/usePlayback'

export const PlaybackLayout = () => {
  const navigate = useNavigate()
  const { playbackState: playback } = usePlayback()

  const handleSettingsClick = () => {
    navigate('/settings')
  }

  const pageContent = useMemo(() => {
    if (playback.isInactive) {
      return <PlaybackInactiveMessage />
    }

    return (
      <>
        <Outlet />
        <Playback />
      </>
    )
  }, [playback])

  return (
    <Page>
      <Page.Header>
        <div className='fixed top-3 right-2'>
          <Button
            variant='transparent'
            onClick={handleSettingsClick}
            aria-label='Settings'
          >
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
