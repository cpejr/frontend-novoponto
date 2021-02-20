import React from 'react';
import DefaultLabelContainer from './styles';

const DefaultLabel =
({labelText, labelColor, labelWidth = '126px'}) => {
    return (
        <DefaultLabelContainer color={labelColor} width={labelWidth}>
            {labelText}
        </DefaultLabelContainer>
    );
}

export default DefaultLabel
;