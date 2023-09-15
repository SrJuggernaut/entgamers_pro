import { Box, Button, Typography } from '@mui/material'
import { type GetStaticProps, type InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { type FC } from 'react'

import Seo from '@components/Seo'
import Contained from '@components/layouts/Contained'
import ProfileCard, { type ProfileCardProps } from '@components/profiles/ProfileCard'
import { type EquipoPageProps } from '@interfaces'

export const getStaticProps: GetStaticProps<EquipoPageProps> = async () => {
  return {
    props: {
      seo: {
        title: 'Equipo',
        description: ''
      },
      title: 'Equipo',
      description: 'El equipo de EntGamers está formado por personas que se dedican a la administración de la comunidad, a la organización de eventos y a la creación de contenido. EntGamers siempre intenta recompensar a sus miembros más activos, por lo que si quieres formar parte de nuestro equipo, ¡no dudes en contactar con nosotros!',
      administrationTitle: 'Administradores',
      administrationDescription: 'Los administradores son quienes se encargan de que todo funcione como es debido en la comunidad, desde la moderación de los grupos hasta la organización de eventos.',
      moderatorsTitle: 'Moderadores',
      moderatorsDescription: 'Los moderadores son los encargados de mantener el orden en los grupos de la comunidad, así como de ayudar a los usuarios a resolver sus dudas.',
      collaboratorsTitle: 'Colaboradores',
      collaboratorsDescription: 'Los colaboradores son los encargados de crear contenido para la comunidad, como artículos, tutoriales, vídeos, etc.'
    },
    revalidate: 300
  }
}

const Equipo: FC<InferGetStaticPropsType<typeof getStaticProps>> = (
  { administrationDescription, administrationTitle, collaboratorsDescription, collaboratorsTitle, description, moderatorsDescription, moderatorsTitle, title, seo }
) => {
  const administrators: ProfileCardProps[] = [
    {
      avatar: '/images/team/SrJuggernaut.png',
      biography: 'Soy desarrollador web y me gusta jugar videojuegos.',
      userName: 'SrJuggernaut',
      role: 'admin',
      socialNetworks: [
        { label: 'SrJuggernaut Facebook', socialNetwork: 'facebook', url: 'https://www.facebook.com/SrJuggernaut' },
        { label: 'SrJuggernaut Twitter', socialNetwork: 'twitter', url: 'https://twitter.com/SrJuggernaut' },
        { label: 'SrJuggernaut Youtube', socialNetwork: 'youtube', url: 'https://youtube.com/juggernautplays' },
        { label: 'SrJuggernaut Twitch', socialNetwork: 'twitch', url: 'https://twitch.tv/juggernautplays' },
        { label: 'SrJuggernaut Instagram', socialNetwork: 'instagram', url: 'https://www.instagram.com/sr_juggernaut' },
        { label: 'SrJuggernaut Sitio web', socialNetwork: 'webpage', url: 'https://srjuggernaut.dev' }
      ]
    }
  ]
  const moderators: ProfileCardProps[] = []
  const collaborators: ProfileCardProps[] = []
  return (
    <Contained>
      <Seo {...seo} />
      <Typography variant="h1" align="center" gutterBottom >
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
      <Typography variant="h2" align="center" gutterBottom >
        {administrationTitle}
      </Typography>
      <Typography variant="body1">
        {administrationDescription}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: '1rem',
          justifyContent: 'center',
          justifyItems: 'center',
          marginBlock: 2
        }}
      >
        {administrators.length > 0
          ? administrators.map(({ avatar, biography, socialNetworks, userName, role }) => (
            <ProfileCard
              key={`profile-card-${userName}`}
              avatar={avatar}
              biography={biography}
              socialNetworks={socialNetworks}
              userName={userName}
              role={role}
            />
          ))

          : (
            <>
              <Typography variant="body2" color={(theme) => theme.palette.warning.main } align="center" gutterBottom >
                Ups, parece que ahora mismo no hay administradores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser administrador, puedes hacer click en el botón de abajo.
              </Typography>
            </>
          )
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          marginBlock: 2
        }}
      >
        <Button
          href="/equipo/unirse"
          variant="contained"
          color="primary"
          component={NextLink}
        >
          Quiero ser administrador
        </Button>
      </Box>
      <Typography variant="h2" align="center" gutterBottom >
        {moderatorsTitle}
      </Typography>
      <Typography variant="body1">
        {moderatorsDescription}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: '1rem',
          justifyContent: 'center',
          justifyItems: 'center',
          marginBlock: 2
        }}
      >
        {moderators.length > 0
          ? moderators.map(({ avatar, biography, socialNetworks, userName, role }) => (
            <ProfileCard
              key={`profile-card-${userName}`}
              avatar={avatar}
              biography={biography}
              socialNetworks={socialNetworks}
              userName={userName}
              role={role}
            />
          ))
          : (
            <>
              <Typography variant="body2" color={(theme) => theme.palette.warning.main } align="center" gutterBottom >
                Ups, parece que ahora mismo no hay moderadores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser moderador, puedes hacer click en el botón de abajo.
              </Typography>
            </>
          )
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          marginBlock: 2
        }}
      >
        <Button
          href="/equipo/unirse"
          variant="contained"
          color="primary"
          component={NextLink}
        >
          Quiero ser moderador
        </Button>
      </Box>
      <Typography variant="h2" align="center" gutterBottom >
        {collaboratorsTitle}
      </Typography>
      <Typography variant="body1">
        {collaboratorsDescription}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gridGap: '1rem',
          justifyContent: 'center',
          justifyItems: 'center',
          marginBlock: 2
        }}
      >
        {collaborators.length > 0
          ? collaborators.map(({ avatar, biography, socialNetworks, userName, role }) => (
            <ProfileCard
              key={`profile-card-${userName}`}
              avatar={avatar}
              biography={biography}
              socialNetworks={socialNetworks}
              userName={userName}
              role={role}
            />
          ))
          : (
            <>
              <Typography variant="body2" color={(theme) => theme.palette.warning.main } align="center" gutterBottom >
                Ups, parece que ahora mismo no hay colaboradores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser colaborador, puedes hacer click en el botón de abajo.
              </Typography>
            </>
          )
        }
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          justifyItems: 'center',
          marginBlock: 2
        }}
      >
        <Button
          href="/equipo/unirse"
          variant="contained"
          color="primary"
          component={NextLink}
        >
          Quiero ser colaborador
        </Button>
      </Box>

    </Contained>
  )
}
export default Equipo
