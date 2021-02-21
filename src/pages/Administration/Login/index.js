import React, { useContext } from 'react';
import { AdministrationLoginComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

const AdministrationLogin = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <AdministrationLoginComponent theme={themeColors}>
            <h1>AdministrationLogin</h1>
        </AdministrationLoginComponent>
    );
}

export default AdministrationLogin;