import React from "react";
import DefaultLabelContainer from "./styles";

const DefaultLabel = ({
  labelText,
  labelColor = "#FFFFFF",
  labelWidth = "auto",
  labelMargin = "0",
  className,
}) => {
  return (
    <DefaultLabelContainer
      className={className}
      color={labelColor}
      width={labelWidth}
      margin={labelMargin}
    >
      {labelText}
    </DefaultLabelContainer>
  );
};

export default DefaultLabel;
