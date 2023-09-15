import { type CSSProperties } from 'react'

declare module '@mui/material/styles' {
  interface PaperVariants {
    glass: CSSProperties
    gbaDialog: CSSProperties
  }

  interface PaperVariantsOptions {
    glass?: CSSProperties
    gbaDialog?: CSSProperties
  }

  interface CardVariants {
    glass: CSSProperties
    gbaDialog: CSSProperties
  }

  interface CardVariantsOptions {
    glass?: CSSProperties
    gbaDialog?: CSSProperties
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    glass: true
    gbaDialog: true
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    glass: true
    gbaDialog: true
  }
}
