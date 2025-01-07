import styled from "styled-components";

const NumberAreaContainer = styled.div`
  display: flex;
  width: 200px;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 2px;
  flex-grow: 1;

  @media (max-width: 400px) {
    width: auto;
    padding-right: 60px;
  }
  @media (max-width: 300px) {
    width: auto;
    padding-right: 30px;
  }
`;

export default NumberAreaContainer;
