import React from 'react';
import LogoutPointButtonContainer from './styles';

import logoutPointIcon from '../../../assets/logoutPointIcon.svg';

const LogoutPointButton =
({buttonColor}) => {
    return (
        <LogoutPointButtonContainer color={buttonColor} >
            <img src={logoutPointIcon} alt="Deslogar" />
        </LogoutPointButtonContainer>
    );
}

export default LogoutPointButton
;