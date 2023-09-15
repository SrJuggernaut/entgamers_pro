import { type SeoProps as Seo } from '@components/Seo' // Temporary taken from components to later implement it in the interfaces folder

export interface TeamPositionRequirements {
  title: string
  description: string
}

export interface TeamPositionBenefits {
  title: string
  description: string
}

export interface TeamPosition {
  title: string
  description: string
  requirements: TeamPositionRequirements[]
  benefits: TeamPositionBenefits[]
}

export interface EquipoUnirsePageProps {
  seo?: Seo
  title: string
  description: string
  teamPositions: TeamPosition[]
}

export interface UnirseFormData {
  name: string
  email: string
  discordUserName: string
  experience: string
  role: string
}

export interface UnirseFormProps {
  role?: string
}
