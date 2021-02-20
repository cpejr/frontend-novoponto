import React from 'react';
import HourDisplayerContainer from './styles';

const HourDisplayer = ({hour, hourColor}) => {
    return (
        <HourDisplayerContainer color={hourColor}>
            {hour}
        </HourDisplayerContainer>
    );
}

export default HourDisplayer;