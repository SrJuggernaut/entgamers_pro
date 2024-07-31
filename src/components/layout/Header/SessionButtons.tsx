import IconButton from '@/components/ui/IconButton'
import Tooltip from '@/components/ui/Tooltip'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import useManageError from '@/hooks/useManageError'
import { setCurrentUser, setSession, setStatus } from '@/state/sessionSlice'
import { iconButton } from '@/styled-system/recipes'
import { faCogs, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons/faUser'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ADMIN_CLAN_ID, MODERATOR_CLAN_ID } from 'entgamers-database/frontend/clanes/administrative'
import { logout } from 'entgamers-database/frontend/session'
import NextLink from 'next/link'
import { type FC } from 'react'

const SessionButtons: FC = () => {
  const { session, status, clanes } = useAppSelector(state => state.session)
  const { manageError } = useManageError()
  const dispatch = useAppDispatch()

  if (status !== 'idle') return null

  if (status === 'idle' && session === undefined) {
    return (
      <>
        <Tooltip
          title={'Iniciar sesión'}
          position='bottom'
        >
          <NextLink
            href="/login"
            className={
              iconButton()
            }
          >
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </NextLink>
        </Tooltip>
      </>
    )
  }

  if (status === 'idle' && session !== undefined) {
    return (
      <>
        <Tooltip
          title={'Mi cuenta'}
          position='bottom'
        >
          <NextLink
            href="/cuenta"
            className={
              iconButton()
            }
          >
            <FontAwesomeIcon icon={faUser} fixedWidth />
          </NextLink>
        </Tooltip>
        {clanes !== undefined && clanes?.teams.some(team => team.$id === ADMIN_CLAN_ID || team.$id === MODERATOR_CLAN_ID) && (
          <Tooltip
            title={'Panel de administración'}
            position='bottom'
          >
            <NextLink
              href="/dashboard"
              className={
                iconButton()
              }
            >
              <FontAwesomeIcon icon={faCogs} fixedWidth />
            </NextLink>
          </Tooltip>
        )}
        <Tooltip
          title={'Cerrar sesión'}
          position='bottom'
        >
          <IconButton
            onClick={() => {
              dispatch(setStatus('loading'))
              logout('current')
                .then(() => {
                  dispatch(setSession(undefined))
                  dispatch(setCurrentUser(undefined))
                })
                .catch((error) => {
                  manageError(error, 'Error al cerrar sesión', 'Error desconocido al cerrar sesión')
                })
                .finally(() => {
                  dispatch(setStatus('idle'))
                })
            }}
          >
            <FontAwesomeIcon icon={faRightFromBracket} fixedWidth />
          </IconButton>
        </Tooltip>
      </>
    )
  }
}

export default SessionButtons
