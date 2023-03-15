import React from "react";
import { CheckOutlined, SaveOutlined } from "@ant-design/icons";

import { CommonButton } from "../../atoms";

const SaveButton = ({
  saved = false,
  children,
  buttonLabel,
  icon,
  ...props
}) => {
  const color = saved ? "#1D1D1D" : "#543471";
  const _icon = saved ? (
    <CheckOutlined style={{ color: "#543471" }} />
  ) : (
    <SaveOutlined />
  );

  return (
    <CommonButton
      width={"32px"}
      color={color}
      icon={_icon}
      {...props}
      disabled={saved}
    />
  );
};

export default SaveButton;
