import React, { useContext } from "react";
import { CommonSelectBox } from "../../atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const RolesSelectBox = ({ ...props }) => {
  const optionsList = props?.roles?.map((role) => ({
    value: role._id,
    label: role.name,
  }));

  return (
    <CommonSelectBox
      optionsList={optionsList}
      defaultValue={"Escolha um cargo"}
      {...props}
    />
  );
};

export default RolesSelectBox;
