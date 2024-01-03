import { css, cx } from '@/styled-system/css'
import { input, type InputVariantProps } from '@/styled-system/recipes/input'
import { type MergeOmitting } from '@/types/utilities'
import { type DetailedHTMLProps, type FC, type TextareaHTMLAttributes } from 'react'

export type InputProps = MergeOmitting<DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>, InputVariantProps>

const TextArea: FC<InputProps> = ({ className, onChange, ...props }) => {
  const [textAreaCss, rest] = input.splitVariantProps(props)
  return (
    <textarea
      className={cx(css({
        resize: 'none',
        overflow: 'auto'
      }), input(textAreaCss), className)}
      onChange={(event) => {
        if (event.target.value.length > 0) {
          event.target.style.height = 'auto'
          event.target.style.height = `${event.target.scrollHeight}px`
        } else {
          event.target.style.height = 'auto'
        }
        if (onChange !== undefined) {
          onChange(event)
        }
      }}
      {...rest}
    />
  )
}

export default TextArea
