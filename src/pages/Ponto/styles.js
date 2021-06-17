import styled from "styled-components";

const PontoComponent = styled.div`
  min-height: 100vh;

  .newsRadio {
    max-height: 342px;
  }

  .newsRow {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-around;

    .news {
      display: flex;
      width: 100%;
      max-width: 608px;

      height: 100%;
      background-color: #000000;

      justify-content: center;
      align-items: center;
      border-radius: 10px;
    }
    .news + .news {
      margin-left: 16px;
    }

    .defaultNews {
      max-width: 226px;
      max-height: 171px;
    }
  }

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

export { PontoComponent, newsComponent };
