import React, { useContext } from 'react';
import { PontoComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import defaultNews from '../../assets/defaultNews.svg';

import InputText from '../../components/atoms/InputText';
import CommonButton from '../../components/atoms/CommonButton';
import HourDisplayer from '../../components/atoms/HourDisplayer';
import LogoutPointButton from '../../components/atoms/LogoutPointButton';
import LoggedMembers from '../../components/molecules/LoggedMembersSection';

const fakeLoggedMembers = [
    {
        member: "Diogo",
        role: "Gerente de Produtos",
        description: "Um teste",
    },
    {
        member: "Arthur Lima",
        role: "Head de Projetos",
        description: "Opa, e ai",
    },
    {
        member: "Arthur Braga",
        role: "Head de Marketing",
        description: "NADA MAIS",
    },
    {
        member: "João Prates",
        role: "Consultor de Vendas",
        description: "VENDASSSSSSSSSSSS",
    },
]


const Ponto = () => {
    const { themeColors } = useContext(ThemeContext);

    const handleLogin = () => {
        alert("Parabéns, vc logou!")
    };

    const handleSearchMembers = (e) => {
        alert("Parabéns, vc logou!")
    };

    return (
        <PontoComponent theme={themeColors}>

            <div className="fullContentPagePoint">

                <div className="newsSection">
                    <div className="news">
                        <img src={defaultNews} alt="Confira as novidades" />
                    </div>

                    <div className="news">
                        <img src={defaultNews} alt="Confira as novidades" />
                    </div>
                </div>

                <div className="pointSection">

                    <div className="searchesSubsection">
                        <InputText placeholder="Pesquisar membros" handleInputText={handleSearchMembers} />

                        <InputText placeholder="Logar" handleInputText={handleLogin} />
                    </div>

                    <div className="subSectionLoggedMembers">
                        <table className="HeaderTablePointMembers">
                            <tr>
                                <th className="memberColumn">Membro</th>
                                <th className="startTime">Chegada</th>
                                <th className="finishTime">Tempo</th>
                                <th className="logoutButton"></th>
                            </tr>
                            <tr>
                                <td className="memberColumn">
                                    <LoggedMembers name="Diogo" role="Gerente de Produtos" description="Cansado demais para dormir" />
                                </td>
                                <td className="startTime">
                                    <HourDisplayer hour="12:09" hourColor="#31D843"/>
                                </td>
                                <td className="finishTime">
                                    <HourDisplayer hour="12:09" hourColor="#FFD100"/>
                                </td>
                                <td className="logoutButton">
                                    <LogoutPointButton />
                                </td>
                            </tr>
                        </table>
                    </div>

                    <div className="buttonLogouAllMembers">
                        <CommonButton buttonLabel="Deslogar todos os membros" buttonColor="#FFC107" buttonWidth="207px"/>
                    </div>

                </div>
            </div>

        </PontoComponent>
    );
}

export default Ponto;