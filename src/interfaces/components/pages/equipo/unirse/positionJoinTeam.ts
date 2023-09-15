import { type EquipoUnirsePageProps } from '@interfaces'

export interface PositionJoinTeamProps {
  title: EquipoUnirsePageProps['teamPositions'][number]['title']
  description: EquipoUnirsePageProps['teamPositions'][number]['description']
  requirements: EquipoUnirsePageProps['teamPositions'][number]['requirements']
  benefits: EquipoUnirsePageProps['teamPositions'][number]['benefits']
}
