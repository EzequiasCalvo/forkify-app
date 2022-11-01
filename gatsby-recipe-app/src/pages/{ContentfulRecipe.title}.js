import React, { useState } from "react"
import Layout from "../components/Layout"
import { DetailWrapper, Button, Info } from "../styles/recipe"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { graphql } from "gatsby"

function RecipeTemplate(props) {
  console.log(props, "props")
  const [activeTab, setActiveTab] = useState("Instructions")
  const {
    title,
    description: { description },
    summary: { summary },
    image,
    content: { extendedIngredients },
  } = props.data.contentfulRecipe

  const pathToImage = getImage(image)

  return (
    <Layout>
      <DetailWrapper>
        <div>
          <h2>{title}</h2>
          <GatsbyImage image={pathToImage} alt={title} />
        </div>
        <Info>
          <div>
            <Button
              className={activeTab === "Instructions" ? "active" : ""}
              onClick={() => setActiveTab("Instructions")}
            >
              Instructions
            </Button>
            <Button
              className={activeTab === "Ingredients" ? "active" : ""}
              onClick={() => setActiveTab("Ingredients")}
            >
              Ingredients
            </Button>
          </div>
          <div>
            {activeTab === "Instructions" && (
              <div>
                <h3>{summary}</h3>
                <h3>{description}</h3>
              </div>
            )}
            {activeTab === "Ingredients" && (
              <ul>
                {extendedIngredients.map(ing => {
                  return <li key={ing.id}>{ing.original}</li>
                })}
              </ul>
            )}
          </div>
        </Info>
      </DetailWrapper>
    </Layout>
  )
}

export const query = graphql`
  query getSingleRecipe($title: String) {
    contentfulRecipe(title: { eq: $title }) {
      title
      content {
        extendedIngredients {
          original
        }
      }
      summary {
        summary
      }
      description {
        description
      }
      image {
        gatsbyImageData(layout: FIXED, width: 350, height: 300)
      }
    }
  }
`

export default RecipeTemplate
