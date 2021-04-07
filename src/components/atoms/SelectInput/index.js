import React from "react";
import { Select } from "antd";
import { InputContainer, ErrorMessage } from "./styles";

const SelectInput = (
  { style = { width: "auto" }, options, error = false, errorMessage },
  value = "",
  callback
) => {
  const { Option } = Select;

  return (
    <>
      <InputContainer>
        <Select
          defaultValue={value}
          style={style}
          onChange={(value) => callback(value)}
        >
          <Option value="">--</Option>
          {options.map((option) => {
            return <Option value={option.value}>{option.text}</Option>;
          })}
        </Select>
      </InputContainer>
      {error && (
        <ErrorMessage class="errorMessage">{errorMessage}</ErrorMessage>
      )}
    </>
  );
};

export default SelectInput;
