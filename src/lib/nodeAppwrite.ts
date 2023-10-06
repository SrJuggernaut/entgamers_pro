import { Client, Databases, Teams } from 'node-appwrite'

export const clientNodeAppwrite = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ?? '')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ?? '')
  .setKey(process.env.APPWRITE_API_KEY ?? '')

export const databases = new Databases(clientNodeAppwrite)

export const teams = new Teams(clientNodeAppwrite)

export { Permission, Role } from 'node-appwrite'
