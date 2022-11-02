import React from "react"
import { Link } from "gatsby"
import { Grid, Card } from "../styles/cuisine"
import Layout from "../components/Layout"
import Seo from "../components/Seo"
import slugify from "slugify"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

const CuisineCategory = ({ data }) => {
  const { nodes } = data.allContentfulRecipe

  return (
    <Layout>
      <Seo title="Category" />
      <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {nodes.map(({ title, image, id }) => {
          const slug = slugify(title, { lower: true })
          const pathToImage = getImage(image)
          return (
            <Card key={id}>
              <Link to={`/${slug}`}>
                <GatsbyImage image={pathToImage} alt={title} />
                <h4>{title}</h4>
              </Link>
            </Card>
          )
        })}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query getRecipeByCategory($category: String) {
    allContentfulRecipe(filter: { category: { eq: $category } }) {
      nodes {
        id
        title
        image {
          gatsbyImageData(layout: CONSTRAINED)
        }
      }
    }
  }
`

export default CuisineCategory
