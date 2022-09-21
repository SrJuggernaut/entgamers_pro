export interface TypeImage {
  url: string
  secureUrl?: number
  type?: string
  width?: number
  height?: number
  alt?: string
}

export interface TypeProfile {
  firstName: string
  lastName?: string
  username?: string
  gender?: 'male' | 'female' | string
}

export interface TypeVideo {
  url: string
  secureUrl?: string
  type?: string
  width?: string
  height?: string
  alt?: string
}

export interface TypeAudio {
  url: string
  secureUrl?: string
  type?: string
}

export interface SeoTypeProfile extends TypeProfile {
  type: 'profile'
}

export interface TypeMusicSong {
  type: 'music.song'
  duration: number
  album: string
  albumDisc: number
  albumTrack: number
  musician: string | string[] | TypeProfile | TypeProfile[]
}

export interface TypeMusicAlbum {
  type: 'music.album'
}

export type Seo = {
  title?: string
  description?: string
  image?: string | string[] | TypeImage | TypeImage[]
  url?: string
  audio?: string | string[] | TypeAudio | TypeAudio[]
  determiner?: string
  locale?: string
  localeAlternate?: string
  siteName?: string
  video?: string | string[] | TypeVideo | TypeVideo[]
} & (
  | SeoTypeProfile
  | TypeMusicSong
)
