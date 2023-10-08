import styled from "styled-components";

const DefaultSubTitleContainer = styled.p`
  color: ${(props) => (!!!props.error ? "#fff" : "#CA191B")};
  font-size: 20px;
  margin-bottom: 8px;

  @media (max-width: 340px) {
    width: 130px;
    font-size: 18px;
  }
`;

export default DefaultSubTitleContainer;