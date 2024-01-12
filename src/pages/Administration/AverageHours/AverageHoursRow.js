import React from "react";
import { GetColorName } from "hex-color-to-color-name";

const AverageHoursRow = ({ averageHours, ...props }) => {
  return (
    <tr {...props}>
      <td className="avgHoursColumn">{averageHours.name}</td>
      <td className="avgHoursColumn">{GetColorName(averageHours.color)}</td>
    </tr>
  );
};

export default AverageHoursRow;
