import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { FlexDiv } from "./styles";
import moment from "moment";

function getColumns(themeColors) {
	const columns = [
		{
			title: "Dia",
			dataIndex: "start",
			key: "start",
			render: (start) => (
				<DefaultText style={{ margin: 0 }}>
					{" "}
					{moment(start).format("DD/MM/yy")}
				</DefaultText>
			),
		},
		{
			title: "Chegada",
			dataIndex: "start",
			key: "start",
			render: (start) => (
				<FlexDiv>
					<HourDisplayer
						hour={start}
						hourColor={themeColors.arrivedModalityColor}
					/>
				</FlexDiv>
			),
		},
		{
			title: "Saída",
			dataIndex: "end",
			key: "end",
			render: (end) => (
				<FlexDiv>
					<HourDisplayer
						hour={end}
						hourColor={themeColors.arrivedModalityColor}
					/>
				</FlexDiv>
			),
		},
		{
			title: "Tempo",
			dataIndex: "formatedDuration",
			key: "formatedDuration",
			render: (formatedDuration) => (
				<FlexDiv>
					<InfoDisplayer
						info={formatedDuration}
						infoColor={themeColors.timeColor}
					/>
				</FlexDiv>
			),
		},
		{
			title: "Modalidade",
			dataIndex: "isPresential",
			key: "isPresential",
			render: (isPresential) => (
				<FlexDiv>
					<InfoDisplayer
						info={isPresential ? "Presencial" : "Remoto"}
						infoColor={themeColors.arrivedModalityColor}
					/>
				</FlexDiv>
			),
		},
	];
	return columns;
}

export { getColumns };
