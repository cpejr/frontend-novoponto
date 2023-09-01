import React from "react";
import { CheckOutlined, SaveOutlined } from "@ant-design/icons";
import { colors } from "../../../context/ThemeProvider/pallete";

import { CommonButton } from "../../atoms";

const SaveButton = ({
  saved = false,
  children,
  buttonLabel,
  icon,
  ...props
}) => {
  const color = saved ? "#1D1D1D" : colors.primaryColor;
  const _icon = saved ? (
    <CheckOutlined style={{ color: colors.primaryColor }} />
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
