import React from "react"
import { FaPizzaSlice, FaHamburger } from "react-icons/fa"
import { GiNoodles, GiChopsticks } from "react-icons/gi"
import { SLink, List } from "../styles/category"

function Category() {
  return (
    <List>
      <SLink to={"/italian"} activeClassName="active">
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"/american"} activeClassName="active">
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"/thai"} activeClassName="active">
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"/japanese"} activeClassName="active">
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  )
}

export default Category
