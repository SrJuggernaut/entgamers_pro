import React, { useEffect } from "react"
import BgImg from "gatsby-background-image"
import { graphql, useStaticQuery } from "gatsby"
import styled from "@emotion/styled"
import { Global, css } from "@emotion/react"
import { Swiper, SwiperSlide } from "swiper/react"
import SwiperCore, { Navigation } from "swiper"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { gsap } from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"

import "swiper/swiper.min.css"
import "swiper/components/navigation/navigation.min.css"

SwiperCore.use([Navigation])
gsap.registerPlugin(CSSRulePlugin)

const DondeWrapper = styled(BgImg)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 85vh;
  background-repeat: repeat-x;
`
const DondeBgImg = styled(BgImg)`
  background-repeat: repeat-x;
`
const SlideContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-accent);
  font-weight: 700;
`
const Slide = styled.div`
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: var(--spacer);
  padding: var(--spacer);
  text-align: center;
  max-width: 75%;
  color: var(--color-secondary);
  h2{
    font-size: 3rem;
    color: var(--color-accent);
  }
`
function Donde(props) {
  const res = useStaticQuery(graphql`
    {
      night01: file(name: { eq: "night01" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      night02: file(name: { eq: "night02" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      night03: file(name: { eq: "night03" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  const night01 = res.night01.childImageSharp.fluid
  const night02 = res.night02.childImageSharp.fluid
  const night03 = res.night03.childImageSharp.fluid
  const tl01 = gsap.timeline({ repeat: -1 })
  const tl02 = gsap.timeline({ repeat: -1 })
  const bgAnimate = () => {
    const windowWidth = window.innerWidth
    tl01.fromTo(
      CSSRulePlugin.getRule("#night03::after"),
      {
        cssRule: {
          backgroundPositionX: `-${windowWidth}px`,
        },
      },
      {
        ease: "none",
        duration: 2048,
        cssRule: {
          backgroundPositionX: `${windowWidth}px`,
        },
      }
    )

    tl02.fromTo(
      CSSRulePlugin.getRule("#night02::after"),
      {
        cssRule: {
          backgroundPositionX: `${windowWidth}px`,
        },
      },
      {
        ease: "none",
        duration: 2048,
        cssRule: {
          backgroundPositionX: `-${windowWidth}px`,
        },
      }
    )
  }
  useEffect(() => {
    bgAnimate()
    window.addEventListener("resize", bgAnimate)
    return () => {
      window.removeEventListener("resize", bgAnimate)
    }
  })
  return (
    <>
      <Global styles={css`
        #night01::after {
          background-position-x: center;
        }
        #night02::after {
          background-position-x: 0px;
        }
        #night03::after {
          background-position-x: 0px;
        }
      `}
      
      />
      <DondeBgImg fluid={night01} id="night01">
        <DondeBgImg fluid={night02} id="night02">
          <DondeWrapper fluid={night03} id="night03">
            <div className="container">
              <Swiper navigation spaceBetween={50} loop={true}>
                <SwiperSlide>
                  <SlideContainer>
                    <Slide >
                      <FontAwesomeIcon
                        icon={["fab", "discord"]}
                        size="6x"
                        fixedWidth
                      />
                      <h2>Discord</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dicta nihil ipsum fugit tempore ut adipisci unde
                        doloremque minima. Necessitatibus illo hic voluptatibus!
                        Cumque odio neque maxime odit, veniam illum deleniti
                        sapiente obcaecati at minima suscipit, in fugit sunt
                        magnam, dolorem fuga aut doloribus soluta et.
                      </p>
                    </Slide>
                  </SlideContainer>
                </SwiperSlide>
                <SwiperSlide>
                  <SlideContainer>
                    <Slide>
                      <FontAwesomeIcon
                        icon={["fab", "facebook"]}
                        size="6x"
                        fixedWidth
                      />
                      <h2>Facebook</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dicta nihil ipsum fugit tempore ut adipisci unde
                        doloremque minima. Necessitatibus illo hic voluptatibus!
                        Cumque odio neque maxime odit, veniam illum deleniti
                        sapiente obcaecati at minima suscipit, in fugit sunt
                        magnam, dolorem fuga aut doloribus soluta et.
                      </p>
                    </Slide>
                  </SlideContainer>
                </SwiperSlide>
                <SwiperSlide>
                  <SlideContainer>
                    <Slide>
                      <FontAwesomeIcon
                        icon={["fab", "twitter"]}
                        size="6x"
                        fixedWidth
                      />
                      <h2>Twitter</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dicta nihil ipsum fugit tempore ut adipisci unde
                        doloremque minima. Necessitatibus illo hic voluptatibus!
                        Cumque odio neque maxime odit, veniam illum deleniti
                        sapiente obcaecati at minima suscipit, in fugit sunt
                        magnam, dolorem fuga aut doloribus soluta et.
                      </p>
                    </Slide>
                  </SlideContainer>
                </SwiperSlide>
                <SwiperSlide>
                  <SlideContainer>
                    <Slide>
                      <FontAwesomeIcon
                        icon={["fab", "twitch"]}
                        size="6x"
                        fixedWidth
                      />
                      <h2>Twitch</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Dicta nihil ipsum fugit tempore ut adipisci unde
                        doloremque minima. Necessitatibus illo hic voluptatibus!
                        Cumque odio neque maxime odit, veniam illum deleniti
                        sapiente obcaecati at minima suscipit, in fugit sunt
                        magnam, dolorem fuga aut doloribus soluta et.
                      </p>
                    </Slide>
                  </SlideContainer>
                </SwiperSlide>
              </Swiper>
            </div>
          </DondeWrapper>
        </DondeBgImg>
      </DondeBgImg>
    </>
  )
}

export default Donde
