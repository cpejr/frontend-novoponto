import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { GetColorName } from "hex-color-to-color-name";

const AverageHoursRow = ({ departament, onEdit, onDelete, ...props }) => {
	return (
		<tr {...props}>
			<td className="departamentColumn">{departament.name}</td>
			<td className="departamentColumn">{GetColorName(departament.color)}</td>
			<td className="departamentColumn">{departament.segment}</td>
		</tr>
		
	);
};

export default AverageHoursRow;