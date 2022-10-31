import { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  height: 50px;
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
`;

function Recipe() {
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("Instructions");

  let params = useParams();

  useEffect(() => {
    fetchDetails(params.name);
  }, [params.name]);

  const fetchDetails = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
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
              <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}
              ></h3>
            </div>
          )}
          {activeTab === "Ingredients" && (
            <ul>
              {details.extendedIngredients.map((ing) => {
                return <li key={ing.id}>{ing.original}</li>;
              })}
            </ul>
          )}
        </div>
      </Info>
    </DetailWrapper>
  );
}

export default Recipe;
