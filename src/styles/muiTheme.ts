import { createTheme, Interpolation, Theme } from '@mui/material'

const glassStyle: Interpolation<{ theme: Theme }> = {
  background: 'rgba( 28, 30, 33, 0.45 )',
  boxShadow: '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
  backdropFilter: 'blur( 8px )',
  borderRadius: '8px',
  border: '1px solid rgba( 31, 38, 135, 0.18 )',
  textShadow: '1px 1px 5px rgba(31, 38, 135, 0.60)'
}

const gbaStyle: Interpolation<{ theme: Theme }> = {
  background: '#F8F8F8',
  border: '2px solid #76604E',
  borderRadius: '6px',
  boxShadow: '2px 2px 0px #57899A, inset 0px 0px 0px 4px #D6E1F9',
  color: '#010206'
}

const theme = createTheme({
  components: {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          h4: 'h4',
          h5: 'h5',
          h6: 'h6',
          subtitle1: 'h2',
          subtitle2: 'h3',
          body1: 'p',
          body2: 'span'
        }
      }
    },
    MuiCssBaseline: {
      styleOverrides: `
      html {
        scroll-behavior: smooth;
      }
      /* open-sans-300 - latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 300;
        src: local(''),
             url('/fonts/open-sans-v29-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/open-sans-v29-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* open-sans-regular - latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 400;
        src: local(''),
             url('/fonts/open-sans-v29-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/open-sans-v29-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* open-sans-500 - latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 500;
        src: local(''),
             url('/fonts/open-sans-v29-latin-500.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/open-sans-v29-latin-500.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* open-sans-700 - latin */
      @font-face {
        font-family: 'Open Sans';
        font-style: normal;
        font-weight: 700;
        src: local(''),
             url('/fonts/open-sans-v29-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
             url('/fonts/open-sans-v29-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      /* permanent-marker-regular - latin */
      @font-face {
        font-family: 'Permanent Marker';
        font-style: normal;
        font-weight: 400;
        src: local(''),
            url('/fonts/permanent-marker-v16-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
            url('/fonts/permanent-marker-v16-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
      }
      :root {
        --swiper-theme-color: #39B94A !important;
      }
      `
    },
    MuiPaper: {
      variants: [
        {
          props: { variant: 'glass' },
          style: glassStyle
        },
        {
          props: { variant: 'gbaDialog' },
          style: gbaStyle
        }
      ]
    },
    MuiCard: {
      variants: [
        {
          props: { variant: 'glass' },
          style: glassStyle
        },
        {
          props: { variant: 'gbaDialog' },
          style: gbaStyle
        }
      ]
    },
    MuiContainer: {
      defaultProps: {
        fixed: true
      }
    },
    MuiLink: {
      defaultProps: {
        underline: 'none'
      },
      styleOverrides: {
        root: {
          cursor: 'pointer',
          fontWeight: 500
        }
      }
    }
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#1C1E21',
      paper: '#313538'
    },
    text: {
      primary: '#EFFAF0',
      secondary: '#EFFAF0',
      disabled: '#313538'
    },
    primary: {
      main: '#39B94A',
      contrastText: '#1c1e21'
    },
    secondary: {
      main: '#39b98a'
    },
    success: {
      main: '#56CC9D'
    },
    info: {
      main: '#6CC3D5'
    },
    warning: {
      main: '#FFCE67'
    },
    error: {
      main: '#FF7851'
    }
  },
  typography: {
    fontFamily: 'Open Sans',
    fontSize: 16,
    h1: {
      fontSize: '2.5rem',
      fontFamily: 'Permanent Marker',
      fontWeight: 400,
      WebkitTextStroke: '1px #010206',
      color: '#39B94A'
    },
    h2: {
      fontFamily: 'Permanent Marker',
      fontSize: '2rem',
      fontWeight: 400,
      WebkitTextStroke: '1px #010206',
      color: '#39B94A'
    },
    h3: {
      fontSize: '1.75rem',
      fontFamily: 'Permanent Marker',
      fontWeight: 400,
      WebkitTextStroke: '1px #010206',
      color: '#39B94A'
    },
    h4: {
      fontFamily: 'Permanent Marker',
      fontSize: '1.5rem',
      fontWeight: 400,
      WebkitTextStroke: '1px #010206',
      color: '#39B94A'
    },
    h5: {
      fontFamily: 'Permanent Marker',
      fontSize: '1.25rem',
      fontWeight: 400,
      WebkitTextStroke: '1px #010206',
      color: '#39B94A'
    },
    h6: {
      fontSize: '1rem',
      fontFamily: 'Permanent Marker',
      fontWeight: 400,
      WebkitTextStroke: '1px #010206',
      color: '#39B94A'
    },
    subtitle1: {
      fontFamily: 'Open Sans',
      fontSize: '2rem',
      fontWeight: 400
    },
    subtitle2: {
      fontFamily: 'Open Sans',
      fontSize: '1.75rem',
      fontWeight: 400
    },
    body1: {
      fontSize: '1rem'
    },
    body2: {
      fontSize: '0.88rem'
    },
    button: {
      fontWeight: 400,
      fontSize: '1rem',
      textTransform: 'none'
    },
    caption: {
      fontSize: '.85rem'
    }
  },
  shape: {
    borderRadius: 4
  },
  spacing: 16
})

export default theme
