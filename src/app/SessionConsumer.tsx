'use client'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { setSession, setStatus } from '@/state/sessionSlice'
import { AppwriteException } from 'appwrite'
import { getSession } from 'entgamers-database/frontend/session'
import { useEffect, type FC } from 'react'

const SessionConsumer: FC = () => {
  const session = useAppSelector((state) => state.session)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (session.status === 'initializing' && session.session === undefined) {
      dispatch(setStatus('loading'))
      getSession('current')
        .then((session) => {
          dispatch(setSession(session))
        })
        .catch((error) => {
          if (error instanceof AppwriteException) {
            console.error(error)
          }
        })
        .finally(() => {
          dispatch(setStatus('idle'))
        })
    }
  }, [])

  return (
    <>
    </>
  )
}
export default SessionConsumer
