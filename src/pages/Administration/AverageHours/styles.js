import styled from "styled-components";

const AverageHoursComponent = styled.div`
  width: 100%;
  min-height: 10vh;

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
      color: #ffffff;
    }
  }

  .rangePicker {
    max-width: 250px;
    margin-left: 20px;
  }

  .tables {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
  }

  table,
  th,
  tr,
  td {
    margin: 0;
    padding: 0;
  }

  .departamentHoursTable,
  .roleHoursTable {
    width: 100%;
    display: block;
    overflow-x: scroll;
    margin: 3rem 0;

    tr {
      height: 80px;
      padding: 0px 20px;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 2px solid #1c1c1d;
    }

    thead tr:first-child {
      height: 65px;
      background-color: #1d1d1d;

      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-radius: 5px;
    }

    @media (max-width: 1100px) {
      margin-bottom: 70px;
      width: 100%;
    }
  }

  .avgHoursColumn {
    width: 45%;
    max-width: 50vw;
    min-width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
  }
`;

export { AverageHoursComponent };

