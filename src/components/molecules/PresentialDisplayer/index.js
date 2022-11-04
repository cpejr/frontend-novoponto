import React from "react";
import PresentialDisplayerContainer from "./styles";

const PresentialDisplayer = ({
  isPresential,
  presentialColor,
  ...props
}) => {
  return (
    <PresentialDisplayerContainer color={presentialColor} {...props}>
      {isPresential ? "Presencial" : "Remoto"}
    </PresentialDisplayerContainer>
  );
};

export default PresentialDisplayer;