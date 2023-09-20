import Typography from '@/components/ui/Typography'
import { css } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { type FC } from 'react'

const ClanesPage: FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center">Clanes</Typography>
      <Typography variant="body1">Los clanes son espacios donde compartir nuestros gustos con otros usuarios, dándonos la oportunidad de organizar proyectos y eventos en los cuales formar parte.</Typography>
      <div
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr 1fr', smDown: '1fr' },
          gap: 'medium'
        })}
      >
        <div>
          <Typography variant="h2">Beneficios de los clanes</Typography>
          <Typography variant="body1">La intención de EntGamers es brindar beneficios a los clanes que les permitan operar en un ambiente de comunicación y colaboración.</Typography>
          <ul className="fa-ul">
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Espacio en el servidor de Discord.</li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Apoyo de la administración con proyectos y eventos.</li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Apoyo del equipo de moderación.</li>
          </ul>
        </div>
        <div>
          <Typography variant="h2">Requisitos para formar un clan</Typography>
          <Typography variant="body1">Todos los clanes deben cumplir con los siguientes requisitos:</Typography>
          <ul className="fa-ul">
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Tener un encargado.</li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Fomentar el compañerismo y la comunidad.</li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Aportar contenido de forma periódica para la comunidad.</li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem /> Realizar al menos una actividad mensual con los integrantes.</li>
          </ul>
        </div>
      </div>
      <Typography variant="h2">Clanes activos</Typography>
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
        Esta sección está en construcción. Puedes ver los clanes activos en nuestro <a href="http://discord.gg/nqwzHJC">Servidor de Discord</a>.
      </div>
    </Container>
  )
}
export default ClanesPage
