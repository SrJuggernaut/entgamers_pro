import { type SeoProps as Seo } from '@components/Seo' // Temporary taken from components to later implement it in the interfaces folder

export interface ClanesPageProps {
  seo?: Seo
  title: string
  description: string
  benefitsTitle: string
  benefitsDescription: string
  benefits: string[]
  requirementsTitle: string
  requirementsDescription: string
  requirements: string[]
}
