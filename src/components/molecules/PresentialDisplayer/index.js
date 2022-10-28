import React from "react";
import PresentialDisplayerContainer from "./styles";

const PresentialDisplayer = ({
  isPresential,// = "Presencial", //puxar do back
  presentialColor,
  ...props
}) => {
  return (
    <PresentialDisplayerContainer color={presentialColor} {...props}>
      {isPresential ? "Presencial" : "Online"}
    </PresentialDisplayerContainer>
  );
};

export default PresentialDisplayer;