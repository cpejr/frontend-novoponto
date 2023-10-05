import { EditOutlined, RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const BadgeRow = ({ badge, onEdit, onDelete, ...props }) => {
	return (
		<tr {...props}>
			<td className="badgeColumn"><div className="badgeName">{badge.name}</div></td>
			<td className="badgeColumn">{badge.description}</td>
      <td className="badgeColumn"><img src={badge.url} alt="Imagem do Reconhecimento" /></td>
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

export default BadgeRow;
