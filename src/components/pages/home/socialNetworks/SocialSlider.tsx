import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faTwitch, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { Button, Typography } from '@mui/material'
import { Navigation, Pagination, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { FC } from 'react'
import { Button as ButtonType } from '@interfaces'

export interface SlideProps {
  socialNetwork: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'twitch'
  description: string
  links: ButtonType[]
}

const Slide:FC<SlideProps> = ({ description, socialNetwork, links }) => {
  return (
    <div
      css={{
        marginInline: '36px',
        marginBlock: '16px',
        padding: '16px'
      }}
    >
      <Typography variant="body1" component="div" align="center" >
        {{
          facebook: <FontAwesomeIcon style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4)' }}icon={faFacebook} size="5x" fixedWidth />,
          twitter: <FontAwesomeIcon style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4)' }}icon={faTwitter} size="5x" fixedWidth />,
          instagram: <FontAwesomeIcon style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4)' }}icon={faInstagram} size="5x" fixedWidth />,
          youtube: <FontAwesomeIcon style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4)' }}icon={faYoutube} size="5x" fixedWidth />,
          twitch: <FontAwesomeIcon style={{ filter: 'drop-shadow(2px 2px 2px rgb(0 0 0 / 0.4)' }}icon={faTwitch} size="5x" fixedWidth />
        }[socialNetwork]}
      </Typography>
      <Typography sx={(theme) => ({ textShadow: `2px 2px 2px ${theme.palette.background.default}` })} variant="body1" align="center" >
        {description}
      </Typography>
      <div
        css={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginBlock: '1rem'
        }}
      >
        {links.map(({ url, label, color, variant }) => (
          <Button
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            variant={variant}
            color={color}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}

export interface SocialSliderProps {
  slides: SlideProps[]
}

const SocialSlider: FC<SocialSliderProps> = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, A11y]}
      spaceBetween={16}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
    >
      {slides.map(({ socialNetwork, description, links }) => (

        <SwiperSlide
          key={socialNetwork}
        >
          <Slide
            socialNetwork={socialNetwork}
            description={description}
            links={links}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default SocialSlider
