import styled from "styled-components";
import { colors } from "../../../context/ThemeProvider/pallete";
import { CommonButton } from "../../atoms";

export const Container = styled.div`
  display: ${(props) => (props.visible ? "flex" : "none")};
  position: fixed;
  right: 20px;
  z-index: 10;
  align-items: center;
  justify-content: center;
  background-color: #1d1d1d;
  border: solid 2px ${colors.yellowCPE};
  border-radius: 20px;
  border-top-right-radius: 0px;
  flex-direction: column;
  width: 267px;
  height: 93px;
  align-items: center;
  padding: 20px;

  h1 {
    font-size: 15px;
  }

  &:hover {
    cursor: pointer;
    background-color: ${colors.primary};
  }

  .iconClose {
    position: fixed;
    right: 22px;
    top: 110px;
    margin-right: 10px;
    font-size: 20px;
    color: ${colors.yellowCPE};

    &:hover {
      cursor: pointer;
      color: ${colors.white};
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  gap: 20px;
`;

export const Button = styled(CommonButton)`
  width: 250px;
  box-shadow: 1px 2px 6px #000;
  border: solid 1px ${colors.white};
  background-color: ${colors.red};
  &:hover {
    background-color: ${colors.redHover};
    box-shadow: 0px 0px 0px #000;
  }
`;
