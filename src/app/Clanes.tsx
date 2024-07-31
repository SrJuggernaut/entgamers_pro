import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'
import { center, container } from '@/styled-system/patterns'
import { button, card } from '@/styled-system/recipes'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { type FC } from 'react'

const Clanes: FC = () => {
  return (
    <section
      id="clanes"
      className={cx(center({}), css({
        minHeight: '75vh',
        backgroundImage: 'url(/images/backgrounds/bricks.png)'
      }))}
    >
      <div
        className={cx(card({ variant: 'glass' }).body, container({}))}
      >
        <div
          className={card({ variant: 'glass' }).content}
        >
          <Typography variant="h2" align='center'>Clanes</Typography>
          <div
            className={css({
              display: 'grid',
              alignItems: 'center',
              gridTemplateColumns: { base: '1fr 1fr', smDown: '1fr' },
              gap: 'medium'
            })}
          >
            <div
              className={css({
                order: { base: 0, smDown: 1 }
              })}
            >
              <Typography variant="body1">Los clanes son espacios donde compartir nuestros gustos con otros usuarios, dándonos la oportunidad de organizar proyectos y eventos en los cuales formar parte.</Typography>
              <Center>
                <NextLink
                  className={button()}
                  href="/clanes"
                >
                  Ver Clanes
                </NextLink>

              </Center>
            </div>
            <div
              className={css({
                order: { base: 1, smDown: 0 }
              })}
            >
              <NextImage
                src="/images/Clanes.png"
                alt="Clanes"
                width={1200}
                height={630}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default Clanes
