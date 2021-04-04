import React from "react";
import CommonButtonContainer from "./styles";

const CommonButton = ({ children, buttonLabel, icon, ...props }) => {
  return (
    <CommonButtonContainer {...props}>
      {icon && <span>{icon}</span>}
      {buttonLabel}
    </CommonButtonContainer>
  );
};

export default CommonButton;
