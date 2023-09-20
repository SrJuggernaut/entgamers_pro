import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { center } from '@/styled-system/patterns'
import { button, card, iconButton } from '@/styled-system/recipes'
import { type TeamMember } from '@/types/User'
import { faFacebook, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { type FC } from 'react'

const team: TeamMember[] = [
  {
    image: '/images/team/SrJuggernaut.png',
    name: 'SrJuggernaut',
    role: 'administrator',
    description: 'Soy desarrollador web y me gusta jugar videojuegos.',
    socialNetworks: [
      { url: 'https://www.facebook.com/SrJuggernaut', label: 'SrJuggernaut Facebook', icon: faFacebook },
      { url: 'https://twitter.com/SrJuggernaut', label: 'SrJuggernaut Twitter', icon: faTwitter },
      { url: 'https://youtube.com/juggernautplays', label: 'SrJuggernaut YouTube', icon: faYoutube },
      { url: 'https://twitch.tv/juggernautplays', label: 'SrJuggernaut Twitch', icon: faTwitch },
      { url: 'https://www.instagram.com/sr_juggernaut', label: 'SrJuggernaut Instagram', icon: faInstagram },
      { url: 'https://srjuggernaut.dev/', label: 'SrJuggernaut Website', icon: faGlobe }
    ]
  }
]

const EquipoPage: FC = () => {
  return (
    <Container>
      <Typography variant="h1" align="center">Equipo</Typography>
      <Typography variant="body1">
        El equipo de EntGamers está formado por personas que se dedican a la administración de la comunidad, a la organización de eventos y a la creación de contenido. EntGamers siempre intenta recompensar a sus miembros más activos, por lo que si quieres formar parte de nuestro equipo, ¡no dudes en contactar con nosotros!
      </Typography>
      <Typography variant="h2" align="center">Administradores</Typography>
      <Typography variant="body1">
        Los administradores son quienes se encargan de que todo funcione como es debido en la comunidad, desde la moderación de los grupos hasta la organización de eventos.
      </Typography>
      <Container
        className={css({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'medium',
          flexWrap: 'wrap'
        })}
      >
        {team.map((member, index) => (
          <div
            key={`team-member-${index}`}
            className={cx(card({ variant: 'retro' }).body, css({
              maxWidth: '300px',
              textAlign: 'center'
            }))}
          >
            <div
              className={cx(card({ variant: 'retro' }).media, center())}
            >
              <NextImage
                src={member.image}
                alt={member.name}
                width={120}
                height={120}
              />
            </div>
            <div
              className={card({ variant: 'retro' }).content}
            >
              <h3>{member.name}</h3>
              <p>{member.description}</p>
              <div
                className={css({
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 'small',
                  flexWrap: 'wrap'
                })}
              >
                {member.socialNetworks.map((socialNetwork, index) => (
                  <a
                    key={`team-member-${index}-social-network`}
                    className={iconButton()}
                    href={socialNetwork.url}
                  >
                    <FontAwesomeIcon icon={socialNetwork.icon} fixedWidth />
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Container>
      <Typography variant="h2" align="center">Moderadores</Typography>
      <Typography variant="body1">
        Los moderadores son los encargados de mantener el orden en los grupos de la comunidad, así como de ayudar a los usuarios a resolver sus dudas.
      </Typography>
      <Typography variant="body2" color="info">
        Ups, parece que ahora mismo no hay moderadores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser moderador, puedes hacer click en el botón de abajo.
        <div className={center()}>
          <NextLink
            className={button({ color: 'info' })}
            href="/equipo/unirse"
          >
            ¡Quiero ser moderador!
          </NextLink>
        </div>
      </Typography>
      <Typography variant="h2" align="center">Colaboradores</Typography>
      <Typography variant="body1">
        Los colaboradores son los encargados de crear contenido para la comunidad, como artículos, tutoriales, vídeos, eventos etc.
      </Typography>
      <Typography variant="body2" color="info">
        Ups, parece que ahora mismo no hay colaboradores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser colaborador, puedes hacer click en el botón de abajo.
      </Typography>
      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href="/equipo/unirse"
        >
          ¡Quiero ser colaborador!
        </NextLink>
      </div>
    </Container>
  )
}
export default EquipoPage
