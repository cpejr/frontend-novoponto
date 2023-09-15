import styled from "styled-components";

const HoursSumAndTablesArea = styled.div`
  margin-right: 10%;
`;

const FlexDiv = styled.div`
  display: flex;
`;

const ExportButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 500px) {
    display: block;
  }
`;

export { HoursSumAndTablesArea, FlexDiv, ExportButtonContainer };

