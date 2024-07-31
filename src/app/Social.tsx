import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'
import { container } from '@/styled-system/patterns'
import { button, card } from '@/styled-system/recipes'
import { type FC } from 'react'

const layerCss = css({
  backgroundPositionY: 'bottom',
  backgroundPositionX: 'x-start',
  backgroundRepeat: 'repeat',
  backgroundSize: 'initial',
  minHeight: '75vh',
  width: '100%',
  willChange: 'background-position-y',
  animationName: 'bgMotion',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite'
})

const Social: FC = () => {
  return (
    <section
      className={css({
        backgroundImage: 'url(/images/backgrounds/SkyNightLayer01.png)',
        backgroundPositionY: 'center',
        backgroundPositionX: 'center'
      })}
    >
      <div
        className={cx(layerCss, css({
          backgroundImage: 'url(/images/backgrounds/SkyNightLayer02.png)',
          animationDuration: '150s'
        }))}
      >
        <div
          className={cx(layerCss, css({
            backgroundImage: 'url(/images/backgrounds/SkyNightLayer03.png)',
            animationDuration: '125s'
          }))}
        >

          <Center
            className={cx(layerCss, css({
              backgroundImage: 'url(/images/backgrounds/SkyNightLayer04.png)',
              animationDuration: '100s'
            }))}
          >
            <div
              className={cx(card({ variant: 'glass' }).body, container({}))}
            >
              <div
                className={card({ variant: 'glass' }).content}
              >
                <Typography variant="h2" align='center'>Redes Sociales</Typography>
                <Typography variant="body1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate deleniti dolore quas sed nemo sit, officia in rem nesciunt quisquam possimus ab! Labore sed reprehenderit quae, hic earum tempora placeat cumque id eos itaque perferendis nulla officia fuga porro, quis, unde facere accusamus repudiandae non?
                </Typography>
                <Center>
                  <a
                    className={button()}
                    href="/links"
                  >
                    Nuestros Links
                  </a>
                </Center>
              </div>
            </div>
          </Center>
        </div>
      </div>
    </section>
  )
}
export default Social
