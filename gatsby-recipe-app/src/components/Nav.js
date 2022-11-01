import React from "react"
import { GiKnifeFork } from "react-icons/gi"
import { NavDiv, Logo } from "../styles/nav"

const Nav = () => {
  return (
    <NavDiv>
      <GiKnifeFork />
      <Logo to={"/"}>Tasty</Logo>
    </NavDiv>
  )
}

export default Nav
