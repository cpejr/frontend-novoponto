import React from 'react';
import CommonButtonContainer from './styles';

const CommonButton =
({buttonLabel, buttonColor, buttonWidth}) => {
    return (
        <CommonButtonContainer color={buttonColor} width={buttonWidth}>
            {buttonLabel}
        </CommonButtonContainer>
    );
}

export default CommonButton
;