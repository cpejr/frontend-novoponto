import styled from "styled-components";

const CommonButtonContainer = styled.button`
  width: ${(props) => props.width || "50px"};
  height: 32px;
  background-color: ${(props) => props.color || "red"};
  border-radius: 0px 4px 4px 0px;
  outline: none;
  border: none;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  font-weight: 400;

  cursor: pointer;
  transition: background-color 0.35s;
  transition: filter 0.35s;

  &:hover {
    filter: brightness(125%);
  }

  &:active {
    filter: brightness(100%);
    transition: filter 0.0s;
  }

  span {
    margin-right: 0.3em;
  }
`;

export default CommonButtonContainer;
