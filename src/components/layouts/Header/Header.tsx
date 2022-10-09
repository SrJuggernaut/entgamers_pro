import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AppBar, Box, Container, IconButton, NoSsr, ListItemButton, Divider } from '@mui/material'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import EntGamers from '@assets/logos/EntGamers'

import { Link } from '@interfaces'

const Drawer = dynamic(() => import('@mui/material/Drawer'), { ssr: false })
const List = dynamic(() => import('@mui/material/List'), { ssr: false })
const ListItemText = dynamic(() => import('@mui/material/ListItemText'), { ssr: false })

const MenuItems: Link[] = [
  { label: 'Home', url: '/' },
  { label: 'Clanes', url: '/clanes' }
]

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

  const router = useRouter()

  const handleScroll = () => {
    if (window.scrollY > 15) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <>
      <AppBar
        position="fixed"
        color={scrolled ? 'primary' : 'transparent'}
        elevation={scrolled ? 4 : 0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          minHeight: '60px',
          transition: 'background-color .3s cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow .3s cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
      >
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <NextLink href="/">
              <a>
                <EntGamers
                  width="40"
                  height="40"
                />
              </a>
            </NextLink>
          </div>
          <div
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <IconButton
              aria-label="menu"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                aspectRatio: '1'
              }}
              onClick={() => setOpenMenu(true)}
            >
              <FontAwesomeIcon icon={faBars} size="xs" />
            </IconButton>
          </div>
        </Container>
      </AppBar>
      <NoSsr>
        <Drawer
          open={openMenu}
          onClose={() => setOpenMenu(false)}
          anchor="right"
        >
          <Box
            sx={(theme) => ({
              width: '100vw',
              height: '100%',
              [theme.breakpoints.up('xs')]: {
                maxWidth: '300px'
              }
            })}
          >
            <div
              css={{
                minHeight: '60px'
              }}
            />
            <Divider />
            <List
              sx={{ paddingTop: '0' }}
            >
              {MenuItems.map(({ label, url }) => (
                <NextLink key={`menu-item-${label}`} href={url} passHref>
                  <ListItemButton
                    component="a"
                    selected={router.pathname === url}
                  >
                    <ListItemText primary={label} />
                  </ListItemButton>
                </NextLink>
              ))}
            </List>
          </Box>
        </Drawer>
      </NoSsr>
    </>
  )
}
export default Header
