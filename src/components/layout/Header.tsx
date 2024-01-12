'use client'
import EntGamers from '@/assets/logos/EntGamers'
import Menu from '@/components/layout/Menu'
import IconButton from '@/components/ui/IconButton'
import Tooltip from '@/components/ui/Tooltip'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { useAppSelector } from '@/hooks/useAppSelector'
import { addAlert } from '@/state/feedbackSlice'
import { setSession } from '@/state/sessionSlice'
import { css } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { iconButton } from '@/styled-system/recipes'
import { faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { nanoid } from '@reduxjs/toolkit'
import { AppwriteException } from 'appwrite'
import { logout } from 'entgamers-database/frontend/session'
import NextLink from 'next/link'
import { useCallback, useEffect, useState, type FC } from 'react'

const Header: FC = () => {
  const session = useAppSelector(state => state.session)
  const dispatch = useAppDispatch()

  const [isScrolled, setIsScrolled] = useState(typeof window !== 'undefined' ? window.scrollY > 0 : false)
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    setIsScrolled(window.scrollY > 0)
  }, [])
  useEffect(() => {
    if (typeof window === 'undefined') return
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <header
        className={css({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          color: 'text',
          minHeight: '60px',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 'sticky',
          boxShadow: 'none',
          transitionProperty: 'background-color, box-shadow',
          transitionDuration: '0.25s',
          transitionTimingFunction: 'easeInOut',
          willChange: 'background-color, box-shadow',
          '&[data-scrolled=true]': {
            backgroundColor: 'surface',
            boxShadow: '2px 2px 4px 0px rgba(0, 0, 0, 0.25)'
          }
        })}
        data-scrolled={isScrolled}
      >
        <Container
          className={css({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          })}
        >
          <div>
            <NextLink
              href="/"
            >
              <EntGamers
                width="40px"
              />
            </NextLink>
          </div>
          <div>
            {session.status === 'idle' && typeof session.session !== 'undefined'
              ? (
                <>
                  <Tooltip
                    title="Cuenta"
                    position="bottom"
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
                  <Tooltip
                    title="Cerrar sesión"
                    position="bottom"
                  >
                    <IconButton
                      onClick={() => {
                        logout('current')
                          .then(() => {
                            dispatch(setSession(undefined))
                          })
                          .catch((error) => {
                            if (error instanceof AppwriteException) {
                              dispatch(addAlert({
                                id: nanoid(),
                                message: error.message,
                                title: 'Error mientras se cerraba sesión',
                                severity: 'error'
                              }))
                            }
                          })
                      }}
                    >
                      <FontAwesomeIcon icon={faRightFromBracket} fixedWidth />
                    </IconButton>
                  </Tooltip>
                </>
              )
              : (
                <Tooltip
                  title="Iniciar sesión"
                  position="bottom"
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
              )
            }
            <Menu />
          </div>
        </Container>
      </header>
      <div
        className={css({
          height: '60px'
        })}
      />
    </>
  )
}
export default Header
