import { IconBaseProps } from 'react-icons'

export type IconName =
  | 'circle'
  | 'plug'
  | 'play'
  | 'pause'
  | 'rewind'
  | 'fast-Forward'
  | 'outline-cog'
  | 'outline-x'

export type IconSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg'

export interface IconProps extends IconBaseProps {
  name: IconName
  size?: IconSize
}
