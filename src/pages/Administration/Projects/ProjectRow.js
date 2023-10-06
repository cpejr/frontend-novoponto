import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const ProjectRow = ({ project, onEdit, onDelete, ...props }) => {
  return (
    <tr {...props}>
      <td className="projectColumn">{project.name}</td>
      <td className="projectColumn">{project.area}</td>
      <td className="editColumn">
        <Tooltip placement="topLeft" title={"Editar"} onClick={onEdit}>
          <EditOutlined />
        </Tooltip>
      </td>
      <td className="garbageColumn">
        <Tooltip placement="topLeft" title={"Excluir"}>
          <RestOutlined onClick={onDelete} />
        </Tooltip>
      </td>
    </tr>
  );
};

export default ProjectRow;

