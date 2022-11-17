import React, { useEffect, useRef, useState } from "react";
import { Button, message } from "antd";
import { useMutation, useQuery, useSubscription } from "@apollo/client";

import {
	CREATE_SESSION,
	END_ALL_SESSIONS,
	FINISH_SESSION,
	LOGGED_MEMBERS,
} from "../../graphql/Sessions";
import { InputText } from "../../components/atoms";
import searchIcon from "../../assets/searchIcon.svg";
import SessionsTable from "./SessionsTable";
import ConfirmationModal from "../../components/molecules/ConfirmationModal";
import ModalityModal from "../../components/molecules/ModalityModal";
import AutocompleteMemberInput from "../../components/organisms/AutoCompleteMemberInput";
import { SESSION_SUBSCRIPTION } from "../../graphql/Subscription";
import diacriticCaseInsensitiveMatch from "../../utils/diacriticCaseInsensitiveMatch";

const Sessions = () => {
	const [memberTextToLogin, setMemberTextToLogin] = useState({});
	const [memberToLogout, setMemberToLogout] = useState();
	const [filteredSessions, setFilteredSessions] = useState([]);
	const [showLogoutAllMembers, setShowLogoutAllMembers] = useState(false);
	const [modalityModalVisible, setModalityModalVisible] = useState(false);

	const [startSessionMutation] = useMutation(CREATE_SESSION);
	const [endSessionMutation] = useMutation(FINISH_SESSION);
	const [endAllSessions] = useMutation(END_ALL_SESSIONS);

	const filterMemberField = useRef();
	const memberToLogin = useRef();

	const { data: loggedData, refetch: refetchLoggedMembers } =
		useQuery(LOGGED_MEMBERS);

	const { data: sessionUpdateData } = useSubscription(SESSION_SUBSCRIPTION);

	const { loggedMembers } = loggedData || {};

	async function handleLogoutMember(member) {
		let hide = message.loading("Deslogado...");

		try {
			await endSessionMutation({
				variables: { memberId: member._id },
			});

			hide();

			message.success(`Bom descanso ${member.name}!`, 2.5);
			setMemberToLogout();
		} catch (err) {
			hide();
			console.error(err);
			message.error("Houve um problema, tente novamente", 2.5);
		}
	}

	async function handleLogin(modality) {
		const hide = message.loading("Fazendo Login...");
		try {
			await startSessionMutation({
				variables: {
					memberId: memberToLogin.current._id,
					isPresential: modality,
				},
			});
			hide();
			message.success(`Bom trabalho ${memberToLogin.current.name}!`, 2.5);
		} catch (err) {
			hide();
			message.warn(err.message, 2.5);
		} finally {
			memberToLogin.current = undefined;
			setMemberTextToLogin({ text: "" });
		}
	}

	const handlePresencialLogin = () => {
		handleLogin(true);
		setModalityModalVisible(false);
	};

	const handleOnlineLogin = () => {
		handleLogin(false);
		setModalityModalVisible(false);
	};

	useEffect(() => {
		refetchLoggedMembers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [sessionUpdateData]);

	useEffect(() => {
		updateFilter();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loggedMembers]);

	function updateFilter() {
		const value = filterMemberField?.current?.input.value;

		if (value && value.trim() !== "")
			setFilteredSessions(
				loggedMembers?.filter(({ member: { name } }) =>
					diacriticCaseInsensitiveMatch(name, value)
				)
			);
		else setFilteredSessions(loggedMembers);
	}

	return (
		<div className="pointSection">
			<div className="d-flex flex-column-reverse flex-sm-row flex-grow justify-content-between my-3">
				<div className="mt-sm-0 mt-3 col-sm-6 col-md-5 col-lg-4 col-xl-3">
					<InputText
						ref={filterMemberField}
						icon={searchIcon}
						placeholder="Pesquisar membros"
						onChange={updateFilter}
					/>
				</div>
				<form className="d-flex ms-0 ms-sm-3 col-sm-6 col-md-5 col-lg-4 col-xl-3 justify-content-end">
					<AutocompleteMemberInput
						onChange={setMemberTextToLogin}
						value={memberTextToLogin}
						onMemberChange={(member) => (memberToLogin.current = member)}
						onKeyDown={(e) => {
							if (e.keyCode === 13) {
								e.preventDefault();
								setModalityModalVisible(true);
							}
						}}
					/>
					<Button width="84px" onClick={() => setModalityModalVisible(true)}>
						Login
					</Button>
				</form>
			</div>

			<div className="w-100 table-responsive">
				<SessionsTable
					sessions={filteredSessions}
					onLogout={({ member }) => setMemberToLogout(member)}
				/>
			</div>

			<div className="d-flex justify-content-end">
				<Button onClick={() => setShowLogoutAllMembers(true)}>
					Deslogar todos os membros
				</Button>
			</div>
			<ConfirmationModal
				title="Confirmação de logout"
				content={`Deseja deslogar ${memberToLogout?.name}?`}
				isVisible={!!memberToLogout}
				handleOk={() => handleLogoutMember(memberToLogout)}
				handleCancel={() => setMemberToLogout()}
			/>
			<ConfirmationModal
				title="Confirmação"
				content={`Deseja deslogar todos os membros?`}
				isVisible={showLogoutAllMembers}
				handleOk={() => {
					endAllSessions();
					setShowLogoutAllMembers(false);
				}}
				handleCancel={() => setShowLogoutAllMembers(false)}
			/>
			<ModalityModal
				title="Confirmação de login"
				content={`Como deseja logar ${memberToLogin.current?.name}?`}
				isVisible={modalityModalVisible}
				handlePresencialLogin={handlePresencialLogin}
				handleOnlineLogin={handleOnlineLogin}
				handleCancel={() => setModalityModalVisible(false)}
			/>
		</div>
	);
};

export default Sessions;
