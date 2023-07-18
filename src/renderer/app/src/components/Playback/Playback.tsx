import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import cx from 'classnames'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { usePlayback } from '~/hooks/usePlayback'
import { useTrack } from '~/hooks/useTrack'

export const Playback = () => {
  const { playbackState, playOrPause, skipToNext, skipToPrevious } =
    usePlayback()
  const { displayTrack } = useTrack()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const isLyricsPage = pathname === '/lyrics'
  const { title, artistName, imageUrl } = displayTrack

  const goToLyricsPage = useCallback(() => {
    navigate(!isLyricsPage ? '/lyrics' : '/')
  }, [isLyricsPage, navigate])

  const micButtonClasses = cx('ml-3 text-neutral-300', {
    'hover:text-neutral-lighter': !isLyricsPage,
    'text-primary': isLyricsPage,
  })

  return (
    <div className='playback-container'>
      <div className='playback-track'>
        <img
          className='flex-shrink-0'
          src={imageUrl}
          alt={title}
          width={32}
          height={32}
        />
        <div className='flex flex-col overflow-hidden'>
          <span className='playback-track-name'>{title}</span>
          <span className='playback-track-artist'>{artistName}</span>
        </div>
      </div>
      <div className='playback-controls'>
        <Button
          aria-label='Previous Track'
          variant='transparent'
          onClick={skipToPrevious}
        >
          <Icon
            name='rewind'
            className='text-neutral-300 hover:text-neutral-lighter'
          />
        </Button>
        <Button
          aria-label={`${playbackState.isPlaying ? 'Pause' : 'Play'} Track`}
          variant='transparent'
          onClick={playOrPause}
        >
          <Icon
            name={playbackState.isPlaying ? 'pause' : 'play'}
            size='lg'
            className='text-neutral hover:text-white'
          />
        </Button>
        <Button
          aria-label='Next Track'
          variant='transparent'
          onClick={skipToNext}
        >
          <Icon
            name='fast-Forward'
            className='text-neutral-300 hover:text-neutral-lighter'
          />
        </Button>
        <Button
          variant='transparent'
          aria-label='Open Lyrics'
          onClick={goToLyricsPage}
          className={micButtonClasses}
        >
          <Icon name='mic-stage' size='sm' />
        </Button>
      </div>
    </div>
  )
}
