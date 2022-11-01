import React from "react"
import Nav from "./Nav"
import Category from "./Category"
import "../styles/layout.css"

const Layout = ({ children }) => {
  return (
    <>
      <Nav />
      <Category />
      {children}
    </>
  )
}

export default Layout
