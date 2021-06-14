import styled from "styled-components";

const DefaultLabelContainer = styled.div`
  width: ${(props) => props.width};
  border: 1px solid ${(props) => props.color || "red"};
  border-radius: 2px;
  padding: 1px 8px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.color || "red"};
  font-size: 12px;
  font-weight: normal;
  overflow: hidden;
  white-space: nowrap;
`;

export default DefaultLabelContainer;
