import { render, screen } from '@testing-library/react'

import { SyncedLyrics } from './SyncedLyrics'
import { SyncedLyricsLine } from './SyncedLyricsLine'
import { useSyncedLyrics } from '~/hooks/useSyncedLyrics'
import { usePlayback } from '~/hooks/usePlayback'
import { Lyrics } from '~/types/lyrics'

const testLyrics: Lyrics = {
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
  ],
  syncType: 'LINE_SYNCED',
}

const testActiveLineIdx = 2

const testSyncedLines = testLyrics.lines.map((line, idx) => {
  const id = `id-${idx}`

  if (idx < testActiveLineIdx) {
    return {
      id,
      passed: true,
      ...line,
    }
  }

  return { id, ...line }
})

jest
  .mock('./SyncedLyricsLine', () => ({
    SyncedLyricsLine: jest.fn(props => {
      return <div>{props.children}</div>
    }),
  }))
  .mock('~/hooks/usePlayback', () => ({
    usePlayback: jest.fn(),
  }))
  .mock('~/hooks/useSyncedLyrics', () => ({
    useSyncedLyrics: jest.fn(),
  }))

const mockedUpdateProgress = jest.fn()
const mockedUsePlayback = usePlayback as jest.Mock
const mockedUseSyncedLyrics = useSyncedLyrics as jest.Mock

mockedUsePlayback.mockReturnValue({
  playbackState: {
    progress: 12022,
    isPlaying: true,
  },
  updateProgress: mockedUpdateProgress,
})

mockedUseSyncedLyrics.mockReturnValue({
  lines: testSyncedLines,
  activeLine: testSyncedLines[testActiveLineIdx],
})

describe('<SyncedLyrics />', () => {
  it('renders the component', () => {
    render(<SyncedLyrics lyrics={testLyrics} />)

    expect(useSyncedLyrics).toHaveBeenCalledWith({
      isPlaying: true,
      lyrics: testLyrics,
      progress: 12022,
      updateProgress: mockedUpdateProgress,
    })

    expect(screen.getByTestId('synced-lyrics')).toBeVisible()
    expect(SyncedLyricsLine).toHaveBeenCalledTimes(4)

    testSyncedLines.forEach((line, idx) => {
      expect(SyncedLyricsLine).toHaveBeenNthCalledWith(
        idx + 1,
        {
          children: line.words,
          isPassed: line.passed,
          isActive: idx === testActiveLineIdx,
        },
        {}
      )
    })
  })
})
