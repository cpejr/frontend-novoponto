import React from "react";
import DefaultLabelContainer from "./styles";

const DefaultLabel = ({
  labelText,
  labelColor = "#00a6c5",
  labelWidth = "auto",
}) => {
  return (
    <DefaultLabelContainer color={labelColor} width={labelWidth}>
      {labelText}
    </DefaultLabelContainer>
  );
};

export default DefaultLabel;
