import React, { useContext, useState } from "react";
import { ProjectsComponent } from "./styles";
import { FundProjectionScreenOutlined } from "@ant-design/icons";
import { CommonButton } from "../../../components/atoms";
import { ThemeContext } from "../../../context/ThemeProvider";
import { Skeleton, message } from "antd";
import ProjectRow from "./ProjectRow";

const Projects = () => {
  const { themeColors } = useContext(ThemeContext);
  // não sei se vão continuar como usestates no futuro, tem que ver como que a linkagem será feita
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const createProject = () => {
    console.log("Aqui vai o modal de criar o projeto");
  };
  const editProject = (project) => {
    console.log("Aqui vai o modal de editar o projeto", project);
  };
  const deleteProject = (project) => {
    console.log("Aqui vai o modal de deletar o projeto", project);
  };

  const projects = [
    //um array de objetos será enviado do backend
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
          onClick={() => createProject()}
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
                onEdit={() => editProject(project)}
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
    </ProjectsComponent>
  );
};

export default Projects;

