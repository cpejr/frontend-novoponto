import styled from "styled-components";

const PontoComponent = styled.div`
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

const newsComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.appBackground};
`;

const FooterDiv = styled.div``;

export { PontoComponent, newsComponent, FooterDiv };
