import { act, renderHook } from '@testing-library/react'

import { UseSyncedLyricsProps, useSyncedLyrics } from './useSyncedLyrics'
import { Lyrics } from '~/types/lyrics'

jest.useFakeTimers()

const lyricsMock: Lyrics = {
  lines: [
    {
      startTimeMs: '320',
      endTimeMs: '0',
      syllables: [],
      words: 'line words 1',
    },
    {
      startTimeMs: '2120',
      endTimeMs: '0',
      syllables: [],
      words: 'line words 2',
    },
    {
      startTimeMs: '4389',
      endTimeMs: '0',
      syllables: [],
      words: 'line words 3',
    },
    {
      startTimeMs: '5781',
      endTimeMs: '0',
      syllables: [],
      words: 'line words 4',
    },
    {
      startTimeMs: '8724',
      endTimeMs: '0',
      syllables: [],
      words: 'line words 5',
    },
    {
      startTimeMs: '14170',
      endTimeMs: '0',
      syllables: [],
      words: 'line words 6',
    },
  ],
  syncType: 'LINE_SYNCED',
}

const getExpectedLines = (activeLineIdx?: number) => {
  return lyricsMock.lines.map((line, idx) => ({
    id: `line-${idx}`,
    passed: typeof activeLineIdx === 'number' && idx < activeLineIdx,
    ...line,
  }))
}

const mockedUpdateProgress = jest.fn()

const renderUseSyncedLyrics = ({
  progress,
  isPlaying = true,
}: Partial<UseSyncedLyricsProps>) => {
  return renderHook(() =>
    useSyncedLyrics({
      isPlaying,
      progress,
      lyrics: lyricsMock,
      updateProgress: mockedUpdateProgress,
    })
  )
}

const advanceTimer = (_wait: number) => {
  act(() => {
    jest.advanceTimersByTime(_wait)
  })
}

describe('useSyncedLyrics', () => {
  beforeEach(() => {
    mockedUpdateProgress.mockClear()
  })

  it('returns the correct line when progress is in the middle of the song', () => {
    const { result } = renderUseSyncedLyrics({ progress: 5000 })

    const expectedLines = getExpectedLines(2)

    expect(result.current).toEqual({
      activeLine: expectedLines[2],
      activeLineRef: { current: null },
      lines: expectedLines,
      wait: 781,
    })
  })

  it('does not return a line when progress is less than the first start time', () => {
    const { result } = renderUseSyncedLyrics({ progress: 240 })

    expect(result.current).toEqual({
      activeLine: null,
      activeLineRef: { current: null },
      lines: getExpectedLines(),
      wait: 80,
    })
  })

  it('returns the last line when progress is greater than the maximum start time', () => {
    const { result } = renderUseSyncedLyrics({ progress: 16700 })
    const expectedLines = getExpectedLines(5)

    expect(result.current).toEqual({
      activeLine: expectedLines[5],
      activeLineRef: { current: null },
      lines: expectedLines,
      wait: 0,
    })
  })

  it('updates progress after wait time', () => {
    const { result } = renderUseSyncedLyrics({
      progress: 3400,
    })
    const expectedLines = getExpectedLines(1)

    expect(result.current).toEqual({
      activeLine: expectedLines[1],
      activeLineRef: { current: null },
      lines: expectedLines,
      wait: 989,
    })

    advanceTimer(989 + Math.ceil(989 * 0.25))

    expect(mockedUpdateProgress).toHaveBeenCalledWith(4389)
  })

  it('does not update progress after wait time when not playing', () => {
    const { result } = renderUseSyncedLyrics({
      progress: 3400,
      isPlaying: false,
    })
    const expectedLines = getExpectedLines(1)

    expect(result.current).toEqual({
      activeLine: expectedLines[1],
      activeLineRef: { current: null },
      lines: expectedLines,
      wait: 989,
    })

    advanceTimer(989 + Math.ceil(989 * 0.25))

    expect(mockedUpdateProgress).not.toHaveBeenCalled()
  })
})
