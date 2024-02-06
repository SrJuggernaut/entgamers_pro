'use client'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setCurrentUser, setSession, setStatus } from '@/state/sessionSlice'
import { AppwriteException } from 'appwrite'
import { getCurrentUser, getSession } from 'entgamers-database/frontend/session'
import { useCallback, useEffect, type FC } from 'react'

const SessionConsumer: FC = () => {
  const session = useAppSelector((state) => state.session)
  const dispatch = useAppDispatch()

  const ensureSession = useCallback(async () => {
    try {
      if (session.status !== 'initializing' || session.session !== undefined) return
      dispatch(setStatus('loading'))
      const currentSession = await getSession('current')
      const currentUser = await getCurrentUser()
      dispatch(setSession(currentSession))
      dispatch(setCurrentUser(currentUser))
    } catch (error) {
      dispatch(setSession())
      dispatch(setCurrentUser())
      throw error
    } finally {
      dispatch(setStatus('idle'))
    }
  }, [])

  useEffect(() => {
    ensureSession()
      .catch((error) => {
        if (error instanceof AppwriteException) {
          console.error(error)
        }
      })
  }, [])

  return (
    <>
    </>
  )
}
export default SessionConsumer
