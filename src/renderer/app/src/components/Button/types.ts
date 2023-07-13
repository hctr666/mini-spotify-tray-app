import type { ButtonHTMLAttributes, MouseEvent, ReactElement } from 'react'

export type ButtonVariant = 'primary' | 'neutral' | 'transparent'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactElement
  rounded?: boolean
  variant?: ButtonVariant
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}
