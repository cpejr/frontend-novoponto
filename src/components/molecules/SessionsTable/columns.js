import { Tooltip } from "antd";
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { FlexDiv } from "./styles";
import moment from "moment";
import { EditOutlined, RestOutlined } from "@ant-design/icons";

function getColumns(themeColors, onDelete, onEdit) {
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
      title: "Tarefa",
      dataIndex: "task",
      key: "task",
      render: (task) => (
        <DefaultText
          style={{
            margin: 0,
            maxWidth: "150px",
            minWidth: "120px",
            wordBreak: "break-word",
          }}
        >
          {task.name}
        </DefaultText>
      ),
    },
    {
      title: "Projeto",
      dataIndex: "project",
      key: "project",
      render: (project) => (
        <DefaultText
          style={{
            margin: 0,
            maxWidth: "150px",
            minWidth: "120px",
            wordBreak: "break-word",
          }}
        >
          {project.name}
        </DefaultText>
      ),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (description) => (
        <DefaultText
          style={{
            margin: 0,
            maxWidth: "180px",
            minWidth: "160px",
            wordBreak: "break-word",
          }}
        >
          {description}
        </DefaultText>
      ),
    },
    {
      render: (record) => (
        <div className="buttonsEditGarbage">
          <Tooltip placement="topLeft" title={"Editar"} className="editColumn" 
          onClick={() => onEdit(record)}
          >
            <EditOutlined />
          </Tooltip>
          <Tooltip placement="topLeft" title={"Excluir"} className="garbageColumn" 
          onClick={() => onDelete(record)}
          >
            <RestOutlined />
          </Tooltip>
      </div>
      )
    }
  ];
  return columns;
}

export { getColumns };
