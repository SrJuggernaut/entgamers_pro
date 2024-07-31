import Typography from '@/components/ui/Typography'
import { css } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'
import { button } from '@/styled-system/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const NotFoundPage: FC = () => {
  return (
    <Center
      flexDirection="column"
      width="100%"
      height="calc(100vh - 60px - 72px)"
      gap="medium"
    >
      <Typography variant="h1" className={css({ fontSize: '100px' })}>404</Typography>
      <Typography variant="h2" color="text">El árbol que buscas no está aquí</Typography>
      <NextLink className={button({})} href="/">Volver Al inicio</NextLink>
    </Center>
  )
}
export default NotFoundPage
