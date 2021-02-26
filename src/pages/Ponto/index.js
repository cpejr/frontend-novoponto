import React, { useContext, useEffect, useState } from 'react';
import { PontoComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import defaultNews from '../../assets/defaultNews.svg';
import searchIcon from '../../assets/searchIcon.svg';

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
    
    const [loggedMembers, setLoggedMembers] = useState(fakeLoggedMembers);
    const [filteredMembers, setFilteredMembers] = useState(fakeLoggedMembers);

    const handleLogin = () => {
        alert("Parabéns, vc logou!");
    };
    
    const handleSearchMembers = (e) => {
        
        if(e.target.value !== ''){
            const filteredMembersAfterForEach = loggedMembers.filter(item => {
                if(item.member.toLowerCase().includes(e.target.value)){
                    return item;
                }
            });
            console.log('deposi', filteredMembersAfterForEach)
            setFilteredMembers(filteredMembersAfterForEach);
        }else{
            setFilteredMembers(loggedMembers);
        }
    };

    useEffect(() => {
        setFilteredMembers( loggedMembers.sort(function(a, b){
            if(a.member < b.member) { return -1; }
            if(a.member > b.member) { return 1; }
            return 0;
        })
        )
    }, [loggedMembers]);
    
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
                        <InputText icon={searchIcon} placeholder="Pesquisar membros" handleInputText={(e) => handleSearchMembers(e)} />

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
                            {   
                                filteredMembers.map(item => (
                                            <tr>
                                                <td className="memberColumn">
                                                    <LoggedMembers name={item.member} role={item.role} description={item.description} />
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
                                        ))
                                }
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