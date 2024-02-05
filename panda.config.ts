import { defineConfig } from '@pandacss/dev'

export default defineConfig({
  presets: ['entgamers-panda-preset'],
  gitignore: true,
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'src/styled-system',
  jsxFactory: 'panda',
  jsxFramework: 'react'
})
