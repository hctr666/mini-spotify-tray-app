import { Link, useLocation } from 'react-router-dom'
import cx from 'classnames'

import { Button } from '../Button'
import { Icon } from '../Icon'
import { usePlayback } from '~/hooks/usePlayback'
import { useTrack } from '~/hooks/useTrack'
import { AlbumImage } from '../AlbumImage'

export const Playback = () => {
  const { playbackState, playOrPause, skipToNext, skipToPrevious } =
    usePlayback()
  const { displayTrack } = useTrack()
  const { pathname } = useLocation()

  const isLyricsPage = pathname === '/lyrics'
  const { title, artistName, imageUrl } = displayTrack

  const lyricsLinkClasses = cx('ml-3 text-neutral-300 flex items-center', {
    'hover:text-neutral-lighter': !isLyricsPage,
    'text-primary': isLyricsPage,
  })

  const lyricsLinkPath = !isLyricsPage ? '/lyrics' : '/'

  return (
    <div className='playback-container'>
      <div className='playback-track-info'>
        <AlbumImage className='flex-shrink-0' src={imageUrl} alt={title} />
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
        <Link
          to={lyricsLinkPath}
          title='Go to Lyrics'
          className={lyricsLinkClasses}
        >
          <Icon name='mic-stage' size='sm' />
        </Link>
      </div>
    </div>
  )
}
