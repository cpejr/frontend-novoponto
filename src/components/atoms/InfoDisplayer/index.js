import React from 'react';
import InfoDisplayerContainer from './styles';

const InfoDisplayer = ({info, infoColor}) => {

    return (
        <InfoDisplayerContainer color={infoColor}>
            {info}
        </InfoDisplayerContainer>
    );
}

export default InfoDisplayer;