import React from "react";
import PresentialDisplayerContainer from "./styles";

const PresentialDisplayer = ({
  isPresential/* = "Presencial"*/, //puxar do back
  presentialColor,
  ...props
}) => {
  if (isPresential) {
    return (
      <PresentialDisplayerContainer color={presentialColor} {...props}>
        {isPresential}
      </PresentialDisplayerContainer>
    );
  }
  return <></>;
};

export default PresentialDisplayer;