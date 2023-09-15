import Contained from '@components/layouts/Contained'
import { Typography } from '@mui/material'
import { type FC } from 'react'

const About: FC = () => {
  return (
    <Contained>
      <Typography variant='h1' align="center" gutterBottom>Sobre EntGamers</Typography>
      <Typography variant='h2' gutterBottom>¿Qué es EntGamers?</Typography>
      <Typography variant='body1'>
        EntGamers es una comunidad de jugadores y para jugadores, surge del deseo de tener un espacio seguro, físico o virtual, para encontrar y conocer gente con los mismos gustos. Desde la idea inicial ha ido evolucionando con el paso del tiempo y el paso por otras comunidades hasta convertirse en lo que es ahora.
      </Typography>
    </Contained>
  )
}

export default About
