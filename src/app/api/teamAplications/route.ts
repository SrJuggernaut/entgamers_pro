import { handleError } from '@/utilities/apiRoutes'
import { teamApplicationDataSchema, teamApplicationSearchParamsSchema } from '@/utilities/teamApplication'
import { createTeamApplication, getTeamApplications, type TeamApplication } from 'entgamers-database/backend/teamApplication'
import { NextResponse, type NextRequest } from 'next/server'

export const GET = async (request: NextRequest): Promise<Response> => {
  try {
    const searchParams = request.nextUrl.searchParams.entries()
    const validatedParams = await teamApplicationSearchParamsSchema.validate(Object.fromEntries(searchParams))
    const getTeamApplicationsParams = {
      skip: validatedParams.skip,
      take: validatedParams.take,
      where: {
        name: validatedParams['where[name]'],
        email: validatedParams['where[email]'],
        discord: validatedParams['where[discord]'],
        role: validatedParams['where[role]'] as TeamApplication['role' ] | undefined,
        status: validatedParams['where[status]']
      }
    }

    const teamApplications = await getTeamApplications(getTeamApplicationsParams)

    const response = NextResponse.json(teamApplications, { status: 200 })
    return response
  } catch (error) {
    return handleError(error)
  }
}

export const POST = async (request: NextRequest): Promise<Response> => {
  try {
    const body = await request.json()
    const createTeamApplicationData = await teamApplicationDataSchema.validate(body)

    const teamApplication = await createTeamApplication({ data: createTeamApplicationData })

    const response = NextResponse.json(teamApplication, { status: 201 })
    return response
  } catch (error) {
    return handleError(error)
  }
}
