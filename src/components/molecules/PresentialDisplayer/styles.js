import styled from "styled-components";

const PresentialDisplayerContainer = styled.div`
  height: 32px;
  width: 88px;
  
  background-color: ${(props) => props.color || "red"};
  border-radius: 2px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff !important;
  font-size: 16px;
  font-weight: 500;
  padding: 8px;
`;

export default PresentialDisplayerContainer;