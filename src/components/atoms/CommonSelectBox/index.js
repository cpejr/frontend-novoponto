import React from "react";
import CommonSelectBoxContainer from "./styles";
import { Select } from "antd";

const { Option } = Select;

const CommonSelectBox = ({ defaultValue, optionsList = [], onChangeFunction, ...props }) => {
  return (
    <CommonSelectBoxContainer>
      <Select
        size="default"
        {...props}
        defaultValue={defaultValue}
        onChange={onChangeFunction}
        style={{ width: "100%" }}
      >
        {optionsList.map((item) => (
          <Option key={item.value}>{item.label}</Option>
        ))}
      </Select>
    </CommonSelectBoxContainer>
  );
};

export default CommonSelectBox;
