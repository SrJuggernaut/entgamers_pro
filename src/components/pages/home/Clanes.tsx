import { Box, Button, Container, Paper, Typography } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import ClanesImage from '@assets/images/Clanes.png'

export interface ClanesProps {
  title: string
  description: string
}

const Clanes: FC<ClanesProps> = ({ description, title }) => {
  return (
    <div
      id="clanes"
      css={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url("/images/backgrounds/bricks.png")'
      }}
    >
      <Paper
        variant='glass'
        component={Container}
      >
        <Typography
          variant="h2"
          align="center"
          gutterBottom
        >
          {title}
        </Typography>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'center',
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
              gridTemplateColumns: '1fr 1fr'
            }
          })}
        >
          <div>
            <Image src={ClanesImage} alt="EntGamers" width={600} height={315} />
          </div>
          <div
            css={{
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" gutterBottom >
              {description}
            </Typography>
            <Button variant="contained" color="primary" LinkComponent={Link} component="a" href="/clanes">
              Ver clanes
            </Button>
          </div>
        </Box>
      </Paper>
    </div>
  )
}

export default Clanes
