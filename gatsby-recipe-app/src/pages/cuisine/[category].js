import React, { useState, useEffect } from "react"
import { Link } from "gatsby"
import { Grid, Card } from "../../styles/cuisine"
import Layout from "../../components/Layout"

const Cuisine = ({ params }) => {
  const [cuisine, setCuisine] = useState([])

  console.log(params, "params")

  useEffect(() => {
    getCuisine(params.category)
  }, [params.category])

  const getCuisine = async name => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=cc7d613b721b4a5c9743a413deaacb9c&cuisine=${name}`
    )
    const recipes = await data.json()
    setCuisine(recipes.results)
  }
  return (
    <Layout>
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {cuisine.map(item => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          )
        })}
      </Grid>
    </Layout>
  )
}

export default Cuisine
