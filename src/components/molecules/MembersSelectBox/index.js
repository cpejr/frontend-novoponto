import React, { useContext } from "react";
import { CommonSelectBox } from "../../atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const MembersSelectBox = ({ ...props }) => {
  const { membersData } = useContext(GlobalsContext);

  const optionsList = membersData?.members?.map((member) => ({
    value: member._id,
    label: member.name,
  }));

  return (
    <CommonSelectBox
      optionsList={optionsList}
      defaultValue={"Escolha um membro"}
      {...props}
    />
  );
};

export default MembersSelectBox;
