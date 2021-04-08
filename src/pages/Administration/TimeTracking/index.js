import React, { useContext } from 'react';
import { TimeTrackingComponent } from './styles';
import { ThemeContext } from '../../../context/ThemeProvider';

const TimeTracking = () => {
    const { themeColors } = useContext(ThemeContext);

    return (
        <TimeTrackingComponent theme={themeColors}>
            <h1>TimeTracking</h1>
        </TimeTrackingComponent>
    );
}

export default TimeTracking;