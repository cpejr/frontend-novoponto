import React from "react";
import { GetColorName } from "hex-color-to-color-name";

const AverageHoursRow = ({ departament, onEdit, onDelete, ...props }) => {
	return (
		<tr {...props}>
			<td className="avgHoursColumn">{departament.name}</td>
			<td className="avgHoursColumn">{GetColorName(departament.color)}</td>
		</tr>
	);
};

export default AverageHoursRow;