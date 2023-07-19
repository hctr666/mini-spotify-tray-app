import { ipcMain } from 'electron'
import IpcChannels from '../constants/ipc-channels'
import { SpotifyClient } from '../libs/spotify-client'

const {
  MSA_LYRICS_SERVICE_CONNECT,
  MSA_SIGN_OUT,
  MSA_SIGN_IN,
  MSA_LYRICS_SERVICE_STATE_REPLY,
  MSA_LYRICS_SERVICE_CONNECT_REQUEST,
  MSA_LYRICS_SERVICE_STATE_REQUEST,
  MSA_TRACK_LYRICS_REQUEST,
  MSA_TRACK_LYRICS_REPLY,
  MSA_GET_PLAYBACK_STATE,
  MSA_START_OR_RESUME_PLAYBACK,
  MSA_PAUSE_PLAYBACK,
  MSA_SKIP_TO_NEXT_TRACK,
  MSA_SKIP_TO_PREVIOUS_TRACK,
  MSA_GET_TRACK,
} = IpcChannels

const sendToSpotifyWebWindow = (channel, ...args) => {
  /** @type {Electron.BrowserWindow | null} */
  const spotifyWebWindow = global.spotifyWebWindow.getWindow()

  if (spotifyWebWindow) {
    spotifyWebWindow.webContents.send(channel, ...args)
  }
}

const sendToAppWindow = (channel, value) => {
  /** @type {Electron.BrowserWindow | null} */
  const appWindow = global.appWindow.getWindow()

  if (appWindow) {
    appWindow.webContents.send(channel, value)
  }
}

export const initializeIpcMainEvents = () => {
  ipcMain.on(MSA_LYRICS_SERVICE_CONNECT, () => {
    sendToSpotifyWebWindow(MSA_LYRICS_SERVICE_CONNECT_REQUEST)
  })

  ipcMain.on(MSA_SIGN_OUT, () => {
    global.authService.logout()
  })

  ipcMain.on(MSA_SIGN_IN, () => {
    global.authWindow.create()
  })

  ipcMain.on(MSA_LYRICS_SERVICE_STATE_REQUEST, () => {
    sendToSpotifyWebWindow(MSA_LYRICS_SERVICE_STATE_REQUEST)
  })

  ipcMain.on(MSA_LYRICS_SERVICE_STATE_REPLY, (_event, status) => {
    sendToAppWindow(MSA_LYRICS_SERVICE_STATE_REPLY, status)
  })

  ipcMain.handle(MSA_TRACK_LYRICS_REQUEST, (_event, trackId, imageUrl) => {
    sendToSpotifyWebWindow(MSA_TRACK_LYRICS_REQUEST, trackId, imageUrl)
  })

  ipcMain.on(MSA_TRACK_LYRICS_REPLY, (_event, lyrics, error) => {
    sendToAppWindow(MSA_TRACK_LYRICS_REPLY, lyrics, error)
  })

  ipcMain.handle(MSA_GET_PLAYBACK_STATE, async () => {
    const playbackState = await global.spotifyPlaybackPollingService.getState()
    return playbackState
  })

  ipcMain.handle(
    MSA_START_OR_RESUME_PLAYBACK,
    async (_event, deviceId, positionMS) => {
      await SpotifyClient.startOrResumePlayback(deviceId, positionMS)
    }
  )

  ipcMain.handle(MSA_PAUSE_PLAYBACK, async (_event, deviceId) => {
    await SpotifyClient.pausePlayback(deviceId)
  })

  ipcMain.handle(MSA_SKIP_TO_NEXT_TRACK, async (_event, deviceId) => {
    await SpotifyClient.skipToNextTrack(deviceId)
  })

  ipcMain.handle(MSA_SKIP_TO_PREVIOUS_TRACK, async (_event, deviceId) => {
    await SpotifyClient.skipToPreviousTrack(deviceId)
  })

  ipcMain.handle(MSA_GET_TRACK, async (_event, trackId) => {
    const track = await SpotifyClient.getTrack(trackId)
    return track
  })
}
