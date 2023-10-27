import React, { useEffect, useState } from "react";
import moment from "moment";
import FormModal from "../../../components/organisms/FormModal";
import { message } from "antd";
import {
  DefaultLabel,
  DefaultSubTitle,
  DefaultText,
  LogoutPointButton,
  MemberAvatar,
  MemberName,
  TextArea,
} from "../../atoms";
import SaveButton from "../../molecules/SaveButton";
import ConfirmationModal from "../../molecules/ConfirmationModal";

import { Row } from "antd";
import { MemberProfileContainer } from "./styles";
import { CommonButton } from "../../../components/atoms";
import { useMutation, useQuery } from "@apollo/client";
import validators from "../../../services/validators";
import { GET_PROJECTS } from "../../../graphql/Projects";
import { GET_TASKS } from "../../../graphql/Tasks";
import adjustTimeData from "../../../utils/adjustTimeData";
import { ADD_SESSION } from "../../../graphql/Sessions";

const MemberProfile = ({
  member,
  onLogOut,
  onSave,
  showAsAdministrator = false,
  refetch,
}) => {
  const [isConfirmationVis, setIsConfirmationVis] = useState(false);
  const [openModalExcludeHour, setOpenModalExcludeHour] = useState(false);
  const [createModalInfo, setCreateModalInfo] = useState({
    open: false,
  });
  const [formData, setFormData] = useState({});

  const modalityModalOptions = [
    {
      value: false,
      label: "Remoto",
    },
    {
      value: true,
      label: "Presencial",
    },
  ];

  const dateModalOptions = [
    {
      locale: "pt_BR",
      format: "DD/MM/yyyy",
      disabledDate: { disabledDate },
      value: formData.date,
    },
  ];

  const { data: tasksInformation } = useQuery(GET_TASKS);
  const tasksOptions = tasksInformation?.tasks.map((task) => {
    return { value: task._id, label: task.name };
  });

  const { data: dataProjects } = useQuery(GET_PROJECTS);

  const projectsModalOptions = dataProjects?.projects.map((project) => {
    return { value: project._id, label: project.name };
  });

  const [submitSession, { loading, error }] = useMutation(ADD_SESSION);

  const handleCloseModal = () => {
    setOpenModalExcludeHour(false);
  };

  const handleCloseOrCreate = () => {
    setCreateModalInfo({ open: false });
  };

  function disabledDate(current) {
    return current && current > moment().endOf("day");
  }

  function handleOnChange(field) {
    setNewData({ ...newData, ...field });
  }

  function handleLogOutRequest() {
    setIsConfirmationVis(true);
  }

  const addHour = () => {
    var fields = [
      {
        key: "modality",
        type: "select",
        label: "Modalidade:",
        placeholder: "Presencial/Remoto",
        options: modalityModalOptions,
        rules: [validators.antdRequired()],
      },
      {
        key: "day",
        type: "date",
        label: "Qual dia foi ocorrido?",
        placeholder: "Selecionar data",
        options: dateModalOptions,
        rules: [validators.antdRequired()],
      },
      {
        key: "HourIn",
        type: "hour",
        label: "Horário de Entrada:",
        rules: [validators.antdRequired()],
      },
      {
        key: "HourOut",
        type: "hour",
        label: "Horário de Saída:",
        rules: [validators.antdRequired()],
      },
      {
        key: "task",
        type: "select",
        label: "O que você fez neste horário:",
        placeholder: "Selecionar atividade",
        options: tasksOptions,
        rules: [validators.antdRequired()],
      },
      {
        key: "Project",
        type: "select",
        options: projectsModalOptions,
        placeholder: "Selecionar projeto",
        label: "Você trabalhou em algum projeto?",
      },
      {
        key: "Description",
        type: "textArea",
        label: "Deseja descrever melhor o que foi feito?",
        characterLimit: 150,
      },
    ];

    const modalData = {
      title: "Adicionar Horas",
      fields: fields,
      open: true,
      cancel: handleCloseOrCreate,
      onSubmit: handleSubmit,
    };

    setCreateModalInfo(modalData);
  };

  const handleSubmit = async (formData) => {
    const date = formData["Qual dia foi ocorrido?"].toISOString();
    const hourStart = formData["Horário de Entrada:"].toISOString();
    const hourEnd = formData["Horário de Saída:"].toISOString();

    if (hourStart.slice(0, 18) === hourEnd.slice(0, 18)) {
      return message.error(
        "Você mencionou que os horários de entrada e de saída são iguais. Por favor, ajuste essa discrepância para continuar."
      );
    }

    const hours = adjustTimeData(date, hourStart, hourEnd);

    const data = {
      memberId: member._id,
      isPresential: formData["Modalidade:"],
      start: hours.hourStart,
      end: hours.hourEnd,
      taskId: formData["O que você fez neste horário:"],
      projectId: formData["Você trabalhou em algum projeto?"],
      description: formData["Deseja descrever melhor o que foi feito?"],
    };

    submitSession({
      variables: data,
    })
      .then(() => {
        setFormData({});
        message.success("Enviado com sucesso!");
        handleCloseOrCreate();
        refetch();
      })
      .catch((error) => {
        message.error("Vish algo deu errado.\nTente novamente mais tarde.");
      });
  };

  const [newData, setNewData] = useState({
    status: member?.status || "",
  });

  useEffect(() => {
    if (showAsAdministrator)
      setNewData({
        status: member?.status || "",
        message: member?.message || { text: "", read: true },
      });
    else
      setNewData({
        status: member?.status || "",
      });
  }, [member]);
  const isAdm = showAsAdministrator;

  async function handleSave() {
    onSave(newData);
  }

  return (
    <MemberProfileContainer>
      <div className="d-flex flex-column-reverse flex-sm-row mb-2 custom_margin">
        <div className="botaoLogOut">
          <Row>
            <div className="imagemNomeCargo">
              <MemberAvatar src={member?.imageLink} className="col-auto" />
              <div className="d-flex flex-column justify-content-around ms-2">
                <MemberName name={member?.name} className="namePart" />
                {member?.role && (
                  <DefaultLabel
                    labelText={member?.role?.name}
                    labelColor="#FFD100"
                  />
                )}
              </div>
            </div>
          </Row>

          <div className="BotaoInserirHoras">
            <CommonButton
              buttonLabel="Adicionar Horas"
              color="#22762B"
              width="100%"
              onClick={() => addHour()}
              loading={loading}
            />
          </div>

          {!isAdm && (
            <LogoutPointButton
              className="col-md-12 col-sm-3 mb-3 mb-sm-0"
              onClick={handleLogOutRequest}
            />
          )}
        </div>
      </div>

      <div>
        <DefaultText>Assessor: {member?.responsible?.name}</DefaultText>
      </div>
      <div className="messageAndFrase">
        <div className="row align-items-end">
          <div className="col-md-6">
            <div className="quote mt-2">
              <DefaultSubTitle>Mensagem do acompanhamento:</DefaultSubTitle>
              {!isAdm ? (
                <TextArea
                  maxLength={50}
                  className="non-resizable-textarea"
                  value={member?.message?.text}
                  inputMode="none"
                />
              ) : (
                <>
                  <TextArea
                    className="non-resizable-textarea"
                    onChange={(e) =>
                      handleOnChange({
                        message: { text: e.target.value, read: false },
                      })
                    }
                    value={newData?.message?.text}
                  />
                  <SaveButton
                    saved={newData?.message?.text === member?.message?.text}
                    onClick={handleSave}
                  />
                </>
              )}
            </div>
          </div>
          <div className="col-md-6">
            <div className="quote mt-2">
              <DefaultSubTitle>Frase:</DefaultSubTitle>
              <TextArea
                maxLength={50}
                className="non-resizable-textarea"
                onChange={(e) => handleOnChange({ status: e.target.value })}
                value={newData?.status}
              />
              <SaveButton
                saved={newData?.status === member?.status}
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      </div>

      <ConfirmationModal
        title="Log out"
        content={`${member?.name}, Você deseja mesmo fazer logout?`}
        isVisible={isConfirmationVis}
        handleOk={() => {
          onLogOut();
          setIsConfirmationVis(false);
        }}
        handleCancel={handleCloseModal}
      />
      <FormModal {...createModalInfo} />
    </MemberProfileContainer>
  );
};

export default MemberProfile;

