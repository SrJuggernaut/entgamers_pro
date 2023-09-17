import { defineConfig } from '@pandacss/dev'
import entGamersPandaPreset from 'entgamers-panda-preset'

export default defineConfig({
  presets: [entGamersPandaPreset],
  gitignore: true,
  preflight: true,
  include: ['./src/**/*.{js,jsx,ts,tsx}'],
  exclude: [],
  outdir: 'src/styled-system',
  jsxFactory: 'panda',
  jsxFramework: 'react'
})
