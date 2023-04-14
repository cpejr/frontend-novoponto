import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import CommonButtonContainer from "./styles";

const CommonButton = ({
  children,
  buttonLabel,
  loading = false,
  icon,
  ...props
}) => {
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  return (
    <CommonButtonContainer disabled={loading} color="#454545" {...props}>
      {icon && <span>{icon}</span>}
      {(buttonLabel || children) && (
        <>
          {loading ? <Spin indicator={antIcon} /> : buttonLabel}
          {children}
        </>
      )}
    </CommonButtonContainer>
  );
};

export default CommonButton;
