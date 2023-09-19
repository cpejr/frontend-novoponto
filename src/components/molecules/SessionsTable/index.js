import React, { useContext, useState } from "react";
import { ThemeContext } from "../../../context/ThemeProvider";
import { getColumns } from "./columns";
import { HourDisplayer } from "../../atoms";

import { HoursSumAndTablesArea } from "./styles";
import { Collapse, Table, message } from "antd";
import ConfirmationModal from "../ConfirmationModal";
import { DELETE_SESSION, UPDATE_SESSION } from "../../../graphql/Sessions";
import { useMutation, useQuery } from "@apollo/client";
import validators from "../../../services/validators";
import FormModal from "../../organisms/FormModal";
import { GET_TASKS } from "../../../graphql/Tasks";
import { GET_PROJECTS } from "../../../graphql/Projects";

const SessionsTable = ({
  refetch,
  sessions,
  formatedTotal,
  formatedPresentialTotal,
}) => {
  const { themeColors } = useContext(ThemeContext);

  const [openModalExcludeSession, setOpenModalExcludeSession] = useState(false);
  const [excludeSession, setExcludeSession] = useState({});
  const [editModalInfo, setEditModalInfo] = useState({
    open: false,
  });
  const modalityOptions = [
    {
      value: false,
      label: "Remoto",
    },
    {
      value: true,
      label: "Presencial",
    },
  ];

  const { data: tasksInformation } = useQuery(GET_TASKS);
  const tasksOptions = tasksInformation?.tasks.map((task) => {
    return { value: task._id, label: task.name };
  });
  const { data: dataProjects } = useQuery(GET_PROJECTS);
  const projectOptionsList = dataProjects?.projects.map((project) => {
    return { value: project._id, label: project.name };
  });
  const [updateSessionMutation] = useMutation(UPDATE_SESSION);
  const [deleteSessionMutation] = useMutation(DELETE_SESSION);

  const handleOpenModal = (session) => {
    setExcludeSession(session);
    setOpenModalExcludeSession(true);
  };

  const handleCloseModal = () => {
    setOpenModalExcludeSession(false);
  };

  const handleCloseEdit = () => {
    setEditModalInfo({ open: false });
  };

  const handleExcludeSession = async (session) => {
    var hide = message.loading("Excluindo");
    try {
      await deleteSessionMutation({ variables: { sessionId: session._id } });
      hide();
      message.success("Excluido com sucesso", 2.5);
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    setOpenModalExcludeSession(false);
  };

  const editSession = (session) => {
    var fields = [
      {
        key: "modality",
        type: "select",
        label: `Modalidade`,
        options: modalityOptions,
        validator: validators.antdRequired,
        initialValue: session.isPresential ? "Presencial" : "Remoto",
      },
      {
        key: "task",
        type: "select",
        label: "Tarefa",
        options: tasksOptions,
        validator: validators.antdRequired,
        initialValue: session.task._id,
      },
      {
        key: "project",
        type: "select",
        label: "Projeto",
        options: projectOptionsList,
        validator: validators.antdRequired,
        initialValue: session?.project?._id,
      },
      {
        key: "description",
        type: "textArea",
        label: "Descrição",
        characterLimit: "150",
        validator: validators.antdRequired,
        initialValue: session?.description,
      },
    ];

    const modalData = {
      title: "",
      fields: fields,
      open: true,
      cancel: handleCloseEdit,
    };

    modalData.title = "Editar Sessão";
    modalData.onSubmit = updateSession(session._id);

    setEditModalInfo(modalData);
  };

  const updateSession = (sessionId) => async (updatedSession) => {
    const { Modalidade, Tarefa, Projeto, Descrição } = updatedSession;
    let newSession;

    if (typeof Modalidade === "string") {
      newSession = {
        taskId: Tarefa,
        projectId: Projeto,
        description: Descrição,
      };
    } else {
      newSession = {
        isPresential: Modalidade,
        taskId: Tarefa,
        projectId: Projeto,
        description: Descrição,
      };
    }

    var hide = message.loading("Atualizando");
    try {
      await updateSessionMutation({
        variables: { sessionId, data: newSession },
      });
      hide();
      message.success("Alterado com sucesso", 2.5);
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    handleCloseEdit();
  };

  const columns = getColumns(themeColors, handleOpenModal, editSession);

  return (
    <HoursSumAndTablesArea>
      <div className="sum">
        <h6 className="m-0 me-2">Soma total:</h6>
        <HourDisplayer text={formatedTotal} hourColor={themeColors.yellow} />
      </div>
      <div className="sum">
        <h6 className="m-0 me-2">Soma presencial:</h6>
        <HourDisplayer
          text={formatedPresentialTotal}
          hourColor={themeColors.yellow}
        />
      </div>
      <Collapse ghost defaultActiveKey={"1"}>
        <Collapse.Panel header={<h6>Sessões:</h6>} key="1">
          <Table
            columns={columns}
            dataSource={sessions?.map((session) => ({
              key: session._id,
              ...session,
            }))}
          />
        </Collapse.Panel>
      </Collapse>
      <ConfirmationModal
        title="Apagar sessão"
        content={`Deseja mesmo apagar essa sessão?`}
        isVisible={openModalExcludeSession}
        handleOk={() => handleExcludeSession(excludeSession)}
        handleCancel={handleCloseModal}
      />
      <FormModal {...editModalInfo} />
    </HoursSumAndTablesArea>
  );
};

export default SessionsTable;
