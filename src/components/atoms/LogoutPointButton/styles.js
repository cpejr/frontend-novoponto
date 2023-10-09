import styled from "styled-components";

const LogoutPointButtonContainer = styled.div`
  height: 60px;
  background-color: ${(props) => props.color || "red"};
  border-radius: 2px;
  width: 90px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.5s;
  cursor: pointer;

  img {
    width: 20px;
    height: 23px;
    transition: color 0.5s;

    &:hover {
      color: #0B2724;
    }
  }

  &:hover {
    background-color: ${(props) => props.color};
    opacity: 0.8;
  }
`;

export default LogoutPointButtonContainer;
