import type { TeamApplication, TeamApplicationList } from 'entgamers-database/types/teamApplications'
import { object, string, type ObjectSchema } from 'yup'

export interface TeamApplicationDynamicParams {
  id: string
}

export { type TeamApplication, type TeamApplicationList }

export const teamApplicationDataSchema = object({
  name: string().required('El nombre es obligatorio'),
  email: string().email('Invalid email').required('El email es obligatorio'),
  discord: string().required('El discord es obligatorio'),
  message: string().required('El mensaje es obligatorio').max(4096, 'El mensaje debe ser menor a 4096 caracteres'),
  role: string().oneOf(['Admin', 'Moderator', 'Collaborator'], 'Role inválido').required('El rol es obligatorio'),
  status: string().default('Pending').oneOf(['Pending', 'Accepted', 'Rejected'], 'Status inválido')
})

export const teamApplicationParamsSchema: ObjectSchema<TeamApplicationDynamicParams> = object({
  id: string().required('El id es obligatorio')
})
