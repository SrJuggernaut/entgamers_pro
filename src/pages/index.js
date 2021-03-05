import React from "react"

import About from "../components/secciones/home/About"
import EstilosGlobales from "../components/helpers/EstilosGlobales"
import Donde from "../components/secciones/home/Donde"
import Hero from "../components/secciones/home/Hero"
import SEO from "../components/helpers/seo"
import Razon from "../components/secciones/home/Razon"
import Clanes from "../components/secciones/home/Clanes"

const IndexPage = () => (
  <>
    <EstilosGlobales />
    <SEO title="Home" />
    <Hero />
    <About />
    <Clanes />
    <Razon />
    <Donde />
  </>
)

export default IndexPage
