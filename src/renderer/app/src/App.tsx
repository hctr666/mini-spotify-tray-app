import { HashRouter as Router, Route, Routes } from 'react-router-dom'

import {
  AuthProvider,
  LyricsProvider,
  LyricsServiceStateProvider,
  PlaybackProvider,
  TrackProvider,
} from './contexts'
import {
  NotificationContainer,
  PlaybackLayout,
  ProtectedRouteElement,
} from './components'
import { PageHome, PageLogin, PageLyrics, PageSettings } from './pages'

const PageLyricsRoot = () => (
  <LyricsProvider>
    <PageLyrics />
  </LyricsProvider>
)

function App() {
  return (
    <Router>
      <AuthProvider>
        <LyricsServiceStateProvider>
          <PlaybackProvider>
            <TrackProvider>
              <Routes>
                <Route path='/login' element={<PageLogin />} />
                <Route
                  path='/'
                  element={
                    <ProtectedRouteElement element={<PlaybackLayout />} />
                  }
                >
                  <Route
                    index
                    element={<ProtectedRouteElement element={<PageHome />} />}
                  />
                  <Route
                    path='/lyrics'
                    element={
                      <ProtectedRouteElement element={<PageLyricsRoot />} />
                    }
                  />
                </Route>
                <Route
                  path='/settings'
                  element={<ProtectedRouteElement element={<PageSettings />} />}
                />
              </Routes>
            </TrackProvider>
          </PlaybackProvider>
        </LyricsServiceStateProvider>
      </AuthProvider>
      <NotificationContainer />
    </Router>
  )
}

export default App
