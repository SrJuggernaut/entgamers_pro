import type { NextPage } from 'next'

import Seo from '@components/Seo'
import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import Clanes from '@components/pages/home/Clanes'
import Hero from '@components/pages/home/Hero'
import SocialNetworks from '@components/pages/home/SocialNetworks'
import Team from '@components/pages/home/Team'

const Home: NextPage = () => {
  return (
    <>
      <Seo
        title='Home'
        description='Comunidad Gamer'
        image='/images/defaults/og.jpg'
      />
      <Header />
      <Hero
        title="EntGamers"
        subtitle="Comunidad de y para los gamers"
      />
      <Clanes
        title='Clanes'
        description='Los clanes son espacios donde compartir nuestros gustos con otros usuarios, dándonos la oportunidad de organizar proyectos y eventos en los cuales formar parte.'
      />
      <SocialNetworks
        socialNetworks={[
          {
            socialNetwork: 'facebook',
            description: 'Puedes seguirnos en Facebook para ver memes sobre videojuegos, información sobre los Clanes,  la comunidad, eventos, etc. o formar parte del grupo para interactuar mas de cerca con otros integrantes de la comunidad',
            links: [
              {
                label: 'Pagina de Facebook',
                url: 'https://www.facebook.com/EntGamers/',
                variant: 'contained',
                color: 'primary'
              },
              {
                label: 'Grupo de Facebook',
                url: 'https://www.facebook.com/groups/EntGamers/',
                variant: 'contained',
                color: 'primary'
              }
            ]
          },
          {
            socialNetwork: 'twitter',
            description: 'Puedes seguirnos en Twitter para enterarte de las noticias mas recientes sobre la comunidad, eventos y demás información.',
            links: [
              {
                label: 'Twitter',
                url: 'https://twitter.com/EntGamers',
                variant: 'contained',
                color: 'primary'
              }
            ]
          }
        ]}
      />
      <Team
        title='Equipo'
        teamMembers={[
          {
            avatar: '/images/team/SrJuggernaut.png',
            biography: 'Soy desarrollador web y me gusta jugar videojuegos.',
            userName: 'SrJuggernaut',
            role: 'admin',
            socialNetworks: [
              { label: 'SrJuggernaut Facebook', socialNetwork: 'facebook', url: 'https://www.facebook.com/SrJuggernaut' },
              { label: 'SrJuggernaut Twitter', socialNetwork: 'twitter', url: 'https://twitter.com/SrJuggernaut' },
              { label: 'SrJuggernaut Youtube', socialNetwork: 'youtube', url: 'https://youtube.com/juggernautplays' },
              { label: 'SrJuggernaut Twitch', socialNetwork: 'twitch', url: 'https://twitch.tv/juggernautplays' },
              { label: 'SrJuggernaut Instagram', socialNetwork: 'instagram', url: 'https://www.instagram.com/sr_juggernaut' },
              { label: 'SrJuggernaut Sitio web', socialNetwork: 'webpage', url: 'https://srjuggernaut.dev' }
            ]
          }
        ]}
        viewTeamButtonText="Ve el equipo"
        joinTeamButtonText="Únete al equipo"
      />
      <Footer />
    </>
  )
}

export default Home
