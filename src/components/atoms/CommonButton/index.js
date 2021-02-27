import React from 'react';
import CommonButtonContainer from './styles';

const CommonButton =
({buttonLabel, buttonColor, buttonWidth, handleClick}) => {
    return (
        <CommonButtonContainer color={buttonColor} width={buttonWidth} onClick={handleClick}>
            {buttonLabel}
        </CommonButtonContainer>
    );
}

export default CommonButton
;