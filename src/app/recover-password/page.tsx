import ManageRecoverPassword from '@/app/recover-password/ManageRecoverPassword'
import Typography from '@/components/ui/Typography'
import { css, cx } from '@/styled-system/css'
import { Center } from '@/styled-system/jsx'
import { container } from '@/styled-system/patterns'
import { card } from '@/styled-system/recipes'
import { type FC } from 'react'

const page: FC = () => {
  return (
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
          <Typography variant="h1" align="center">Recuperar contraseña</Typography>
        </div>
        <div
          className={card().content}
        >
          <ManageRecoverPassword />
        </div>
      </div>
    </Center>
  )
}

export default page
