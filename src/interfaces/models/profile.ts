import { type SocialLink } from '@interfaces'

export interface Profile {
  id: string
  userName: string
  email: string
  biography: string
  avatar: string
  socialNetworks: SocialLink[]
  role: 'user' | 'admin' | 'moderator' | 'collaborator'
  createdAt: string
  updatedAt: string
}
