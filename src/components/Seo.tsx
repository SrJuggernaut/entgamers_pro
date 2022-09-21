import Head from 'next/head'
import { FC } from 'react'

export type SeoProps = {
  title?: string
  description?: string
  image?: string
}

const SITE_NAME = process.env.SITE_NAME || 'EntGamers'

const Seo: FC<SeoProps> = ({ title, description, image }) => {
  return (
    <Head>
      {!!title && (
        <>
          <title key="title">{`${title} - ${SITE_NAME}`}</title>
          <meta key="og_title" property="og:title" content={title} />
          <meta key="twitter_title" property="twitter:title" content={title} />
        </>
      )}
      {!!description && (
        <>
          <meta key="description" name="description" content={description} />
          <meta key="og_description" property="og:description" content={description} />
          <meta key="twitter_description" property="twitter:description" content={description} />
        </>
      )}
      {!!image && (
        <>
          <meta key="og_image" property="og:image" content={image} />
          <meta key="twitter_image" property="twitter:image" content={image} />
        </>
      )}
    </Head>
  )
}
export default Seo
