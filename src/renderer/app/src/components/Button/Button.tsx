import {
  ButtonHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
  forwardRef,
} from 'react'
import cx from 'classnames'

type ButtonVariant = 'primary' | 'neutral' | 'transparent'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  rounded?: boolean
  variant?: ButtonVariant
  icon?: ReactElement
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
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

  const variantClasses = `button-${variant}`
  const finalClassName = cx('button', variantClasses, {
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
