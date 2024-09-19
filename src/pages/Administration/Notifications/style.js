import styled from "styled-components";
import { TextArea } from "../../../components/atoms";
import { colors } from "../../../context/ThemeProvider/pallete";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  .Button {
    width: 150px;
    height: 40px;
    margin-left: 30px;
    background-color: ${colors.green};
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 32px;

  .IconSVG {
    font-size: 40px;
    margin-right: 8px;
  }
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 30px;
  align-items: center;
`;

export const MessageContainer = styled.div`
  h3 {
    color: ${(props) => (!!!props.error ? "#fff" : "#CA191B")};
    font-size: 20px;
    margin-bottom: 8px;

    @media (max-width: 340px) {
      width: 130px;
      font-size: 18px;
    }
  }
`;

export const LinkContainer = styled.div`
  h3 {
    color: ${(props) => (!!!props.error ? "#fff" : "#CA191B")};
    font-size: 20px;
    margin-bottom: 8px;

    @media (max-width: 340px) {
      width: 130px;
      font-size: 18px;
    }
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  line-height: 29px;
  padding-left: 0.5rem;
  color: #ffffff;
`;

export const TextAreaMessage = styled(TextArea)`
  width: 500px;
  margin-right: 30px;
`;
