import React, { useContext, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_ROLES,
  DELETE_ROLE,
  UPDATE_ROLE,
  CREATE_ROLE,
} from "../../../graphql/Roles";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { message, Skeleton } from "antd";
import { RolesComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";
import Footer from "../../../components/molecules/Footer";
import { CommonButton } from "../../../components/atoms";
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";
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
  const { availableRoles } = useContext(GlobalsContext);

  const [deleteRoleMutation] = useMutation(DELETE_ROLE);
  const [updateRoleMutation] = useMutation(UPDATE_ROLE);
  const [createRoleMutation] = useMutation(CREATE_ROLE);
  const { loading, error, data, refetch } = useQuery(GET_ROLES);

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
    const withInitialValue = method === "edit";

    var fields = [
      {
        key: "name",
        type: "text",
        label: "Cargo",
        validator: validators.antdRequired,
        initialValue: withInitialValue ? role.name : undefined,
      },
      {
        key: "access",
        type: "select",
        label: "Permissão",
        validator: validators.antdRequired,
        initialValue: withInitialValue ? role.access : undefined,

        options: availableRoles,
      },
    ];

    const modalData = {
      title: "",
      fields: fields,
      open: true,
      cancel: handleCloseEditOrCreate,
    };

    if (method === "edit") {
      modalData.title = "Editar Cargo";
      modalData.onSubmit = updateRole(role._id);
    } else {
      modalData.title = "Criar Cargo";
      modalData.onSubmit = createRole;
    }

    setEditOrCreateModalInfo(modalData);
  };

  const updateRole = (roleId) => async (updatedRole) => {
    const { Cargo, Permissão } = updatedRole;
    const newRole = {
      access: Permissão,
      name: Cargo,
    };

    console.log(
      "🚀 ~ file: index.js ~ line 106 ~ updateRole ~ updatedRole",
      updatedRole
    );

    var hide = message.loading("Atualizando");
    try {
      await updateRoleMutation({ variables: { roleId, data: newRole } });
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
    var hide = message.loading("Criando");

    const { Cargo, Permissão } = role;
    const newRole = {
      access: Permissão,
      name: Cargo,
    };

    try {
      await createRoleMutation({ variables: { data: newRole } });
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
              <tr>
                <th>Nenhum cargo cadastrado</th>
              </tr>
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
        <FormModal {...editOrCreateModalInfo} />
        <div>
          <Footer />
        </div>
      </RolesComponent>
    );
  }
};

export default Roles;
