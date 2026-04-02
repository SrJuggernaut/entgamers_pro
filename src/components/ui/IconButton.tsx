import { cx } from '@/styled-system/css'
import { iconButton, type IconButtonVariantProps } from '@/styled-system/recipes/icon-button'
import type { MergeOmitting } from '@/types/utilities'
import type { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react'

export type IconButtonProps = MergeOmitting<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, IconButtonVariantProps>

const IconButton: FC<IconButtonProps> = ({ children, className, ...rest }) => {
  const [iconButtonRecipeArgs, allOtherIconButtonProps] = iconButton.splitVariantProps(rest)
  return (
    <button
      className={cx(iconButton(iconButtonRecipeArgs), className)}
      {...allOtherIconButtonProps}
    >
      {children}
    </button>
  )
}

export default IconButton
