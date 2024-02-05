import { handleError } from '@/utilities/apiRoutes'
import { teamApplicationDataSchema, teamApplicationParamsSchema, type TeamApplicationRouteData } from '@/utilities/teamApplication'
import { deleteTeamApplication, getTeamApplication, updateTeamApplication } from 'entgamers-database/backend/teamApplication'
import { NextResponse } from 'next/server'

export const GET = async (Request: Request, { params }: TeamApplicationRouteData): Promise<Response> => {
  try {
    const { id } = await teamApplicationParamsSchema.validate(params)
    const teamApplication = await getTeamApplication({ where: { id } })
    if (teamApplication === null) {
      return new NextResponse(null, { status: 404 })
    }
    return NextResponse.json(teamApplication, { status: 200 })
  } catch (error) {
    return handleError(error)
  }
}

export const PUT = async (Request: Request, { params }: TeamApplicationRouteData): Promise<Response> => {
  try {
    const body: unknown = await Request.json()
    const { id } = await teamApplicationParamsSchema.validate(params)
    const teamApplicationData = await teamApplicationDataSchema.validate(body)

    const updatedTeamApplication = await updateTeamApplication({ where: { id }, data: teamApplicationData })

    const response = NextResponse.json(updatedTeamApplication, { status: 200 })
    return response
  } catch (error) {
    return handleError(error)
  }
}

export const DELETE = async (Request: Request, { params }: TeamApplicationRouteData): Promise<Response> => {
  try {
    const { id } = await teamApplicationParamsSchema.validate(params)

    await deleteTeamApplication({ where: { id } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    return handleError(error)
  }
}
