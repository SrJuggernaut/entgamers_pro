import { AppBar, Box, Container, IconButton, NoSsr, ListItemButton } from '@mui/material'
import NextLink from 'next/link'
import dynamic from 'next/dynamic'

import EntGamers from '@assets/logos/EntGamers'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Suspense, useEffect, useState } from 'react'

const Drawer = dynamic(() => import('@mui/material/Drawer'), { suspense: true, ssr: false })
const List = dynamic(() => import('@mui/material/List'), { suspense: true, ssr: false })
const ListItem = dynamic(() => import('@mui/material/ListItem'), { suspense: true, ssr: false })
const ListItemText = dynamic(() => import('@mui/material/ListItemText'), { suspense: true, ssr: false })

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(false)

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
        <Suspense>
          <Drawer
            open={openMenu}
            onClose={() => setOpenMenu(false)}
            anchor="right"
          >
            <Box
              sx={(theme) => ({
                width: '100vw',
                height: '100%',
                [theme.breakpoints.up('md')]: {
                  maxWidth: '300px'
                }
              })}
            >
              <List>
                <ListItem disablePadding>
                  <NextLink href="/" passHref>
                    <ListItemButton component="a">
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </NextLink>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </Suspense>
      </NoSsr>
    </>
  )
}
export default Header
