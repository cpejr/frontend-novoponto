import React, { useState, useContext, useRef } from "react";
import { TimePicker } from "antd";

import { HourChangesComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { GlobalsContext } from "../../context/GlobalsProvider";

import AddOrRemoveHours from "../../utils/SelectBoxOptions/AddOrRemoveHours";
import {
  DefaultText,
  OutlinedBox,
  TextArea,
  CommonButton,
  CommonSelectBox,
} from "../../components/atoms";

import MembersSelectBox from "../../components/molecules/MembersSelectBox";

const HourChanges = () => {
  const { themeColors } = useContext(ThemeContext);

  const [selectedMember, setSelectedMember] = useState();
  const [addOrRemoveHours, setAddOrRemoveHours] = useState();

  const selectMemberInput = useRef(null);
  const addOrRemoveInput = useRef(null);

  const handleSelectMember = (e) => {
    setSelectedMember(e.target);
  };

  const handleAddOrRemoveHours = (e) => {
    setAddOrRemoveHours(e.target);
  };

  const handleChangeText = (e, type) => {
    if ((type = "quantityHour")) {
    } else {
    }
  };

  return (
    <HourChangesComponent theme={themeColors}>
      <OutlinedBox className="outlinedBox">
        <div className="inputGroup">
          <DefaultText className="title">
            Formulário para adicionar ou remover horas
          </DefaultText>
        </div>
        <div className="inputGroup">
          <DefaultText>Quem é você?</DefaultText>
          <MembersSelectBox />
        </div>
        <div className="inputGroup">
          <DefaultText>O que deseja fazer?</DefaultText>
          <CommonSelectBox
            placeholder="Adicionar / remover horas"
            value={addOrRemoveHours}
            optionsList={AddOrRemoveHours}
            onChange={handleAddOrRemoveHours}
          />
        </div>
        <div className="inputGroup">
          <DefaultText>Qual a é quantidade de Horas?</DefaultText>
          <TimePicker format={"HH:mm"} showNow={false} placeholder={"00:00"} />
        </div>
        <div className="inputGroup">
          <DefaultText>O que você fez nesse horário?</DefaultText>
          <TextArea />
        </div>
        <div className="inputGroup">
          <CommonButton buttonLabel="Enviar" color="#22762B" width="100%" />
        </div>
      </OutlinedBox>
    </HourChangesComponent>
  );
};

export default HourChanges;
