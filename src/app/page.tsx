import Clanes from '@/app/Clanes'
import Hero from '@/app/Hero'
import Social from '@/app/Social'
import Team from '@/app/Team'
import { type FC } from 'react'

const HomePage: FC = () => {
  return (
    <>
      <Hero />
      <Clanes />
      <Social />
      <Team />
    </>
  )
}

export default HomePage
