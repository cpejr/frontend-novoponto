import React, { useContext } from 'react';
import { RolesComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

const Roles = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <RolesComponent theme={themeColors}>
            <h1>Roles</h1>
        </RolesComponent>
    );
}

export default Roles;