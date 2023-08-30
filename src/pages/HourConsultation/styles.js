import styled from "styled-components";

const HoursConsultationComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  padding-top: 10px;
  padding-bottom: 5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h3 {
    margin-bottom: 16px;
    color: #ffffff;
  }

  .sum {
    display: flex;
    margin-bottom: 16px;
    align-items: center;
  }

  .sum > h3 {
    margin: 0px;
    margin-right: 8px;
  }

  .ant-collapse-item {
    margin-bottom: 32px;
  }

  .ant-collapse-header {
    padding-left: 25px !important;
  }

  .ant-collapse-header svg {
    color: #fff;
  }

  .ant-collapse-header span {
    left: 0 !important;
  }

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
    width: 360px;
    min-height: 80px;
    padding: 32px 0px;
  }

  .mandatoryHours {
    margin-bottom: 48px;
  }

  .pointHistoric {
    max-width: 300px;
    margin-bottom: 48px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
`;

export { HoursConsultationComponent, FlexDiv };
