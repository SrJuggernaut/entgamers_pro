'use client'
import EntGamers from '@/assets/logos/EntGamers'
import Menu from '@/components/layout/Menu'
import Tooltip from '@/components/ui/Tooltip'
import { css } from '@/styled-system/css'
import { Container } from '@/styled-system/jsx'
import { iconButton } from '@/styled-system/recipes'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'
import { useCallback, useEffect, useState, type FC } from 'react'

const Header: FC = () => {
  const [isScrolled, setIsScrolled] = useState(typeof window !== 'undefined' ? window.scrollY > 0 : false)
  const handleScroll = useCallback(() => {
    if (typeof window === 'undefined') return
    console.log(window.scrollY)
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
            <Tooltip
              title="Próximamente"
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
