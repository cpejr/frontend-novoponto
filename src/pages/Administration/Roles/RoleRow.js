import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React, { useContext } from "react";
import { DefaultLabel } from "../../../components/atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useQuery } from "@apollo/client";
import { GET_DEPARTAMENT_BY_ID } from "../../../graphql/Departaments";

const RoleRow = ({ role, onEdit, onDelete, ...props }) => {
  const { availableRoles } = useContext(GlobalsContext);
  const { loading, data } = useQuery(GET_DEPARTAMENT_BY_ID, {
    variables: {
      departamentId: role.departamentId,
    },
  });
  function edit(role, data) {
    var auxrole = role;
    var auxdata = data;
    if (!auxdata.departamentId) {
      auxdata.departamentId = "Departamento não Selecionado";
    }
    if (!auxrole.departamentId) {
      auxrole.departamentId = "Departamento não Selecionado";
    }

    onEdit("edit", auxrole, auxdata);
  }
  return (
    <>
      {!loading && (
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
                labelColor="#FFD100"
              />
            )}
          </td>
          <td className="roleColumn">
            {role.departamentId ? (
              <DefaultLabel
                labelText={data.departamentById.name}
                labelColor={data.departamentById.color}
              />
            ) : (
              <DefaultLabel
                labelText={"Departamento não Selecionado"}
                labelColor={"#fff"}
              />
            )}
          </td>
          <td className="editColumn">
            <Tooltip
              placement="topLeft"
              title={"Editar"}
              onClick={() => edit(role, data)}
            >
              <EditOutlined />
            </Tooltip>
          </td>
          <td className="garbageColumn">
            <Tooltip placement="topLeft" title={"Excluir"}>
              <RestOutlined onClick={onDelete} />
            </Tooltip>
          </td>
        </tr>
      )}
    </>
  );
};

export default RoleRow;
