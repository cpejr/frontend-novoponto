import styled from "styled-components";

const ProjectsComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.appBackground};

  display: flex;
  flex-direction: column;
  padding: 30px 20px;

  .iconWithTitle {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 32px;

    .svgIcon {
      font-size: 40px;
      margin-right: 8px;
    }
    h1 {
      font-size: 30px;
      font-weight: 400;
      line-height: 29px;
      padding-left: 0.5rem;
      color: #ffffff;
    }
  }

  .addNewProjectButtonArea {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 48px;
  }

  table,
  th,
  tr,
  td {
    margin: 0;
    padding: 0;
    img {
      height: 35px;
    }
  }

  .projectTable {
    width: 100%;
    display: block;
    overflow-x: scroll;
  }

  .projectTable tr {
    height: 80px;
    background-color: #141414;
    padding: 0px 20px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px solid #1c1c1d;
  }

  .projectTable thead tr:first-child {
    height: 65px;
    background-color: #1d1d1d;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
  }

  .projectColumn {
    width: 45%;
    max-width: 50vw;
    min-width: 140px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #ffffff;
    overflow: auto;
  }

  .isAdmColumn {
    width: 35%;
    min-width: 150px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .editColumn,
  .garbageColumn {
    width: 12%;
    min-width: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      font-size: 25px;
      cursor: pointer;
    }
    svg:hover {
      color: rgb(255, 244, 41);
    }
  }

  .garbageColumn {
    svg:hover {
      color: #c70000;
    }
  }
  @media (max-width: 720px) {
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
    padding-bottom: 5px;
  }
`;

export { ProjectsComponent };

