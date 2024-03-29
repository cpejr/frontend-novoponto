import { Button, message } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { HourDisplayer } from "../../components/atoms";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";
import PresentialDisplayer from "../../components/molecules/PresentialDisplayer";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import { AiOutlineEye } from "react-icons/ai";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineLogout } from "react-icons/hi";
import { Tooltip } from "antd";
import EditSessionModal from "../../components/molecules/EditSessionModal";
import { GET_TASKS } from "../../graphql/Tasks";
import { CREATE_SESSION, FINISH_SESSION } from "../../graphql/Sessions";
import { useMutation, useQuery } from "@apollo/client";

const SessionRow = ({ session, onLogout, ...props }) => {
  const { themeColors } = useContext(ThemeContext);
  const { member, task } = session;

  const { data } = useContext(SessionContext);

  const [EditSessionModalVisible, setEditSessionModalVisible] = useState(false);
  const { data: tasksData } = useQuery(GET_TASKS);
  const [startSessionMutation] = useMutation(CREATE_SESSION);
  const [endSessionMutation] = useMutation(FINISH_SESSION);

  async function handleEditTask(taskId) {
    const hide = message.loading("Trocando tarefa...");
    try {
      await endSessionMutation({
        variables: { memberId: member._id },
      });
      await startSessionMutation({
        variables: {
          memberId: member._id,
          isPresential: session.isPresential,
          taskId: taskId,
        },
      });
      hide();
      message.success(`Bom trabalho ${member.name}!`, 2.5);
    } catch (err) {
      hide();
      message.warn(err.message, 2.5);
    }
    setEditSessionModalVisible(false);
  }

  function handleLogout() {
    onLogout && onLogout(session);
  }

  const isLoggedMember = useMemo(
    () => member.name === data.member.name,
    [data.member.name, member.name]
  );

  return (
    <>
      <tr {...props} className="d-flex h-auto py-2">
        <td className="col-6 col-sm-5 col-md-6">
          <LoggedMembers
            name={member.name}
            imageLink={member.imageLink}
            tribe={member?.tribe}
            role={member?.role?.name}
            description={member.status}
            recognition={member.Badge}
          />
        </td>
        <td className="col-2 d-none d-sm-flex align-items-center justify-content-center">
          <div className="d-flex">
            <PresentialDisplayer
              isPresential={session.isPresential}
              presentialColor={themeColors.green}
            />
          </div>
        </td>
        <td className="col-1 col-sm-2 col-md-1 d-none d-sm-flex align-items-center justify-content-center">
          <div className="d-flex">
            <HourDisplayer
              hour={session.start}
              hourColor={themeColors.green}
              dateOrTime={"date"}
            />
          </div>
        </td>
        <td className="col-2 col-sm-2 col-md-1 d-flex align-items-center justify-content-center">
          <div className="d-flex">
            <DurationDisplayer
              startTime={session.start}
              color={themeColors.yellow}
            />
          </div>
        </td>

        <td className="col-3 col-sm-2 d-flex align-items-center justify-content-around">
          <Tooltip placement="top" title={task?.name}>
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
                isLoggedMember && setEditSessionModalVisible(true);
              }}
            />
          </Tooltip>

          <Button
            style={{ border: "none" }}
            className="d-flex align-items-center justify-content-center"
            icon={<HiOutlineLogout size="2em" />}
            onClick={handleLogout}
          />
        </td>
      </tr>
      <EditSessionModal
        title="Edição de tarefa"
        content={`Qual sera a próxima tarefa?`}
        isVisible={EditSessionModalVisible}
        tasks={tasksData?.tasks}
        handleEditTask={handleEditTask}
        handleCancel={() => setEditSessionModalVisible(false)}
      />
    </>
  );
};

export default SessionRow;
