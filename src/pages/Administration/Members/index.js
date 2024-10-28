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

  const handleExcludeMember = async () => {
    try {
      await deleteMemberMutation({
        variables: { id: excludeMember._id },
      });
      message.success("Membro excluído com sucesso!", 2);
      await refetchMembers();
    } catch (error) {
      message.error("Erro ao excluir membro!", 2);
      console.error(error);
    } finally {
      handleCloseModal();
    }
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

  const editOrCreateMember = (action, memberData) => {
    if (action === "edit") {
      setEditOrCreateModalInfo({
        open: true,
        member: memberData,
        mode: "edit",
      });
    } else {
      setEditOrCreateModalInfo({
        open: true,
        member: null,
        mode: "create",
      });
    }
  };

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
          render={(_, member) => (
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
        title={"Excluir Membro"}
        isOpen={openModalExcludeMember}
        onClose={handleCloseModal}
        onConfirm={handleExcludeMember}
      />
      <FormModal
        open={editOrCreateModalInfo.open}
        onClose={handleCloseEditOrCreate}
        member={editOrCreateModalInfo.member}
        mode={editOrCreateModalInfo.mode}
        refetchMembers={refetchMembers}
      />
    </MembersComponent>
  );
};

export default Members;
