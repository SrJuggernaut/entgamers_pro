import { cx } from '@/styled-system/css'
import { input, type InputVariantProps } from '@/styled-system/recipes/input'
import type { MergeOmitting } from '@/types/utilities'
import type { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react'

export type InputProps = MergeOmitting<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, InputVariantProps>

const Input: FC<InputProps> = ({ className, ...rest }) => {
  const [inputRecipeArgs, allOtherInputProps] = input.splitVariantProps(rest)
  return (
    <input
      className={cx(input(inputRecipeArgs), className)}
      {...allOtherInputProps}
    />
  )
}

export default Input
