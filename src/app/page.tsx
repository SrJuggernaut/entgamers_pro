import Clanes from '@/app/Clanes'
import Hero from '@/app/Hero'
import Social from '@/app/Social'
import Team from '@/app/Team'
import { ensureRoles } from '@/services/backend/roles'
import { ensureTeamApplyCollection } from '@/services/backend/teamApply'
import { type FC } from 'react'

const ensureAll = async (): Promise<void> => {
  await ensureRoles()
  await ensureTeamApplyCollection()
}

const HomePage: FC = async () => {
  await ensureAll()
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
