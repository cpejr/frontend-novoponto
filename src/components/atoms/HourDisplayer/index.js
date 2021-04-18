import React from "react";
import HourDisplayerContainer from "./styles";
import moment from "moment";

const HourDisplayer = ({ text, hour, hourColor, ...props }) => {
  if (text || hour) {
    return (
      <HourDisplayerContainer color={hourColor} {...props}>
        {hour && moment(hour).format("HH:mm")}
        {text}
      </HourDisplayerContainer>
    );
  }
  return <></>;
};

export default HourDisplayer;
