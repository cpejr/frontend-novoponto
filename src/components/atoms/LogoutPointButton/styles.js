import styled from "styled-components";

const LogoutPointButtonContainer = styled.div`
  height: 38px;
  background-color: ${(props) => props.color || "red"};
  border-radius: 2px;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 0.5s;
  cursor: pointer;

  img {
    width: 16px;
    height: 23px;
    transition: color 0.5s;

    &:hover {
      color: #00a6c5;
    }
  }

  &:hover {
    background-color: ${(props) => props.color};
    opacity: 0.8;
  }
`;

export default LogoutPointButtonContainer;
