import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { DefaultLabel } from "../../../components/atoms";

const RoleRow = ({ role, onEdit, onDelete, ...props }) => {
  return (
    <tr {...props}>
      <td className="roleColumn">{role.name}</td>
      <td className="isAdmColumn">
        {role.access === 1 && (
          <DefaultLabel labelText="Administrador" labelColor="#FFD100" />
        )}
      </td>
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

export default RoleRow;
