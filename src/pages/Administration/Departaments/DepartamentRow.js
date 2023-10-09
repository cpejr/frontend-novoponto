import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { GetColorName } from "hex-color-to-color-name";

const DepartamentRow = ({ departament, onEdit, onDelete, ...props }) => {
	return (
		<tr {...props}>
			<td className="departamentColumn">{departament.name}</td>
			<td className="departamentColumn">{GetColorName(departament.color)}</td>
			<td className="departamentColumn">{departament.segment}</td>
			<td className="editColumn">
				<Tooltip placement="topLeft" title={"Editar"} onClick={onEdit}>
					<EditOutlined />
				</Tooltip>
			</td>
			<td className="garbageColumn">
				<Tooltip placement="topLeft" title={"Excluir"}>
					<RestOutlined onClick={onDelete} />
				</Tooltip>
			</td>
		</tr>
	);
};

export default DepartamentRow;
