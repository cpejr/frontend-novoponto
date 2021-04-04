import React from 'react';
import LogoutPointButtonContainer from './styles';

import logoutPointIcon from '../../../assets/logoutPointIcon.svg';

const LogoutPointButton =
({color = '#1D1D1D', onClick}) => {
    return (
        <LogoutPointButtonContainer color={color} onClick={onClick}>
            <img src={logoutPointIcon} alt="Deslogar" />
        </LogoutPointButtonContainer>
    );
}

export default LogoutPointButton
;