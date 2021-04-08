import React, { useContext } from 'react';
import { MandatoryHoursComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

const MandatoryHours = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <MandatoryHoursComponent theme={themeColors}>
            <h1>MandatoryHours</h1>
        </MandatoryHoursComponent>
    );
}

export default MandatoryHours;