import styled from "styled-components";

const CommonButtonContainer = styled.button`
  width: ${(props) => props.width || "50px"};
  height: 32px;
  background-color: ${(props) => props.color || "red"};
  border-radius: 4px;
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

  &:hover:enabled {
    filter: brightness(125%);
  }

  &:active:enabled {
    filter: brightness(100%);
    transition: filter 0s;
  }

  &:disabled {
    cursor: default;
  }

  span + div {
    margin-left: 0.3em;
  }
`;

export default CommonButtonContainer;
