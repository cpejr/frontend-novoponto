import React, { useContext } from 'react';
import { RolesComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

import CommonButton from '../../../components/atoms/CommonButton';
import DefaultLabel from '../../../components/atoms/DefaultLabel';
import { Redirect } from 'react-router';

import {
    RocketOutlined,
    EditOutlined,
    RestOutlined

  } from "@ant-design/icons";

const roles = [
    {
        roleName: 'Head de Marketing', 
        isAdm: false,
    },
    {
        roleName: 'Assessor(a) de Desenvolvimento', 
        isAdm: true,
    },
    {
        roleName: 'Consultor(a) de Tecnologia', 
        isAdm: false,
    },
]

const Roles = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <RolesComponent theme={themeColors}>
            <div className="iconWithTitle">
                <RocketOutlined className="svgIcon"/>
                <h1>Cargos</h1>
            </div>
            <div className="addNewRoleButtonArea">
                <CommonButton
                  buttonLabel="Adicionar novo cargo"
                  color={themeColors.green}
                  width="223px"
                  onClick={() => <Redirect to="/novocargo" />}
                />
            </div>

            <table className="roleTable">
                <tr>
                    <th className="roleColumn">Cargo</th>
                </tr>
                {
                    roles.length > 0 ? roles.map( item => (
                        <tr>
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
                                <EditOutlined />
                            </td>
                            <td className="garbageColumn">
                                <RestOutlined />
                            </td>
                        </tr>
                    ))
                    :
                    <tr>
                        Nenhum cargo cadastrado
                    </tr>
                }
            </table>
        </RolesComponent>
    );
}

export default Roles;