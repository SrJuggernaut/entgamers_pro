import { type ButtonProps } from '@mui/material'

export interface Link {
  url: string
  label: string
}

export interface Button extends Link {
  variant: ButtonProps['variant']
  color: ButtonProps['color']
}

export interface SocialLink extends Link {
  socialNetwork: 'facebook' | 'twitter' | 'instagram' | 'twitch' | 'youtube' | 'tiktok' | string
}
