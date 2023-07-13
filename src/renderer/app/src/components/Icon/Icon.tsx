import { cloneElement } from 'react'
import type { IconBaseProps } from 'react-icons'
import { FaCircle, FaPlug } from 'react-icons/fa'
import {
  HiFastForward,
  HiOutlineCog,
  HiOutlineX,
  HiPause,
  HiPlay,
  HiRewind,
} from 'react-icons/hi'

type IconName = keyof typeof baseIcons
type IconSize = keyof typeof baseSizes

interface IconProps extends IconBaseProps {
  name: IconName
  size?: IconSize
}

const baseSizes = {
  xxs: 12,
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
}

const baseIcons = {
  circle: () => <FaCircle />,
  plug: () => <FaPlug />,
  play: () => <HiPlay />,
  pause: () => <HiPause />,
  rewind: () => <HiRewind />,
  'fast-Forward': () => <HiFastForward />,
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
