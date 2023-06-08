const path = require('path')
const { BrowserWindow, app } = require('electron')

const BaseWindow = require('./base-window')
const { isDevelopment } = require('../helpers/environment')
const { SLA_AUTH_STATE } = require('../constants/ipc-channels')

const isDev = isDevelopment()

class AppWindow extends BaseWindow {
  create() {
    this.window = new BrowserWindow({
      show: isDev,
      width: 400,
      height: 400,
      titleBarStyle: 'hidden',
      fullscreenable: false,
      resizable: false,
      frame: false,
      roundedCorners: false,
      transparent: true,
      webPreferences: {
        preload: path.join(__dirname, '..', '..', 'preload/app.js'),
        devTools: isDev,
      },
    })

    global.APP_WINDOW_ID = this.window.webContents.id

    // TODO: implement secure url
    this.window.loadURL('http://localhost:4014')

    this.initializeEvents()
    this.initDevtools()

    return this.window
  }

  initializeEvents() {
    this.window.on('blur', () => {
      global.spotifyPlaybackService.stopStateCheck()

      // There's a bug where clicking the tray icon doesn't show the window,
      // after it's been blurred, so we make sure to hide the window on blur event
      if (!this.window.webContents.isDevToolsOpened()) {
        this.window.hide()
      }
    })

    this.window.on('close', e => {
      if (global.isAppQuitting) {
        return app.quit()
      } else {
        e.preventDefault()
      }

      this.window.hide()
    })

    this.window.on('focus', () => {
      if (global.authService.isAuthenticated()) {
        global.spotifyPlaybackService.initStateCheck()
      }
    })

    this.window.webContents.once('did-finish-load', async () => {
      try {
        await global.authService.requestRefreshToken()
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }

      this.window.webContents.send(SLA_AUTH_STATE, {
        isAuthenticated: global.authService.isAuthenticated(),
      })
    })
  }
}

module.exports = AppWindow
