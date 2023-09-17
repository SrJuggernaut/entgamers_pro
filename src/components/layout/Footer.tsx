import Typography from '@/components/ui/Typography'
import { css } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { faChevronRight, faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'
import { type FC } from 'react'

const Footer: FC = () => {
  return (
    <footer
      className={css({
        backgroundColor: 'surface',
        color: 'text',
        paddingY: 'medium'
      })}
    >
      <Container
        className={css({
          display: 'grid',
          gridTemplateColumns: { base: 'repeat(3, 1fr)', mdDown: '1fr' }
        })}
      >
        <div>
          <Typography variant="h3" component='div'> Acerca de </Typography>
          <ul className="fa-ul">
            <li><FontAwesomeIcon icon={faChevronRight} listItem fixedWidth /><NextLink href="/acerca-de"> EntGamers</NextLink></li>
            <li><FontAwesomeIcon icon={faChevronRight} listItem fixedWidth /><NextLink href="/clanes"> Clanes</NextLink></li>
          </ul>
        </div>
        <div>
          <Typography variant="h3" component='div'> Contacto </Typography>
        </div>
        <div></div>
      </Container>
      <Container
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        })}
      >
        <Typography variant="body2" component='div'>
          Hecho con <FontAwesomeIcon className={css({ color: 'red' })} icon={faHeart} /> por <a href="https://srjuggernaut.dev">SrJuggernaut</a>
        </Typography>
      </Container>
    </footer>
  )
}
export default Footer
