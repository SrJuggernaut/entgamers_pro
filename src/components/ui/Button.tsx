import { cx } from '@/styled-system/css'
import { button, type ButtonVariantProps } from '@/styled-system/recipes/button'
import { type MergeOmitting } from '@/types/utilities'
import { type ButtonHTMLAttributes, type DetailedHTMLProps, type FC } from 'react'

type ComposedButtonProps = MergeOmitting<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, ButtonVariantProps>

export interface ButtonProps extends ComposedButtonProps {}

const Button: FC<ButtonProps> = ({ children, className, ...rest }) => {
  const [buttonRecipeArgs, allOtherButtonProps] = button.splitVariantProps(rest)
  return (
    <button
      className={cx(button(buttonRecipeArgs), className)}
      {...allOtherButtonProps}
    >
      {children}
    </button>
  )
}

export default Button
