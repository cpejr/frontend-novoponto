import React, { useContext, useEffect, useState } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLES } from "../../../graphql/Roles";
import {
  UpdateMember,
  DeleteMember,
  CreateMember,
} from "../../../graphql/Member";
import { Tooltip, message, Skeleton } from "antd";
import { MembersComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import {
  CommonButton,
  DefaultLabel,
  InputText,
} from "../../../components/atoms";
import searchIcon from "../../../assets/searchIcon.svg";
import ConfirmationModal from "../../../components/molecules/Modal";
import FormModal from "../../../components/organisms/FormModal";

import { EditOutlined, RestOutlined, TeamOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";

const Members = () => {
  const { themeColors } = useContext(ThemeContext);
  const {
    membersLoading,
    membersError,
    allMembersData,
    refetchMembers,
  } = useContext(GlobalsContext);

  const { data: roles, error: errorRoles } = useQuery(GET_ROLES);

  const [updateMemberMutation] = useMutation(UpdateMember);
  const [createMemberMutation] = useMutation(CreateMember);
  const [deleteMemberMutation] = useMutation(DeleteMember);

  const [openModalExcludeMember, setOpenModalExcludeMember] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [excludeMember, setExcludeMember] = useState({});
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleOpenModal = (member) => {
    setExcludeMember(member);
    setOpenModalExcludeMember(true);
  };

  const handleCloseModal = () => {
    setOpenModalExcludeMember(false);
  };

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const editOrCreateMember = (method, member) => {
    var fields = [
      {
        key: "name",
        type: "text",
        label: "Nome",
        validator: validators.notEmpty,
        placeholder: "Escreva o nome do membro",
      },
      {
        key: "role",
        type: "select",
        label: "Cargo",
        placeholder: "Escolha o cargo",
        validator: validators.notEmptyAndInsideArray,

        options: roles.roles.map((role) => ({
          value: role._id,
          label: role.name,
        })),
      },
      {
        key: "responsible",
        type: "autoComplete",
        label: "Assessor",
        placeholder: "Escolha o membro",
        validator: validators.notEmptyAndInsideArray,

        options: allMembersData.members.map((member) => ({
          value: member._id,
          label: member.name,
        })),
      },
    ];
    method === "edit"
      ? setEditOrCreateModalInfo({
          title: "Editar Membro",
          fields: fields,
          callback: updateMember,
          open: true,
          cancel: handleCloseEditOrCreate,
          originalObject: {
            name: member.name,
            responsible: member.responsible ? member.responsible.name : "",
            role: member.role ? member.role.name : "",
            _id: member._id,
          },
        })
      : setEditOrCreateModalInfo({
          title: "Criar Membro",
          fields: fields,
          callback: createMember,
          open: true,
          cancel: handleCloseEditOrCreate,
        });
  };

  const createMember = async (member) => {
    var hide = message.loading("Criando...");
    try {
      var indexResponsible = allMembersData.members
        .map((member) => member.name)
        .indexOf(member.responsible);

      var indexRole = roles.roles.map((role) => role.name).indexOf(member.role);
      const newMember = {
        name: member.name,
        responsibleId: allMembersData.members[indexResponsible]._id,
        roleId: roles.roles[indexRole]._id,
      };
      await createMemberMutation({ variables: { data: newMember } });
      hide();
      message.success("Criado com sucesso", 2.5);
      refetchMembers();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }

    handleCloseEditOrCreate();
  };

  const updateMember = async (member) => {
    var hide = message.loading("Atualizando dados do membro...");
    try {
      var indexResponsible = allMembersData.members
        .map((member) => member.name)
        .indexOf(member.responsible);
      var indexRole = roles.roles.map((role) => role.name).indexOf(member.role);
      const newMember = {
        name: member.name,
        responsibleId: allMembersData.members[indexResponsible]._id,
        roleId: roles.roles[indexRole]._id,
      };
      await updateMemberMutation({
        variables: { memberId: member._id, data: newMember },
      });
      hide();
      message.success("Atualizado com sucesso", 2.5);
      refetchMembers();
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    handleCloseEditOrCreate();
  };

  const handleExcludeMember = async (memberId) => {
    var hide = message.loading("Excluindo membro...");
    try {
      await deleteMemberMutation({ variables: { memberId } });
      hide();
      message.success("Excluído com sucesso", 2.5);
    } catch (err) {
      console.error(err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    refetchMembers();
    setOpenModalExcludeMember(false);
  };

  const handleSearchMembers = (e) => {
    if (e.target.value !== "") {
      const filteredMembersAfterForEach = allMembersData.members.filter(
        (item) => {
          return item.name.toLowerCase().includes(e.target.value.toLowerCase());
        }
      );

      setFilteredMembers(filteredMembersAfterForEach);
    } else {
      setFilteredMembers([...allMembersData.members]);
    }
  };

  useEffect(() => {
    if (allMembersData) setFilteredMembers([...allMembersData.members]);
  }, [allMembersData]);

  if (membersLoading)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={membersLoading}
        loading={membersLoading}
      />
    );
  else if (membersError) {
    console.log(membersError);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  } else if (errorRoles) {
    console.log(errorRoles);
    message.error("Houve um problema, tente recarregar a pagina", 2.5);
    return <h1>Erro, recarregue a pagina</h1>;
  }

  return (
    <MembersComponent theme={themeColors}>
      <div className="iconWithTitle">
        <TeamOutlined className="svgIcon" />
        <h1>Membros</h1>
      </div>
      <div className="addAndSearchMemberArea">
        <InputText
          icon={searchIcon}
          placeholder="Pesquisar membros"
          onChange={(e) => handleSearchMembers(e)}
        />
        <CommonButton
          buttonLabel="Adicionar novo membro"
          color={themeColors.green}
          width="223px"
          onClick={() => editOrCreateMember("new")}
        />
      </div>

      <table className="roleTable">
        <thead>
          <tr>
            <th className="memberColumn">Nome</th>
            <th className="roleColumn">Cargo</th>
          </tr>
        </thead>
        <tbody>
          {filteredMembers?.map((item) => (
            <tr key={item._id}>
              <td className="memberColumn">{item?.name}</td>
              <td className="roleColumn">{item?.role?.name}</td>
              <td className="isAdmColumn">
                {item.isAdm && (
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
                  onClick={() => editOrCreateMember("edit", item)}
                >
                  <EditOutlined />
                </Tooltip>
              </td>
              <td className="garbageColumn">
                <Tooltip placement="topLeft" title={"Excluir"}>
                  <RestOutlined onClick={() => handleOpenModal(item)} />
                </Tooltip>
              </td>
            </tr>
          ))}
          {filteredMembers.length === 0 && (
            <tr>
              <td colSpan={2}>Nenhum cargo cadastrado</td>
            </tr>
          )}
        </tbody>
      </table>
      <ConfirmationModal
        title="Apagar membro"
        content={`Deseja mesmo apagar o membro "${excludeMember.name}"?`}
        isVisible={openModalExcludeMember}
        handleOk={() => handleExcludeMember(excludeMember._id)}
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
    </MembersComponent>
  );
};

export default Members;
