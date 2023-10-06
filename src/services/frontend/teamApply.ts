import { ID, databases } from '@/lib/appwrite'
import { DATABASE_ID } from '@/services/frontend/database'
import { type TeamApplyData, type TeamApplyDocument, type TeamApplyList } from '@/types/teamApply'

export const TEAM_APPLY_COLLECTION_NAME = 'team-apply'
export const TEAM_APPLY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TEAM_APPLY_COLLECTION_ID ?? TEAM_APPLY_COLLECTION_NAME

export const createTeamApply = async (data: TeamApplyData): Promise<TeamApplyDocument> => {
  const createdTeamApply = await databases.createDocument<TeamApplyDocument>(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, ID.unique(), data)
  return createdTeamApply
}

export const getTeamApply = async (teamApplyId: string): Promise<TeamApplyDocument> => {
  const teamApply = await databases.getDocument<TeamApplyDocument>(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, teamApplyId)
  return teamApply
}

export const listTeamApply = async (): Promise<TeamApplyList> => {
  const teamApplyList = await databases.listDocuments<TeamApplyDocument>(DATABASE_ID, TEAM_APPLY_COLLECTION_ID)
  return teamApplyList
}

export const deleteTeamApply = async (teamApplyId: string): Promise<void> => {
  await databases.deleteDocument(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, teamApplyId)
}
