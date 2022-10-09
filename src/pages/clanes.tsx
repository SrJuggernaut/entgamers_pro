import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Typography } from '@mui/material'
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { FC } from 'react'

import Contained from '@components/layouts/Contained'
import { ClanesPageProps } from '@interfaces'
import Seo from '@components/Seo'

export const getStaticProps: GetStaticProps<ClanesPageProps> = async () => {
  return {
    props: {
      seo: {
        title: 'Clanes',
        description: 'Los clanes son espacios donde compartir nuestros gustos con otros usuarios'
      },
      title: 'Clanes',
      description: 'Los clanes son espacios donde compartir nuestros gustos con otros usuarios, dándonos la oportunidad de organizar proyectos y eventos en los cuales formar parte.',
      benefitsTitle: 'Beneficios de los clanes',
      benefitsDescription: 'La intención de EntGamers es brindar beneficios a los clanes que les permitan operar en un ambiente de comunicación y colaboración.',
      benefits: [
        'Espacio en servidor de Discord',
        'Apoyo de la administración con proyectos y eventos',
        'Apoyo del equipo de moderación'
      ],
      requirementsTitle: 'Requisitos para formar un clan',
      requirementsDescription: 'Todos los clanes deben cumplir con los siguientes requisitos:',
      requirements: [
        'Tener un encargado',
        'Ser inclusivos',
        'Crear un reglamento interno (De acuerdo a la temática del clan)',
        'Fomentar el compañerismo y la comunidad',
        'Aportar contenido de forma periódica para la comunidad',
        'Realizar al menos una actividad mensual con los integrantes'
      ]
    }
  }
}

const Clanes: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ benefits, benefitsDescription, benefitsTitle, description, requirements, requirementsDescription, requirementsTitle, seo, title }) => {
  return (
    <Contained>
      <Seo {...seo} />
      <Typography variant="h1" align="center" gutterBottom >
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: 'repeat(1fr)',
          gridGap: 2,
          [theme.breakpoints.up('md')]: {
            gridTemplateColumns: 'repeat(2, 1fr)'
          }
        })}
      >
        <div>
          <Typography variant="h2" align="center" gutterBottom >
            {benefitsTitle}
          </Typography>
          <Typography variant="body1">
            {benefitsDescription}
          </Typography>
          <ul className="fa-ul">
            {benefits.map((benefit, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faChevronRight} listItem />
                {benefit}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Typography variant="h2" align="center" gutterBottom>
            {requirementsTitle}
          </Typography>
          <Typography variant="body1">
            {requirementsDescription}
          </Typography>
          <ul className="fa-ul">
            {requirements.map((requirement, index) => (
              <li key={index}>
                <FontAwesomeIcon icon={faChevronRight} listItem />
                {requirement}
              </li>
            ))}
          </ul>
        </div>
      </Box>
      <Typography variant="body2" color={(theme) => theme.palette.warning.main}>
        De momento el sistema de clanes está en desarrollo, por lo que no podemos ofrecerte acceso a los clanes hasta que esté listo. Sin embargo, puedes ir a nuestro servidor de discord para ver los clanes que tenemos disponibles, unirte a uno y convivir con otros usuarios.
      </Typography>
    </Contained>
  )
}
export default Clanes
