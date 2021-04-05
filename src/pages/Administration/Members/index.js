import React, { useContext, useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import { MembersComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

import CommonButton from '../../../components/atoms/CommonButton';
import InputText from '../../../components/atoms/InputText';
import searchIcon from "../../../assets/searchIcon.svg";

import DefaultLabel from '../../../components/atoms/DefaultLabel';
import ConfirmationModal from '../../../components/molecules/Modal';
import { Redirect } from 'react-router';

import {
    EditOutlined,
    RestOutlined,
    TeamOutlined
  } from "@ant-design/icons";

const members = [
    {
        memberName: 'Arthur Braga', 
        roleName: 'Head de Marketing', 
        isAdm: false,
    },
    {
        memberName: 'Ian Xavier', 
        roleName: 'Assessor(a) de Desenvolvimento', 
        isAdm: true,
    },
    {
        memberName: 'Bryan Azevedo', 
        roleName: 'Consultor(a) de Tecnologia', 
        isAdm: false,
    },
]

const Members = () => {
    const { themeColors } = useContext(ThemeContext);

    const [currentMembers, setCurrentMembers] = useState([]);

    const [openModalExcludeMember, setOpenModalExcludeMember] = useState(false);
    const [excludeMemberName, setExcludeMemberName] = useState("");


    const handleOpenModal = (memberName) => {
        setExcludeMemberName(memberName)
        setOpenModalExcludeMember(true);
    }

    const handleExcludeRole = (memberName) => {
        const newMembersArray = currentMembers.filter((item) => item.memberName !== memberName);
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

    const handleCloseModal = () => {
        setOpenModalExcludeMember(false);
    }

    useEffect(() => {
        setCurrentMembers(members);
    }, []);

    return (
        <MembersComponent theme={themeColors}>
            <div className="iconWithTitle">
                <TeamOutlined className="svgIcon"/>
                <h1>Membros</h1>
            </div>
            <div className="addAndSearchMemberArea">
                <InputText
                icon={searchIcon}
                placeholder="Pesquisar membros"
                onChange={(e) => handleSearchMembers(e)}
                />
                <CommonButton
                  buttonLabel="Adicionar novo cargo"
                  color={themeColors.green}
                  width="223px"
                  onClick={() => <Redirect to="/novomembro" />}
                />
            </div>

            <table className="roleTable">
                <tr>
                    <th className="memberColumn">Nome</th>
                    <th className="roleColumn">Cargo</th>
                </tr>
                {
                    currentMembers.length > 0 ? currentMembers.map( item => (
                        <tr>
                            <td className="memberColumn">
                                {item.memberName}
                            </td>
                            <td className="roleColumn">
                                {item.roleName}
                            </td>
                            <td className="isAdmColumn">
                                {item.isAdm && ( 
                                    <DefaultLabel 
                                    labelText="Administrador"
                                    labelColor="#FFD100" />
                                )}
                            </td>
                            <td className="editColumn">
                                <Tooltip placement="topLeft" title={"Editar"}>
                                    <EditOutlined />
                                </Tooltip>
                            </td>
                            <td className="garbageColumn">
                                <Tooltip placement="topLeft" title={"Excluir"}>
                                    <RestOutlined onClick={() => handleOpenModal(item.memberName)} />
                                </Tooltip>
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        Nenhum cargo cadastrado
                    </tr>
                }
            </table>
            <ConfirmationModal 
                title="Apagar membro"
                content={`Deseja mesmo apagar o membro "${excludeMemberName}"?`}
                isVisible={openModalExcludeMember}
                handleOk={() => handleExcludeRole(excludeMemberName)}
                handleCancel={handleCloseModal}
            />
        </MembersComponent>
    );
}

export default Members;