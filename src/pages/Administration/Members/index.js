import React, { useContext, useEffect, useState } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ROLES } from "../../../graphql/Roles";
import { GET_BADGES } from "../../../graphql/Badges";
import { GET_TRIBES } from "../../../graphql/Tribes";

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
import ConfirmationModal from "../../../components/molecules/ConfirmationModal";
import FormModal from "../../../components/organisms/FormModal";

import SelectBox from "../../../components/molecules/SelectBox";

import { EditOutlined, RestOutlined, TeamOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";
import phoneNumberValidator from "../../../services/phoneNumberValidator";
import diacriticCaseInsensitiveMatch from "../../../utils/diacriticCaseInsensitiveMatch";

const { Column } = Table;

const Members = () => {
  const { themeColors } = useContext(ThemeContext);
  const { membersLoading, membersError, allMembersData, refetchMembers } =
    useContext(GlobalsContext);

  const { data: roles, error: errorRoles } = useQuery(GET_ROLES);
  const { data: tribes, error: errorTribes } = useQuery(GET_TRIBES);
  const { data: badges, error: errorBadges } = useQuery(GET_BADGES);

  const [updateMemberMutation] = useMutation(UpdateMember);
  const [createMemberMutation] = useMutation(CreateMember);
  const [deleteMemberMutation] = useMutation(DeleteMember);

  const [openModalExcludeMember, setOpenModalExcludeMember] = useState(false);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [excludeMember, setExcludeMember] = useState({});
  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const [selectedTribe, setSelectedTribe] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  const combinedFilter = () => {
    let filteredMembers = [...allMembersData?.members];

    if (selectedRole) {
      filteredMembers = filteredMembers.filter(
        (member) => member.role?._id === selectedRole
      );
    }

    if (selectedTribe) {
      filteredMembers = filteredMembers.filter(
        (member) => member.tribe?._id === selectedTribe
      );
    }

    if (searchTerm) {
      filteredMembers = filteredMembers.filter(({ name }) =>
        diacriticCaseInsensitiveMatch(name, searchTerm)
      );
    }

    setFilteredMembers(filteredMembers);
  };

  useEffect(() => {
    combinedFilter();
  }, [selectedRole, selectedTribe, searchTerm, allMembersData]);

  const handleSearchMembers = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (allMembersData) setFilteredMembers([...allMembersData?.members]);
  }, [allMembersData]);

  const editOrCreateMember = (method, member) => {
    const withInitialValue = method === "edit";
    const memberOptions = allMembersData?.members.map((member) => ({
      value: member._id,
      label: member.name,
    }));
    const rolesOptions = roles.roles.map((role) => ({
      value: role._id,
      label: role.name,
    }));
    const tribesOptions = Object.assign(
      [],
      tribes?.tribes?.map((tribe) => ({
        value: tribe?._id,
        label: tribe?.name,
      }))
    );
    const badgesOptions = Object.assign(
      [],
      badges?.badges?.map((badge) => ({
        value: badge?._id,
        label: badge?.name,
      }))
    );
    if (withInitialValue) tribesOptions.push({ label: "", value: null });
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
        key: "email",
        type: "text",
        label: "Email",
        rules: [validators.antdRequired()],
        placeholder: "Escreva o email do membro",
        initialValue: withInitialValue ? member?.email : undefined,
      },
      {
        key: "tribe",
        type: "select",
        label: "Tribo",
        placeholder: "Escolha a tribo",
        options: tribesOptions,
        initialValue: withInitialValue ? member?.tribe?._id : undefined,
      },
      {
        key: "role",
        type: "select",
        label: "Cargo",
        placeholder: "Escolha o cargo",
        rules: [validators.antdRequired()],
        options: rolesOptions,
        initialValue: withInitialValue ? member?.role?._id : undefined,
      },
      {
        key: "responsible",
        type: "autoComplete",
        label: "Assessor",
        placeholder: "Escolha o membro",
        rules: [validators.antdInsideOptions(memberOptions)],
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
      {
        key: "badges",
        type: "selectMultiple",
        label: "Reconhecimento",
        placeholder: "Escolha o reconhecimento",
        options: badgesOptions,
        initialValue: withInitialValue ? member?.badgeId : undefined,
      },

      {
        key: "phoneNumber",
        type: "text",
        label: "Numero",

        rules: [
          {
            validator: (_, value) => {
              const error = phoneNumberValidator.validPhoneNumber(value);
              return error
                ? Promise.reject(new Error(error))
                : Promise.resolve();
            },
            message:
              "Número de celular inválido. Use um número com 11 a 14 dígitos.",
          },
        ],
        placeholder: "Escreva o número do membro",
        initialValue: withInitialValue ? member?.phoneNumber : undefined,
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

    const { Nome, Email, Cargo, Assessor, Tribo, Reconhecimento, Numero } =
      member;
    try {
      const newMember = {
        name: Nome,
        email: Email,
        roleId: Cargo,
        tribeId: Tribo,
        badgeId: Reconhecimento,
        phoneNumber: Numero,
        responsibleId: Assessor?.selectedOption?.value,
      };

      await createMemberMutation({ variables: { data: newMember } });
      hide();
      message.success("Criado com sucesso", 2.5);
      refetchMembers();
    } catch (err) {
      console.error("erro ao atualizar", err);
      hide();
      message.error("Houve um problema, tente novamente", 2.5);
    }
    handleCloseEditOrCreate();
  };
  const updateMember = (memberId) => async (member) => {
    var hide = message.loading("Atualizando dados do membro...");

    const { Nome, Cargo, Assessor, Tribo, Reconhecimento, Numero } = member;

    try {
      const newMember = {
        name: Nome,
        roleId: Cargo,
        tribeId: Tribo,
        badgeId: Reconhecimento,
        phoneNumber: Numero,
        responsibleId: Assessor?.selectedOption?.value || null,
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
      handleCloseEditOrCreate();
    };
  }
  
  if (membersLoading)
    return (
      <Skeleton
        paragraph={{ rows: 4 }}
        size={"large"}
        active={membersLoading}
        loading={membersLoading}
      />
    );
  else if (membersError || errorRoles || errorTribes || errorBadges) {
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
          onChange={handleSearchMembers}
        />
        <CommonButton
          buttonLabel="Adicionar novo membro"
          color={themeColors.green}
          nowrap
          width="215px"
          onClick={() => editOrCreateMember("new")}
        />
      </div>
      <div style={{ display: "flex", marginBottom: "35px" }}>
        <SelectBox
          options={tribes?.tribes || []}
          placeholder="Escolha uma tribo"
          onChange={(value) => setSelectedTribe(value || "")}
          style={{ width: "250px" }}
        />
        <SelectBox
          options={roles?.roles || []}
          placeholder="Escolha um cargo"
          onChange={(value) => setSelectedRole(value || "")}
          style={{ width: "250px" }}
        />
      </div>

      <Table
        scroll={{ x: true }}
        dataSource={filteredMembers}
        pagination={false}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column
          title="Tribo"
          dataIndex="tribe"
          key="tribe"
          width={200}
          render={(tribe) =>
            tribe && (
              <DefaultLabel labelColor={tribe.color} labelText={tribe.name} />
            )
          }
        />
        <Column
          title="Cargo"
          dataIndex="role"
          key="role"
          width={200}
          render={(role) => role && <DefaultLabel labelText={role.name} />}
        />
        <Column
          title="Assessor"
          dataIndex="responsible"
          key="responsible.name"
          render={(responsible) => responsible?.name}
        />
        <Column
          title="Reconhecimentos"
          dataIndex="Badge"
          key="Badge"
          width={200}
          render={(Badge) =>
            Badge &&
            Badge.map((badgeItem) => (
              <img
                key={badgeItem.name}
                src={badgeItem.url}
                alt={badgeItem.name}
                style={{ height: "35px" }}
              />
            ))
          }
        />
        <Column
          title="Ações"
          key="action"
          render={( member) => (
            <ActionsDiv>
              <Tooltip title="Editar Membro">
                <CommonButton
                  icon={<EditOutlined />}
                  onClick={() => editOrCreateMember("edit", member)}
                />
              </Tooltip>
              <Tooltip title="Excluir Membro">
                <CommonButton
                  icon={<RestOutlined />}
                  onClick={() => handleOpenModal(member)}
                />
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
        onClose={handleCloseModal}
      />
      <FormModal {...editOrCreateModalInfo} />
    </MembersComponent>
  );
};

export default Members;
