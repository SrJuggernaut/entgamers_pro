import { type PaginationOptions } from '@/types/api'
import { type TeamApplication, type TeamApplicationList } from 'entgamers-database/backend/teamApplication'
import { number, object, string, type ObjectSchema } from 'yup'

export interface TeamApplicationDynamicParams {
  id: string
}
export interface TeamApplicationRouteData {
  params: TeamApplicationDynamicParams
}

export interface TeamApplicationSearchParams extends PaginationOptions {
  'where[name]'?: string
  'where[email]'?: string
  'where[discord]'?: string
  'where[role]'?: string
  'where[status]'?: string
}

export type TeamApplicationData = Omit<TeamApplication, 'id' | 'createdAt' | 'updatedAt' >

export { type TeamApplication, type TeamApplicationList }

export const teamApplicationDataSchema: ObjectSchema<TeamApplicationData> = object({
  name: string().required('El nombre es obligatorio'),
  email: string().email('Invalid email').required('El email es obligatorio'),
  discord: string().required('El discord es obligatorio'),
  message: string().required('El mensaje es obligatorio'),
  role: string().oneOf(['Admin', 'Moderator', 'Collaborator', 'User'], 'Rol inválido').required('El rol es obligatorio'),
  status: string().default('Pending').oneOf(['Pending', 'Accepted', 'Rejected'], 'Status inválido')
})

export const teamApplicationParamsSchema: ObjectSchema<TeamApplicationDynamicParams> = object({
  id: string().required('El id es obligatorio')
})

export const teamApplicationSearchParamsSchema: ObjectSchema<TeamApplicationSearchParams> = object({
  skip: number().optional().transform((value) => Number(value)),
  take: number().optional().transform((value) => Number(value)),
  'where[name]': string().optional(),
  'where[email]': string().optional(),
  'where[discord]': string().optional(),
  'where[role]': string().optional().oneOf(['Admin', 'Moderator', 'Collaborator', 'User'], 'Rol inválido'),
  'where[status]': string().optional().oneOf(['Pending', 'Accepted', 'Rejected'], 'Status inválido')
}).partial()
