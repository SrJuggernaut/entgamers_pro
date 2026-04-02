import Typography from '@/components/ui/Typography'
import { Container } from '@/styled-system/jsx'
import { ensureTeamApplicationsCollection } from 'entgamers-database/backend/database/teamApplications'
import { Suspense, type FC } from 'react'
import ApplyForm from './ApplyForm'

const EquipoUnirsePage: FC = async () => {
  await ensureTeamApplicationsCollection()
  return (
    <Container>
      <Typography variant="h1" align="center">Únete al Bosque</Typography>
      <Typography variant="body1">
        El equipo de EntGamers está formado por personas que se dedican a la administración de la comunidad, a la organización de eventos y a la creación de contenido. Aquí podrás enterarte cuales son las funciones de cada uno de los miembros del equipo y como puedes unirte a nosotros.
      </Typography>
      <Suspense fallback={<Typography variant="body1">Cargando...</Typography>}>
        <ApplyForm />
      </Suspense>
    </Container>
  )
}

export default EquipoUnirsePage
