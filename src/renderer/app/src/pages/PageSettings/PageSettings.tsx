import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Page } from '~/components'
import { useLyricsServiceState } from '~/hooks/useLyricsServiceState/useLyricsServiceState'
import { Button } from '~/components/Button'
import { Icon } from '~/components/Icon/Icon'

export const PageSettings = () => {
  const { isConnected } = useLyricsServiceState()
  const navigate = useNavigate()

  const handleSignOut = () => {
    window.Auth.signOut()
  }

  const handleLyricsConnect = useCallback(() => {
    window.LyricsService.connect()
  }, [])

  const handleCloseClick = () => {
    navigate('/')
  }

  const lyricsServiceStatusContent = useMemo(() => {
    if (isConnected) {
      return (
        <>
          <Icon name='circle' size='xxs' className='text-success' />
          <span>Lyrics service: connected</span>
        </>
      )
    }

    return (
      <>
        <Icon name='circle' size='xxs' className='text-error' />
        <span>Lyrics service: disconnected</span>
        <Button
          variant='transparent'
          title='Connect to service'
          onClick={handleLyricsConnect}
        >
          <Icon
            name='plug'
            size='xxs'
            className='text-neutral hover:text-white'
          />
        </Button>
      </>
    )
  }, [isConnected, handleLyricsConnect])

  return (
    <Page>
      <div className='flex flex-col gap-4 h-full items-center justify-center w-full relative'>
        <div className='absolute top-3 right-2'>
          <Button onClick={handleCloseClick} variant='transparent'>
            <Icon name='outline-x' className='text-gray-300' />
          </Button>
        </div>
        <div className='text-gray-300 flex items-center gap-2 text-sm'>
          {lyricsServiceStatusContent}
        </div>
        <Button variant='primary' rounded onClick={handleSignOut}>
          Sign out
        </Button>
      </div>
    </Page>
  )
}
