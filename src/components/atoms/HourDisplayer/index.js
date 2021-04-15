import React from 'react';
import HourDisplayerContainer from './styles';
import moment from "moment";

const HourDisplayer = ({hour, hourColor, ...props}) => {

    return (
        <HourDisplayerContainer color={hourColor} {...props}>
            {moment(hour).format("HH:mm")}
        </HourDisplayerContainer>
    );
}

export default HourDisplayer;