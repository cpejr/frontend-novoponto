import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { GetColorName } from "hex-color-to-color-name";

const TribeRow = ({ tribe, onEdit, onDelete, ...props }) => {
	return (
		<tr {...props}>
			<td className="tribeColumn">{tribe.name}</td>
			<td className="tribeColumn">{GetColorName(tribe.color)}</td>
			<td className="tribeColumn">{tribe.segment}</td>
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

export default TribeRow;
