import Seo from '@components/Seo'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme from '@styles/muiTheme'
import type { AppProps } from 'next/app'
import { type FC } from 'react'

config.autoAddCss = false

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Seo
        title='EntGamers'
        description='Comunidad Gamer'
        image='/images/defaults/og.jpg'
      />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
