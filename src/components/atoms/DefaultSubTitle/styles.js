import styled from "styled-components";

const DefaultSubTitleContainer = styled.p`
  color: ${(props) => (!!!props.error ? "#fff" : "#CA191B")};
  font-size: 25px;
  margin-bottom: 8px;
`;

export default DefaultSubTitleContainer;
