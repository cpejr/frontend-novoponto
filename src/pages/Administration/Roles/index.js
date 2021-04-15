import React, { useContext, useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { Tooltip, message, Skeleton } from "antd";
import { RolesComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import CommonButton from "../../../components/atoms/CommonButton";
import DefaultLabel from "../../../components/atoms/DefaultLabel";
import ConfirmationModal from "../../../components/molecules/Modal";
import FormModal from "../../../components/organisms/FormModal";

import { RocketOutlined, EditOutlined, RestOutlined, IdcardFilled } from "@ant-design/icons";

import validators from "../../../services/validators";

const GET_ROLES = gql`
  query GetRoles {
    roles {
      name
      _id
      access
    }
  }
`;

const DELETE_ROLE = gql`
  mutation DeleteRole($roleId: ID!) {
    deleteRole (roleId: $roleId){
      _id
    }
  }
`;

const UPDATE_ROLE = gql`
  mutation UpdateRole($roleId: ID!, $data: RoleUpdate) {
    updateRole (roleId: $roleId, data: $data){
      _id
      name
      access
    }
  }
`;

const CREATE_ROLE = gql`
  mutation CreateRole($data: RoleInput!) {
    createRole (data: $data){
      _id
      name
      access
    }
  }
`;


const Roles = () => {
  const { themeColors } = useContext(ThemeContext);

  const [openModalExcludeRole, setOpenModalExcludeRole] = useState(false);
  const [excludeRole, setExcludeRole] = useState({});

  const handleOpenModal = (role) => {
    setExcludeRole(role);
    setOpenModalExcludeRole(true);
  };

  const handleExcludeRole = async (role) => {
    var hide = message.loading("Excluindo");
    try{
      await deleteRoleMutation({variables:{roleId: role._id}});
      hide();
      message.success("Excluido com sucesso", 2.5);
      refetch()
    }
    catch(err){
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
      refetch()
    }
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
            access: (role.access===1) ? "Administrador" : "Sem Adminstrador",
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
    const {_id, ...role} = updatedRole;
    role.access = (role.access === "Administrador") ? 1 : 0;
    var hide = message.loading("Excluindo");
    try{
      await updateRoleMutation({variables:{roleId: _id, data: role}});
      hide();
      message.success("Alterado com sucesso", 2.5);
    }
    catch(err){
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetch()
    handleCloseEditOrCreate();
  };

  const createRole = async (role) => {
    role.access = (role.access === "Administrador") ? 1 : 0;
    var hide = message.loading("Excluindo");
    try{
      await createRoleMutation({variables:{data: role}});
      hide();
      message.success("Criado com sucesso", 2.5);
    }
    catch(err){
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetch()
    handleCloseEditOrCreate();
  };

  ///////////////////////////////////////////////////////////////////////
  // EDIT OR CREATE MEMBER HANDLING END //
  ///////////////////////////////////////////////////////////////////////


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
  else if (error) {
    console.log(error);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  } else if (data) {
    var roles = data.roles;

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
          {roles.length > 0 ? (
            roles.map((item) => (
              <tr>
                <td className="roleColumn">{item.name}</td>
                <td className="isAdmColumn">
                  {(item.access===1) && (
                    <DefaultLabel
                      labelText="Administrador"
                      labelColor="#FFD100"
                    />
                  )}
                </td>
                <td className="editColumn">
                  <Tooltip
                    placement="topLeft"
                    title={"Editar"}
                    onClick={() => editOrCreateRole("edit", item)}
                  >
                    <EditOutlined />
                  </Tooltip>
                </td>
                <td className="garbageColumn">
                  <Tooltip placement="topLeft" title={"Excluir"}>
                    <RestOutlined
                      onClick={() => handleOpenModal(item)}
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
