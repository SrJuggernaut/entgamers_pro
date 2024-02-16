import Typography from '@/components/ui/Typography'
import { Container } from '@/styled-system/jsx'
import { type FC } from 'react'
import DashboardTabs from './_components/DashboardTabs'

const page: FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center">Panel de control</Typography>
      <DashboardTabs />
    </Container>
  )
}

export default page
