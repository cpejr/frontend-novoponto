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
    console.log(error);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  }
  const editOrCreateProject = (method, project) => {
    console.log("Aqui vai a função de criar ou editar o projeto");
  };
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
          <ProjectRow
            key={"123"}
            project={{ name: "Doti", area: "Projetos" }}
            onEdit={() => {
              console.log("edit");
            }}
            onDelete={() => {
              console.log("delete");
            }}
          />
          {/* {badges.length > 0 ? (
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
            <th>Nenhum projeto cadastrado</th>
          </tr>
           )} */}
        </tbody>
      </table>
    </ProjectsComponent>
  );
};

export default Projects;

