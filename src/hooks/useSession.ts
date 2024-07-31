import { type SessionState } from '@/state/sessionSlice'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useAppSelector } from './useAppSelector'

type UseSession = (redirect?: string) => SessionState & { belongToClan: (clanId: string) => boolean }

const useSession: UseSession = (redirect?: string) => {
  const { status, session, user, clanes } = useAppSelector((state) => state.session)
  const router = useRouter()

  const belongToClan = useCallback((clanId: string): boolean => {
    if (session === undefined || clanes === undefined || clanes.total === 0) return false
    return clanes.teams.some((team) => team.$id === clanId) ?? false
  }, [clanes])

  useEffect(() => {
    if (status === 'idle' && session === undefined) {
      router.push(redirect ?? '/')
    }
  }, [status, session])

  return { status, session, user, clanes, belongToClan }
}

export default useSession
