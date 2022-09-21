import { Container } from '@mui/material'
import { FC } from 'react'

import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'

import { ContainedProps } from '@interfaces'

const Contained: FC<ContainedProps> = ({ children }) => {
  return (
    <>
      <Header />
      <Container
        component="main"
        sx={{
          minHeight: 'calc(100vh - 92px)',
          marginTop: '60px',
          paddingBlock: 1
        }}
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}
export default Contained
