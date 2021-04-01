import React, { useContext } from "react";
import { HoursConsultationComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";

import {
  HourDisplayer,
  CommonButton,
  DefaultLabel,
  MemberName,
  MemberDescription,
  LogoutPointButton,
  InputText,
} from "../../components/atoms";

import LoggedMembers from "../../components/molecules/LoggedMembersSection";

const HoursConsultation = () => {
  const { themeColors } = useContext(ThemeContext);

  const handleTest = (e) => {
    console.log(e.target.value);
  };

  return (
    <HoursConsultationComponent theme={themeColors}>
      <h1>HoursConsultation</h1>
      <HourDisplayer hour="10:38" hourColor="rgba(49, 216, 67, 0.5)" />
      <CommonButton
        buttonLabel="Clique aqui"
        buttonColor="#8A6B0E"
        buttonWidth="200px"
      />
      <DefaultLabel labelText="Gerentes de Produtos" labelColor="#FFD100" />
      <MemberName name="Diogo" />
      <MemberDescription description="Meio com sono meio bolado" />
      <InputText placeholder="Logue aqui" handleInputText={handleTest} />
      <LoggedMembers name="Diogo" />
      <LoggedMembers name="Diogo" />
      <LogoutPointButton buttonColor="#1D1D1D" />
    </HoursConsultationComponent>
  );
};

export default HoursConsultation;
