import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight'
import { Box, NoSsr, Typography } from '@mui/material'
import dynamic from 'next/dynamic'
import { FC } from 'react'

import { PositionJoinTeamProps } from '@interfaces'

const UnirseForm = dynamic(() => import('@components/pages/equipo/unirse/UnirseForm'), {
  ssr: false,
  suspense: false
})

const PositionJoinTeam:FC<PositionJoinTeamProps> = (
  { benefits, description, requirements, title }
) => {
  return (
    <Box>
      <Box
        sx={{
          marginBlock: '1rem'
        }}
      >
        <Typography variant="h2" align="center" gutterBottom>
          {title}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          {description}
        </Typography>
      </Box>
      <Box
        sx={theme => ({
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 2,
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: '1fr 1fr'
          }
        })}
      >
        <Box>
          <Typography variant="h3" align="center" gutterBottom>
            Rellenar formulario
          </Typography>
          <NoSsr>
            <UnirseForm
              role={title}
            />
          </NoSsr>
        </Box>
        <Box>
          <Typography variant="h3" gutterBottom>
            Requisitos
          </Typography>
          <ul className="fa-ul">
            {requirements.map(({ title, description }, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faChevronRight} className="fa-li" />
                <Typography variant="body1" gutterBottom>
                  <strong>{title}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {description}
                </Typography>
              </li>
            ))}
          </ul>
          <Typography variant="h3" gutterBottom>
            Beneficios
          </Typography>
          <ul className="fa-ul">
            {benefits.map(({ title, description }, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faChevronRight} className="fa-li" />
                <Typography variant="body1" gutterBottom>
                  <strong>{title}</strong>
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {description}
                </Typography>
              </li>
            ))}
          </ul>
        </Box>
      </Box>
    </Box>
  )
}
export default PositionJoinTeam
