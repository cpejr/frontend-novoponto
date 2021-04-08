import React, { useState, useContext, useRef } from "react";
import { HourChangesComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";

import CommonButton from "../../components/atoms/CommonButton";
import CommonSelectBox from "../../components/atoms/CommonSelectBox";

import OptionsMembers from "../../utils/SelectBoxOptions/Members";
import AddOrRemoveHours from "../../utils/SelectBoxOptions/AddOrRemoveHours";
import { DefaultText, OutlinedBox, TextArea } from "../../components/atoms";
import { TimePicker } from "antd";

const HourChanges = () => {
  const { themeColors } = useContext(ThemeContext);

  const [selectedMember, setSelectedMember] = useState();
  const [addOrRemoveHours, setAddOrRemoveHours] = useState();

  const [errorQuantityHour, setErrorQuantityHour] = useState(false);
  const [errorQuantityHourMessage, setErrorQuantityHourMessage] = useState("");

  const [errorJustificative, setErrorJustificative] = useState(false);
  const [errorJustificativeMessage, setErrorJustificativeMessage] = useState(
    ""
  );

  const selectMemberInput = useRef(null);
  const addOrRemoveInput = useRef(null);
  const hoursQuantityInput = useRef(null);
  const justificativeInput = useRef(null);

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
          <CommonSelectBox
            inputRef={selectMemberInput}
            placeholder="Escolha um membro"
            value={selectedMember}
            optionsList={OptionsMembers}
            onChangeFunction={handleSelectMember}
          />
        </div>
        <div className="inputGroup">
          <DefaultText>O que deseja fazer?</DefaultText>
          <CommonSelectBox
            inputRef={addOrRemoveInput}
            placeholder="Adicionar / remover horas"
            value={addOrRemoveHours}
            optionsList={AddOrRemoveHours}
            onChangeFunction={handleAddOrRemoveHours}
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
