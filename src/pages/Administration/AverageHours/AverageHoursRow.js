import React from "react";
import { GetColorName } from "hex-color-to-color-name";
import AverageHours from ".";

const AverageHoursRow = ({ averageHour, ...props }) => {
  return (
    <tr {...props}>
      <td className="avgHoursColumn">{averageHour.name}</td>
      <td className="avgHoursColumn">{averageHour.duration}</td>
    </tr>
  );
};

export default AverageHoursRow;

