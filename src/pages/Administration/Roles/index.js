import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ROLES,
  DELETE_ROLE,
  UPDATE_ROLE,
  CREATE_ROLE,
} from "../../../graphql/Roles";
import {  message, Skeleton } from "antd";
import { RolesComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import { CommonButton } from "../../../components/atoms";
import ConfirmationModal from "../../../components/molecules/Modal";
import FormModal from "../../../components/organisms/FormModal";

import { RocketOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";
import RoleRow from "./RoleRow";

const Roles = () => {
  const { themeColors } = useContext(ThemeContext);

  const [openModalExcludeRole, setOpenModalExcludeRole] = useState(false);
  const [excludeRole, setExcludeRole] = useState({});
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleOpenModal = (role) => {
    setExcludeRole(role);
    setOpenModalExcludeRole(true);
  };

  const handleCloseModal = () => {
    setOpenModalExcludeRole(false);
  };

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const handleExcludeRole = async (role) => {
    var hide = message.loading("Excluindo");
    try {
      await deleteRoleMutation({ variables: { roleId: role._id } });
      hide();
      message.success("Excluido com sucesso", 2.5);
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    setOpenModalExcludeRole(false);
  };

  const editOrCreateRole = (method, role) => {
    var fields = [
      {
        key: "name",
        type: "text",
        label: "Cargo",
        validator: validators.notEmpty,
      },
      {
        key: "access",
        type: "select",
        label: "Permissão",
        validator: validators.notEmpty,

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
          originalObject: {
            _id: role._id,
            name: role.name,
            access: role.access === 1 ? "Administrador" : "Sem Adminstrador",
          },
        })
      : setEditOrCreateModalInfo({
          title: "Criar Cargo",
          fields: fields,
          callback: createRole,
          open: true,
          cancel: handleCloseEditOrCreate,
        });
  };

  const updateRole = async (updatedRole) => {
    const { _id, ...role } = updatedRole;
    role.access = role.access === "Administrador" ? 1 : 0;
    var hide = message.loading("Atualizando");
    try {
      await updateRoleMutation({ variables: { roleId: _id, data: role } });
      hide();
      message.success("Alterado com sucesso", 2.5);
      refetch();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    handleCloseEditOrCreate();
  };

  const createRole = async (role) => {
    role.access = role.access === "Administrador" ? 1 : 0;
    var hide = message.loading("Criando");
    try {
      await createRoleMutation({ variables: { data: role } });
      hide();
      message.success("Criado com sucesso", 2.5);
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetch();
    handleCloseEditOrCreate();
  };

  const [deleteRoleMutation] = useMutation(DELETE_ROLE);
  const [updateRoleMutation] = useMutation(UPDATE_ROLE);
  const [createRoleMutation] = useMutation(CREATE_ROLE);
  const { loading, error, data, refetch } = useQuery(GET_ROLES);

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

  if (data) {
    const { roles } = data;

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
          <thead>
            <tr>
              <th className="roleColumn">Cargo</th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role) => (
                <RoleRow
                  key={role._id}
                  role={role}
                  onEdit={() => editOrCreateRole("edit", role)}
                  onDelete={() => handleOpenModal(role)}
                />
              ))
            ) : (
              <tr>Nenhum cargo cadastrado</tr>
            )}
          </tbody>
        </table>
        <ConfirmationModal
          title="Apagar cargo"
          content={`Deseja mesmo apagar o cargo "${excludeRole.name}"?`}
          isVisible={openModalExcludeRole}
          handleOk={() => handleExcludeRole(excludeRole)}
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
  }
};

export default Roles;
