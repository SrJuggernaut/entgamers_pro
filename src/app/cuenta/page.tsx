import UpdateEmail from '@/app/cuenta/UpdateEmail'
import UpdatePassword from '@/app/cuenta/UpdatePassword'
import UpdateUserName from '@/app/cuenta/UpdateUserName'
import Typography from '@/components/ui/Typography'
import { Container } from '@/styled-system/jsx'
import { type FC } from 'react'

const CuentaPage: FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center">Cuenta</Typography>
      <UpdateUserName />
      <UpdatePassword />
      <UpdateEmail />
    </Container>
  )
}
export default CuentaPage
