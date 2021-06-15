import styled from "styled-components";

const PontoComponent = styled.div`
  min-height: 100vh;

  .newsSection {
    width: 100%;
    height: 300px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    padding: 0px 20px;

    .news {
      width: 500px;
      height: 250px;
      background-color: #000000;

      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;

      img {
        max-height: 90%;
      }
    }
    .news + .news {
      margin-left: 30px;
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
