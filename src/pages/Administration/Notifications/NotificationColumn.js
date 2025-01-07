import { RestOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

const getNotificationColumns = (handleDeleteNotification) => [
  {
    title: "Mensagem",
    dataIndex: "text",
    key: "text",
    width: "15%",
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    width: "35%",
  },
  {
    title: "Link Validação",
    dataIndex: "linkValidation",
    key: "linkValidation",
    width: "40%",
  },
  {
    title: "Ações",
    key: "actions",
    width: "10%",
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
