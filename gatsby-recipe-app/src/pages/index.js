import React from "react"
import Layout from "../components/Layout"
import Popular from "../components/Popular"
import Veggie from "../components/Veggie"

export default function Home() {
  return (
    <Layout>
      <Popular />
      <Veggie />
    </Layout>
  )
}
