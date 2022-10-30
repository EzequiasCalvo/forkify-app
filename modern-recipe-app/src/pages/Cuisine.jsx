import { useState, useEffect } from "react";
import styled from "styled-components";
// import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 2rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  useEffect(() => {
    console.log(params.category);
    getCuisine(params.category);
  }, [params.category]);

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };
  return (
    <Grid>
      {cuisine.map((item) => {
        return (
          <Card>
            <img src={item.image} alt={item.title} />
            <h4>{item.title}</h4>
          </Card>
        );
      })}
    </Grid>
  );
};

export default Cuisine;
