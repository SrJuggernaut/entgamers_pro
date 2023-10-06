import { teams } from '@/lib/nodeAppwrite'
import { type UserPreferences } from '@/types/User'

export const ADMIN_TEAM_NAME = 'admin'
export const ADMIN_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_ADMIN_TEAM_ID ?? ADMIN_TEAM_NAME
export const MODERATOR_TEAM_NAME = 'moderator'
export const MODERATOR_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_MODERATOR_TEAM_ID ?? MODERATOR_TEAM_NAME
export const COLLABORATOR_TEAM_NAME = 'collaborator'
export const COLLABORATOR_TEAM_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLABORATOR_TEAM_ID ?? COLLABORATOR_TEAM_NAME

const ensureRoleExists = (roleId: string, roleName: string): (() => Promise<void>) => {
  let roleExists = false
  return async (): Promise<void> => {
    if (roleExists) return
    try {
      await teams.get<UserPreferences>(roleId)
      roleExists = true
    } catch (error) {
      await teams.create(roleId, roleName)
      roleExists = true
    }
  }
}

export const ensureRoles = async (): Promise<void> => {
  const adminRole = ensureRoleExists(ADMIN_TEAM_ID, ADMIN_TEAM_NAME)
  const moderatorRole = ensureRoleExists(MODERATOR_TEAM_ID, MODERATOR_TEAM_NAME)
  const collaboratorRole = ensureRoleExists(COLLABORATOR_TEAM_ID, COLLABORATOR_TEAM_NAME)

  await Promise.all([
    adminRole(),
    moderatorRole(),
    collaboratorRole()
  ])
}
