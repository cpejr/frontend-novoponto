import React, { useContext, useEffect, useState } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useQuery, useMutation } from "@apollo/client";
import {
	UpdateMember,
	DeleteMember,
	CreateMember,
} from "../../../graphql/Member";
import { Tooltip, message, Skeleton, Table } from "antd";
import { TasksComponent, ActionsDiv } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import {
	CommonButton,
	DefaultLabel,
	InputText,
} from "../../../components/atoms";
import searchIcon from "../../../assets/searchIcon.svg";
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";
import FormModal from "../../../components/organisms/FormModal";

import { EditOutlined, RestOutlined, TeamOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";
import { GET_TRIBES } from "../../../graphql/Tribes";
import diacriticCaseInsensitiveMatch from "../../../utils/diacriticCaseInsensitiveMatch";

const { Column, ColumnGroup } = Table;

const Tasks = () => {
	const { themeColors } = useContext(ThemeContext);
	const { tasksLoading, tasksError, allTasksData, refetchTasks } =
		useContext(GlobalsContext);

	// const { data: roles, error: errorRoles } = useQuery(GET_ROLES);
	// const { data: tribes, error: errorTribes } = useQuery(GET_TRIBES);

	const [updateTaskMutation] = useMutation(UpdateMember);
	const [createTaskMutation] = useMutation(CreateMember);
	const [deleteTaskMutation] = useMutation(DeleteMember);
	const { loading, error, data, refetch } = useQuery(GET_TRIBES);

	const [openModalExcludeTask, setOpenModalExcludeTask] = useState(false);
	const [filteredTasks, setFilteredTasks] = useState([]);
	const [excludeTask, setExcludeTask] = useState({});
	const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
		open: false,
	});

	const handleOpenModal = (task) => {
		setExcludeTask(task);
		setOpenModalExcludeTask(true);
	};

	const handleCloseModal = () => {
		setOpenModalExcludeTask(false);
	};

	const handleCloseEditOrCreate = () => {
		setEditOrCreateModalInfo({ open: false });
	};

	const editOrCreateTask = (method, task) => {
		const withInitialValue = method === "edit";

		var fields = [
			{
				key: "task",
				type: "text",
				label: "Tarefa",
				rules: [validators.antdRequired()],

				placeholder: "Escreva o nome da tarefa",
				initialValue: withInitialValue ? task.name : undefined,
			},
		];

		const modalData = {
			title: "",
			fields: fields,

			open: true,
			cancel: handleCloseEditOrCreate,
		};

		if (method === "edit") {
			modalData.title = "Editar Tarefa";
			modalData.onSubmit = updateTask(task._id);
		} else {
			modalData.title = "Criar Tarefa";
			modalData.onSubmit = createTask;
		}

		setEditOrCreateModalInfo(modalData);
	};

	const createTask = async (task) => {
		var hide = message.loading("Criando...");

    const { Tarefa } = task;
		try {
			const newTask = {
				name: Tarefa,
			};
			await createTaskMutation({ variables: { data: newTask } });
			hide();
			message.success("Criada com sucesso", 2.5);
			refetch();
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}

		handleCloseEditOrCreate();
	};

	const updateTask = (taskId) => async (task) => {
		var hide = message.loading("Atualizando tarefa...");

		const { Tarefa } = task;

		try {
			const newTask = {
				name: Tarefa,
			};

			await updateTaskMutation({
				variables: { taskId, data: newTask },
			});

			hide();
			message.success("Atualizada com sucesso", 2.5);
			refetch();
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}
		handleCloseEditOrCreate();
	};

	const handleExcludeTask = async (taskId) => {
		var hide = message.loading("Excluindo tarefa...");
		try {
			await deleteTaskMutation({ variables: { taskId } });
			hide();
			message.success("Excluída com sucesso", 2.5);
		} catch (err) {
			console.error(err);
			hide();
			message.error("Houve um problema, tente novamente", 2.5);
		}
		refetch();
		setOpenModalExcludeTask(false);
	};

	const handleSearchTask = (e) => {
		if (e.target.value !== "") {
			const filteredMembersAfterForEach = allTasksData?.members.filter(
				({ name }) => diacriticCaseInsensitiveMatch(name, e.target.value)
			);

			setFilteredTasks(filteredMembersAfterForEach);
		} else {
			setFilteredTasks([...allTasksData?.members]);
		}
	};

	useEffect(() => {
		if (allTasksData) setFilteredTasks([...allTasksData?.members]);
	}, [allTasksData]);

	if (loading)
		return (
			<Skeleton
				paragraph={{ rows: 4 }}
				size={"large"}
				active={tasksLoading}
				loading={tasksLoading}
			/>
		);
	else if (error) {
		console.log(tasksError);
		message.error("Houve um problema, tente recarregar a pagina", 2.5);
		return <h1>Erro, recarregue a pagina</h1>;
  }
	// else if (errorRoles) {
	// 	console.log(errorRoles);
	// 	message.error("Houve um problema, tente recarregar a pagina", 2.5);
	// 	return <h1>Erro, recarregue a pagina</h1>;
	// } else if (errorTribes) {
	// 	console.log(errorTribes);
	// 	message.error("Houve um problema, tente recarregar a pagina", 2.5);
	// 	return <h1>Erro, recarregue a pagina</h1>;
	// }

	return (
		<TasksComponent theme={themeColors}>
			<div className="iconWithTitle">
				<TeamOutlined className="svgIcon" />
				<h1>Gestão de Tarefas</h1>
			</div>
			<div className="addAndSearchTaskArea">
				<InputText
					icon={searchIcon}
					placeholder="Pesquisar tarefa"
					onChange={(e) => handleSearchTask(e)}
				/>
				<CommonButton
					buttonLabel="Adicionar nova tarefa"
					color={themeColors.green}
					nowrap
					width="215px"
					onClick={() => editOrCreateTask("new")}
				/>
			</div>

			<Table
				scroll={{ x: true }}
				dataSource={filteredTasks}
				pagination={false}
			>
				<Column title="Tarefa" dataIndex="name" key="name" />
				{/* <Column
					title="Tribo"
					dataIndex="tribe"
					key="tribe"
					width={200}
					render={(tribe) =>
						tribe && (
							<DefaultLabel labelColor={tribe.color} labelText={tribe.name} />
						)
					}
				/>
				<Column
					title="Cargo"
					dataIndex="role"
					key="role"
					width={200}
					render={(role) => <DefaultLabel labelText={role.name} />}
				/>
				<Column
					title="Assessor"
					dataIndex="responsible"
					key="responsible.name"
					render={(responsible) => responsible?.name}
				/> */}
				<Column
					key="action"
					width={120}
					render={(data) => (
						<ActionsDiv>
							<Tooltip
								placement="topLeft"
								title={"Editar"}
								onClick={() => editOrCreateTask("edit", data)}
							>
								<EditOutlined />
							</Tooltip>

							<Tooltip placement="topLeft" title={"Excluir"}>
								<RestOutlined onClick={() => handleOpenModal(data)} />
							</Tooltip>
						</ActionsDiv>
					)}
				/>
			</Table>
			<ConfirmationModal
				title="Apagar tarefa"
				content={`Deseja mesmo apagar a tarefa "${excludeTask.name}"?`}
				isVisible={openModalExcludeTask}
				handleOk={() => handleExcludeTask(excludeTask._id)}
				handleCancel={handleCloseModal}
			/>
			<FormModal {...editOrCreateModalInfo} />
		</TasksComponent>
	);
};

export default Tasks;
