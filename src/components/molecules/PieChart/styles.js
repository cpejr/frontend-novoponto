import styled from "styled-components";
import { colors } from "../../../context/ThemeProvider/pallete";

export const CustomToolTip = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 130px;
  min-height: 40px;
  padding: 5px;
  text-align: center;
  background-color: rgba(49, 49, 49, 0.95);
  color: white;
  font-size: 16px;
`;

export const CenterText = styled.text`
  font-size: 11px;
  font-weight: 500;
  color: white;
`;

