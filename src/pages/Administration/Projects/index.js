import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ProjectsComponent } from "./styles";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { CommonButton } from "../../../components/atoms";
import { ThemeContext } from "../../../context/ThemeProvider";
import { Skeleton, message } from "antd";
import ProjectRow from "./ProjectRow";
import FormModal from "../../../components/organisms/FormModal";
import validators from "../../../services/validators";
import { GET_PROJECTS, CREATE_PROJECT, EDIT_PROJECT, DELETE_PROJECT } from "../../../graphql/Projects";
//import { GlobalsContext } from "../../../context/GlobalsProvider";
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";

const Projects = () => {
  const [excludeProject, setExcludeProject] = useState({});
  const [openModelExcludeProject, setOpenModalExcludeProject] = useState(false);
  const { themeColors } = useContext(ThemeContext);
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleCloseModal = () => {
    setOpenModalExcludeProject(false);
  };

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const editOrCreateProject = (method, project) => {
    const withInitialValue = method === "edit";

    var fields = [
      {
        key: "name",
        type: "text",
        label: "Projeto",
        placeholder: "Digite o nome do projeto",
        rules: [validators.antdRequired()],
        initialValue: withInitialValue ? project.name : undefined,
      },
      {
        key: "area",
        type: "text",
        label: "Área",
        placeholder: "Digite a área do projeto",
        rules: [validators.antdRequired()],
        initialValue: withInitialValue ? project.area : undefined,
      },
    ];

    const modalData = {
      title: "",
      fields: fields,
      open: true,
      cancel: handleCloseEditOrCreate,
    };

    if (method === "edit") {
      modalData.title = "Editar Projeto";
      modalData.onSubmit = handleEditProject;
    } else {
      modalData.title = "Criar Projeto";
      modalData.onSubmit = createProject;
    }

    setEditOrCreateModalInfo(modalData);
  };
  const deleteProject = (project) => {
    setExcludeProject(project);
    setOpenModalExcludeProject(true);
  };

  //linkagem
  const [createProjectMutation] = useMutation(CREATE_PROJECT);
  const [editProjectMutation] = useMutation(EDIT_PROJECT);
  const [deleteProjectMutation] = useMutation(DELETE_PROJECT);
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);

  const createProject = async (project) => {
    var hide = message.loading("Criando");

    const { Projeto, Área } = project;
    const newProject = {
      name: Projeto,
      area: Área,
    };

    try {
      await createProjectMutation({ variables: { data: newProject } });
      hide();
      message.success("Criado com sucesso", 2.5);
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetch();
    refetch();
    handleCloseEditOrCreate();
  };

  const handleExcludeProject = async (project) => {
    var hide = message.loading("Excluindo");
    try {
      await deleteProjectMutation({ variables: { _id: project._id} })
      hide();
      message.success("Projeto excluido com sucesso", 2.5);
      refetch();
    } catch (error) {
      console.error(error);
      hide();
      message.error("Houve um problema, tente novamente.", 2.5);
    }
    refetch();
    setOpenModalExcludeProject(true);
  };

  const handleEditProject = (_id) => async (ProjectUpdate) => {
    const { Nome, Area } = ProjectUpdate;
    const novoProject = {
      name: Nome,
      area: Area,
    };

    var hide = message.loading("Atualizando");
    try{
      await editProjectMutation({ variables: { _id, data: novoProject }});
      hide();
      message.success("Projeto atualizado com sucesso!", 2.5);
      refetch();
    } catch(error){
      console.error(error);
      hide();
      message.error("Houve um problema, tente novamente.", 2.5);
    }
    handleCloseEditOrCreate();
  }
  
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
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  }
  return (
    <ProjectsComponent>
      <div className="iconWithTitle">
        <FundProjectionScreenOutlined className="svgIcon" />
        <h1>Projetos</h1>
      </div>
      <div className="addNewProjectButtonArea">
        <CommonButton
          buttonLabel="Novo projeto"
          color={themeColors.green}
          width="223px"
          onClick={() => editOrCreateProject("create")}
        />
      </div>
      <table className="projectTable">
        <thead>
          <tr>
            <th className="projectColumn">Projeto</th>
            <th className="projectColumn">Área</th>
            <th className="editColumn" />
            <th className="garbageColumn" />
          </tr>
        </thead>
        <tbody>
          {!loading && data.projects.length > 0 ? (
            data.projects.map((project) => (
              <ProjectRow
                key={project._id}
                project={project}
                onEdit={() => editOrCreateProject("edit", project)}
                onDelete={() => deleteProject(project)}
              />
            ))
          ) : (
            <tr>
              <th>Nenhum projeto cadastrado</th>
            </tr>
          )}
        </tbody>
      </table>
      <ConfirmationModal
        title="Apagar Projeto"
        content={`Deseja mesmo apagar o projeto? "${excludeProject.name}"?`}
        isVisible={openModelExcludeProject}
        handleOk={() => handleExcludeProject(excludeProject)}
        handleCancel={handleCloseModal}
      />
      <FormModal {...editOrCreateModalInfo} />
    </ProjectsComponent>
  );
};

export default Projects;