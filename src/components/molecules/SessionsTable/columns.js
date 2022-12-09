import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { FlexDiv } from "./styles";
import moment from "moment";
import { Divider, Tooltip } from "antd";
import { EditOutlined } from "@ant-design/icons";

function getColumns(themeColors, setModalVisible) {
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
          <HourDisplayer hour={start} hourColor={themeColors.green} />
        </FlexDiv>
      ),
    },
    {
      title: "Saída",
      dataIndex: "end",
      key: "end",
      render: (end) => (
        <FlexDiv>
          <HourDisplayer hour={end} hourColor={themeColors.green} />
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
            infoColor={themeColors.yellow}
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
            infoColor={themeColors.green}
          />
        </FlexDiv>
      ),
    },
    {
      title: "Editar",
      key: "edit",
      render: (data) => (
        <EditDiv 
        setModalVisible={setModalVisible}
        />
      ),
    },
  ];
  return columns;
}

function EditDiv({setModalVisible}){
  return (
    <Tooltip placement="topLeft" title={"Editar"}>
      <EditOutlined onClick={()=>setModalVisible(true)} />
    </Tooltip>
)
}

export { getColumns };
