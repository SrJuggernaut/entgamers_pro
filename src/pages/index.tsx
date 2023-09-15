import type { NextPage } from 'next'

import Seo from '@components/Seo'
import Footer from '@components/layouts/Footer'
import Header from '@components/layouts/Header'
import Clanes from '@components/pages/home/Clanes'
import Hero from '@components/pages/home/Hero'
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
