import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { center } from '@/styled-system/patterns'
import { button, card } from '@/styled-system/recipes'
import { getClanMembers } from 'entgamers-database/backend/clanes'
import { ADMIN_CLAN_ID, COLLABORATOR_CLAN_ID, MODERATOR_CLAN_ID, ensureAdministrativeClans } from 'entgamers-database/backend/clanes/administrative'
import { getUser, type UserList } from 'entgamers-database/backend/users'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { type Models } from 'node-appwrite'
import { type FC } from 'react'

interface GetTeamsResponse {
  admins: UserList & { id: string }
  moderators: UserList & { id: string }
  collaborators: UserList & { id: string }
}

const getTeams = async (): Promise<GetTeamsResponse> => {
  await ensureAdministrativeClans()

  const adminMembers: Models.MembershipList = await getClanMembers(ADMIN_CLAN_ID)
  const moderatorMembers: Models.MembershipList = await getClanMembers(MODERATOR_CLAN_ID)
  const collaboratorMembers: Models.MembershipList = await getClanMembers(COLLABORATOR_CLAN_ID)

  const adminsPromises = adminMembers.memberships.map(async membership => await getUser(membership.userId))
  const moderatorsPromises = moderatorMembers.memberships.map(async membership => await getUser(membership.userId))
  const collaboratorsPromises = collaboratorMembers.memberships.map(async membership => await getUser(membership.userId))

  const [admins, moderators, collaborators] = await Promise.all([
    Promise.all(adminsPromises), Promise.all(moderatorsPromises), Promise.all(collaboratorsPromises)
  ])

  return { admins: { id: ADMIN_CLAN_ID, total: admins.length, users: admins }, moderators: { id: MODERATOR_CLAN_ID, total: moderators.length, users: moderators }, collaborators: { id: COLLABORATOR_CLAN_ID, total: collaborators.length, users: collaborators } }
}

const EquipoPage: FC = async () => {
  const { admins, moderators, collaborators } = await getTeams()
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
      {admins.total >= 1
        ? (
          <Container
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'medium',
              flexWrap: 'wrap',
              padding: 'medium',
              width: '100%'
            })}
          >
            {admins.users.map((user, index) => (
              <div
                key={`admin-${index}`}
                className={cx(card({ variant: 'retro' }).body, css({
                  maxWidth: '300px',
                  textAlign: 'center'
                }))}
              >
                <div
                  className={cx(card({ variant: 'retro' }).media, center())}
                >
                  <NextImage
                    src={user.prefs.profilePicture ?? '/images/EntGamers.png'}
                    alt={user.name !== '' ? user.name : `Usuario ${index + 1} avatar`}
                    width={120}
                    height={120}
                  />
                </div>
                <div
                  className={card({ variant: 'retro' }).content}
                >
                  <Typography variant="h3" align="center">{user.name !== '' ? user.name : `Usuario ${index + 1}`}</Typography>
                  {user.prefs.bio !== undefined && user.prefs.bio !== '' && (
                    <Typography variant="body1">{user.prefs.bio}</Typography>
                  )}
                </div>
              </div>
            ))}
          </Container>
        )
        : (
          <Typography variant="body2" color="info">
            Ups, parece que ahora mismo no hay administradores, pero en EntGamers siempre estamos estamos buscando gente que quiera organizar cosas para la comunidad, puedes contactarnos para formar parte de nuestro equipo haciendo click en el siguiente enlace.
          </Typography>
        )
      }
      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href={`/equipo/unirse?role=${ADMIN_CLAN_ID}`}
        >
          ¡Quiero ser Administrador!
        </NextLink>
      </div>
      <Typography variant="h2" align="center">Moderadores</Typography>
      <Typography variant="body1">
        Los moderadores son los encargados de mantener el orden en los grupos de la comunidad, así como de ayudar a los usuarios a resolver sus dudas.
      </Typography>
      {moderators.total >= 1
        ? (
          <Container
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'medium',
              flexWrap: 'wrap',
              padding: 'medium',
              width: '100%'
            })}
          >
            {moderators.users.map((user, index) => (
              <div
                key={`moderator-${index}`}
                className={cx(card({ variant: 'retro' }).body, css({
                  maxWidth: '300px',
                  textAlign: 'center'
                }))}
              >
                <div
                  className={cx(card({ variant: 'retro' }).media, center())}
                >
                  <NextImage
                    src={user.prefs.profilePicture ?? '/images/EntGamers.png'}
                    alt={user.name !== '' ? user.name : `Usuario ${index + 1} avatar`}
                    width={120}
                    height={120}
                  />
                </div>
                <div
                  className={card({ variant: 'retro' }).content}
                >
                  <Typography variant="h3" align="center">{user.name !== '' ? user.name : `Usuario ${index + 1}`}</Typography>
                  {user.prefs.bio !== undefined && user.prefs.bio !== '' && (
                    <Typography variant="body1">{user.prefs.bio}</Typography>
                  )}
                </div>
              </div>
            ))}
          </Container>
        )
        : (
          <Typography variant="body2" color="info">
            Ups, parece que ahora mismo no hay moderadores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser moderador, puedes hacer click en el botón de abajo.
          </Typography>
        )
      }
      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href={`/equipo/unirse?role=${moderators.id}`}
        >
          ¡Quiero ser moderador!
        </NextLink>
      </div>
      <Typography variant="h2" align="center">Colaboradores</Typography>
      <Typography variant="body1">
        Los colaboradores son los encargados de crear contenido para la comunidad, como artículos, tutoriales, vídeos, eventos etc.
      </Typography>
      {collaborators.total >= 1
        ? (
          <Container
            className={css({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'medium',
              flexWrap: 'wrap',
              padding: 'medium',
              width: '100%'
            })}
          >
            {collaborators.users.map((user, index) => (
              <div
                key={`collaborator-${index}`}
                className={cx(card({ variant: 'retro' }).body, css({
                  maxWidth: '300px',
                  textAlign: 'center'
                }))}
              >
                <div
                  className={cx(card({ variant: 'retro' }).media, center())}
                >
                  <NextImage
                    src={user.prefs.profilePicture ?? '/images/EntGamers.png'}
                    alt={user.name !== '' ? user.name : `Usuario ${index + 1} avatar`}
                    width={120}
                    height={120}
                  />
                </div>
                <div
                  className={card({ variant: 'retro' }).content}
                >
                  <Typography variant="h3" align="center">{user.name !== '' ? user.name : `Usuario ${index + 1}`}</Typography>
                  {user.prefs.bio !== undefined && user.prefs.bio !== '' && (
                    <Typography variant="body1">{user.prefs.bio}</Typography>
                  )}
                </div>
              </div>
            ))}
          </Container>
        )
        : (
          <Typography variant="body2" color="info">
            Ups, parece que ahora mismo no hay colaboradores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser colaborador, puedes hacer click en el botón de abajo.
          </Typography>
        )
      }
      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href={`/equipo/unirse?role=${collaborators.id}`}
        >
          ¡Quiero ser colaborador!
        </NextLink>
      </div>
    </Container>
  )
}

export default EquipoPage
