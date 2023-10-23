import styled from "styled-components";

const FilterArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 90%;
  margin: auto;
  margin-bottom: 40px;
  margin-top: 30px;
  > :first-of-type {
    max-width: 300px;
    min-width: 200px;
  }
  @media (max-width: 920px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`

export { FilterArea }; 