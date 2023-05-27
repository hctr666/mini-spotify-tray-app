const { contextBridge, ipcRenderer } = require('electron')

const {
  SLA_LYRICS_CONNECTION_STATUS,
  SLA_SHOW_APP_WINDOW,
  SLA_PLAYBACK_STATE_CHANGE,
} = require('../main/constants/ipc-main-channels')
const {
  SLA_LYRICS_WEB_LOGIN_INVOKED,
} = require('../main/constants/ipc-renderer-channels')

require('./core')

contextBridge.exposeInMainWorld('SpotifyWeb', {
  sendLyricsConnectionStatus: status =>
    ipcRenderer.invoke(SLA_LYRICS_CONNECTION_STATUS, status),
  subscribeOnLoginInvoked: listener => {
    ipcRenderer.addListener(SLA_LYRICS_WEB_LOGIN_INVOKED, listener)

    return () =>
      ipcRenderer.removeListener(SLA_LYRICS_WEB_LOGIN_INVOKED, listener)
  },
  showAppWindow: () => ipcRenderer.send(SLA_SHOW_APP_WINDOW),
  subscribeOnPlaybackStateChange: listener => {
    ipcRenderer.addListener(SLA_PLAYBACK_STATE_CHANGE, listener)

    return () => ipcRenderer.removeListener(SLA_PLAYBACK_STATE_CHANGE, listener)
  },
  fetchLyricsMockAPI: () => require('../../api-mocks/lyrics-mock.json'),
})
