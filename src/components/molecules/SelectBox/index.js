import React from "react";
import { CommonSelectBox } from "../../atoms";

const SelectBox = ({ options = [], placeholder, ...props }) => {

  const optionsList = options.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  optionsList.push({value:"",label:""})
  return (
    <CommonSelectBox
      optionsList={optionsList}
      defaultValue={placeholder}
      {...props}
    />
  );
};

export default SelectBox;
