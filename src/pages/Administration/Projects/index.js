import React, { useContext, useState } from "react";
import { ProjectsComponent } from "./styles";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { CommonButton } from "../../../components/atoms";
import { ThemeContext } from "../../../context/ThemeProvider";
import { Skeleton, message } from "antd";
import ProjectRow from "./ProjectRow";
import FormModal from "../../../components/organisms/FormModal";
import validators from "../../../services/validators";

const Projects = () => {
  // não sei se vão continuar como usestates no futuro, tem que ver como que a linkagem será feita
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { themeColors } = useContext(ThemeContext);
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const editOrCreateProject = (method, badge) => {
    const withInitialValue = method === "edit";

    var fields = [
      {
        key: "name",
        type: "text",
        label: "Projeto",
        placeholder: "Digite o nome do projeto",
        rules: [validators.antdRequired()],
        initialValue: withInitialValue ? badge.name : undefined,
      },
      {
        key: "area",
        type: "text",
        label: "Área",
        placeholder: "Digite a área do projeto",
        rules: [validators.antdRequired()],
        initialValue: withInitialValue ? badge.area : undefined,
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
      //modalData.onSubmit = alert("Editar");
    } else {
      modalData.title = "Criar Projeto";
      //modalData.onSubmit = alert("Criar");
    }

    setEditOrCreateModalInfo(modalData);
  };
  const deleteProject = (project) => {
    console.log("Aqui vai o modal de deletar o projeto", project);
  };

  //um array de objetos será enviado do backend
  const projects = [
    {
      _id: 1,
      name: "Doti",
      area: "Sistemas web",
    },
    {
      _id: 2,
      name: "MVP Clínicas",
      area: "Sistemas web",
    },
    {
      _id: 3,
      name: "Classroom",
      area: "Aplicativos",
    },
  ];

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
          {projects.length > 0 ? (
            projects.map((project) => (
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
      <FormModal {...editOrCreateModalInfo} />
    </ProjectsComponent>
  );
};

export default Projects;

