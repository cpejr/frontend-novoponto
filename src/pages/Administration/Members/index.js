import React, { useContext, useEffect, useState } from "react";
import { Tooltip } from "antd";
import { MembersComponent } from "./styles";
import { ThemeContext } from "../../../context/ThemeProvider";

import CommonButton from "../../../components/atoms/CommonButton";
import InputText from "../../../components/atoms/InputText";
import searchIcon from "../../../assets/searchIcon.svg";

import DefaultLabel from "../../../components/atoms/DefaultLabel";
import ConfirmationModal from "../../../components/molecules/Modal";
import FormModal from "../../../components/organisms/FormModal";

import { EditOutlined, RestOutlined, TeamOutlined } from "@ant-design/icons";

import validators from "../../../services/validators";

const members = [
  {
    memberName: "Arthur Braga",
    roleName: "Head de Marketing",
    responsableName: "Ian Xavier",
    isAdm: false,
    id: 0,
  },
  {
    memberName: "Ian Xavier",
    roleName: "Assessor(a) de Desenvolvimento",
    responsableName: "Ian Xavier",
    isAdm: true,
    id: 1,
  },
  {
    memberName: "Bryan Azevedo",
    roleName: "Consultor(a) de Tecnologia",
    responsableName: "Ian Xavier",
    isAdm: false,
    id: 2,
  },
];

const rolesConst = [
  "Head de Marketing",
  "Assessor(a) de Desenvolvimento",
  "Consultor(a) de Tecnologia",
];

const Members = () => {
  const { themeColors } = useContext(ThemeContext);

  const [currentMembers, setCurrentMembers] = useState([]);
  const [roles, setRoles] = useState([]);

  const [openModalExcludeMember, setOpenModalExcludeMember] = useState(false);
  const [excludeMemberName, setExcludeMemberName] = useState("");

  ///////////////////////////////////////////////////////////////////////
  // EDIT OR CREATE MEMBER HANDLING  //
  ///////////////////////////////////////////////////////////////////////

  const [editOrCreateModalInfo, setEditOrCreateModalInfo] = useState({
    open: false,
  });

  const handleCloseEditOrCreate = () => {
    setEditOrCreateModalInfo({ open: false });
  };

  const editOrCreateMember = (method, member) => {
    var fields = [
      {
        key: "memberName",
        type: "text",
        label: "Nome",
        validator: validators.notEmpity,
      },
      {
        key: "roleName",
        type: "autoComplete",
        label: "Cargo",
        validator: validators.notEmpityAndInsideArray,

        options:  [...roles ],
      },
      {
        key: "responsableName",
        type: "autoComplete",
        label: "Assessor",
        validator: validators.notEmpityAndInsideArray,

        options:  [...(currentMembers.map(member => member.memberName)) ],
      },
    ];
    method === "edit"
      ? setEditOrCreateModalInfo({
          title: "Editar Membro",
          fields: fields,
          callback: updateMember,
          open: true,
          cancel: handleCloseEditOrCreate,
          originalObject: member,
        })
      : setEditOrCreateModalInfo({
          title: "Criar Membro",
          fields: fields,
          callback: createMember,
          open: true,
          cancel: handleCloseEditOrCreate,
        });
  };

  const updateMember = (member) => {
    const index = members.map((mapMember) => mapMember.id).indexOf(member.id);
    members[index] = member;
    setCurrentMembers([...members]);
    handleCloseEditOrCreate();
  };

  const createMember = (member) => {
    setCurrentMembers([...members, member]);
    handleCloseEditOrCreate();
  };

  ///////////////////////////////////////////////////////////////////////
  // EDIT OR CREATE MEMBER HANDLING  //
  ///////////////////////////////////////////////////////////////////////

  const handleOpenModal = (memberName) => {
    setExcludeMemberName(memberName);
    setOpenModalExcludeMember(true);
  };
  const handleCloseModal = () => {
    setOpenModalExcludeMember(false);
  };

  const handleExcludeRole = (memberName) => {
    const newMembersArray = currentMembers.filter(
      (item) => item.memberName !== memberName
    );
    setCurrentMembers(newMembersArray);
    setOpenModalExcludeMember(false);
  };

  const handleSearchMembers = (e) => {
    if (e.target.value !== "") {
      const filteredMembersAfterForEach = currentMembers.filter((item) => {
        if (item.memberName.toLowerCase().includes(e.target.value)) {
          return item;
        }
      });
      setCurrentMembers(filteredMembersAfterForEach);
    } else {
      setCurrentMembers(members);
    }
  };

  useEffect(() => {
    setCurrentMembers(members);
    setRoles(rolesConst);
  }, []);

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
        <tr>
          <th className="memberColumn">Nome</th>
          <th className="roleColumn">Cargo</th>
        </tr>
        {currentMembers.length > 0 ? (
          currentMembers.map((item) => (
            <tr>
              <td className="memberColumn">{item.memberName}</td>
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
                  <RestOutlined
                    onClick={() => handleOpenModal(item.memberName)}
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
        title="Apagar membro"
        content={`Deseja mesmo apagar o membro "${excludeMemberName}"?`}
        isVisible={openModalExcludeMember}
        handleOk={() => handleExcludeRole(excludeMemberName)}
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
