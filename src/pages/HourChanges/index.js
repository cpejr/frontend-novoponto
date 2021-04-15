import React, { useState, useContext, useRef } from "react";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useMutation } from "@apollo/client";

import { HourChangesComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";

import MembersSelectBox from "../../components/molecules/MembersSelectBox";
import hourActionOptions from "./hourActionOptions";
import {
  DefaultText,
  OutlinedBox,
  TextArea,
  CommonButton,
  CommonSelectBox,
} from "../../components/atoms";

import { SendAditionalHour } from "../../graphql/AditionalHour";

const INITIAL_ERRORS = {
  member: false,
  hourAction: false,
  date: false,
  duration: false,
  comment: false,
};

function convertDurationToMilliseconds(time) {
  return moment.duration(time.format("HH:mm")).asMilliseconds();
}

const HourChanges = () => {
  const [submitAditionalHours, { loading, error, data }] = useMutation(
    SendAditionalHour
  );

  const { themeColors } = useContext(ThemeContext);

  const [errors, setErrors] = useState(INITIAL_ERRORS);

  const [formData, setFormData] = useState({});

  const needComment = formData.hourAction !== "REMOVE";

  function validateFields() {
    const newErrors = {};
    const { hourAction, member, date, duration, comment } = formData;

    if (!!!member) newErrors.member = true;

    if (!!!hourAction) newErrors.hourAction = true;

    if (!!!date || date === "") newErrors.date = true;

    if (!!!duration || duration < 1000) newErrors.duration = true;

    if (needComment && (!!!comment || comment?.trim() === ""))
      newErrors.comment = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors({ ...INITIAL_ERRORS, ...newErrors });
      return false;
    }

    setErrors(INITIAL_ERRORS);
    return true;
  }

  function handleSubmit() {
    if (!loading && validateFields()) {
      const { hourAction, member, date, comment } = formData;
      let { duration } = formData;

      if (hourAction === "REMOVE") duration *= -1;

      submitAditionalHours({
        variables: {
          data: {
            memberId: member,
            date: date.startOf("day").toISOString(),
            amount: convertDurationToMilliseconds(duration),
            description: comment,
          },
        },
      }).then(() => setFormData({}));
    }
  }

  function disabledDate(current) {
    // Can not select days after today
    return current && current > moment().endOf("day");
  }

  function handleChangeData(key, data) {
    setFormData({ ...formData, [key]: data });
  }

  return (
    <HourChangesComponent theme={themeColors}>
      <OutlinedBox className="outlinedBox">
        <div className="inputGroup">
          <DefaultText className="title">
            Formulário para adicionar ou remover horas
          </DefaultText>
        </div>
        <div className="inputGroup">
          <DefaultText error={errors.member}>Quem é você? *</DefaultText>
          <MembersSelectBox
            onChange={(data) => handleChangeData("member", data)}
            value={formData.member}
          />
        </div>
        <div className="inputGroup">
          <DefaultText error={errors.hourAction}>
            O que deseja fazer? *
          </DefaultText>
          <CommonSelectBox
            placeholder="Adicionar / remover horas"
            optionsList={hourActionOptions}
            onChange={(data) => handleChangeData("hourAction", data)}
            value={formData.hourAction}
          />
        </div>
        <div className="inputGroup">
          <DefaultText error={errors.date}>
            Qual foi o dia do ocorrido? *
          </DefaultText>
          <DatePicker
            onChange={(data) => handleChangeData("date", data)}
            locale="pt_BR"
            format="DD/MM/yyyy"
            disabledDate={disabledDate}
            value={formData.date}
          />
        </div>
        <div className="inputGroup">
          <DefaultText error={errors.duration}>
            Qual a é quantidade de Horas? *
          </DefaultText>
          <TimePicker
            format={"HH:mm"}
            showNow={false}
            placeholder={"00:00"}
            onChange={(data) => handleChangeData("duration", data)}
            value={formData.duration}
          />
        </div>
        {needComment && (
          <div className="inputGroup">
            <DefaultText error={errors.comment}>
              O que você fez nesse horário? *
            </DefaultText>
            <TextArea
              onChange={(e) => handleChangeData("comment", e.target.value)}
              value={formData.comment}
            />
          </div>
        )}
        <div className="inputGroup">
          <CommonButton
            buttonLabel="Enviar"
            color="#22762B"
            width="100%"
            onClick={handleSubmit}
            loading={loading}
          />
        </div>
        <DefaultText error>{JSON.stringify(error)}</DefaultText>
      </OutlinedBox>
    </HourChangesComponent>
  );
};

export default HourChanges;
