import React, { useContext } from 'react';
import { HourChangesComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import LoggedMembersRow from '../../components/molecules/LoggedMembersRow';

const HourChanges = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <HourChangesComponent theme={themeColors}>
            <h1>HourChanges</h1>
        </HourChangesComponent>
    );
}

export default HourChanges;