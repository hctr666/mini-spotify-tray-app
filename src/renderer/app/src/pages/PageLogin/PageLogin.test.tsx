import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Navigate } from 'react-router-dom'

import { useAuth } from '~/hooks/useAuth/useAuth'
import { Page } from '~/components'
import { PageLogin } from './PageLogin'

jest
  .mock('react-router-dom')
  .mock('~/hooks/useAuth/useAuth', () => ({
    useAuth: jest.fn(),
  }))
  .mock('~/components', () => {
    const Page = jest.fn(props => <div>{props.children}</div>)
    const Content = jest.fn(props => <div>{props.children}</div>)

    return { Page: Object.assign(Page, { Content }) }
  })

const mockedUseAuth = useAuth as jest.Mock

const getSignInButton = () =>
  screen.getByText('Sign in', { selector: 'button' })

describe('<PageLogin />', () => {
  it('renders the component when not authenticated', () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: false })

    render(<PageLogin />)

    expect(Navigate).not.toHaveBeenCalled()
    expect(Page).toHaveBeenCalledWith({ children: expect.any(Object) }, {})
    expect(Page.Content).toHaveBeenCalledWith(
      {
        noHeader: true,
        children: expect.any(Object),
      },
      {}
    )
    expect(screen.getByText('Please sign in to enjoy the app')).toBeVisible()
    expect(getSignInButton()).toBeVisible()
  })

  it('handles sign-in button click', () => {
    render(<PageLogin />)

    userEvent.click(getSignInButton())

    expect(window.Auth.signIn).toHaveBeenCalled()
  })

  it('redirects to home when authenticated', () => {
    mockedUseAuth.mockReturnValue({ isAuthenticated: true })

    render(<PageLogin />)

    expect(Navigate).toHaveBeenCalledWith({ to: '/' }, {})
  })
})
