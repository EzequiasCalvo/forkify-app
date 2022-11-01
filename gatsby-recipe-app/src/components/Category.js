import React from "react"
import { FaPizzaSlice, FaHamburger } from "react-icons/fa"
import { GiNoodles, GiChopsticks } from "react-icons/gi"
import { SLink, List } from "../styles/category"

function Category() {
  return (
    <List>
      <SLink
        to={"cuisine/Italian"}
        activeClassName="active"
        partiallyActive={true}
      >
        <FaPizzaSlice />
        <h4>Italian</h4>
      </SLink>
      <SLink to={"cuisine/American"} activeClassName="active">
        <FaHamburger />
        <h4>American</h4>
      </SLink>
      <SLink to={"cuisine/Thai"} activeClassName="active">
        <GiNoodles />
        <h4>Thai</h4>
      </SLink>
      <SLink to={"cuisine/Japanese"} activeClassName="active">
        <GiChopsticks />
        <h4>Japanese</h4>
      </SLink>
    </List>
  )
}

export default Category
