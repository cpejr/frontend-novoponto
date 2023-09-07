import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";

import {
  DefaultLabel,
  DefaultText,
  LogoutPointButton,
  MemberAvatar,
  MemberName,
  TextArea,
} from "../../atoms";
import SaveButton from "../../molecules/SaveButton";
import ConfirmationModal from "../../molecules/ConfirmationModal";
import FormModal from "../../../components/organisms/FormModal";
import { Row } from "antd";
import { MemberProfileContainer } from "./styles";
import { CommonButton } from "../../../components/atoms";
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
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const [newData, setNewData] = useState({
    status: member?.status || "",
  });

  const [submitAditionalHours, { loading, error }] = useMutation(
		SendAditionalHour,
		{ ignoreResults: true }
	);

  const needComment = formData.hourAction !== "REMOVE";

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

  function handleCloseModal() {
    setIsConfirmationVis(false);
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

  function disabledDate(current) {
		return current && current > moment().endOf("day");
	}

	function handleChangeData(key, data) {
		setFormData({ ...formData, [key]: data });
	}

  return (
    <MemberProfileContainer>
      <div className="d-flex flex-column-reverse flex-sm-row mb-2 justify-content-between">
        <Row>
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
        </Row>
        {!isAdm && (
          <LogoutPointButton
            className="col-12 col-sm-3 mb-3 mb-sm-0"
            onClick={handleLogOutRequest}
          />
        )}
      </div>
      <div className="BotaoInserirHoras" >
        <CommonButton
              buttonLabel="Adicionar Horas"
              color="#22762B"
              width="100%"
              onClick={handleSubmit}
              loading={loading}
            />
      </div>
      <div>
        <DefaultText>Assessor: {member?.responsible?.name}</DefaultText>
      </div>
      <div className="message">
        <DefaultText>Mensagem do acompanhamento:</DefaultText>
        {!isAdm ? (
          <div className="messageBox">{member?.message?.text}</div>
        ) : (
          <>
            <TextArea
              resize={true}
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
      <div className="quote mt-2">
        <DefaultText>Frase:</DefaultText>
        <TextArea
          maxLength={50}
          resize={"none"}
          onChange={(e) => handleOnChange({ status: e.target.value })}
          value={newData?.status}
        />
        <SaveButton
          saved={newData?.status === member?.status}
          onClick={handleSave}
        />
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
    </MemberProfileContainer>
  );
};

export default MemberProfile;
