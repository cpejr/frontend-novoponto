import { RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";
import { TR } from "./style";

const NotificationRow = ({ notification, onDelete }) => {
  return (
    <TR>
      <td className="notificationColumn">{notification.text}</td>
      <td className="notificationColumn">{notification.link}</td>
      <td className="garbageColumn">
        <Tooltip title={"Excluir"}>
          <RestOutlined onClick={onDelete} />
        </Tooltip>
      </td>
    </TR>
  );
};

export default NotificationRow;
