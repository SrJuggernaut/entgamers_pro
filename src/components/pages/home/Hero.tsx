import { Container, IconButton, Typography } from '@mui/material'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import gsap, { Elastic, Linear } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import Image from 'next/image'
import { FC, useEffect, useRef } from 'react'

import EntGamers from '@assets/images/EntGamers.png'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export interface HeroProps {
  title: string
  subtitle: string
}

const Hero: FC<HeroProps> = ({ subtitle, title }) => {
  const layer01 = useRef<HTMLDivElement| null>(null)
  const layer02 = useRef<HTMLDivElement| null>(null)
  const layer03 = useRef<HTMLDivElement| null>(null)
  const layer04 = useRef<HTMLDivElement| null>(null)
  const layer05 = useRef<HTMLDivElement| null>(null)
  const layer06 = useRef<HTMLDivElement| null>(null)
  const verMasButton = useRef<HTMLButtonElement| null>(null)
  useEffect(() => {
    const scrollTrigger = {
      trigger: layer01.current,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play pause resume pause'
    }
    const timeLine = gsap.timeline({ duration: 1, repeat: -1, repeatDelay: 4, scrollTrigger })
    const layer01Animation = gsap.to(layer01.current, { duration: 175, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer02Animation = gsap.to(layer02.current, { duration: 150, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer03Animation = gsap.to(layer03.current, { duration: 125, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer04Animation = gsap.to(layer04.current, { duration: 100, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer05Animation = gsap.to(layer05.current, { duration: 75, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer06Animation = gsap.to(layer06.current, { duration: 50, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    timeLine
      .to(verMasButton.current, { y: '+=15', duration: 0.5 })
      .to(verMasButton.current, { y: '-=15', ease: Elastic.easeOut.config(2, 0.1), duration: 3 })
    return () => {
      layer01Animation.kill()
      layer02Animation.kill()
      layer03Animation.kill()
      layer04Animation.kill()
      layer05Animation.kill()
      layer06Animation.kill()
      timeLine.kill()
    }
  }, [])

  return (
    <div
      ref={layer01}
      css={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer01.png)',
        backgroundPositionX: '0',
        backgroundPositionY: 'top',
        backgroundSize: 'auto',
        backgroundRepeat: 'repeat-x'
      }}
    >
      <div
        ref={layer02}
        css={{
          minHeight: '100vh',
          backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer02.png)',
          backgroundPositionX: '0',
          backgroundPositionY: 'bottom',
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-x'
        }}
      >
        <div
          ref={layer03}
          css={{
            minHeight: '100vh',
            backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer03.png)',
            backgroundPositionX: '0',
            backgroundPositionY: 'bottom',
            backgroundSize: 'auto',
            backgroundRepeat: 'repeat-x'
          }}
        >
          <div
            ref={layer04}
            css={{
              minHeight: '100vh',
              backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer04.png)',
              backgroundPositionX: '0',
              backgroundPositionY: 'bottom',
              backgroundSize: 'auto',
              backgroundRepeat: 'repeat-x'
            }}
          >
            <div
              ref={layer05}
              css={{
                minHeight: '100vh',
                backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer05.png)',
                backgroundPositionX: '0',
                backgroundPositionY: 'bottom',
                backgroundSize: 'auto',
                backgroundRepeat: 'repeat-x'
              }}
            >
              <div
                ref={layer06}
                css={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh',
                  backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer06.png)',
                  backgroundPositionX: '0',
                  backgroundPositionY: 'bottom',
                  backgroundSize: 'auto',
                  backgroundRepeat: 'repeat-x'
                }}
              >
                <Container
                  fixed
                  sx={(theme) => ({
                    display: 'grid',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gridTemplateColumns: '1fr',
                    [theme.breakpoints.up('md')]: {
                      gridTemplateColumns: '1fr 1fr'
                    }
                  })}
                >
                  <div>
                    <Image src={EntGamers} alt="EntGamers" width={600} height={600} loading="eager" />
                  </div>
                  <div>
                    <Typography variant="h1" gutterBottom align="center">
                      {title}
                    </Typography>
                    <Typography variant="h2" gutterBottom align="center">
                      {subtitle}
                    </Typography>
                  </div>
                </Container>
                <IconButton
                  ref={verMasButton}
                  sx={(theme) => ({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '2rem',
                    right: '1rem',
                    aspectRatio: '1',
                    [theme.breakpoints.up('md')]: {
                      bottom: '1rem',
                      right: 'calc(50% - 1rem)'
                    }
                  })}
                  onClick={() => {
                    gsap.to(window, { duration: 0.3, scrollTo: '#clanes' })
                  }}
                  color='primary'
                >
                  <FontAwesomeIcon icon={faArrowDown} fixedWidth />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
