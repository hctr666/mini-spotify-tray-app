import { PropsWithChildren, forwardRef } from 'react'
import cx from 'classnames'

import { ButtonProps, ButtonVariant } from './types'

const variants: Record<ButtonVariant, string> = {
  primary: 'button-primary',
  neutral: 'button-neutral',
  transparent: 'button-transparent',
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>((props, buttonRef) => {
  const {
    children,
    rounded = false,
    variant = 'neutral',
    onClick,
    ...buttonProps
  } = props

  const variantClass = variants[variant]
  const finalClassName = cx('button', variantClass, {
    'button-rounded': rounded,
  })

  return (
    <button
      ref={buttonRef}
      className={finalClassName}
      onClick={onClick}
      {...buttonProps}
    >
      {children}
    </button>
  )
})
