import IconButton from '@/components/ui/IconButton'
import Tooltip from '@/components/ui/Tooltip'
import { css, cx } from '@/styled-system/css'
import { input, type InputVariantProps } from '@/styled-system/recipes/input'
import { type MergeOmitting } from '@/types/utilities'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, type FC, type InputHTMLAttributes } from 'react'

export type InputProps = MergeOmitting<Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>, InputVariantProps>

const PasswordInput: FC<InputProps> = ({ className, ...props }) => {
  const [showPassword, setShowPassword] = useState(false)
  const [inputCss, rest] = input.splitVariantProps(props)
  return (
    <div
      className={css({
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
      })}
    >
      <input
        className={cx(
          input(inputCss),
          css({ fontSize: 'medium' }),
          className
        )}
        {...rest}
        type={showPassword ? 'text' : 'password'}
      />
      <div
        className={css({
          position: 'absolute',
          right: '16px',
          top: '50%',
          transform: 'translateY(-50%)'
        })}
      >
        <Tooltip
          title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          position="top"
        >
          <IconButton
            type="button"
            color="primary"
            size="small"
            onClick={() => { setShowPassword(!showPassword) }}
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} fixedWidth/>
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}
export default PasswordInput
