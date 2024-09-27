import { RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const getNotificationColumns = (handleDeleteNotification) => [
  {
    title: "Mensagem",
    dataIndex: "text",
    key: "text",
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
  },
  {
    title: "Ações",
    key: "actions",
    render: (notification) => (
      <Tooltip title="Excluir">
        <RestOutlined
          style={{
            fontSize: "20px",
            marginLeft: "10px",
          }}
          onClick={() => handleDeleteNotification(notification._id)}
        />
      </Tooltip>
    ),
  },
];

export default getNotificationColumns;
