import { css, cx } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { center } from '@/styled-system/patterns'
import { card, iconButton } from '@/styled-system/recipes'
import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextImage from 'next/image'
import { type FC } from 'react'

interface TeamMember {
  image: string
  name: string
  role: 'moderator' | 'administrator' | 'collaborator'
  description: string
  socialNetworks: Array<{
    label: string
    url: string
    icon: IconDefinition
  }>
}

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

const Team: FC = () => {
  return (
    <section
      className={center({
        minHeight: '75vh',
        backgroundImage: 'url(/images/backgrounds/MysteriousForest.jpg)'
      })}
    >
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
    </section>
  )
}
export default Team
