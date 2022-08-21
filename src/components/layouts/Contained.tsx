import { Container } from '@mui/material'
import { FC, ReactNode } from 'react'

import Header from '@components/layouts/Header'
import Footer from '@components/layouts/Footer'

export interface ContainedProps {
  children: ReactNode
}

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
