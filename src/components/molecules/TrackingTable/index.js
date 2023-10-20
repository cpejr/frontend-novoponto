import { Table } from "antd"
import { getColumns } from "./columns";
import { ThemeContext } from "../../../context/ThemeProvider";
import { useContext } from "react";
import { DefaultText } from "../../atoms";
import { ContainerCards, ContainerExpandable, ContentCard, HorizontalCard, TitleCard } from "./styles";

const TrackingTable = ({ sessions }) => {
  const { themeColors } = useContext(ThemeContext);

  const columns = getColumns(themeColors);

  return (
    <Table
    columns={columns}
    loading={sessions ? false : true}
    dataSource={sessions?.slice().reverse().map((session) => ({
      key: session._id,
      ...session,
    }))}
    expandable={{
      expandedRowRender: (record) => (
        <ContainerExpandable>
        <ContainerCards>
          {record.project?.name && (
              <HorizontalCard>
                <TitleCard>Projeto</TitleCard>
                <ContentCard><DefaultText>{record.project?.name}</DefaultText></ContentCard>
              </HorizontalCard>
          )}
          {record.task?.name && (
              <HorizontalCard>
                <TitleCard><DefaultText>Tarefa</DefaultText></TitleCard>
                <ContentCard><DefaultText>{record.task?.name}</DefaultText></ContentCard>
              </HorizontalCard>
          )}
          {record.isPresential !== undefined && (
              <HorizontalCard>
                <TitleCard><DefaultText>Modalidade</DefaultText></TitleCard>
                <ContentCard><DefaultText>{record.isPresential ? 'Presencial' : 'Remoto'}</DefaultText></ContentCard>
              </HorizontalCard>
          )}
        </ContainerCards>
        {record.description && (
              <HorizontalCard>
                <TitleCard><DefaultText>Descrição</DefaultText></TitleCard>
                <ContentCard><DefaultText>{record.description}</DefaultText></ContentCard>
              </HorizontalCard>
          )}
        </ContainerExpandable>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    />
  )
}

export default TrackingTable;