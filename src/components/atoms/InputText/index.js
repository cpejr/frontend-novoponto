import React from 'react';
import InputTextContainer from './styles';

import avatar from '../../../assets/avatar.svg';

const InputText = ({icon = avatar, placeholder, handleInputText, error = false}) => {

    return (
        <InputTextContainer error={error}>
            <img src={icon} alt={placeholder} />
            <input type="text" placeholder={placeholder} onChange={(e) => handleInputText(e)}/>
        </InputTextContainer>
    );
}

export default InputText;