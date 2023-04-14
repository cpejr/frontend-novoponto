import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useContext } from "react";
import { DefaultLabel } from "../../../components/atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const RoleRow = ({ role, onEdit, onDelete, ...props }) => {
  const { availableRoles } = useContext(GlobalsContext);
  return (
    <tr {...props}>
      <td className="roleColumn">{role.name}</td>
      <td className="isAdmColumn">
        {role.access > 0 && (
          <DefaultLabel
            labelText={
              availableRoles.find(
                (availableRole) => availableRole.value === role.access
              )?.label
            }
            labelColor="#FFFFFF"
          />
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
