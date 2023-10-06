import { Permission, Role, databases } from '@/lib/nodeAppwrite'
import { DATABASE_ID, ensureDatabase } from '@/services/backend/database'
import { ADMIN_TEAM_ID } from './roles'

export const TEAM_APPLY_COLLECTION_NAME = 'team-apply'
export const TEAM_APPLY_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_TEAM_APPLY_COLLECTION_ID ?? TEAM_APPLY_COLLECTION_NAME

export const ensureTeamApplyCollection = (() => {
  let collectionEnsured = false
  return async () => {
    if (collectionEnsured) return
    await ensureDatabase()
    try {
      await databases.getCollection(DATABASE_ID, TEAM_APPLY_COLLECTION_ID)
    } catch (error) {
      const permissions = [
        Permission.create(Role.any()),
        Permission.read(Role.team(ADMIN_TEAM_ID)),
        Permission.update(Role.team(ADMIN_TEAM_ID)),
        Permission.delete(Role.team(ADMIN_TEAM_ID))
      ]
      await databases.createCollection(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, TEAM_APPLY_COLLECTION_NAME, permissions, false, true)
      await databases.createStringAttribute(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, 'name', 128, true)
      await databases.createEmailAttribute(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, 'email', true)
      await databases.createStringAttribute(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, 'discordName', 128, true)
      await databases.createStringAttribute(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, 'role', 24, true)
      await databases.createStringAttribute(DATABASE_ID, TEAM_APPLY_COLLECTION_ID, 'message', 4096, true)
    } finally {
      collectionEnsured = true
    }
  }
})()
