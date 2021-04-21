import styled from "styled-components";

const AditionalHourTableArea = styled.div`
  width: 100%;
  margin-bottom: 24px;

  h3 {
    margin-bottom: 16px;
    color: #ffffff;
  }

  .justificationTable {
    width: 100%;
  }
  .justificationTable tr {
    height: 80px;
    background-color: #141414;
    padding: 0px 20px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px solid #1c1c1d;
  }

  .justificationTable thead tr:first-child {
    height: 65px;
    background-color: #1d1d1d;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
  }

  .dayColumn {
    min-width: 120px;
    display: flex;
    justify-content: flex-start;
    color: #ffffff;
  }

  .timeArea,
  .typeArea {
    width: 30%;
    min-width: 120px;
    display: flex;
    justify-content: flex-start;
    color: #ffffff;
  }

  .justificationTablesArea {
    width: 100%;
    margin-bottom: 48px;
  }

  .descriptionArea {
    align-items: center;
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;
export { AditionalHourTableArea, FlexDiv };
