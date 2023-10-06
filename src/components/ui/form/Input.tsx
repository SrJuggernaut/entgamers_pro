import { cx } from '@/styled-system/css'
import { input, type InputVariantProps } from '@/styled-system/recipes/input'
import { type MergeOmitting } from '@/types/utilities'
import { type DetailedHTMLProps, type FC, type InputHTMLAttributes } from 'react'

export type InputProps = MergeOmitting<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, InputVariantProps>

const Input: FC<InputProps> = ({ className, ...props }) => {
  const [inputCss, rest] = input.splitVariantProps(props)
  return (
    <input
      className={cx(input(inputCss), className)}
      {...rest}
    />
  )
}
export default Input
