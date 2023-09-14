import styled from "styled-components";

const MemberHistoyContainer = styled.div`
  width: 100%;
  .sum {
    display: flex;
    margin-bottom: 16px;
    align-items: center;
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

  .loadIcon {
    width: 20%;
    margin-left: 5px;
  }

  .mandatoryHours {
    margin-bottom: 48px;
  }

  .pointHistoric {
  }
  .ant-table{
    overflow-x: scroll;
  }
`;

export { MemberHistoyContainer };
