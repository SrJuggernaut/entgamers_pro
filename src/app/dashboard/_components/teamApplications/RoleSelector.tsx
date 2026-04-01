import { css } from '@/styled-system/css'
import { type TeamApplicationRole } from 'entgamers-database/types/teamApplications'
import { type FC } from 'react'

export interface RoleSelectorProps {
  id: string
  value: TeamApplicationRole
  onChange: (role: TeamApplicationRole) => void
  allowEmpty?: boolean
}

const RoleSelector: FC<RoleSelectorProps> = ({ id, value, onChange, allowEmpty }) => {
  /* TODO: Change for Select UI Component when it's ready */
  return (
    <select
      id={`${id}-status`}
      className={css({
        'width': '100%',
        'border': 'none',
        'background': 'transparent',
        'color': 'inherit',
        'outline': 'none',
        'cursor': 'pointer',
        'fontSize': 'inherit',
        'fontWeight': 'inherit',
        'lineHeight': 'inherit',
        'padding': '0',
        'borderRadius': '0',
        '&:focus': {
          outline: 'none'
        }
      })}
      value={value}
      onChange={(event) => {
        onChange(event.target.value as TeamApplicationRole)
      }}
    >
      {allowEmpty === true && <option value="">Todos</option>}
      <option value="Admin">Administrador</option>
      <option value="Collaborator">Colaborador</option>
      <option value="Moderator">Moderador</option>
    </select>
  )
}

export default RoleSelector
