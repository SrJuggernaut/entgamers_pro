import Typography from '@/components/ui/Typography'
import { Container } from '@/styled-system/jsx'
import { type FC } from 'react'
import CuentaTabs from './CuentaTabs'

const CuentaPage: FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center">Cuenta</Typography>
      <Typography variant="body1">
        Desde aquí puedes administrar las preferencias y ajustes de tu cuenta.
      </Typography>
      <CuentaTabs/>
    </Container>
  )
}
export default CuentaPage
