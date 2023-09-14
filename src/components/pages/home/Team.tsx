import { Button, Container, Typography } from '@mui/material'
import NextLink from 'next/link'
import { FC } from 'react'

import ProfileCard, { ProfileCardProps } from '@components/profiles/ProfileCard'

export interface TeamProps {
  title: string
  teamMembers: ProfileCardProps[]
  viewTeamButtonText: string
  joinTeamButtonText: string
}

const Team: FC<TeamProps> = ({ title, teamMembers, joinTeamButtonText, viewTeamButtonText }) => {
  return (
    <div
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(/images/backgrounds/MysteriousForest.jpg)',
        backgroundPositionX: 'bottom',
        backgroundPositionY: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat-x'
      }}
    >
      <Container>
        <Typography variant='h2' align="center" gutterBottom>{title}</Typography>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gridGap: '1rem',
            justifyContent: 'center',
            justifyItems: 'center',
            marginBlock: 2
          }}
        >
          {teamMembers.map(({ avatar, biography, socialNetworks, userName, role }) => (
            <ProfileCard
              key={`profile-card-${userName}` }
              avatar={avatar}
              biography={biography}
              socialNetworks={socialNetworks}
              userName={userName}
              role={role}
            />
          ))}
        </div>
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBlock: '16px'
          }}
        >
          <Button
            href="/equipo"
            variant="contained"
            color="info"
            component={NextLink}
          >
            {viewTeamButtonText}
          </Button>
          <Button
            href="/equipo/unirse"
            variant="contained"
            color="success"
            component={NextLink}
          >
            {joinTeamButtonText}
          </Button>
        </div>
      </Container>
    </div>
  )
}

export default Team
