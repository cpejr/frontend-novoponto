import React from "react";
import CommonButtonContainer from "./styles";

const CommonButton = ({
  buttonLabel,
  buttonColor,
  buttonWidth,
  handleClick,
  icon,
}) => {
  return (
    <CommonButtonContainer
      color={buttonColor}
      width={buttonWidth}
      onClick={handleClick}
    >
      {icon && <span>{icon}</span>}
      {buttonLabel}
    </CommonButtonContainer>
  );
};

export default CommonButton;
