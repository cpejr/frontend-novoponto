import React, { useEffect, useState } from "react";
import moment from "moment";
import FormModal from "../../../components/organisms/FormModal";
// import validators from "../../../services/validators";
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
// import hourActionOptions from "./hourActionOptions";

import { Form, Row } from "antd";
import { MemberProfileContainer } from "./styles";
import { CommonButton, CommonSelectBox } from "../../../components/atoms";
import { useMutation } from "@apollo/client";
import { SendAditionalHour } from "../../../graphql/AditionalHour";

const INITIAL_ERRORS = {
	member: false,
	hourAction: false,
	date: false,
	duration: false,
	comment: false,
	isPresential: false,
};

function convertDurationToMilliseconds(time) {
	return moment.duration(time.format("HH:mm")).asMilliseconds();
}

const MemberProfile = ({
  member,
  onLogOut,
  onSave,
  showAsAdministrator = false,
}) => {
  const [isConfirmationVis, setIsConfirmationVis] = useState(false);
  const [openModalExcludeHour, setOpenModalExcludeHour] = useState(false);
  const [excludeHour, setExcludeHour] = useState({});
  // const [openModalHourChange, setOpenModalHourChange] = useState(false);
  const [createModalInfo, setCreateModalInfo] = useState({
    open: false,
  });

  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [formData, setFormData] = useState({});

  const needComment = formData.hourAction !== "REMOVE";

  const [submitAditionalHours, { loading, error }] = useMutation(
		SendAditionalHour,
		{ ignoreResults: true }
	);

  const handleOpenModal = (hour) => {
    setExcludeHour(hour);
    setOpenModalExcludeHour(true);
  }

  const handleCloseModal = () => {
    setOpenModalExcludeHour(false);
  }

  const handleCloseOrCreate = () => {
    setCreateModalInfo({ open: false });
  }

  function validateFields() {
		const newErrors = {};
		const { hourAction, member, date, duration, comment, isPresential } =
			formData;

		if (isPresential === undefined) newErrors.isPresential = true;

		if (!member) newErrors.member = true;

		if (!hourAction) newErrors.hourAction = true;

		if (!date || date === "") newErrors.date = true;

		if (!duration || convertDurationToMilliseconds(duration) < 1000)
			newErrors.duration = true;

		if (needComment && (!comment || comment?.trim() === ""))
			newErrors.comment = true;

		if (Object.keys(newErrors).length > 0) {
			setErrors({ ...INITIAL_ERRORS, ...newErrors });
			return false;
		}

		setErrors(INITIAL_ERRORS);
		return true;
	}

  function handleSubmit(e) {
		e.preventDefault();

		if (!loading && validateFields()) {
			const { hourAction, member, date, comment, isPresential } = formData;
			let { duration } = formData;

			duration = convertDurationToMilliseconds(duration);
			if (hourAction === "REMOVE") duration *= -1;

			submitAditionalHours({
				variables: {
					data: {
						memberId: member,
						date: date.startOf("day").toISOString(),
						amount: duration,
						description: comment,
						isPresential: isPresential,
					},
				},
			})
				.then(() => {
					setFormData({});
					message.success("Enviado com sucesso!");
				})
				.catch(() => {
					message.error("Vish algo deu errado.\nTente novamente mais tarde.");
				});
		}
	}

  function disabledDate(current) {
		return current && current > moment().endOf("day");
	}

	function handleChangeData(key, data) {
		setFormData({ ...formData, [key]: data });
	}

  const modalityModalOptions = [
    {
      value: false,
      label: "Remoto"
    },
    {
      value: true,
      label: "Presencial"
    }
  ];

  const dateModalOptions = [
    {
      onChange: (data) => handleChangeData("date", data),
      locale: "pt_BR",
      format: "DD/MM/yyyy",
      disabledDate: {disabledDate},
      value: formData.date
    }
  ]

  const addHour = (method) => {
    const withInitialValue = method ===  "create";

    var fields = [
      {
        key: "modality",
        type: "select",
        label: "Modalidade: *",
        placeholder: "Presencial/Remoto",
        options: modalityModalOptions,
        validator: validateFields,
      },
      {
        key: "day",
        type: "date",
        label: "Qual dia foi ocorrido? *",
        placeholder: "Selecionar data",
        options: dateModalOptions,
        validator: validateFields,
      },
      {
        key: "HourIn",
        type: "text",
        label: "Horário de Entrada: *",
        validator: validateFields,
      },
      {
        key: "HoutOut",
        type: "text",
        label: "Horário de Saída: *",
        validator: validateFields,
      },
      {
        key: "work",
        type: "text",
        label: "O que você fez neste horário: *",
        validator: validateFields,
      },
      {
        key: "Project",
        type: "text",
        label: "Você trabalhou em algum projeto?",
      },
      {
        key: "Description",
        type: "text",
        label: "Deseja descrever melhor o que foi feito?",
      }
    ];

    const modalData = {
      title: "Adicionar Horas",
      fields: fields,
      open: true,
      cancel: handleCloseOrCreate,
    };

    modalData.onSubmit = handleSubmit;

    setCreateModalInfo(modalData);
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

  function handleOnChange(field) {
    setNewData({ ...newData, ...field });
  }

  function handleLogOutRequest() {
    setIsConfirmationVis(true);
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

          {!isAdm && (
            <LogoutPointButton
              className="col-md-12 col-sm-3 mb-3 mb-sm-0"
              onClick={handleLogOutRequest}
            />
          )}
        </div>
      </div>
      <div className="titulo1">
      <div className="BotaoInserirHoras" >
        <CommonButton
              buttonLabel="Adicionar Horas"
              color="#22762B"
              width="100%"
              onClick={() => addHour("create")}
              loading={loading}
            />
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

