import React from "react";
import { LoggedMembersContainer } from "./styles";

import {
	DefaultLabel,
	MemberName,
	MemberDescription,
	MemberAvatar,
	MemberRecognition,
} from "../../atoms";
import { Row, Col } from "react-bootstrap";

const LoggedMembers = ({
	name,
	imageLink,
	role,
	tribe,
	mandatoryHour = null,
	description,
	recognition,
}) => {
	return (
		<LoggedMembersContainer className="container">
			<Row className="flex-nowrap w-100 align-items-center">
				<Col sm="auto" xs="auto" className="d-none d-md-flex">
					<MemberAvatar src={imageLink} />
				</Col>
				<Col className="d-flex flex-column justify-content-center gap-1">
					<Row className="flex-nowrap d-flex flex-column flex-lg-row me-0 gap-1">
						<MemberName name={name} className="text-nowrap p-0" />
            <MemberRecognition recognition={recognition} className="w-auto" />
					</Row>
          <Row className="flex-nowrap d-flex flex-column flex-lg-row me-0 text-truncate gap-1">
            <MemberDescription
              description={description}
              responsive
              className="p-0 text text-truncate"
            />
          </Row>
					<Row className="gap-2">
						{role && role.length > 23 ? <DefaultLabel labelText={`${role.slice(0, 22)}...`} className="d-xs-block d-sm-none d-md-none d-xl-none"/> :
							<DefaultLabel labelText={role} className="d-xs-block d-sm-none d-md-none d-xl-none"/>
						}
						{role && <DefaultLabel labelText={role} className="d-none d-sm-block" />
						}
						{/* {role && <DefaultLabel labelText={role} />} */}
						{/* {mandatoryHour && (
							<DefaultLabel
								labelText="Horário obrigatório"
								labelColor="#0085FF"
								{`${role.slice(0, 23)}...`}
							/>
						)} */}
            {tribe && (
              <DefaultLabel
                labelText={tribe.name}
                labelColor={tribe.color}
                className="d-none d-lg-block"
              />
            )}
          </Row>
        </Col>
      </Row>
    </LoggedMembersContainer>
  );
};

export default LoggedMembers;
