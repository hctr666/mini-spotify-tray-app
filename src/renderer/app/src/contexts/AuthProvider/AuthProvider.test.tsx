import { act, render, screen } from '@testing-library/react'

import { AuthProvider } from './AuthProvider'
import { useAuth } from '~/hooks/useAuth/useAuth'

const TestComponent = () => {
  const { isAuthenticated, isLoading } = useAuth()

  return (
    <div data-testid='test-component'>
      {isAuthenticated && 'Authenticated'}
      {isLoading && 'Loading'}
    </div>
  )
}

let mockedAuthSubscribeListener = jest.fn()

window.Auth.subscribe = jest.fn(listener => {
  mockedAuthSubscribeListener = listener as jest.Mock

  return () => listener
})

describe('<AuthProvider />', () => {
  it('renders the component', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('test-component')).toBeVisible()
    expect(screen.queryByText('Authenticated')).not.toBeInTheDocument()
    expect(screen.getByText('Loading')).toBeVisible()
  })

  it('handles when state subscription is emitted', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    act(() => {
      window.Auth.subscribe(
        mockedAuthSubscribeListener({}, { isAuthenticated: true })
      )
    })

    expect(window.Core.log).toHaveBeenCalledWith(
      JSON.stringify({
        source: 'renderer/app',
        state: { isAuthenticated: true },
      }),
      'info'
    )
    expect(screen.getByTestId('test-component')).toBeVisible()
    expect(screen.getByText('Authenticated')).toBeVisible()
    expect(screen.queryByText('Loading')).not.toBeInTheDocument()
  })
})
