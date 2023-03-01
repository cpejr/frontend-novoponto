import styled from "styled-components";

const TribesComponent = styled.div`
	width: 100%;
	min-height: 100vh;

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

	.addNewTribeButtonArea {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 48px;

		@media (max-width: 826px) {
			width: 80%;
		}

		@media (max-width: 594px) {
			width: 100%;
		}
	}

	table,
	th,
	tr,
	td {
		margin: 0;
		padding: 0;
	}

	.tribeTable {
		width: 100%;
		display: block;
		overflow-x: scroll;
	}

	.tribeTable tr {
		height: 80px;
		background-color: #141414;

		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 2px solid #1c1c1d;
	}

	.tribeTable thead tr:first-child {
		height: 65px;
		background-color: #1d1d1d;

		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 5px;
	}

	.tribeColumn {
		width: 53.3vh;
		max-width: 53.3vw;
		min-width: 160px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #ffffff;

		@media (max-width: 1201px) {
			width: 45vh;
		}

		@media (max-width: 1100px) {
            width:24vw;
        }

		@media (max-width: 1060px) {
			justify-content: flex-start;
			padding-left: 5%;
        }

		@media (max-width: 1040px) {
			width: 35vh;
		}

		@media (max-width: 890px) {
			width: 30vh;
		}

		@media (max-width: 586px) {
			width: 25vh;
		}

		@media (max-width: 565px) {
			min-width: 120px;
		}

		@media (max-width: 491px) {
			min-width: 70px;
			width: 22vh;
		}

		@media (max-width: 445px) {
			width: 21vh;
			max-width: 13vh;
		}

	}

	.isAdmColumn {
		width: 35%;
		min-width: 150px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.editColumn,
	.garbageColumn {
		width: 15%;

		display: flex;
		justify-content: center;
		align-items: center;

		@media (max-width: 445px) {
			margin-left: 40px;
		}

		svg {
			font-size: 25px;
			cursor: pointer;
		}
		svg:hover {
			color: rgb(255, 244, 41);
		}
	}

	.garbageColumn {
		margin-left: 0px;
		svg:hover {
			color: #c70000;
		}
	}
	@media (max-width: 720px) {
    padding-left:0px;
    padding-right: 0px;
    padding-top: 10px;
    padding-bottom: 5px;
    }
`;

export { TribesComponent };
