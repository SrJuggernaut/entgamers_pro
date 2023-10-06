import { databases } from '@/lib/nodeAppwrite'

export const DATABASE_NAME = 'entgamers-website'
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ?? DATABASE_NAME

export const ensureDatabase = (() => {
  let databaseEnsured = false
  return async () => {
    if (databaseEnsured) return
    try {
      await databases.get(DATABASE_ID)
    } catch (error) {
      await databases.create(DATABASE_ID, DATABASE_NAME)
    } finally {
      databaseEnsured = true
    }
  }
})()
