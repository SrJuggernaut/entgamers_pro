import React, { useEffect } from "react"
import { css, Global } from "@emotion/react"
import styled from "@emotion/styled"
import BgI from "gatsby-background-image"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import { gsap } from "gsap"
import { CSSRulePlugin } from "gsap/CSSRulePlugin"
import bP from "../../../helpers/breakPoints"
gsap.registerPlugin(CSSRulePlugin)

const L01 = styled(BgI)`
  min-height: 100vh;
  background-size: cover;
  background-position-y: bottom;
  background-repeat: repeat-x;
  overflow: hidden;
`
const L02 = styled(BgI)`
  min-height: 100vh;
  background-size: cover;
  background-position-y: bottom;
  background-repeat: repeat-x;
  overflow: hidden;
`
const L03 = styled(BgI)`
  min-height: 100vh;
  background-size: cover;
  background-position-y: bottom;
  background-repeat: repeat-x;
  overflow: hidden;
`
const BlackBox = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`
const Content = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: ${bP.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  @media (min-width: ${bP.sm}) {
    order: 1;
  }
`
const ImageBox = styled.div`
  @media (min-width: ${bP.sm}) {
    order: 2;
  }
`
const SiteTitle = styled.h1`
  font-size: 60px;
`
function Hero(props) {
  const res = useStaticQuery(graphql`
    {
      bgl01: file(name: { eq: "forestNight01" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      bgl02: file(name: { eq: "forestNight02" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      bgl03: file(name: { eq: "forestNight03" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 100) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      logo: file(name: { eq: "EntGamersNoOutLine" }) {
        childImageSharp {
          fluid(maxWidth: 660, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  const mov = () => {
    const yPos = window.pageYOffset
    gsap.to(CSSRulePlugin.getRule("#bgl01::after"), {
      cssRule: {
        backgroundPositionX: `${yPos / 45}px`,
      },
      duration: 0.125,
    })
    gsap.to(CSSRulePlugin.getRule("#bgl02::after"), {
      cssRule: {
        backgroundPositionX: `-${yPos / 43}px`,
      },
      duration: 0.125,
    })
    gsap.to(CSSRulePlugin.getRule("#bgl03::after"), {
      cssRule: {
        backgroundPositionX: `${yPos / 41}px`,
      },
      duration: 0.125,
    })
    gsap.to("#blackBox", {
      backgroundColor: `rgba(50,53,63,${yPos / 1000})`,
      duration: 0.75,
    })
  }
  useEffect(() => {
    window.addEventListener("scroll", mov)
    return () => {
      window.removeEventListener("scroll", mov)
    }
  })
  const bgl01 = res.bgl01.childImageSharp.fluid
  const bgl02 = res.bgl02.childImageSharp.fluid
  const bgl03 = res.bgl03.childImageSharp.fluid
  const logo = res.logo.childImageSharp.fluid
  return (
    <>
      <Global
        styles={css`
          #bgl01::after {
            background-position-x: 0px;
          }
          #bgl02::after {
            background-position-x: 0px;
          }
          #bgl03::after {
            background-position-x: 0px;
          }
        `}
      />
      <L01 fluid={bgl01} id="bgl01" critical={true}>
        <L02 fluid={bgl02} id="bgl02" critical={true}>
          <L03 fluid={bgl03} id="bgl03" critical={true}>
            <BlackBox id="blackBox">
              <Content className="container">
                <ImageBox>
                  <Img fluid={logo} alt="EntGamers" loading="eager" />
                </ImageBox>
                <TitleBox>
                  <SiteTitle>EntGamers</SiteTitle>
                  <span className="h2">Comunidad Social para Gamers</span>
                </TitleBox>
              </Content>
            </BlackBox>
          </L03>
        </L02>
      </L01>
    </>
  )
}

export default Hero
