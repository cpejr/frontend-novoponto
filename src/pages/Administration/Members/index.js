import React, { useContext } from 'react';
import { MembersComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

const Members = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <MembersComponent theme={themeColors}>
            <h1>Members</h1>
        </MembersComponent>
    );
}

export default Members;