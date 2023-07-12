import ElectronLog from 'electron-log'

import Logger, { configLogger } from './Logger'

let mockedPushHookCallback = jest.fn()

jest.mock('electron-log', () => ({
  ...jest.requireActual('electron-log'),
  initialize: jest.fn(),
  hooks: {
    push: jest.fn(fn => {
      mockedPushHookCallback = fn
      return fn
    }),
  },
  info: jest.fn(),
  error: jest.fn(),
}))

describe('libs/Logger', () => {
  describe('configLogger', () => {
    it('configures Logger with file logging enabled', () => {
      configLogger({ logToFile: true })

      expect(ElectronLog.initialize).toHaveBeenCalledWith({ preload: true })
      expect(ElectronLog.transports.file.level).toBe('silly')
      expect(ElectronLog.hooks.push).toHaveBeenCalledWith(expect.any(Function))
    })

    it('configures Logger with file logging disabled', () => {
      configLogger({ logToFile: false })

      expect(ElectronLog.initialize).toHaveBeenCalledWith({ preload: true })
      expect(ElectronLog.transports.file.level).toBe(false)
      expect(ElectronLog.hooks.push).toHaveBeenCalledWith(expect.any(Function))
    })
  })

  describe('Logger', () => {
    it('logs info', () => {
      configLogger({ logToFile: true })

      Logger.logInfo('Some info to log')

      ElectronLog.hooks.push(mockedPushHookCallback({ level: 'info' }))

      expect(ElectronLog.info).toHaveBeenCalledWith('Some info to log')
      expect(ElectronLog.transports.file.fileName).toBe('info.log')
    })

    it('logs error', () => {
      configLogger({ logToFile: true })

      Logger.logError('Some error to log')

      ElectronLog.hooks.push(mockedPushHookCallback({ level: 'error' }))

      expect(ElectronLog.error).toHaveBeenCalledWith('Some error to log')
      expect(ElectronLog.transports.file.fileName).toBe('error.log')
    })
  })
})
