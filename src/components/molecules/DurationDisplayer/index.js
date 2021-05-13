import React, { useEffect, useState } from "react";
import HourDisplayer from '../../atoms/HourDisplayer';
import moment from "moment";

const DurationDisplayer = ({
  startTime,
  color
}) => {

  const [durationTime, setDurationTime] = useState();

  function handleHourAndMinuteSide(date){

    const resultDate = Date.now() - new Date(date);
    const hourFormatted = Math.trunc(moment.duration(resultDate).asHours()).toString().padStart(2, '0'); 
    const minuteFormatted = moment.duration(resultDate).minutes().toString().padStart(2, '0'); 
    const hourFullFormatted = hourFormatted + ":" + minuteFormatted;

    return hourFullFormatted;
  }

  useEffect(() => {
    setDurationTime(handleHourAndMinuteSide(startTime));
    
    let timer = setInterval(() => {
      const nextTime = handleHourAndMinuteSide(startTime);

      if(nextTime !== durationTime){
        setDurationTime(nextTime);
      }
    }, 5000);

    return () => {
      clearInterval(timer);
    }
  }, []);
  
  return (
      <HourDisplayer 
        text={durationTime}
        hourColor={color}
      />
  );
};

export default DurationDisplayer;
