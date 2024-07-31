import trees from '@/assets/icons/trees'
import BackDrop from '@/components/ui/BackDrop'
import IconButton from '@/components/ui/IconButton'
import { css } from '@/styled-system/css'
import { iconButton } from '@/styled-system/recipes'
import { type IconDefinition } from '@fortawesome/fontawesome-common-types'
import { faBars, faHome, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useState, type FC } from 'react'

interface MenuLink {
  label: string
  href: string
  icon: IconDefinition
}

const menuLinks: MenuLink[] = [
  { label: 'Home', href: '/', icon: faHome },
  { label: 'Clanes', href: '/clanes', icon: trees },
  { label: 'Equipo', href: '/equipo', icon: faUsers }
]

const Menu: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathName = usePathname()
  const handleClickAway = useCallback(() => {
    setIsMenuOpen(false)
  }, [])
  return (
    <>
      <IconButton
        onClick={() => { setIsMenuOpen(!isMenuOpen) }}
      >
        <FontAwesomeIcon icon={faBars} />
      </IconButton>
      <BackDrop
        onClickAway={handleClickAway}
        isOpen={isMenuOpen}
      >
        <div
          className={css({
            position: 'fixed',
            top: 0,
            right: 0,
            width: { base: '250px', smDown: '100%' },
            height: '100%',
            backgroundColor: 'surface',
            zIndex: 'modal'
          })}
        >
          <div
            className={css({
              height: '60px',
              borderBottom: '1px solid',
              borderColor: 'border',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right',
              padding: '0 1rem'
            })}
          >
            <button
              className={iconButton({
                color: 'danger'
              })}
              onClick={() => { setIsMenuOpen(!isMenuOpen) }}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <nav>
            <ul
              className={css({
                listStyle: 'none',
                padding: 0,
                margin: 0
              })}
            >
              {menuLinks.map((menuLink, index) => (
                <li
                  key={`menu-link-${index}`}
                  onClick={() => { setIsMenuOpen(false) }}
                >
                  <NextLink
                    className={css({
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'left',
                      padding: '1rem',
                      textDecoration: 'none',
                      backgroundColor: 'transparent',
                      color: 'text',
                      transitionProperty: 'background-color',
                      transitionDuration: 'normal',
                      transitionTimingFunction: 'easeInOut',
                      willChange: 'background-color color',
                      '&:hover': {
                        backgroundColor: 'primary',
                        color: 'primary.contrast'
                      },
                      '&[data-active=true]': {
                        backgroundColor: 'info',
                        color: 'info.contrast'
                      }
                    })}
                    href={menuLink.href}
                    data-active={pathName === menuLink.href}
                  >
                    <FontAwesomeIcon icon={menuLink.icon} fixedWidth />&nbsp;{menuLink.label}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </BackDrop>
    </>
  )
}
export default Menu
