import { faFacebook, faInstagram, faTiktok, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Avatar, Card, CardContent, IconButton, Tooltip, Typography } from '@mui/material'
import NextImage from 'next/image'
import { FC } from 'react'

import { SocialLink } from '@interfaces'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import BadgeBook from '@assets/images/gaming/BadgeBook.png'
import BadgeShield from '@assets/images/gaming/BadgeShield.png'
import BadgeSword from '@assets/images/gaming/BadgeSword.png'
import ButtonA from '@assets/images/gaming/ButtonA.png'

export interface ProfileCardProps {
  userName: string
  biography: string
  avatar: string
  socialNetworks: SocialLink[]
  role: 'user'| 'moderator'| 'collaborator' | 'admin'
}

const ProfileCard: FC<ProfileCardProps> = ({ avatar, biography, socialNetworks, userName, role }) => {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        maxWidth: '300px',
        overflow: 'visible'
      }}
      variant="gbaDialog"
    >
      {role !== 'user' && (
        <Tooltip
          title={role}
          placement="top"
          arrow
        >
          <div
            css={{
              position: 'absolute',
              top: '5px',
              right: '5px'
            }}
          >
            <NextImage
              src={role === 'moderator' ? BadgeShield : role === 'collaborator' ? BadgeBook : BadgeSword}
              width={30}
              height={30}
            />
          </div>
        </Tooltip>
      )}
      <div
        css={{
          position: 'absolute',
          bottom: '-15px',
          right: '0px'
        }}
      >
        <NextImage
          src={ButtonA}
          width={30}
          height={30}
        />
      </div>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 0
          }}
        >
          <Avatar
            sx={{
              width: '120px',
              height: '120px',
              backgroundColor: 'transparent'
            }}
          >
            <NextImage
              src={avatar}
              width={150}
              height={150}
            />
          </Avatar>
        </div>
        <Typography variant='h4' component="h3" align="center" sx={{ marginBlock: 1, flexGrow: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
          {userName}
        </Typography>
        <Typography variant='body1' align="center" sx={{ marginBlock: 1, flexGrow: 1 }}>
          {biography.replace(/^(.{120}[^\s]*).*/, '$1…')}
        </Typography>
        <div
          css={{
            display: 'flex',
            flexWrap: 'wrap',
            flexGrow: 0,
            justifyContent: 'space-around',
            alignItems: 'center',
            marginTop: 'auto'
          }}
        >
          {socialNetworks.map(({ socialNetwork, url, label }, i) => (
            <Tooltip
              key={`${userName}-${socialNetwork}-${i}`}
              title={label}
              placement="top"
              arrow
            >
              <IconButton

                href={url}
                target="_blank"
                rel="noopener noreferrer"
                color="inherit"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  aspectRatio: '1'
                }}
              >
                {((socialNetwork) => {
                  switch (socialNetwork) {
                  case 'facebook':
                    return <FontAwesomeIcon icon={faFacebook} size="xs" />
                  case 'twitter':
                    return <FontAwesomeIcon icon={faTwitter} size="xs" />
                  case 'instagram':
                    return <FontAwesomeIcon icon={faInstagram} size="xs" />
                  case 'twitch':
                    return <FontAwesomeIcon icon={faTwitch} size="xs" />
                  case 'youtube':
                    return <FontAwesomeIcon icon={faYoutube} size="xs" />
                  case 'tiktok':
                    return <FontAwesomeIcon icon={faTiktok} size="xs" />
                  default:
                    return <FontAwesomeIcon icon={faGlobe} size="xs" />
                  }
                })(socialNetwork)}
              </IconButton>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
export default ProfileCard
