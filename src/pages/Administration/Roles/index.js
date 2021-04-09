import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { RolesComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import CommonButton from "../../../components/atoms/CommonButton";
import DefaultLabel from "../../../components/atoms/DefaultLabel";
import ConfirmationModal from "../../../components/molecules/Modal";
import FormModal from "../../../components/organisms/FormModal";
import { Redirect } from "react-router";

import { RocketOutlined, EditOutlined, RestOutlined } from "@ant-design/icons";

import validators from '../../../services/validators'

const roles = [
  {
    id: 0,
    roleName: "Head de Marketing",
    isAdm: false,
  },
  {
    id: 1,
    roleName: "Assessor(a) de Desenvolvimento",
    isAdm: true,
  },
  {
    id: 2,
    roleName: "Consultor(a) de Tecnologia",
    isAdm: false,
  },
];

const Roles = () => {
  const { themeColors } = useContext(ThemeContext);

  const [currentRoles, setCurrentRoles] = useState([]);

  const [openModalExcludeRole, setOpenModalExcludeRole] = useState(false);
  const [excludeRoleName, setExcludeRoleName] = useState("");

  const handleOpenModal = (roleName) => {
    setExcludeRoleName(roleName);
    setOpenModalExcludeRole(true);
  };

  const handleExcludeRole = (roleName) => {
    const newRoleArray = currentRoles.filter(
      (item) => item.roleName !== roleName
    );
    setCurrentRoles(newRoleArray);
    setOpenModalExcludeRole(false);
  };

  const handleCloseModal = () => {
    setOpenModalExcludeRole(false);
  };

  ///////////////////////////////////////////////////////////////////////
  // EDIT OR CREATE ROLE HANDLING BEGIN //
  ///////////////////////////////////////////////////////////////////////

  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const editOrCreateRole = (method, role) => {
    var fields = [
      {
        key: "roleName",
        type: "text",
        label: "Cargo",
        validator: validators.notEmpity,
      },
      {
        key: "isAdm",
        type: "select",
        label: "Permissão",
        validator: validators.notEmpity,

        options: ["Administrador", "Sem Adminstrador"],
      },
    ];
    method === "edit"
      ? setEditOrCreateModalInfo({
          title: "Editar Cargo",
          fields: fields,
          callback: updateRole,
          open: true,
          cancel: handleCloseEditOrCreate,
          originalObject: {id: role.id, roleName: role.roleName, isAdm: (role.isAdm)? "Administrador" : "Sem Adminstrador"},
        })
      : setEditOrCreateModalInfo({
          title: "Criar Cargo",
          fields: fields,
          callback: createRole,
          open: true,
          cancel: handleCloseEditOrCreate,
        });
  };

  const updateRole = (role) => {
    role.isAdm = (role.isAdm==="Administrador");
    const index = currentRoles.map((mapRole) => role.id).indexOf(role.id);
    currentRoles[index] = role;
    setCurrentRoles([...currentRoles]);
    handleCloseEditOrCreate();
  };

  const createRole = (role) => {
    role.isAdm = (role.isAdm==="Administrador");
    setCurrentRoles([...currentRoles, role]);
    handleCloseEditOrCreate();
  };

  ///////////////////////////////////////////////////////////////////////
  // EDIT OR CREATE MEMBER HANDLING END //
  ///////////////////////////////////////////////////////////////////////

  useEffect(() => {
    setCurrentRoles(roles);
  }, []);

  return (
    <RolesComponent theme={themeColors}>
      <div className="iconWithTitle">
        <RocketOutlined className="svgIcon" />
        <h1>Cargos</h1>
      </div>
      <div className="addNewRoleButtonArea">
        <CommonButton
          buttonLabel="Adicionar novo cargo"
          color={themeColors.green}
          width="223px"
          onClick={() => editOrCreateRole("create")}
        />
      </div>

      <table className="roleTable">
        <tr>
          <th className="roleColumn">Cargo</th>
        </tr>
        {currentRoles.length > 0 ? (
          currentRoles.map((item) => (
            <tr>
              <td className="roleColumn">{item.roleName}</td>
              <td className="isAdmColumn">
                {item.isAdm && (
                  <DefaultLabel
                    labelText="Administrador"
                    labelColor="#FFD100"
                  />
                )}
              </td>
              <td className="editColumn">
                <Tooltip placement="topLeft" title={"Editar"} onClick={() => editOrCreateRole("edit", item)}>
                  <EditOutlined />
                </Tooltip>
              </td>
              <td className="garbageColumn">
                <Tooltip placement="topLeft" title={"Excluir"}>
                  <RestOutlined
                    onClick={() => handleOpenModal(item.roleName)}
                  />
                </Tooltip>
              </td>
            </tr>
          ))
        ) : (
          <tr>Nenhum cargo cadastrado</tr>
        )}
      </table>
      <ConfirmationModal
        title="Apagar cargo"
        content={`Deseja mesmo apagar o cargo "${excludeRoleName}"?`}
        isVisible={openModalExcludeRole}
        handleOk={() => handleExcludeRole(excludeRoleName)}
        handleCancel={handleCloseModal}
      />
      <FormModal
        title={editOrCreateModalInfo.title}
        fields={editOrCreateModalInfo.fields}
        callback={editOrCreateModalInfo.callback}
        open={editOrCreateModalInfo.open}
        cancel={editOrCreateModalInfo.cancel}
        originalObject={editOrCreateModalInfo.originalObject}
      />
    </RolesComponent>
  );
};

export default Roles;
