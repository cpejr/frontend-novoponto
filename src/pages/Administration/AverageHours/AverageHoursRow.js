import React, { useEffect, useState } from "react";
import { GetColorName } from "hex-color-to-color-name";
import AverageHours from ".";
import moment from "moment";
import HourDisplayer from "../../../components/atoms/HourDisplayer";

const AverageHoursRow = ({ averageHour, ...props }) => {
  const [durationTime, setDurationTime] = useState();

  function formatHour(duration) {
    const hourFormatted = Math.trunc(moment.duration(duration).asHours())
      .toString()
      .padStart(2, "0");
    const minuteFormatted = moment
      .duration(duration)
      .minutes()
      .toString()
      .padStart(2, "0");
    return hourFormatted + ":" + minuteFormatted;
  }

  useEffect(() => {
    setDurationTime(formatHour(averageHour.duration));
  }, []);

  console.log(averageHour.duration, averageHour.name);
  return (
    <tr {...props}>
      <td className="avgHoursColumn">{averageHour.name}</td>
      <td className="avgHoursColumn">
        <HourDisplayer
          hour={durationTime}
          hourColor="#23762C"
          dateOrTime="time"
        />
      </td>
    </tr>
  );
};

export default AverageHoursRow;

