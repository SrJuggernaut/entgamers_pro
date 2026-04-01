import { css } from '@/styled-system/css'
import { type TeamApplicationStatus } from 'entgamers-database/types/teamApplications'
import { type FC } from 'react'

export interface StatusSelectorProps {
  id: string
  value: TeamApplicationStatus
  onChange: (status: TeamApplicationStatus) => void
  allowEmpty?: boolean
}

const StatusSelector: FC<StatusSelectorProps> = ({ id, value, onChange, allowEmpty }) => {
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
        onChange(event.target.value as TeamApplicationStatus)
      }}
    >
      {allowEmpty === true && <option value="">Todos</option>}
      <option value="Pending">Pendiente</option>
      <option value="Accepted">Aceptado</option>
      <option value="Rejected">Rechazado</option>
    </select>
  )
}

export default StatusSelector
