import { ImgHTMLAttributes } from 'react'
import cx from 'classnames'

type ImageSize = 'sm'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  size?: 'sm'
  rounded?: boolean
}

const sizes: Record<ImageSize, number> = {
  sm: 32,
}

const roundedClassNames: Record<ImageSize, string> = {
  sm: 'rounded-[3px]',
}

export const AlbumImage = ({
  size = 'sm',
  rounded = true,
  className,
  ...imgProps
}: ImageProps) => {
  const numericSize = sizes[size]
  const finalClassName = cx(className, {
    [roundedClassNames[size]]: rounded,
  })

  return (
    <img
      {...imgProps}
      width={numericSize}
      height={numericSize}
      className={finalClassName}
    />
  )
}
