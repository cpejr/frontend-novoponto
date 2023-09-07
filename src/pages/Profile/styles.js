import styled from "styled-components";

const ProfileComponent = styled.div`
  margin: 0 5%;
  width: 100%;

  background-color: ${(props) => props.theme.appBackground};

  @media (max-width: 767px){
    margin: 0;
    width: 105%;
  }

  .centralize {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }

  .errorText {
    margin-top: 16px;
    text-align: center;
  }

  .outlinedBox {
    width: 90%;
    max-width: 100%;
    height: auto;
    display: flex;
    justify-content: start;
  }
`;

const HoursConsultationComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  padding-top: 10px;
  padding-bottom: 5px;

  display: flex;
  flex-direction: column;
  align-items: flex-start;

  margin-left: 5%;
  margin-top: 5%;

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
  }

  .pointHistoric {
    max-width: 300px;
    margin-bottom: 48px;
  }
`;

export { ProfileComponent, HoursConsultationComponent };
