import styled from "styled-components";

export const PontoComponent = styled.div`
  min-height: 100vh;

  td.logoutButton button {
    width: 100%;
    background-color: #1d1d1d;
  }

  tr.customHeader {
    background-color: #1d1d1d;
    color: #ffffff;

    th {
      padding: 20px 0 20px 0;
    }
  }
`;

export const newsComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.appBackground};
`;

export const SessionsTableContainer = styled.div`
  .ant-table {
    background-color: transparent;
  }
  .ant-table-cell {
    border: none;
  }
  .ant-table-thead {
    .ant-table-cell {
      font-weight: bold;
    }
  }
`;
