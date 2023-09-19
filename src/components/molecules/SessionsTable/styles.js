import styled from "styled-components";

const HoursSumAndTablesArea = styled.div`
  margin-right: 10%;

  .buttonsEditGarbage{
    display: flex;
  }

	.columnText{
		margin: 0;
    max-width: 180px;
    min-width: 140px;
    word-break: break-word;
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
`;

const FlexDiv = styled.div`
  display: flex;
`;
export { HoursSumAndTablesArea, FlexDiv };
