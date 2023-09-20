import { type IconDefinition } from '@fortawesome/fontawesome-svg-core'

export interface TeamMember {
  image: string
  name: string
  role: 'moderator' | 'administrator' | 'collaborator'
  description: string
  socialNetworks: Array<{
    label: string
    url: string
    icon: IconDefinition
  }>
}
