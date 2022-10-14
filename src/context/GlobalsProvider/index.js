import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import Lottie from "react-lottie";

import waitLottie from "../../assets/lotties/loading.json";
import errorLottie from "../../assets/lotties/error-girl.json";
import { DefaultText } from "../../components/atoms";
import { Members } from "../../graphql/Member";
import { News } from "../../graphql/News";
import { Modal } from "antd";
import { LastChangeLog } from "../../graphql/Changelog";

export const GlobalsContext = createContext();

const availableRoles = [
	{ label: "Sem Administrador", value: 0 },
	{ label: "Administrador", value: 1 },
	{ label: "Adm Oculto", value: 2 },
];

const GlobalsContextProvider = (props) => {
	const {
		loading: membersLoading,
		error: membersError,
		data: allMembersData,
		refetch: refetchMembers,
	} = useQuery(Members);

	const {
		loading: newsLoading,
		error: newsError,
		data: newsData,
		refetch: refetchNews,
	} = useQuery(News);

	const { data: currentVersionData } = useQuery(LastChangeLog);

	const accessArray = [0, 1];
	const membersData = {};
	membersData.members = allMembersData?.members?.filter((member) =>
		accessArray.includes(member?.role?.access)
	);

	const [menuColapse, setMenuColapse] = useState(false);
	const [hasNewUpdate, setHasNewUpdate] = useState(false);

	const [width, setWidth] = useState(window.innerWidth);
	const breakpoint = 830;
	const isMobile = width < breakpoint;

	useEffect(() => {
		// Favor manter somente 2 iguais
		// eslint-disable-next-line eqeqeq
		const toggle = localStorage.getItem("menuColapse") == "true";

		if (toggle) setMenuColapse(toggle);

		const handleWindowResize = () => setWidth(window.innerWidth);
		window.addEventListener("resize", handleWindowResize);

		return () => window.removeEventListener("resize", handleWindowResize);
	}, []);

	useEffect(() => {
		if (currentVersionData) {
			const { lastChangeLog } = currentVersionData;
			const oldVersion = parseInt(localStorage.getItem("version"));
			if (isNaN(oldVersion) || oldVersion < lastChangeLog.version)
				setHasNewUpdate(true);
		}
	}, [currentVersionData]);

	function toggleMenu() {
		localStorage.setItem("menuColapse", !menuColapse);

		setMenuColapse(!menuColapse);
	}

	function showUpdateCatalog() {
		Modal.info({
			title: "Novidades de atualização",
			content: (
				<div style={{ whiteSpace: "pre-line" }}>
					{currentVersionData?.lastChangeLog?.changeLogText}
				</div>
			),
			onOk() {
				setHasNewUpdate(false);
				localStorage.setItem(
					"version",
					currentVersionData?.lastChangeLog?.version
				);

				// Recurso técnico para remover a seleção do menu
				window.location.reload();
			},
		});
	}

	return (
		<GlobalsContext.Provider
			value={{
				membersLoading,
				membersError,
				membersData,
				refetchMembers,
				toggleMenu,
				menuColapse,
				availableRoles,
				width,
				isMobile,
				allMembersData,
				showUpdateCatalog,
				hasNewUpdate,
				newsLoading,
				newsError,
				newsData,
				refetchNews,
			}}
		>
			{!membersLoading && !membersError && props.children}
			{membersLoading && <Loading />}
			{membersError && <Error message={membersError.message} />}
		</GlobalsContext.Provider>
	);
};

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const Loading = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100vh",
				justifyContent: "center",
				maxWidth: 600,
				textAlign: "center",
				margin: "auto",
			}}
		>
			<Lottie
				options={{ ...defaultOptions, animationData: waitLottie }}
				height={300}
				width={300}
			/>
			<DefaultText style={{ fontSize: 30, marginBottom: 8 }}>
				Aquecendo os motores...
			</DefaultText>
			<DefaultText style={{ opacity: 0.5 }}>
				(isso pode levar um tempo)
			</DefaultText>
		</div>
	);
};

const Error = ({ message }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				height: "100vh",
				justifyContent: "center",
				maxWidth: 600,
				textAlign: "center",
				margin: "auto",
			}}
		>
			<Lottie
				options={{ ...defaultOptions, animationData: errorLottie }}
				height={300}
				width={300}
			/>
			<DefaultText style={{ fontSize: 30, marginTop: 16, marginBottom: 8 }}>
				Aparentemente algo deu errado no back-end
			</DefaultText>
			<DefaultText style={{ opacity: 0.5 }}>
				Acho que alguém vai ter que dar uma olhada no Heroku rsrs...
			</DefaultText>
			<DefaultText style={{ marginTop: 32, opacity: 0.2 }}>
				{message}
			</DefaultText>
		</div>
	);
};

export default GlobalsContextProvider;
