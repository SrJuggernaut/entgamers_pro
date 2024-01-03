import { cx } from '@/styled-system/css'
import { alert, type AlertVariantProps } from '@/styled-system/recipes/alert'
import { type MergeOmitting } from '@/types/utilities'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon, type FontAwesomeIconProps } from '@fortawesome/react-fontawesome'
import { type ButtonHTMLAttributes, type DetailedHTMLProps, type FC, type HTMLAttributes } from 'react'

export type AlertProps = MergeOmitting<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, AlertVariantProps>

const Alert: FC<AlertProps> = ({ children, className, ...props }) => {
  const [alertArgs, allOtherProps] = alert.splitVariantProps(props)
  return (
    <div
      className={cx(alert(alertArgs).body, className)}
      {...allOtherProps}
    >
      {children}
    </div>
  )
}

export type AlertCloseButtonProps = MergeOmitting<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, AlertVariantProps>

export const AlertCloseButton: FC<AlertCloseButtonProps> = ({ children, className, ...props }) => {
  const [alertArgs, allOtherProps] = alert.splitVariantProps(props)
  return (
    <button
      className={cx(alert(alertArgs).closeButton, className)}
      {...allOtherProps}
    >
      {children !== undefined ? children : <FontAwesomeIcon icon={faTimes as FontAwesomeIconProps['icon']} fixedWidth />}
    </button>
  )
}

export default Alert
