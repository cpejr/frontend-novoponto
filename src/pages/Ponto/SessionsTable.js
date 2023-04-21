import React, { useContext, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { Tooltip, Button, message, Table } from "antd";
import { useMutation, useQuery } from "@apollo/client";

import { GET_TASKS } from "../../graphql/Tasks";
import { CREATE_SESSION, FINISH_SESSION } from "../../graphql/Sessions";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import PresentialDisplayer from "../../components/molecules/PresentialDisplayer";
import { HourDisplayer } from "../../components/atoms";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";
import EditSessionModal from "../../components/molecules/EditSessionModal";

import { SessionsTableContainer } from "./styles";

const { Column } = Table;

const SessionsTable = ({ sessions, onLogout, ...props }) => {
  const [editSessionModalVisible, setEditSessionModalVisible] = useState(false);
  const [modalSessionInfo, setModalSessionInfo] = useState({});
  const { themeColors } = useContext(ThemeContext);
  const { data } = useContext(SessionContext);
  const { data: tasksData } = useQuery(GET_TASKS);

  const [startSessionMutation] = useMutation(CREATE_SESSION);
  const [endSessionMutation] = useMutation(FINISH_SESSION);

  async function handleEditTask(taskId, session) {
    const hide = message.loading("Trocando tarefa...");
    try {
      await endSessionMutation({
        variables: { memberId: session.member._id },
      });
      await startSessionMutation({
        variables: {
          memberId: session.member._id,
          isPresential: session.isPresential,
          taskId: taskId,
        },
      });
      hide();
      message.success(`Bom trabalho ${session.member.name}!`, 2.5);
    } catch (err) {
      hide();
      message.warn(err.message, 2.5);
    }
    setEditSessionModalVisible(false);
    setModalSessionInfo({});
  }

  function handleLogout(session) {
    onLogout && onLogout(session);
  }

  function handleOpenSessionModal(session) {
    setModalSessionInfo(session);
    setEditSessionModalVisible(true);
  }

  return (
    <SessionsTableContainer>
      <Table
        scroll={{ x: true }}
        dataSource={sessions}
        pagination={false}
        rowKey="_id"
        rowClassName={"table-row"}
      >
        <Column
          title="Membro"
          dataIndex="member"
          key="member"
          render={(member) =>
            member && (
              <LoggedMembers
                name={member.name}
                imageLink={member.imageLink}
                tribe={member?.tribe}
                role={member?.role?.name}
                description={member.status}
              />
            )
          }
        />
        <Column
          title="Modalidade"
          dataIndex="isPresential"
          key="isPresential"
          render={(isPresential) => (
            <PresentialDisplayer
              isPresential={isPresential}
              presentialColor={themeColors.green}
            />
          )}
        />
        <Column
          title="Chegada"
          dataIndex="start"
          key="session.start"
          render={(start) =>
            start && (
              <HourDisplayer
                hour={start}
                hourColor={themeColors.green}
                dateOrTime={"date"}
              />
            )
          }
        />
        <Column
          title="Tempo"
          dataIndex="start"
          key="session.start"
          render={(start) =>
            start && (
              <DurationDisplayer startTime={start} color={themeColors.yellow} />
            )
          }
        />
        <Column
          key="action"
          width={120}
          render={(session) => {
            const isLoggedMember = session.member.name === data.member.name;
            return (
              <Tooltip placement="top" title={session.task?.name}>
                <Button
                  style={{
                    border: "none",
                    cursor: `${isLoggedMember ? "pointer" : "unset"}`,
                  }}
                  className="m-4 d-flex align-items-center justify-content-center"
                  icon={
                    isLoggedMember ? (
                      <HiOutlinePencilAlt size="2em" />
                    ) : (
                      <AiOutlineEye size="2em" />
                    )
                  }
                  onClick={() => {
                    isLoggedMember && handleOpenSessionModal(session);
                  }}
                />
              </Tooltip>
            );
          }}
        />
        <Column
          key="action"
          width={120}
          render={(session) => (
            <Button
              style={{ border: "none" }}
              className="d-flex align-items-center justify-content-center"
              icon={<HiOutlineLogout size="2em" />}
              onClick={() => handleLogout(session)}
            />
          )}
        />
      </Table>
      <EditSessionModal
        title="Edição de tarefa"
        content={`Qual sera a próxima tarefa?`}
        isVisible={editSessionModalVisible}
        tasks={tasksData?.tasks}
        session={modalSessionInfo}
        handleEditTask={handleEditTask}
        handleCancel={() => setEditSessionModalVisible(false)}
      />
    </SessionsTableContainer>
  );
};

export default SessionsTable;
