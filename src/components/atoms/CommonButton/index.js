import React from "react";
import CommonButtonContainer from "./styles";

const CommonButton = ({
  buttonLabel,
  buttonColor,
  buttonColorHover,
  buttonWidth,
  handleClick,
  icon,
}) => {
  return (
    <CommonButtonContainer
      color={buttonColor}
      colorHover={buttonColorHover}
      width={buttonWidth}
      onClick={handleClick}
    >
      {icon && <span>{icon}</span>}
      {buttonLabel}
    </CommonButtonContainer>
  );
};

export default CommonButton;
