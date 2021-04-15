import styled from "styled-components";

const DefaultTextContainer = styled.p`
  color: ${(props) => (!!!props.error ? "#fff" : "#CA191B")};
  font-size: 14px;
  margin-bottom: 8px;
`;

export default DefaultTextContainer;
