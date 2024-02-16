'use client'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setClanes, setCurrentUser, setSession, setStatus } from '@/state/sessionSlice'
import { AppwriteException } from 'appwrite'
import { getClanes } from 'entgamers-database/frontend/clanes'
import { getCurrentUser, getSession } from 'entgamers-database/frontend/session'
import { useCallback, useEffect, type FC } from 'react'

const SessionConsumer: FC = () => {
  const { status, session, user, clanes } = useAppSelector((state) => state.session)
  const dispatch = useAppDispatch()

  const ensureSession = useCallback(async () => {
    try {
      if (status !== 'initializing' || session !== undefined) return
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

  useEffect(() => {
    if (user !== undefined && clanes === undefined) {
      getClanes()
        .then((clanes) => {
          dispatch(setClanes(clanes))
        })
        .catch((error) => {
          if (error instanceof AppwriteException) {
            console.error(error)
          }
        })
    } else if (user === undefined && clanes !== undefined) {
      dispatch(setClanes())
    }
  }, [user])

  return (
    <>
    </>
  )
}
export default SessionConsumer
