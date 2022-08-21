import { config } from '@fortawesome/fontawesome-svg-core'
import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'

import theme from '@styles/muiTheme'

import '@fortawesome/fontawesome-svg-core/styles.css'

config.autoAddCss = false

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
