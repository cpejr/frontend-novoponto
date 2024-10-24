import React, { useContext } from "react";
import { CommonSelectBox } from "../../atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const TribesSelectBox = ({ ...props }) => {
  const optionsList = props?.tribes?.map((tribe) => ({
    value: tribe._id,
    label: tribe.name,
  }));

  return (
    <CommonSelectBox
      optionsList={optionsList}
      defaultValue={"Escolha uma tribo"}
      {...props}
    />
  );
};

export default TribesSelectBox;
