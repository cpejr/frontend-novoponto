import { Button } from "antd";
import React, { useContext } from "react";
import { HourDisplayer } from "../../components/atoms";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";
import PresentialDisplayer from "../../components/molecules/PresentialDisplayer";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import { ThemeContext } from "../../context/ThemeProvider";

import logoutPointIcon from "../../assets/logoutPointIcon.svg";

const SessionRow = ({ session, onLogout, ...props }) => {
	const { themeColors } = useContext(ThemeContext);

	const { member } = session;
	function handleLogout() {
		onLogout && onLogout(session);
	}

	
	return (
		<tr {...props} className="d-flex">
			<td className="col-4">
				<LoggedMembers
					name={member.name}
					imageLink={member.imageLink}
					tribe={member?.tribe}
					role={member?.role?.name}
					description={member.status}
				/>
			</td>
			<td className="col-2 d-none d-sm-flex align-items-center justify-content-center">
			<div className="d-flex">
			  <PresentialDisplayer
				isPresential={session.isPresential}
				presentialColor={themeColors.green}
			  />
			</div>
		  </td>
			<td className="col-2 d-none d-sm-flex align-items-center justify-content-center">
				<div className="d-flex">
					<HourDisplayer
						hour={session.start}
						hourColor={themeColors.green}
						dateOrTime={"date"}
					/>
				</div>
			</td>
			<td className="col-3 col-sm-2 d-flex align-items-center justify-content-center">
				<div className="d-flex">
					<DurationDisplayer
						startTime={session.start}
						color={themeColors.yellow}
					/>
				</div>
			</td>
			<td className="col-3 col-sm-2 d-flex align-items-center justify-content-center">
				<Button
					className="w-100"
					icon={<img src={logoutPointIcon} alt="Deslogar" />}
					onClick={handleLogout}
				/>
			</td>
		</tr>
	);
};

export default SessionRow;
