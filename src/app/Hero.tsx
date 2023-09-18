import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Center, Container } from '@/styled-system/jsx'
import { iconButton } from '@/styled-system/recipes'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextImage from 'next/image'
import { type FC } from 'react'

const layerCss = css({
  backgroundPositionY: 'bottom',
  backgroundPositionX: 'x-start',
  backgroundRepeat: 'repeat',
  backgroundSize: 'initial',
  height: '100vh',
  width: '100%',
  willChange: 'background-position-y',
  animationName: 'bgMotion',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite'
})

const Hero: FC = () => {
  return (
    <section
      className={cx(layerCss, css({
        backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer01.png)',
        marginTop: '-76px',
        animationDuration: '175s',
        position: 'relative'
      }))}
    >
      <div
        className={cx(layerCss, css({
          backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer02.png)',
          animationDuration: '150s'
        }))}
      >
        <div
          className={cx(layerCss, css({
            backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer03.png)',
            animationDuration: '125s'
          }))}
        >
          <div
            className={cx(layerCss, css({
              backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer04.png)',
              animationDuration: '100s'
            }))}
          >
            <div
              className={cx(layerCss, css({
                backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer05.png)',
                animationDuration: '75s'
              }))}
            >
              <Center
                className={cx(layerCss, css({
                  backgroundImage: 'url(/images/backgrounds/MysteriousForestNightLayer06.png)',
                  animationDuration: '50s'
                }))}
              >
                <Container
                  className={css({
                    display: 'grid',
                    gridTemplateColumns: { base: '1fr 1fr', smDown: '1fr' },
                    alignItems: 'center'
                  })}
                >
                  <div
                    className={css({
                      order: { base: 0, smDown: 1 }
                    })}
                  >
                    <Typography
                      variant="h1"
                      align="center"
                    >
                      EntGamers
                    </Typography>
                    <Typography
                      variant="h2"
                      align="center"
                      color="text"
                    >
                      Comunidad de y para los gamers
                    </Typography>
                  </div>
                  <div
                    className={css({
                      order: { base: 1, smDown: 0 }
                    })}
                  >
                    <NextImage
                      src="/images/EntGamers.png"
                      alt="EntGamers"
                      width={500}
                      height={500}
                    />
                  </div>
                </Container>
              </Center>
            </div>
          </div>
        </div>
      </div>
      <a
        href="#clanes"
        className={cx(iconButton({
          color: 'primary',
          size: 'large'
        }), css({
          position: 'absolute',
          bottom: '45px',
          right: '50%',
          animationName: 'bounce',
          animationDuration: '1s',
          animationIterationCount: 'infinite',
          transform: 'translateX(50%)',
          zIndex: 1,
          '&:hover': {
            animationPlayState: 'paused'
          }
        }))}
      >
        <FontAwesomeIcon icon={faArrowDown} size='lg' fixedWidth />
      </a>
    </section>
  )
}
export default Hero
