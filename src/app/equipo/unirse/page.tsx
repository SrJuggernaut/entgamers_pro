import Typography from '@/components/ui/Typography'
import { css } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { type FC } from 'react'

const EquipoUnirsePage: FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center">Únete al Bosque</Typography>
      <Typography variant="body1">
        El equipo de EntGamers está formado por personas que se dedican a la administración de la comunidad, a la organización de eventos y a la creación de contenido. Aquí podrás enterarte cuales son las funciones de cada uno de los miembros del equipo y como puedes unirte a nosotros.
      </Typography>
      <div
        className={css({
          backgroundColor: 'info',
          color: 'info.contrast',
          borderRadius: 'medium',
          padding: 'medium',
          marginBlock: 'medium',
          '& a': {
            color: 'info.contrast',
            fontWeight: 'bold'
          }
        })}
      >
        Esta sección está en construcción. Puedes unirte contactándonos mediante nuestro <a href="http://discord.gg/nqwzHJC">Servidor de Discord</a>.
      </div>
    </Container>
  )
}

export default EquipoUnirsePage
