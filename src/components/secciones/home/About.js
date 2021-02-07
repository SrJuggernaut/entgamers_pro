import React from "react"
import styled from "@emotion/styled"
import BImg from "gatsby-background-image"
import { graphql, useStaticQuery } from "gatsby"

import bP from '../../../helpers/breakPoints'

const AboutWrapper = styled(BImg)`
  min-height: 95vh;
  display: flex;
  align-items: center;
  background-attachment: fixed;
`
const Glass = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0px 0px 15px 3px rgba(0,0,0,0.75);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: var(--spacer);
  display: grid;
  grid-template-columns: 1fr;
  @media(min-width: ${bP.sm}){
    grid-template-columns: repeat(2, 1fr);
  }
  div{
    text-align: center;
  }
`
function About(props) {
  const res = useStaticQuery(graphql`
    {
      Bg: file(name: { eq: "mistreryousForestDay" }) {
        childImageSharp {
          fluid(maxWidth: 1920, quality: 90) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  `)
  const Bg = res.Bg.childImageSharp.fluid
  return (
    <AboutWrapper fluid={Bg}>
      <Glass className="container">
        <div>
          <h2>¿Que es EntGamers?</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In eligendi repellendus accusamus. Possimus similique tempore reiciendis beatae accusamus quaerat sint unde magni, harum praesentium? Eligendi!</p>
        </div>
        <div>
          Hola Mundo
        </div>
      </Glass>
    </AboutWrapper>
  )
}

export default About
