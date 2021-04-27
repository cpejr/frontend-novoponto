import React, { useContext, useEffect, useState } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLES } from "../../../graphql/Roles";
import {
  UpdateMember,
  DeleteMember,
  CreateMember,
} from "../../../graphql/Member";
import { Tooltip, message, Skeleton, Table } from "antd";
import { MembersComponent, ActionsDiv } from "./styles";
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

const { Column, ColumnGroup } = Table;

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
    const withInitialValue = method === "edit";
    const memberOptions = allMembersData.members.map((member) => ({
      value: member._id,
      label: member.name,
    }));

    var fields = [
      {
        key: "name",
        type: "text",
        label: "Nome",
        rules: [validators.antdRequired()],

        placeholder: "Escreva o nome do membro",
        initialValue: withInitialValue ? member.name : undefined,
      },
      {
        key: "role",
        type: "select",
        label: "Cargo",
        placeholder: "Escolha o cargo",
        rules: [validators.antdRequired()],

        options: roles.roles.map((role) => ({
          value: role._id,
          label: role.name,
        })),

        initialValue: withInitialValue ? member?.role?._id : undefined,
      },
      {
        key: "responsible",
        type: "autoComplete",
        label: "Assessor",
        placeholder: "Escolha o membro",
        rules: [
          validators.antdRequired(),
          validators.antdInsideOptions(memberOptions),
        ],

        options: memberOptions,

        initialValue: withInitialValue
          ? {
              text: member?.responsible?.name,
              selectedOption: {
                label: member?.responsible?.name,
                value: member?.responsible?._id,
              },
            }
          : undefined,
      },
    ];

    const modalData = {
      title: "",
      fields: fields,

      open: true,
      cancel: handleCloseEditOrCreate,
    };

    if (method === "edit") {
      modalData.title = "Editar Membro";
      modalData.onSubmit = updateMember(member._id);
    } else {
      modalData.title = "Criar Membro";
      modalData.onSubmit = createMember;
    }

    setEditOrCreateModalInfo(modalData);
  };

  const createMember = async (member) => {
    var hide = message.loading("Criando...");

    const { Nome, Cargo, Assessor } = member;
    try {
      const newMember = {
        name: Nome,
        roleId: Cargo,
        responsibleId: Assessor.selectedOption.value,
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

  const updateMember = (memberId) => async (member) => {
    var hide = message.loading("Atualizando dados do membro...");

    const { Nome, Cargo, Assessor } = member;

    try {
      const newMember = {
        name: Nome,
        roleId: Cargo,
        responsibleId: Assessor.selectedOption.value,
      };

      await updateMemberMutation({
        variables: { memberId, data: newMember },
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

      <Table dataSource={filteredMembers} pagination={false}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Cargo"
          dataIndex="role"
          key="role"
          width={200}
          render={(role) => <DefaultLabel labelText={role.name} />}
        />
        <Column
          title="Assessor"
          dataIndex="responsible"
          key="responsible"
          render={(responsible) => responsible.name}
        />
        <Column
          key="action"
          width={120}
          render={(data) => (
            <ActionsDiv>
              <Tooltip
                placement="topLeft"
                title={"Editar"}
                onClick={() => editOrCreateMember("edit", data)}
              >
                <EditOutlined />
              </Tooltip>

              <Tooltip placement="topLeft" title={"Excluir"}>
                <RestOutlined onClick={() => handleOpenModal(data)} />
              </Tooltip>
            </ActionsDiv>
          )}
        />
      </Table>
      <ConfirmationModal
        title="Apagar membro"
        content={`Deseja mesmo apagar o membro "${excludeMember.name}"?`}
        isVisible={openModalExcludeMember}
        handleOk={() => handleExcludeMember(excludeMember._id)}
        handleCancel={handleCloseModal}
      />
      <FormModal {...editOrCreateModalInfo} />
    </MembersComponent>
  );
};

export default Members;
