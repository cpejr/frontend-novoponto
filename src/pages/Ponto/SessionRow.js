import { Button } from "antd";
import React, { useContext } from "react";
import { DefaultLabel, HourDisplayer } from "../../components/atoms";
import DurationDisplayer from "../../components/molecules/DurationDisplayer";
import PresentialDisplayer from "../../components/molecules/PresentialDisplayer";
import LoggedMembers from "../../components/molecules/LoggedMembersSection";
import { ThemeContext } from "../../context/ThemeProvider";
import logoutPointIcon from "../../assets/logoutPointIcon.svg";
import { SessionContext } from "../../context/SessionProvider";
import { AiOutlineEye } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Tooltip } from "antd";
import { Container } from "react-bootstrap";


const SessionRow = ({ session, onLogout, ...props }) => {
	const { themeColors } = useContext(ThemeContext);

	const { member } = session;
	function handleLogout() {
		onLogout && onLogout(session);
	}

	const { data } = useContext(SessionContext);
	const memberSession = data.member;

	return (
		<tr {...props} className="d-flex">
			<td className="col-6 col-sm-5">
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
			<td className="col-1 d-block d-sm-none"></td>

			
			<td className="col-2 col-sm-1 d-flex align-items-center justify-content-between gap-3">

				<Tooltip placement="top" title={"Treinamento com a Tesla"}>
					<Button
						className="w-50 h-50"
						icon={
							
						member.name === data.member.name ? 
							<HiOutlinePencilAlt size="1.5em"/>
						:
							<AiOutlineEye size="1.5em"/>
						}
						onClick={
							() => {
							member.name === memberSession.name ? 
							console.log("Editar tarefa")
							:
							console.log("Exibir tarefa")
							}
						}

						
					/>
				</Tooltip>

				<Button
					className="w-50 h-50"
					icon={<img src={logoutPointIcon} alt="Deslogar" />}
					onClick={handleLogout}
				/>
			</td>
		</tr>
	);
};

export default SessionRow;
