import { SeoProps as Seo } from '@components/Seo' // Temporary taken from components to later implement it in the interfaces folder

export interface EquipoPageProps {
  seo?: Seo
  title: string
  description: string
  administrationTitle: string
  administrationDescription: string
  collaboratorsTitle: string
  collaboratorsDescription: string
  moderatorsTitle: string
  moderatorsDescription: string
}
