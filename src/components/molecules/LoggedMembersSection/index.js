import React from "react";
import { LoggedMembersContainer, MemberDataSection } from "./styles";

import {
  DefaultLabel,
  MemberName,
  MemberDescription,
  MemberAvatar,
} from "../../atoms";

const LoggedMembers = ({ name, role, mandatoryHour = null, description }) => {
  return (
    <LoggedMembersContainer>
      <MemberDataSection>
        <MemberAvatar />
        <div className="nameWithLabelSection">
          <div className="nameSection">
            <MemberName name={name} className="namePart" />
            <MemberDescription description={description} />
          </div>
          <DefaultLabel labelText={role} labelColor="#FFD100" />
          {mandatoryHour && (
            <DefaultLabel
              labelText="Horário obrigatório"
              labelColor="#0085FF"
            />
          )}
        </div>
      </MemberDataSection>
    </LoggedMembersContainer>
  );
};

export default LoggedMembers;
