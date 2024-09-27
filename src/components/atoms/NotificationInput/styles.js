import styled from "styled-components";
import TextArea from "antd/lib/input/TextArea";
import { colors } from "../../../context/ThemeProvider/pallete";

export const ContainerInput = styled.div`
  h3 {
    color: ${colors.white};
    font-size: 20px;
    margin-bottom: 8px;

    @media (max-width: 340px) {
      width: 130px;
      font-size: 18px;
    }
  }
`;

export const TextAreaMessage = styled(TextArea)`
  width: 500px;
  margin-right: 30px;
`;
