import { Container, Paper, Typography } from '@mui/material'
import NextLink from 'next/link'
import MuiLink from '@mui/material/Link'

import { FooterColumn } from '@interfaces'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  const columns: FooterColumn[] = [
    {
      title: 'Acerca de',
      links: [
        { label: 'EntGamers', url: '/about' },
        { label: 'Clanes', url: '/clanes' }
      ]
    },
    {
      title: 'Contacto',
      links: [
        { label: 'Facebook', url: 'https://www.facebook.com/EntGamers/' },
        { label: 'Twitter', url: 'https://twitter.com/EntGamers' },
        { label: 'Email', url: 'mailto:contacto@entgamers.pro' }
      ]
    }
  ]
  return (
    <Paper
      sx={{
        paddingBlock: 1
      }}
    >
      <Container
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          },
          [theme.breakpoints.up('lg')]: {
            gridTemplateColumns: '1fr 1fr 1fr'
          }
        })}
      >
        {columns.map((column, index) => (
          <div key={index}>
            <Typography variant="h3" component="div" align="center">{column.title}</Typography>
            {column.links.length > 0 && (
              <ul className="fa-ul">
                {column.links.map((link, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={faAngleRight} listItem />
                    <NextLink href={link.url} passHref>
                      <MuiLink>
                        {link.label}
                      </MuiLink>
                    </NextLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </Container>
      <Container>
        <Typography variant="body2" component="div" align="center">
          <p>
            Creado por <MuiLink href="https://srjuggernaut.dev" target="_blank">SrJuggernaut</MuiLink> con &lt;3
          </p>
        </Typography>
      </Container>
    </Paper>
  )
}
export default Footer
