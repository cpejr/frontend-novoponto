import { mili2time } from "../../../utils/dateFunctions";
import { DefaultText, InfoDisplayer } from "../../atoms";
import { FlexDiv } from "./styles";

function getColumns(themeColors) {
  const columns = [
    {
      title: "Departamento",
      dataIndex: "key",
      key: "key",
      render: (key) => (
        <DefaultText className="columnText">{key}</DefaultText>
      ),
    },
    {
      title: "Tempo",
      dataIndex: "value",
      key: "value",
      render: (value) => (
        <FlexDiv>
          <InfoDisplayer
            info={mili2time(value)}
            infoColor={themeColors.yellow}
          />
        </FlexDiv>
      ),
    },
  ];
  return columns;
}

export { getColumns };