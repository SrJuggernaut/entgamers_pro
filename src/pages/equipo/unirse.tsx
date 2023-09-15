import { Paper, Tab, Tabs, Theme, Typography, useMediaQuery } from '@mui/material'
import { GetStaticProps, GetStaticPropsResult, InferGetStaticPropsType } from 'next'
import { FC, useState } from 'react'

import Contained from '@components/layouts/Contained'
import Seo from '@components/Seo'
import { EquipoUnirsePageProps } from '@interfaces'

import 'swiper/css'
import 'swiper/css/virtual'

export const getStaticProps: GetStaticProps<EquipoUnirsePageProps> = async (): Promise<GetStaticPropsResult<EquipoUnirsePageProps>> => {
  const props: EquipoUnirsePageProps = {
    seo: {
      title: 'Unirse al equipo',
      description: ''
    },
    title: 'Únete al Bosque',
    description: 'El equipo de EntGamers está formado por personas que se dedican a la administración de la comunidad, a la organización de eventos y a la creación de contenido. Aquí podrás enterarte cuales son las funciones de cada uno de los miembros del equipo y como puedes unirte a nosotros.',
    teamPositions: [
      {
        title: 'Administradores',
        description: 'Los administradores son quienes se encargan de que todo funcione como es debido en la comunidad, desde la moderación de los grupos hasta la organización de eventos.',
        requirements: [
          {
            title: 'Profesionalismo',
            description: 'La comunidad siempre intenta conseguir el mayor nivel de calidad en todos sus proyectos, por lo que buscamos gente dispuesta a otorgar este nivel de profesionalismo para el disfrute de la comunidad.'
          },
          {
            title: 'Constancia',
            description: 'La comunidad busca gente que en sus posibilidades sea activa, que pueda estar al tanto de lo que pasa en ella.'
          },
          {
            title: 'Proactividad',
            description: 'La comunidad esta en constante crecimiento, por eso, buscamos gente que ayude a buscar nuevas oportunidades para diferentes proyectos y actividades de interés a la comunidad.'
          }
        ],
        benefits: [
          {
            title: 'Experiencia',
            description: 'Uno de los  objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos  equiparable a un entorno laboral, que sea comprobable y útil.'
          },
          {
            title: 'Acceso a software usado en los proyectos',
            description: 'La comunidad tiene como objetivo proveer acceso al software usado para sus actividades a sus miembros.'
          },
          {
            title: 'Capacitación',
            description: 'La comunidad buscara dar capacitación a sus miembros en lo referido a herramientas y procedimientos utilizados.'
          }
        ]
      },
      {
        title: 'Moderadores',
        description: 'El equipo de moderación de EntGamers se encarga de moderar los distintos espacios en los que se desenvuelve la comunidad, como los grupos de Facebook, Discord, Etc.',
        requirements: [
          {
            title: 'Imparcialidad',
            description: 'La comunidad esta conformada por amigos y conocidos, por lo tanto es importante poder actuar de forma imparcial y responsable.'
          }
        ],
        benefits: [
          {
            title: 'Experiencia',
            description: 'Uno de los  objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos equiparable a un entorno laboral, que sea comprobable y útil.'
          }
        ]
      },
      {
        title: 'Colaboradores',
        description: 'Los colaboradores son quienes se encargan de la creación de contenido para la comunidad, como videos, artículos, etc.',
        requirements: [
          {
            title: 'Creatividad',
            description: 'La comunidad busca gente que pueda aportar ideas y contenido de calidad para la comunidad.'
          },
          {
            title: 'Profesionalismo',
            description: 'La comunidad siempre intenta conseguir el mayor nivel de calidad en todos sus proyectos, por lo que buscamos gente dispuesta a otorgar este nivel de profesionalismo para el disfrute de la comunidad.'
          }
        ],
        benefits: [
          {
            title: 'Experiencia',
            description: 'Uno de los  objetivos de la comunidad es brindar experiencia en gestión y desarrollo de proyectos equiparable a un entorno laboral, que sea comprobable y útil.'
          }
        ]
      }
    ]
  }
  return {
    props
  }
}

const Unirse: FC<InferGetStaticPropsType<typeof getStaticProps>> = ({ title, seo, description, teamPositions }) => {
  const [currentTab, setCurrentTab] = useState(0)

  const isMediumOrBigger = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

  return (
    <Contained>
      <Seo {...seo} />
      <Typography variant="h1" align="center" gutterBottom >
        {title}
      </Typography>
      <Typography variant="body1">
        {description}
      </Typography>
      <Paper
        sx={{
          marginBlock: 1
        }}
        elevation={0}
      >
        <Tabs
          value={currentTab}
          onChange={(_, value) => setCurrentTab(value)}
          variant={isMediumOrBigger ? 'fullWidth' : 'scrollable'}
          scrollButtons
          allowScrollButtonsMobile
          aria-label="Unirse al equipo"
        >
          {teamPositions.map((position, index) => (
            <Tab key={index} label={position.title} id={`pestaña-${position.title.replace(' ', '-')}`} aria-controls={`panel-pestaña-${position.title.replace(' ', '-')}`} />
          ))}
        </Tabs>
      </Paper>

    </Contained>
  )
}

export default Unirse
