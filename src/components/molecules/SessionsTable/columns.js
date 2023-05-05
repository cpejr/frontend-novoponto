
import { HourDisplayer, InfoDisplayer, DefaultText } from "../../atoms";
import { FlexDiv } from "./styles";
import moment from "moment";
import { HiOutlinePencilAlt } from "react-icons/hi";

function getColumns(themeColors, userData, memberId, handleOpenEditSessionModal) {
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
            width: "max-content",
            maxWidth: "200px",
            wordBreak: "break-word",
          }}
        >
          {task?.name}
        </DefaultText>
      ),
    },
  ];
  if (userData._id === memberId) {
    columns.push({
      dataIndex: "._id",
      key: "._id",
      render: (_id) => (
        <HiOutlinePencilAlt size="2em" onClick={() => handleOpenEditSessionModal(_id)}/>
      ),
    })
  }
  return columns;
}

export { getColumns };
