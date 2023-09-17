import '@/app/global.css'
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { css } from '@/styled-system/css'
import '@fontsource/open-sans/latin-300.css'
import '@fontsource/open-sans/latin-400.css'
import '@fontsource/open-sans/latin-700.css'
import '@fontsource/permanent-marker/latin-400.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { type Metadata } from 'next'
import { type FC, type ReactNode } from 'react'

config.autoAddCss = false

export const metadata: Metadata = {
  title: 'Home | EntGamers',
  description: 'Una comunidad de jugadores, para jugadores'
}

interface RootLayoutProps {
  children: ReactNode
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Header />
        <main
          className={css({
            paddingBlock: 'medium',
            minHeight: 'calc(100vh - 60px - 72px)'
          })}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
export default RootLayout
