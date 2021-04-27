import styled from "styled-components";

const PontoComponent = styled.div`

  .fullContentPagePoint {
    width: 90%;
    min-height: 100vh;
    margin: 0 auto;
  }

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

  .pointSection {
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;

    .searchesSubsection {
      width: 100%;
      height: 60px;
      /* padding: 0px 20px; */

      display: flex;
      justify-content: space-between;

      .loginAndItsValidateSection {
        .validateMessageLogin {
          color: red;
          font-size: 12px;
        }

        .loginSection {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          flex-wrap: wrap;
        }
      }
    }

    .subSectionLoggedMembers {
      width: 100%;
      height: auto;

      table,
      th,
      tr,
      td {
        margin: 0;
        padding: 0;
      }

      .HeaderTablePointMembers {
        width: 100%;
      }

      .HeaderTablePointMembers tr {
        height: 80px;
        padding: 0px 20px;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-bottom: 2px solid #1c1c1d;
      }

      .HeaderTablePointMembers thead tr:first-child {
        height: 65px;
        background-color: #1d1d1d;

        display: flex;
        justify-content: flex-start;
        align-items: center;
        border-radius: 5px;
      }

      .memberColumn {
        width: 60%;
        max-width: 50vw;
        display: flex;
        justify-content: flex-start;
        color: #ffffff;
      }
      .startTime,
      .finishTime {
        width: 15%;
        min-width: 100px;
        display: flex;
        justify-content: flex-start;
        color: #ffffff;
      }

      .logoutButton {
        width: 10%;
        min-width: 100px;
      }
    }

    .buttonLogouAllMembers {
      width: 100%;
      display: flex;
      justify-content: flex-end;

      margin-top: 30px;
    }
  }

  @media (max-width: 720px) {
    height: auto;
    overflow-x: scroll;

    .newsSection {
      height: auto;
      flex-direction: column;
      margin-bottom: 20px;

      .news {
        margin-top: 20px;
        max-width: 100%;
      }

      .news + .news {
        margin-top: 20px;
        margin-left: 0px;
      }
    }

    .pointSection {
      height: auto;

      .subSectionLoggedMembers,
      .searchesSubsection {
        padding-left: 20px;
      }

      .searchesSubsection {
        height: auto;
        flex-direction: column;
        align-items: flex-start;

        .loginSection {
          margin: 16px 0px;
        }
      }

      .subSectionLoggedMembers .memberColumn {
        width: auto;
      }
    }
  }

  td.logoutButton button {
    width: 100%;
    background-color: #1D1D1D;
  }
`;

const newsComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.appBackground};
`;

export { PontoComponent, newsComponent };
