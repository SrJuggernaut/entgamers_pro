import gsap, { Linear } from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ScrollToPlugin from 'gsap/dist/ScrollToPlugin'
import { Container, Paper } from '@mui/material'
import { FC, useEffect, useRef } from 'react'

import SocialSlider, { SocialSliderProps } from '@components/pages/home/socialNetworks/SocialSlider'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

export interface SocialNetworksProps {
  socialNetworks: SocialSliderProps['slides']
}

const SocialNetworks: FC<SocialNetworksProps> = ({ socialNetworks }) => {
  const layer01 = useRef<HTMLDivElement| null>(null)
  const layer02 = useRef<HTMLDivElement| null>(null)
  const layer03 = useRef<HTMLDivElement| null>(null)
  const layer04 = useRef<HTMLDivElement| null>(null)

  useEffect(() => {
    const scrollTrigger = {
      trigger: layer01.current,
      start: 'top bottom',
      end: 'bottom top',
      toggleActions: 'play pause resume pause'
    }
    const layer02Animation = gsap.to(layer02.current, { duration: 150, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer03Animation = gsap.to(layer03.current, { duration: 60, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })
    const layer04Animation = gsap.to(layer04.current, { duration: 125, backgroundPositionX: '2048px', repeat: -1, ease: Linear.easeNone, scrollTrigger })

    return () => {
      layer02Animation.kill()
      layer03Animation.kill()
      layer04Animation.kill()
    }
  }, [])

  return (
    <div
      ref={layer01}
      css={{
        minHeight: '100vh',
        backgroundImage: 'url(/images/backgrounds/SkyNightLayer01.png)',
        backgroundPositionX: 'center',
        backgroundPositionY: 'center',
        backgroundSize: 'auto'
      }}
    >
      <div
        ref={layer02}
        css={{
          minHeight: '100vh',
          backgroundImage: 'url(/images/backgrounds/SkyNightLayer02.png)',
          backgroundPositionX: '0',
          backgroundPositionY: 'center',
          backgroundSize: 'auto',
          backgroundRepeat: 'repeat-x'
        }}
      >
        <div
          ref={layer03}
          css={{
            minHeight: '100vh',
            backgroundImage: 'url(/images/backgrounds/SkyNightLayer03.png)',
            backgroundPositionX: '0',
            backgroundPositionY: 'center',
            backgroundSize: 'auto',
            backgroundRepeat: 'repeat-x'
          }}
        >
          <div
            ref={layer04}
            css={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              backgroundImage: 'url(/images/backgrounds/SkyNightLayer04.png)',
              backgroundPositionX: '0',
              backgroundPositionY: 'center',
              backgroundSize: 'auto',
              backgroundRepeat: 'repeat-x'
            }}
          >
            <Paper
              component={Container}
              variant='glass'
            >
              <SocialSlider
                slides={socialNetworks}
              />
            </Paper>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialNetworks
