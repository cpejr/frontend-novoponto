import styled from "styled-components";

const FlexDiv = styled.div`
  display: flex;
`;

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
  height: 100px;
  margin-bottom: 15px;
  .ant-picker-range {
    min-width: 250px;
    height: 30px;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    align-items: normal;
  }
`

export { FlexDiv, ContainerTable, SumTotalTitle, HourDisplay, HeadTable }