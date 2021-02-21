import React, { useContext } from 'react';
import { PontoComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import LoggedMembersRow from '../../components/molecules/LoggedMembersRow';

const Ponto = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <PontoComponent theme={themeColors}>
            <h1>Ponto</h1>
        </PontoComponent>
    );
}

export default Ponto;