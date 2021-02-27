import React, { useEffect, useState } from 'react';
import HourDisplayerContainer from './styles';

const HourDisplayer = ({hour, hourColor, startTime = false}) => {

    const [currentTime, setCurrentTime] = useState(new Date());

    const [currentHour, setCurrentHour] = useState(currentTime.getHours());
    const [currentMinute, setCurrentMinute] = useState(currentTime.getMinutes());
    
    const [startTimeHourMember, setStartTimeHourMember] = useState(0);
    const [startTimeMinuteMember, setStartTimeMinuteMember] = useState(0);

    useEffect(() => {
        if(startTime){
            setTimeout(() => {
                if(startTimeMinuteMember < 59){
                    setStartTimeMinuteMember(startTimeMinuteMember + 1);
                }else{
                    setStartTimeMinuteMember(0);
                    setStartTimeHourMember(startTimeHourMember  + 1)
                }
            }, 1000)
        }
    }, [startTimeHourMember, startTimeMinuteMember]);

    return (
        <HourDisplayerContainer color={hourColor}>
            {!startTime ? `${currentHour}:${currentMinute}` : `${startTimeHourMember.toString().padStart(2, '0')}:${startTimeMinuteMember.toString().padStart(2, '0')}`}
        </HourDisplayerContainer>
    );
}

export default HourDisplayer;