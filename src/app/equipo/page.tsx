import Typography from '@/components/ui/Typography'
import { css } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { center } from '@/styled-system/patterns'
import { button } from '@/styled-system/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const EquipoPage: FC = async () => {
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
        {/* {team.map((member, index) => (
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
        ))} */}
      </Container>

      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href="/equipo/unirse?role=administrator"
        >
          ¡Quiero ser administrador!
        </NextLink>
      </div>
      <Typography variant="h2" align="center">Moderadores</Typography>
      <Typography variant="body1">
        Los moderadores son los encargados de mantener el orden en los grupos de la comunidad, así como de ayudar a los usuarios a resolver sus dudas.
      </Typography>
      <Typography variant="body2" color="info">
        Ups, parece que ahora mismo no hay moderadores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser moderador, puedes hacer click en el botón de abajo.
        <div className={center()}>
          <NextLink
            className={button({ color: 'info' })}
            href="/equipo/unirse?role=moderator"
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
          href="/equipo/unirse?role=collaborator"
        >
          ¡Quiero ser colaborador!
        </NextLink>
      </div>
    </Container>
  )
}
export default EquipoPage
