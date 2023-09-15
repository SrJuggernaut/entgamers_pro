import Contained from '@components/layouts/Contained'
import { Box, Button, Typography } from '@mui/material'
import NextLink from 'next/link'
import { type FC } from 'react'

const Page404: FC = () => {
  return (
    <Contained>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'calc(100vh - 120px)',
          paddingBlock: 1
        }}
      >
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontSize: '100px'
          }}
        >
          404
        </Typography>
        <Typography
          variant="h2"
          align="center"
          sx={(theme) => ({
            color: theme.palette.text.primary
          })}
        >
          El árbol que buscas no está aquí
        </Typography>
        <Button
          sx={{
            marginBlock: 1
          }}
          href="/"
          component={NextLink}
          variant="contained"
        >
          Volver al inicio
        </Button>
      </Box>
    </Contained>
  )
}

export default Page404
