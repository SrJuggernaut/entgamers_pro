import { type Models } from 'appwrite'

export interface TeamApplyData {
  name: string
  email: string
  discordName: string
  message: string
  role: 'moderator' | 'administrator' | 'collaborator'
}

export type TeamApplyDocument = Models.Document & TeamApplyData

export type TeamApplyList = Models.DocumentList<TeamApplyDocument>
