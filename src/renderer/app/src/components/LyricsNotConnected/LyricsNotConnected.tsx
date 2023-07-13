import { Button } from '~/components/Button'
import { Icon } from '../Icon/Icon'

export const LyricsNotConnected = () => {
  const handleLyricsConnect = () => {
    window.LyricsService.connect()
  }

  return (
    <div className='flex items-center h-full justify-center flex-col gap-2 text-md'>
      <span className='block text-warning'>
        Lyrics service is not connected
      </span>
      <Button variant='transparent' onClick={handleLyricsConnect}>
        <span className='text-neutral hover:text-white flex items-center'>
          Connect <Icon name='plug' size='xxs' className='ml-2' />
        </span>
      </Button>
    </div>
  )
}
