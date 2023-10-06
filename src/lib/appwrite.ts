import { Client, Databases } from 'appwrite'

export const appwriteClient = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT ?? '')

export const databases = new Databases(appwriteClient)

export { ID } from 'appwrite'
