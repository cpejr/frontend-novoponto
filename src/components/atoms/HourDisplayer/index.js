import React from 'react';
import HourDisplayerContainer from './styles';
import moment from "moment";

const HourDisplayer = ({hour, hourColor, dateOrTime, ...props}) => {

    return (
        <HourDisplayerContainer color={hourColor} {...props}>
            { (dateOrTime==="date") ? moment(hour).format("HH:mm") : hour}
        </HourDisplayerContainer>
    );
}

export default HourDisplayer;