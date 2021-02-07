import React from "react"

import SEO from "../components/helpers/seo"
import Hero from "../components/secciones/home/Hero"
import EstilosGlobales from "../components/helpers/EstilosGlobales"
import About from "../components/secciones/home/About"
import Donde from "../components/secciones/home/Donde"

const IndexPage = () => (
  <>
    <EstilosGlobales />
    <SEO title="Home" />
    <Hero />
    <About />
    <Donde />
  </>
)

export default IndexPage
