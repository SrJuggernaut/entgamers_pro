import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { center } from '@/styled-system/patterns'
import { button, card } from '@/styled-system/recipes'
import { getClanMembers, getClanes } from 'entgamers-database/backend/clanes'
import { getUser, type UserWithPreferencesList } from 'entgamers-database/backend/users'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { type Models } from 'node-appwrite'
import { type FC } from 'react'

interface GetTeamsResponse {
  admins: UserWithPreferencesList
  moderators: UserWithPreferencesList
  collaborators: UserWithPreferencesList
}

const getTeams = async (): Promise<GetTeamsResponse> => {
  const allClanes = await getClanes()
  const adminClanId = allClanes.teams.find(clan => clan.name === 'Admin')?.$id
  const moderatorClanId = allClanes.teams.find(clan => clan.name === 'Moderator')?.$id
  const collaboratorClanId = allClanes.teams.find(clan => clan.name === 'Collaborator')?.$id
  const adminMembers: Models.MembershipList = adminClanId !== undefined ? await getClanMembers(adminClanId) : { total: 0, memberships: [] }
  const moderatorMembers: Models.MembershipList = moderatorClanId !== undefined ? await getClanMembers(moderatorClanId) : { total: 0, memberships: [] }
  const collaboratorMembers: Models.MembershipList = collaboratorClanId !== undefined ? await getClanMembers(collaboratorClanId) : { total: 0, memberships: [] }
  const adminsPromises = adminMembers.memberships.map(async membership => await getUser(membership.userId))
  const moderatorsPromises = moderatorMembers.memberships.map(async membership => await getUser(membership.userId))
  const collaboratorsPromises = collaboratorMembers.memberships.map(async membership => await getUser(membership.userId))
  const [admins, moderators, collaborators] = await Promise.all([
    Promise.all(adminsPromises), Promise.all(moderatorsPromises), Promise.all(collaboratorsPromises)
  ])
  return { admins: { total: admins.length, users: admins }, moderators: { total: moderators.length, users: moderators }, collaborators: { total: collaborators.length, users: collaborators } }
}

const EquipoPage: FC = async () => {
  const { admins } = await getTeams()
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
          <>
            <Typography variant="body2" color="info">
              Ups, parece que ahora mismo no hay administradores, pero en EntGamers siempre estamos estamos buscando gente que quiera organizar cosas para la comunidad, puedes contactarnos para formar parte de nuestro equipo haciendo click en el siguiente enlace.
            </Typography>
          </>
        )
      }
      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href="/equipo/unirse?role=Admin"
        >
          ¡Quiero ser Administrador!
        </NextLink>
      </div>
      {/* <Container
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
      </Container> */}
      <Typography variant="h2" align="center">Moderadores</Typography>
      <Typography variant="body1">
        Los moderadores son los encargados de mantener el orden en los grupos de la comunidad, así como de ayudar a los usuarios a resolver sus dudas.
      </Typography>
      <Typography variant="body2" color="info">
        Ups, parece que ahora mismo no hay moderadores, pero en EntGamers siempre estamos buscando gente que quiera ayudar a la comunidad. si quieres ser moderador, puedes hacer click en el botón de abajo.
      </Typography>
      <div className={center()}>
        <NextLink
          className={button({ color: 'info' })}
          href="/equipo/unirse?role=Moderator"
        >
          ¡Quiero ser moderador!
        </NextLink>
      </div>
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
          href="/equipo/unirse?role=Collaborator"
        >
          ¡Quiero ser colaborador!
        </NextLink>
      </div>
    </Container>
  )
}
export default EquipoPage
