import { cx } from '@/styled-system/css'
import { input, type InputVariantProps } from '@/styled-system/recipes/input'
import { type MergeOmitting } from '@/types/utilities'
import { type DetailedHTMLProps, type FC, type InputHTMLAttributes } from 'react'

type ComposedInputProps = MergeOmitting<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, InputVariantProps>

export interface InputProps extends ComposedInputProps {}

const Input: FC<InputProps> = ({ children, className, ...rest }) => {
  const [inputRecipeArgs, allOtherInputProps] = input.splitVariantProps(rest)
  return (
    <input
      className={cx(input(inputRecipeArgs), className)}
      {...allOtherInputProps}
    >
      {children}
    </input>
  )
}

export default Input
