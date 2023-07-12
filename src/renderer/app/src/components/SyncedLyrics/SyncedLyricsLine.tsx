import { PropsWithChildren, forwardRef } from 'react'
import classnames from 'classnames'

interface SyncedLyricsLineProps {
  isActive?: boolean
  isPassed?: boolean
}

export const SyncedLyricsLine = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SyncedLyricsLineProps>
>(({ isActive = false, isPassed = false, children }, activeRef) => {
  const className = classnames({
    'synced-lyrics-line': !isActive && !isPassed,
    'synced-lyrics-line--active': isActive,
    'synced-lyrics-line--passed': isPassed,
  })

  if (isActive) {
    return (
      <div ref={activeRef} className={className}>
        {children}
      </div>
    )
  }

  return <div className={className}>{children}</div>
})
