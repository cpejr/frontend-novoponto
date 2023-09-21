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
import { useEffect } from "react";
import { GET_DEPARTAMENT_BY_ID, GET_DEPARTMENTS } from "../../../graphql/Departaments";

const Roles = () => {
  const { themeColors } = useContext(ThemeContext);

  const [openModalExcludeRole, setOpenModalExcludeRole] = useState(false);
  const [excludeRole, setExcludeRole] = useState({});
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });
  const [departaments, setDepartaments] = useState([]);
  const [availableDepartaments, setAvaibleDepartaments] = useState([]);
  const { availableRoles } = useContext(GlobalsContext);

  const [deleteRoleMutation] = useMutation(DELETE_ROLE);
  const [updateRoleMutation] = useMutation(UPDATE_ROLE);
  const [createRoleMutation] = useMutation(CREATE_ROLE);
  const { loading: loadingRoles, error: errorRoles, data: dataRoles, refetch: refetchRoles } = useQuery(GET_ROLES);
  const { loading: loadingDepartments, error: errorDepartments, data: dataDepartments, refetch: refetchDepartments } = useQuery(GET_DEPARTMENTS);

  useEffect(() => {
    if (!loadingDepartments && !errorDepartments && dataDepartments && availableDepartaments.length === 0) {
      const newDepartments = dataDepartments.departament.map((d, index) => ({
        label: d.name,
        value: index,
      }));
    
      setDepartaments(dataDepartments.departament);
      setAvaibleDepartaments([...availableDepartaments, ...newDepartments]);
    }
  }, [loadingDepartments, errorDepartments, dataDepartments])

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
      refetchRoles();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    setOpenModalExcludeRole(false);
  };

  const editOrCreateRole = (method, role, data) => {
    const withInitialValue = method === "edit";


    var fields = [
      {
        key: "name",
        type: "text",
        label: "Cargo",
        placeholder: "Qual será o nome do cargo?",
        validator: validators.antdRequired,
        initialValue: withInitialValue ? role.name : undefined,
      },
      {
        key: "access",
        type: "select",
        label: "Permissão",
        placeholder: "Qual será a permissão do cargo?",
        validator: validators.antdRequired,
        initialValue: withInitialValue ? role.access : undefined,

        options: availableRoles,
      },
      {
        key: "departament",
        type: "select",
        label: "Departamento",
        placeholder: "A qual departamente o cargo está associado?",
        validator: validators.antdRequired,
        initialValue: withInitialValue ? data.departamentById.name : undefined,

        options: availableDepartaments,
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
    const { Cargo, Permissão, Departamento } = updatedRole;
    let departamentData;
    if (isNaN(Departamento)) {
      departamentData = departaments.find(v => v.name === Departamento);
    } else {
      departamentData = departaments.find(v => v.name === availableDepartaments[Departamento].label);
    }
    
    const newRole = {
      access: Permissão,
      name: Cargo,
      departamentId: departamentData._id,
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
      refetchRoles();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    handleCloseEditOrCreate();
  };

  const createRole = async (role) => {
    var hide = message.loading("Criando");
    const { Cargo, Permissão, Departamento } = role;

    const departamentData = departaments.find(v => v.name === availableDepartaments[Departamento].label);

    const newRole = {
      access: Permissão,
      name: Cargo,
      departamentId: departamentData._id,
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
    refetchRoles();
    handleCloseEditOrCreate();
  };

  if (loadingRoles)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={loadingRoles}
        loading={loadingRoles}
      />
    );

  if (errorRoles) {
    console.log(errorRoles);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  }

  if (dataRoles) {
    const { roles } = dataRoles;

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
              <th className="roleColumn"></th>
              <th className="roleColumn">Departamento</th>
              <th className="roleColumn"></th>
            </tr>
          </thead>
          <tbody>
            {roles.length > 0 ? (
              roles.map((role) => (
                <RoleRow
                  key={role._id}
                  role={role}
                  onEdit={editOrCreateRole}
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
