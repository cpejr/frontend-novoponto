import React from "react";
import CommonSelectBoxContainer from "./styles";
import { Select } from "antd";

const { Option } = Select;

/**
 * Muito semelhante a um select box tradicional como conhecemos.
 * Renderiza as opções que são passadas como props.
 */
const CommonSelectBox = ({ optionsList = [], ...props }) => {
  return (
    <CommonSelectBoxContainer>
      <Select size="default" style={{ width: "100%" }} {...props}>
        {
          optionsList.length === 0 ? (
            <Option key={0}>Selecione um valor</Option>
          ) : 
          optionsList.map((item) => (
            //To do: renomear item.value para item.key
            <Option key={item.value}>{item.label}</Option>
          ))}
      </Select>
    </CommonSelectBoxContainer>
  );
};

export default CommonSelectBox;
