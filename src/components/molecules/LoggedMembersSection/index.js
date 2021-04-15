import React from "react";
import { LoggedMembersContainer, MemberDataSection } from "./styles";

import {
  DefaultLabel,
  MemberName,
  MemberDescription,
  MemberAvatar,
} from "../../atoms";

const LoggedMembers = ({
  name,
  imageLink,
  role,
  mandatoryHour = null,
  description,
}) => {
  return (
    <LoggedMembersContainer>
      <MemberDataSection>
        <MemberAvatar src={imageLink} />
        <div className="nameWithLabelSection">
          <div className="nameSection">
            <MemberName name={name} className="namePart" />
            <MemberDescription description={description} />
          </div>
          {role && <DefaultLabel labelText={role} labelColor="#FFD100" />}
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
