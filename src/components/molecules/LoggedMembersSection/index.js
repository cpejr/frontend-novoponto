import React from "react";
import { LoggedMembersContainer, MemberDataSection } from "./styles";

import {
  DefaultLabel,
  MemberName,
  MemberDescription,
  MemberAvatar,
} from "../../atoms";
import { Row, Col } from "react-bootstrap";

const LoggedMembers = ({
  name,
  imageLink,
  role,
  mandatoryHour = null,
  description,
}) => {
  return (
    <LoggedMembersContainer className="container">
      <Row className="flex-nowrap">
        <Col sm="auto" xs="auto">
          <MemberAvatar src={imageLink} />
        </Col>
        <Col>
          <Row className="flex-nowrap">
            <MemberName name={name} className="p-0" />
            <MemberDescription description={description} className="ms-2 p-0 d-none d-lg-block"/>
          </Row>
          <Row style={{ marginTop: 8 }}>
            {role && <DefaultLabel labelText={role} labelColor="#FFD100" />}
            {mandatoryHour && (
              <DefaultLabel
                labelText="Horário obrigatório"
                labelColor="#0085FF"
              />
            )}
          </Row>
        </Col>
      </Row>
    </LoggedMembersContainer>
  );
};

export default LoggedMembers;
