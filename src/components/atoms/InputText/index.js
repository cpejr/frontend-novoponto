import React from 'react';
import InputTextContainer from './styles';

import avatar from '../../../assets/avatar.svg';

const InputText = ({icon = '', placeholder, handleInputText}) => {

    return (
        <InputTextContainer>
            <img src={avatar} alt={placeholder} />
            <input type="text" placeholder={placeholder} onChange={(e) => handleInputText(e)}/>
        </InputTextContainer>
    );
}

export default InputText;