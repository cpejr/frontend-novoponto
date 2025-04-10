import styled from "styled-components";
import { TextArea } from "../../../components/atoms";
import { colors } from "../../../context/ThemeProvider/pallete";
import { Table } from "antd";

export const Container = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  margin-top: 10px;

  .Button {
    width: 150px;
    height: 40px;
    margin-left: 30px;
    background-color: ${colors.green};
  }
`;

export const NotificationsComponent = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.appBackground};
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
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

  @media (max-width: 1000px) {
    flex-direction: column;
    gap: 10px;
    align-items: start;
    width: 100%;
  }
`;

export const ControllerWrapper = styled.div`
  flex: 1;
  width: 30%; /* Garante que cada controlador ocupe 33% da largura */
  margin-right: 8px;

  @media (max-width: 1000px) {
    max-width: none;
    width: 100%;
  }
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 400;
  line-height: 29px;
  padding-left: 0.5rem;
  color: ${colors.white};
`;

export const TableTest = styled(Table)`
  .ant-table {
    width: 100%; /* Garante que a tabela ocupe a largura total do contêiner */
  }

  .ant-table-cell {
    white-space: normal; /* Permite a quebra de linha dentro das células */
    word-wrap: break-word; /* Garante que palavras longas sejam quebradas */
    word-break: break-word; /* Adiciona suporte para quebra de palavras */
    @media (max-width: 1015px) {
      font-size: 12px;
    }
    @media (max-width: 960px) {
      font-size: 10px;
    }
    @media (max-width: 630px) {
      padding: 5px;
    }
  }
`;

export const TR = styled.tr``;
