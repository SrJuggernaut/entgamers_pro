import { css, cx } from '@/styled-system/css'
import { type DetailedHTMLProps, type FC, type HTMLAttributes, type ReactNode } from 'react'

export interface FormGroupProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode
}

const FormGroup: FC<FormGroupProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cx(css({
        display: 'flex',
        flexDirection: 'column',
        gap: 'small',
        paddingBlock: 'small'
      }), className)}
      {...props}
    >
      {children}
    </div>
  )
}
export default FormGroup
