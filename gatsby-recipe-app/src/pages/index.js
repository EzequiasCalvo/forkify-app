import React from "react"
import Layout from "../components/Layout"
import Popular from "../components/Popular"
import Veggie from "../components/Veggie"
import Seo from "../components/Seo"

export default function Home() {
  return (
    <Layout>
      <Seo title="Home" />
      <Popular />
      <Veggie />
    </Layout>
  )
}
