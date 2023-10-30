import React from "react";
import { DatePicker } from "antd";

const CommonDatePicker = ({
  locale,
  format,
  disableDate,
  value,
  onChange,
  ...props
}) => {
  return (
    <DatePicker
      style={{ width: "100%" }}
      locale={locale}
      format={format}
      disabledDate={disableDate}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};

export default CommonDatePicker;

