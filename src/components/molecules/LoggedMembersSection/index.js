import React from "react";
import { LoggedMembersContainer } from "./styles";

import {
  DefaultLabel,
  MemberName,
  MemberDescription,
  MemberAvatar,
} from "../../atoms";
import { Col, Row } from "antd";

const LoggedMembers = ({
  name,
  imageLink,
  role,
  mandatoryHour = null,
  description,
}) => {
  return (
    <LoggedMembersContainer>
      <Row gutter={[16, 0]} wrap={false}>
        <Col>
          <MemberAvatar src={imageLink} />
        </Col>
        <Col>
          <Row gutter={[8, 0]} wrap={false}>
            <MemberName name={name} className="namePart" />
            <MemberDescription description={description} />
          </Row>
          <Row gutter={[8, 0]} wrap={false} style={{ marginTop: 8 }}>
            <Col>
              {role && <DefaultLabel labelText={role} labelColor="#00a6c5" />}
            </Col>
            <Col>
              {mandatoryHour && (
                <DefaultLabel
                  labelText="Horário obrigatório"
                  labelColor="#0085FF"
                />
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </LoggedMembersContainer>
  );
};

export default LoggedMembers;
