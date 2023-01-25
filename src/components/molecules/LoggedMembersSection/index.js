import React from "react";
import { LoggedMembersContainer } from "./styles";

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
	tribe,
	mandatoryHour = null,
	description,
}) => {
	return (
		<LoggedMembersContainer className="container">
			<Row className="flex-nowrap w-100 align-items-center">
				<Col sm="auto" xs="auto" className="d-none d-md-flex">
					<MemberAvatar src={imageLink} />
				</Col>
				<Col className="d-flex flex-column justify-content-center gap-1">
					<Row className="flex-nowrap d-flex flex-column flex-lg-row me-0 text-truncate">
						<MemberName name={name} className="text-nowrap px-0 py-1" />
						<MemberDescription
							description={description}
							responsive
							className="ms-lg-2 px-0 py-1"
						/>
					</Row>
					<Row>
						{role && <DefaultLabel labelText={role} />}
						{/* {mandatoryHour && (
							<DefaultLabel
								labelText="Horário obrigatório"
								labelColor="#0085FF"
							/>
						)} */}
					</Row>
					<Row>
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
