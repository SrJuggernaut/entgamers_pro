import DebouncedInput from '@/components/ui/form/DebouncedInput'
import { type Column } from '@tanstack/react-table'
import { type TeamApplication, type TeamApplicationRole, type TeamApplicationStatus } from 'entgamers-database/types/teamApplications'
import { type FC } from 'react'
import RoleSelector from './RoleSelector'
import StatusSelector from './StatusSelector'

export interface ApplicationsFilterProps {
  column: Column<TeamApplication, unknown>
}

const ApplicationsFilter: FC<ApplicationsFilterProps> = ({ column }) => {
  const columnFilterValue = column.getFilterValue()
  switch (column.id) {
    case 'status':
      return (
        <StatusSelector
          id={`${column.id}-status-filter`}
          value={columnFilterValue as TeamApplicationStatus}
          onChange={(value) => { column.setFilterValue(value) }}
          allowEmpty
        />
      )
    case 'role':
      return (
        <RoleSelector
          id={`${column.id}-role-filter`}
          value={columnFilterValue as TeamApplicationRole}
          onChange={(value) => { column.setFilterValue(value) }}
          allowEmpty
        />
      )
    default:
      return (
        <DebouncedInput
          fullWidth
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={(value) => { column.setFilterValue(value) }}
          placeholder="Buscar..."
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
      )
  }
}

export default ApplicationsFilter
