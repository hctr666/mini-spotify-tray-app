const { ipcMain } = require('electron')
const {
  SLA_LYRICS_CONNECT,
  SLA_AUTH_SIGN_OUT,
  SLA_AUTH_SIGN_IN,
  SLA_LYRICS_SERVICE_STATE_REPLY,
  SLA_LOG,
  SLA_LYRICS_CONNECT_REQUEST,
  SLA_LYRICS_SERVICE_STATE_REQUEST,
  SLA_TRACK_LYRICS_REQUEST,
  SLA_TRACK_LYRICS_REPLY,
  SLA_GET_PLAYBACK_STATE,
} = require('./constants/ipc-channels')

// TODO: create a "send-to-window" reusable helper function

const initializeIpcEvents = () => {
  ipcMain.on(SLA_LYRICS_CONNECT, async () => {
    const spotifyWebWindow = global.spotifyWebWindow.getInstance()

    if (spotifyWebWindow) {
      spotifyWebWindow.webContents.send(SLA_LYRICS_CONNECT_REQUEST)
    }
  })

  ipcMain.on(SLA_AUTH_SIGN_OUT, () => {
    global.authService.logout()
  })

  ipcMain.on(SLA_AUTH_SIGN_IN, async () => {
    global.authWindow.create()
  })

  ipcMain.on(SLA_LYRICS_SERVICE_STATE_REQUEST, () => {
    /** @type {Electron.BrowserWindow | null} */
    const spotifyWebWindow = global.spotifyWebWindow.getInstance()

    if (spotifyWebWindow) {
      spotifyWebWindow.webContents.send(SLA_LYRICS_SERVICE_STATE_REQUEST)
    }
  })

  ipcMain.on(SLA_LYRICS_SERVICE_STATE_REPLY, (_event, status) => {
    /** @type {Electron.BrowserWindow | null} */
    const appWindow = global.appWindow.getInstance()

    if (appWindow) {
      appWindow.webContents.send(SLA_LYRICS_SERVICE_STATE_REPLY, status)
    }
  })

  ipcMain.handle(SLA_TRACK_LYRICS_REQUEST, async (_event, trackId) => {
    const spotifyWebWindow = global.spotifyWebWindow.getInstance()
    spotifyWebWindow.webContents.send(SLA_TRACK_LYRICS_REQUEST, trackId)
  })

  ipcMain.on(SLA_TRACK_LYRICS_REPLY, (_event, lyrics, error) => {
    /** @type {Electron.BrowserWindow | null} */
    const appWindow = global.appWindow.getInstance()

    if (appWindow) {
      appWindow.webContents.send(SLA_TRACK_LYRICS_REPLY, lyrics, error)
    }
  })

  ipcMain.handle(SLA_GET_PLAYBACK_STATE, async () => {
    const playbackState = await global.spotifyPlaybackService.getState()
    return playbackState
  })

  // TODO: logging handling
  ipcMain.handle(SLA_LOG, (_event, payload, level) => {
    switch (level) {
      case 'error':
        // eslint-disable-next-line no-console
        return console.error(`[application:main]: ${JSON.stringify(payload)}`)
      default:
        // eslint-disable-next-line no-console
        return console.info(`[application:main]: ${JSON.stringify(payload)}`)
    }
  })
}

module.exports = { initializeIpcEvents }
