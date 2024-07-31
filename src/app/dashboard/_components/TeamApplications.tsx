import ApplicationsList from '@/app/dashboard/_components/teamApplications/ApplicationsList'
import Typography from '@/components/ui/Typography'
import { type FC } from 'react'

const TeamApplications: FC = () => {
  return (
    <>
      <Typography variant="h2">Aplicaciones</Typography>
      <ApplicationsList />
    </>
  )
}

export default TeamApplications
