import { type CellContext } from '@tanstack/react-table'
import { type TeamApplication, type TeamApplicationStatus } from 'entgamers-database/types/teamApplications'
import { type FC } from 'react'
import StatusSelector from './StatusSelector'

const StatusUpdater: FC<CellContext<TeamApplication, TeamApplicationStatus>> = ({ cell: { id, row }, table }) => {
  return (
    <>
      <StatusSelector
        id={`${id}-status`}
        value={row.original.status}
        onChange={(status) => {
          table.options.meta?.updateRow(row.original.$id, { status })
            .catch(console.error)
        }}
      />
    </>
  )
}

export default StatusUpdater
