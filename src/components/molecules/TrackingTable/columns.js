import { Tooltip } from "antd";
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { FlexDiv } from "./styles";
import moment from "moment";
import { EditOutlined, RestOutlined } from "@ant-design/icons";

function getColumns() {
  const columns = [
    {
      title: "Departamento",
      dataIndex: "tribe",
      key: "tribe",
      render: (tribe) => (
        <DefaultText className="columnText">{tribe.name}</DefaultText>
      ),
    },
    {
      title: "Usuário",
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <DefaultText className="columnText">{user?.name}</DefaultText>
      ),
    },
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
      title: "Entrada",
      dataIndex: "start",
      key: "start",
      render: (start) => (
        <FlexDiv>
          <HourDisplayer hour={start} />
        </FlexDiv>
      ),
    },
    {
      title: "Saída",
      dataIndex: "end",
      key: "end",
      render: (end) => (
        <FlexDiv>
          <HourDisplayer hour={end}/>
        </FlexDiv>
      ),
    },
    {
      title: "Total",
      dataIndex: "formatedDuration",
      key: "formatedDuration",
      render: (formatedDuration) => (
        <FlexDiv>
          <InfoDisplayer
            info={formatedDuration}
          />
        </FlexDiv>
      ),
    },
  ];
  return columns;
}

export { getColumns };
