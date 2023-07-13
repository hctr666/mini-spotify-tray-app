import { Navigate } from 'react-router-dom'

import { Button, Page } from '~/components'
import { useAuth } from '~/hooks/useAuth/useAuth'

export const PageLogin = () => {
  const { isAuthenticated } = useAuth()

  const handleSignIn = () => {
    window.Auth.signIn()
  }

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  return (
    <Page>
      <Page.Content noHeader>
        <div className='flex flex-col gap-4 h-full items-center justify-center w-full relative'>
          <div className='headline'>Please sign in to enjoy the app</div>
          <Button variant='primary' rounded onClick={handleSignIn}>
            Sign in
          </Button>
        </div>
      </Page.Content>
    </Page>
  )
}
