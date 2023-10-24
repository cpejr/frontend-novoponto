import styled from "styled-components";

const ContainerTable = styled.div`
  margin: auto;
  .ant-table{
    overflow-x: scroll;
  }
`

const SumTotalTitle = styled.h6`
  margin-top: 7px;
  margin-right: 5px;
  text-align: center;
`

const HourDisplay = styled.div`
  display: flex;
  align-items: center;
`

const HeadTable = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  margin-bottom: 15px;
  .ant-picker-range {
    max-width: 250px;
    height: 30px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: normal;
  }
`

export { ContainerTable, SumTotalTitle, HourDisplay, HeadTable }