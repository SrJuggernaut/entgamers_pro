import { type SessionState } from '@/state/sessionSlice'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useAppSelector } from './useAppSelector'

type UseSession = (redirect?: string) => SessionState

const useSession: UseSession = (redirect?: string) => {
  const { status, session, user } = useAppSelector((state) => state.session)
  const router = useRouter()

  useEffect(() => {
    if (status === 'idle' && session === undefined) {
      router.push(redirect ?? '/')
    }
  }, [status, session])

  return { status, session, user }
}

export default useSession
