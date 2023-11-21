import { Table } from "antd";
import { getColumns } from "./columns";
import { ThemeContext } from "../../../context/ThemeProvider";
import { useContext } from "react";
import { DefaultText } from "../../atoms";
import {
  ContainerAllCards,
  ContainerCards,
  ContainerExpandable,
  ContentCard,
  HorizontalCard,
  TitleCard,
} from "./styles";
import PieChart from "../PieChart";

const colors = [
  "#B83F3F", // Red (base color)
  "#F1C951", // Yellow (base color)
  "#3F69B8", // Blue
  "#7FB83F", // Green
  "#B83FAE", // Purple
  "#F95177", // Pink
  "#51F1A5", // Mint Green
  "#F9A451", // Orange
  "#514BF9", // Indigo
  "#F951F9", // Magenta
];

const TrackingTable = ({ sessions, hashtableMemberHours }) => {
  const { themeColors } = useContext(ThemeContext);

  const columns = getColumns(themeColors);

  return (
    <Table
      columns={columns}
      loading={sessions ? false : true}
      dataSource={sessions
        ?.slice()
        .reverse()
        .map((session) => ({
          key: session._id,
          ...session,
        }))}
      expandable={{
        expandedRowRender: (record, index) => (
          <ContainerExpandable>
            <ContainerAllCards>
              <ContainerCards>
                {record.project?.name && (
                  <HorizontalCard>
                    <TitleCard>Projeto</TitleCard>
                    <ContentCard>
                      <DefaultText style={{ margin: 0 }}>
                        {record.project?.name}
                      </DefaultText>
                    </ContentCard>
                  </HorizontalCard>
                )}
                {record.task?.name && (
                  <HorizontalCard>
                    <TitleCard>Tarefa</TitleCard>
                    <ContentCard>{record.task?.name}</ContentCard>
                  </HorizontalCard>
                )}
                {record.isPresential !== undefined && (
                  <HorizontalCard>
                    <TitleCard>Modalidade</TitleCard>
                    <ContentCard>
                      {record.isPresential ? "Presencial" : "Remoto"}
                    </ContentCard>
                  </HorizontalCard>
                )}
              </ContainerCards>
              <ContainerCards>
                {record.description && (
                  <HorizontalCard>
                    <TitleCard>Descrição</TitleCard>
                    <ContentCard>{record.description}</ContentCard>
                  </HorizontalCard>
                )}
              </ContainerCards>
            </ContainerAllCards>
            {hashtableMemberHours[record.member?.name] && (
              <PieChart
                data={hashtableMemberHours[record.member?.name]}
                colors={colors}
              ></PieChart>
            )}
          </ContainerExpandable>
        ),
        rowExpandable: (record) => record.name !== "Not Expandable",
      }}
    />
  );
};

export default TrackingTable;

