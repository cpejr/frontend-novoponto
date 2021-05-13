import React from "react";
import HourDisplayerContainer from "./styles";
import moment from "moment";

/**
 * Componente para exibir tempo
 */

const HourDisplayer = ({
  text,
  date,
  hourColor,
  ...props
}) => {
  if (text || date) {
    return (
      <HourDisplayerContainer color={hourColor} {...props}>
        {date!=="" && moment(date).format("HH:mm")}
        {text}
      </HourDisplayerContainer>
    );
  }
  return <></>;
};

export default HourDisplayer;
