import React from "react";
import { TimePicker } from "antd";

const CommonTimePicker = ({
  onSelect,
  format,
  showNow,
  placeholder,
  onChange,
  value,
  width,
  ...props
}) => {
  return (
    <TimePicker
      style={{ width: "100%" }}
      onSelect={onSelect}
      format={"HH:mm"}
      showNow={false}
      placeholder={"00:00"}
      onChange={onChange}
      value={value}
      {...props}
    />
  );
};

export default CommonTimePicker;

