import React from "react";
import { Select } from "antd";
import { InputContainer, ErrorMessage } from "./styles";
import { DefaultText } from "..";

const SelectInput = ({
  options,
  error = false,
  errorMessage,
  defaultValue = "",
  callback,
}) => {
  const { Option } = Select;

  return (
    <>
      <InputContainer error={error}>
        <Select
          defaultValue={defaultValue}
          onChange={(value) => callback(value)}
          className="inputSelect"
        >
          <Option value="" className="inputSelect">
            Escolha um membro
          </Option>
          {options.map((option) => {
            return (
              <Option value={option} className="inputSelect">
                {option}
              </Option>
            );
          })}
        </Select>
        {error && (
          <DefaultText error={error} class="errorMessage">
            {errorMessage}
          </DefaultText>
        )}
      </InputContainer>
    </>
  );
};

export default SelectInput;
