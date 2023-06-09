import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import { PageLogin } from './pages/PageLogin'
import { AuthStateProvider } from './contexts/AuthStateProvider'
import { PageHome } from './pages/PageHome/PageHome'
import { LyricsServiceProvider } from './contexts/LyricsServiceProvider'
import { TrackServiceProvider } from './contexts/TrackServiceProvider'
import { PageSettings } from './pages/PageSettings'
import { PlaybackStateProvider } from './contexts/PlaybackStateProvider/PlaybackStateProvider'
import { NotificationContainer } from './components/NotificationContainer'
import { ProtectedRouteElement } from './components/ProtectedRouteElement'

function App() {
  return (
    <Router>
      <AuthStateProvider>
        <LyricsServiceProvider>
          <PlaybackStateProvider>
            <TrackServiceProvider>
              <Routes>
                <Route path='/login' element={<PageLogin />} />
                <Route
                  path='/settings'
                  element={<ProtectedRouteElement element={<PageSettings />} />}
                />
                <Route
                  path='/'
                  element={<ProtectedRouteElement element={<PageHome />} />}
                />
              </Routes>
            </TrackServiceProvider>
          </PlaybackStateProvider>
        </LyricsServiceProvider>
      </AuthStateProvider>
      <NotificationContainer />
    </Router>
  )
}

export default App
