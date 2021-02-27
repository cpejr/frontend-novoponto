import React from 'react';
import CommonButtonContainer from './styles';

const CommonButton =
({buttonLabel, buttonColor, buttonColorHover, buttonWidth, handleClick}) => {
    return (
        <CommonButtonContainer color={buttonColor} colorHover={buttonColorHover} width={buttonWidth} onClick={handleClick}>
            {buttonLabel}
        </CommonButtonContainer>
    );
}

export default CommonButton
;