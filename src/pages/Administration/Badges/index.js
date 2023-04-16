import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { 
  GET_BADGES, 
  DELETE_BADGES, 
  UPDATE_BADGES, 
  CREATE_BADGES } from "../../../graphql/Badges";
import { message, Skeleton } from "antd";
import { BadgesComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";
import { GlobalsContext } from "../../../context/GlobalsProvider";

import { CommonButton } from "../../../components/atoms";
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";
import FormModal from "../../../components/organisms/FormModal";

import { RocketOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";
import BadgeRow from "./BadgeRow";

const Badges = () => {
  const { themeColors } = useContext(ThemeContext);
	const { refetchMembers } = useContext(GlobalsContext);

	const [openModalExcludeBadge, setOpenModalExcludeBadge] = useState(false);
	const [excludeBadge, setExcludeBadge] = useState({});
	const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
		open: false,
	});

	const handleOpenModal = (badge) => {
		setExcludeBadge(badge);
		setOpenModalExcludeBadge(true);
	};

	const handleCloseModal = () => {
		setOpenModalExcludeBadge(false);
	};

	const handleCloseEditOrCreate = () => {
		setEditOrCreateModalInfo({ open: false });
	};

	const handleExcludeBadge = async (badge) => {
		var hide = message.loading("Excluindo");
		try {
			await deleteBadgeMutation({ variables: { badgeId: badge._id } });
			hide();
			message.success("Excluido com sucesso", 2.5);
			refetchMembers();
			refetch();
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}
		setOpenModalExcludeBadge(false);
	};

	const editOrCreateBadge = (method, badge) => {
		const withInitialValue = method === "edit";

		var fields = [
			{
				key: "name",
				type: "text",
				label: "Reconhecimento",
				placeholder: "Escolha o nome",
				rules: [validators.antdRequired()],
				initialValue: withInitialValue ? badge.name : undefined,
			},
			{
				key: "description",
				type: "text",
				label: "Descrição",
				placeholder: "Escreva a descrição",
				rules: [validators.antdRequired()],
				initialValue: withInitialValue ? badge.description : undefined,
			},
			{
				key: "url",
				type: "file",
				label: "Imagem",
        placeholder: "Escreva a url",
				initialValue: withInitialValue ? badge.url : undefined,
			},
		];

		const modalData = {
			title: "",
			fields: fields,
			open: true,
			cancel: handleCloseEditOrCreate,
		};

		if (method === "edit") {
			modalData.title = "Editar Reconhecimento";
			modalData.onSubmit = updateBadge(badge._id);
		} else {
			modalData.title = "Criar Reconhecimento";
			modalData.onSubmit = createBadge;
		}

		setEditOrCreateModalInfo(modalData);
	};

	const updateBadge = (badgeId) => async (updatedBadge) => {
		const { Reconhecimento , Descrição, Imagem } = updatedBadge;
		const newBadge = {
			name: Reconhecimento,
			description: Descrição,
			image: Imagem,
		};

		console.log(
			"🚀 ~ file: index.js ~ line 106 ~ updateBadge ~ updatedBadge",
			newBadge
		);

		var hide = message.loading("Atualizando");
		try {
			await updateBadgeMutation({ variables: { badgeId, data: newBadge } });
			hide();
			message.success("Alterado com sucesso", 2.5);
			refetch();
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}
		handleCloseEditOrCreate();
	};

	const createBadge = async (badge) => {
		var hide = message.loading("Criando");
		const { Reconhecimento , Descrição, Imagem } = badge;
		const newBadge = {
			name: Reconhecimento,
			description: Descrição,
			image: Imagem,
		};
		console.log(badge);
		try {
			await createBadgeMutation({ variables: { data: newBadge } });
			hide();
			message.success("Criado com sucesso", 2.5);
      refetch();
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
      refetch();
		}
		refetch();
		handleCloseEditOrCreate();
	};

	const [deleteBadgeMutation] = useMutation(DELETE_BADGES);
	const [updateBadgeMutation] = useMutation(UPDATE_BADGES);
	const [createBadgeMutation] = useMutation(CREATE_BADGES);
	const { loading, error, data, refetch } = useQuery(GET_BADGES);

	if (loading)
		return (
			<Skeleton
				paragraph={{ rows: 4 }}
				size={"large"}
				active={loading}
				loading={loading}
			/>
		);

	if (error) {
		console.log(error);
		message.error("Houve um problema, tente recarregar a pagina", 2.5);
		return <h1>Erro, recarregue a pagina</h1>;
	}

	if (data) {
		const { badges } = data;

		return (
			<BadgesComponent theme={themeColors}>
				<div className="iconWithTitle">
					<RocketOutlined className="svgIcon" />
					<h1>Reconhecimentos</h1>
				</div>
				<div className="addNewBadgeButtonArea">
					<CommonButton
						buttonLabel="Novo reconhecimento"
						color={themeColors.green}
						width="223px"
						onClick={() => editOrCreateBadge("create")}
					/>
				</div>

				<table className="badgeTable">
					<thead>
						<tr>
							<th className="badgeColumn">Reconhecimento</th>
							<th className="badgeColumn">Descrição</th>
							<th className="badgeColumn">Imagem</th>
							<th className="editColumn" />
							<th className="garbageColumn" />
						</tr>
					</thead>
					<tbody>
						{badges.length > 0 ? (
							badges.map((badge) => (
								<BadgeRow
									key={badge._id}
									badge={badge}
									onEdit={() => editOrCreateBadge("edit", badge)}
									onDelete={() => handleOpenModal(badge)}
								/>
							))
						) : (
							<tr>
								<th>Nenhum reconhecimento cadastrado</th>
							</tr>
						)}
					</tbody>
				</table>
				<ConfirmationModal
					title="Apagar Reconhecimento"
					content={`Deseja mesmo apagar o reconhecimento "${excludeBadge.name}"?`}
					isVisible={openModalExcludeBadge}
					handleOk={() => handleExcludeBadge(excludeBadge)}
					handleCancel={handleCloseModal}
				/>
				<FormModal {...editOrCreateModalInfo} />
			</BadgesComponent>
		);
	}
};

export default Badges;
