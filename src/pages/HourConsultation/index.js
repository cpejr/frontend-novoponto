import React, { useContext } from 'react';
import { HoursConsultationComponent } from './styles';
import { ThemeContext } from '../../context/ThemeProvider';

import LoggedMembersRow from '../../components/molecules/LoggedMembersRow';

const HoursConsultation = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <HoursConsultationComponent theme={themeColors}>
            <h1>HoursConsultation</h1>
        </HoursConsultationComponent>
    );
}

export default HoursConsultation;