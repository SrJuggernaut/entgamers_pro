import React from "react"
import styled from "@emotion/styled"
import BgImg from "gatsby-background-image"
import { graphql, useStaticQuery } from "gatsby"

const ClanesWrapper = styled(BgImg)`
  background-color: white;
  background-attachment: fixed;
  min-height: 85vh;
`
const ClanesBanner = styled(BgImg)`
  min-height: 85vh;
  background-position: top center;
  filter: drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.8));
`
const ClanesBanner2 = styled(BgImg)`
  display: flex;
  align-items: center;
  min-height: 85vh;
  background-position: top center;
  filter: drop-shadow(0px 3px 8px rgba(0, 0, 0, 0.8));
`
const ClanesContent = styled.div`
  background: rgba(255, 255, 255, 0.35);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`
function Clanes(props) {
  const res = useStaticQuery(graphql`
    {
      Banners0: file(name: { eq: "Banners0" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      Banners1: file(name: { eq: "Banners1" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
      Banners2: file(name: { eq: "Banners2" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  const Banners0 = res.Banners0.childImageSharp.fluid
  const Banners1 = res.Banners1.childImageSharp.fluid
  const Banners2 = res.Banners2.childImageSharp.fluid
  return (
    <ClanesWrapper fluid={Banners0} id="banners0">
      <ClanesBanner fluid={Banners1} id="banners1">
        <ClanesBanner2 fluid={Banners2} id="banners2">
          <ClanesContent className="container">
            <h1>Hola Mundo</h1>
          </ClanesContent>
        </ClanesBanner2>
      </ClanesBanner>
    </ClanesWrapper>
  )
}

export default Clanes
