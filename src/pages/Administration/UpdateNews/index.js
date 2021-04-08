import React, { useContext } from 'react';
import { UpdatedNewsComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

const UpdatedNews = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <UpdatedNewsComponent theme={themeColors}>
            <h1>UpdatedNews</h1>
        </UpdatedNewsComponent>
    );
}

export default UpdatedNews;