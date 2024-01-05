import LoginForm from '@/app/login/LoginForm'
import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'
import { container } from '@/styled-system/patterns'
import { card } from '@/styled-system/recipes'
import NextLink from 'next/link'
import { type FC } from 'react'

const LoginPage: FC = () => {
  return (
    <>
      <Center
        className={cx(
          container(),
          css({
            minHeight: 'calc(100vh - 60px - 72px)'
          }))
        }
      >
        <div
          className={cx(
            card().body,
            css({
              width: '100%',
              maxWidth: { sm: 'breakpoint-sm' },
              overflow: 'visible'
            })
          )}
        >
          <div
            className={
              card().header
            }
          >
            <Typography align="center" variant="h1">
              Iniciar sesión
            </Typography>
          </div>
          <div
            className={card().content}
          >
            <LoginForm />
            <Typography variant="caption" align="center" >
              No tienes una cuenta? <NextLink href="/register">Regístrate</NextLink>
            </Typography>
          </div>
        </div>
      </Center>
    </>
  )
}
export default LoginPage
