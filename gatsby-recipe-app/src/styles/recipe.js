import styled from "styled-components"

export const DetailWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-right: 1rem;
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-left: 1rem;
    margin-top: 2rem;
  }
`

export const Button = styled.button`
  height: 50px;
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
`

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
`
