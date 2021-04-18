import React from "react";
import HourDisplayerContainer from "./styles";
import moment from "moment";

const HourDisplayer = ({ text, hour, hourColor, dateOrTime, ...props }) => {
  if (text || hour) {
    return (
      <HourDisplayerContainer color={hourColor} {...props}>
        {dateOrTime === "date" ? moment(hour).format("HH:mm") : hour}
        {text}
      </HourDisplayerContainer>
    );
  }
  return <></>;
};

export default HourDisplayer;
