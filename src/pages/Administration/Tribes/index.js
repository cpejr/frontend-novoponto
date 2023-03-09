import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
	GET_TRIBES,
	DELETE_TRIBE,
	UPDATE_TRIBE,
	CREATE_TRIBE,
} from "../../../graphql/Tribes";
import { message, Skeleton } from "antd";
import { TribesComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";
import { GlobalsContext } from "../../../context/GlobalsProvider";

import { CommonButton } from "../../../components/atoms";
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";
import FormModal from "../../../components/organisms/FormModal";

import { RocketOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";
import TribeRow from "./TribeRow";

const Tribes = () => {
	const { themeColors } = useContext(ThemeContext);
	const { refetchMembers } = useContext(GlobalsContext);

	const [openModalExcludeTribe, setOpenModalExcludeTribe] = useState(false);
	const [excludeTribe, setExcludeTribe] = useState({});
	const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
		open: false,
	});

	const handleOpenModal = (tribe) => {
		setExcludeTribe(tribe);
		setOpenModalExcludeTribe(true);
	};

	const handleCloseModal = () => {
		setOpenModalExcludeTribe(false);
	};

	const handleCloseEditOrCreate = () => {
		setEditOrCreateModalInfo({ open: false });
	};

	const handleExcludeTribe = async (tribe) => {
		var hide = message.loading("Excluindo");
		try {
			await deleteTribeMutation({ variables: { tribeId: tribe._id } });
			hide();
			message.success("Excluido com sucesso", 2.5);
			refetchMembers();
			refetch();
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}
		setOpenModalExcludeTribe(false);
	};

	const editOrCreateTribe = (method, tribe) => {
		const withInitialValue = method === "edit";

		var fields = [
			{
				key: "name",
				type: "text",
				label: "Tribo",
				placeholder: "Escolha o nome",
				rules: [validators.antdRequired()],
				initialValue: withInitialValue ? tribe.name : undefined,
			},
			{
				key: "color",
				type: "text",
				label: "Cor",
				placeholder: "Escreva a cor em código hexadecimal",
				rules: [validators.antdRequired(), validators.notHexColor()],
				initialValue: withInitialValue ? tribe.color : undefined,
			},
			{
				key: "segmento",
				type: "text",
				label: "Segmento",
				placeholder: "Escreva o principal segmento",
				rules: [validators.antdRequired(), validators.charLimit(50)],
				initialValue: withInitialValue ? tribe.segment : undefined,
			},
		];

		const modalData = {
			title: "",
			fields: fields,
			open: true,
			cancel: handleCloseEditOrCreate,
		};

		if (method === "edit") {
			modalData.title = "Editar Tribo";
			modalData.onSubmit = updateTribe(tribe._id);
		} else {
			modalData.title = "Criar Tribo";
			modalData.onSubmit = createTribe;
		}

		setEditOrCreateModalInfo(modalData);
	};

	const updateTribe = (tribeId) => async (updatedTribe) => {
		const { Tribo, Cor, Segmento } = updatedTribe;
		const newTribe = {
			name: Tribo,
			color: Cor,
			segment: Segmento,
		};

		console.log(
			"🚀 ~ file: index.js ~ line 106 ~ updateTribe ~ updatedTribe",
			updatedTribe
		);

		var hide = message.loading("Atualizando");
		try {
			await updateTribeMutation({ variables: { tribeId, data: newTribe } });
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

	const createTribe = async (tribe) => {
		var hide = message.loading("Criando");

		const { Tribo, Cor, Segmento } = tribe;
		const newTribe = {
			name: Tribo,
			color: Cor,
			segment: Segmento,
		};
		console.log(tribe);
		try {
			await createTribeMutation({ variables: { data: newTribe } });
			hide();
			message.success("Criado com sucesso", 2.5);
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}
		refetch();
		handleCloseEditOrCreate();
	};

	const [deleteTribeMutation] = useMutation(DELETE_TRIBE);
	const [updateTribeMutation] = useMutation(UPDATE_TRIBE);
	const [createTribeMutation] = useMutation(CREATE_TRIBE);
	const { loading, error, data, refetch } = useQuery(GET_TRIBES);

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
		const { tribes } = data;

		return (
			<TribesComponent theme={themeColors}>
				<div className="iconWithTitle">
					<RocketOutlined className="svgIcon" />
					<h1>Tribos</h1>
				</div>
				<div className="addNewTribeButtonArea">
					<CommonButton
						buttonLabel="Adicionar nova tribo"
						color={themeColors.estatPrimaryColor}
						width="223px"
						onClick={() => editOrCreateTribe("create")}
					/>
				</div>

				<table className="tribeTable">
					<thead>
						<tr>
							<th className="tribeColumn">Tribo</th>
							<th className="tribeColumn">Cor</th>
							<th className="tribeColumn">Segmento</th>
							<th className="editColumn" />
							<th className="garbageColumn" />
						</tr>
					</thead>
					<tbody>
						{tribes.length > 0 ? (
							tribes.map((tribe) => (
								<TribeRow
									key={tribe._id}
									tribe={tribe}
									onEdit={() => editOrCreateTribe("edit", tribe)}
									onDelete={() => handleOpenModal(tribe)}
								/>
							))
						) : (
							<tr>
								<th>Nenhuma tribo cadastrada</th>
							</tr>
						)}
					</tbody>
				</table>
				<ConfirmationModal
					title="Apagar tribo"
					content={`Deseja mesmo apagar a tribo "${excludeTribe.name}"?`}
					isVisible={openModalExcludeTribe}
					handleOk={() => handleExcludeTribe(excludeTribe)}
					handleCancel={handleCloseModal}
				/>
				<FormModal {...editOrCreateModalInfo} />
			</TribesComponent>
		);
	}
};

export default Tribes;
