import styled from "styled-components";

const HoursConsultationComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  padding: 20px;

  background-color: ${(props) => props.theme.appBackground};

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* Ajuste CSS do RangePicjer */
  .ant-picker-range {
    min-width: 250px;
  }

  .selectMemberArea {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 300px;
  }

  .loadIcon {
    width: 20%;
    margin-left: 5px;
  }

  .memberArea {
    min-height: 80px;
    padding: 32px 0px;
  }

  .mandatoryHours {
    margin-bottom: 48px;
    h2 {
      margin-bottom: 16px;
      color: #ffffff;
    }
  }

  .mandatoryHoursTable,
  .hoursSumAndTable,
  .justificationTable {
    width: 100%;
  }

  .mandatoryHoursTable tr,
  .hoursSumAndTable tr,
  .justificationTable tr {
    height: 80px;
    background-color: #141414;
    padding: 0px 20px;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 2px solid #1c1c1d;
  }

  .mandatoryHoursTable tr:first-child,
  .hoursSumAndTable tr:first-child,
  .justificationTable tr:first-child {
    height: 65px;
    background-color: #1d1d1d;

    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 5px;
  }

  .dayColumn {
    width: 40%;
    min-width: 120px;
    display: flex;
    justify-content: flex-start;
    color: #ffffff;
  }

  .startTime,
  .finishTime,
  .timeArea,
  .typeArea {
    width: 30%;
    min-width: 120px;
    display: flex;
    justify-content: flex-start;
    color: #ffffff;
  }

  .pointHistoric {
    max-width: 300px;
    margin-bottom: 48px;
    h2 {
      margin-bottom: 16px;
      color: #ffffff;
    }
  }

  .hoursSumAndTablesArea,
  .justificationTablesArea {
    width: 100%;
    margin-bottom: 24px;
    h2 {
      margin-bottom: 16px;
      color: #ffffff;
    }
    .hoursSumAndTable {
      width: 100%;
    }
  }

  .hoursSumAndTablesArea,
  .justificationTablesArea {
    width: 100%;
    margin-bottom: 48px;
    h2 {
      margin-bottom: 16px;
      color: #ffffff;
    }
    .hoursSumAndTable {
      width: 100%;
    }
  }
`;

export { HoursConsultationComponent };
