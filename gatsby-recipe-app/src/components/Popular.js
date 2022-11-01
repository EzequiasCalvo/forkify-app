import React from "react"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import { Wrapper, Card, Gradient } from "../styles/common"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import slugify from "slugify"

const query = graphql`
  {
    allContentfulRecipe(filter: { category: { eq: "popular" } }) {
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
export default function Popular() {
  const {
    allContentfulRecipe: { nodes },
  } = useStaticQuery(query)

  return (
    <div>
      <Wrapper>
        <h3>Popular Picks</h3>
        <Splide
          options={{
            perPage: 3,
            pagination: false,
            drag: "free",
            gap: "2rem",
          }}
        >
          {nodes.map(({ title, id, image }) => {
            const slug = slugify(title, { lower: true })
            return (
              <SplideSlide key={id}>
                <Card>
                  <Link to={`/${slug}`}>
                    <p>{title}</p>
                    <GatsbyImage image={image.gatsbyImageData} alt={title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}
