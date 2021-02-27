import React from 'react';
import LogoutPointButtonContainer from './styles';

import logoutPointIcon from '../../../assets/logoutPointIcon.svg';

const LogoutPointButton =
({buttonColor = '#1D1D1D', onClick}) => {
    return (
        <LogoutPointButtonContainer color={buttonColor} onClick={onClick}>
            <img src={logoutPointIcon} alt="Deslogar" />
        </LogoutPointButtonContainer>
    );
}

export default LogoutPointButton
;