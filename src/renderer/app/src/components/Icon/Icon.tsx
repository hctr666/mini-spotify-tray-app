import { ReactElement, cloneElement } from 'react'
import type { IconBaseProps } from 'react-icons'
import { FaCircle, FaPlug } from 'react-icons/fa'
import { LuMic2 } from 'react-icons/lu'
import {
  HiFastForward,
  HiOutlineCog,
  HiOutlineX,
  HiPause,
  HiPlay,
  HiRewind,
} from 'react-icons/hi'

import { IconName, IconProps, IconSize } from './types'

const baseSizes: Record<IconSize, number> = {
  xxs: 12,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
}

const baseIcons: Record<IconName, () => ReactElement> = {
  circle: () => <FaCircle />,
  plug: () => <FaPlug />,
  play: () => <HiPlay />,
  pause: () => <HiPause />,
  rewind: () => <HiRewind />,
  'fast-Forward': () => <HiFastForward />,
  'mic-stage': () => <LuMic2 />,
  'outline-cog': () => <HiOutlineCog />,
  'outline-x': () => <HiOutlineX />,
}

const getBaseIcon = (name: IconName) => baseIcons[name]()

const getIcon = (
  icon: JSX.Element,
  size: IconSize,
  baseProps: IconBaseProps
) => {
  const baseSize = baseSizes[size]

  return cloneElement(icon, {
    ...baseProps,
    size: baseSize,
    'aria-hidden': true,
  })
}

export const Icon = ({ name, size = 'md', ...baseProps }: IconProps) => {
  const baseIcon = getBaseIcon(name)
  const icon = getIcon(baseIcon, size, baseProps)

  return icon
}
