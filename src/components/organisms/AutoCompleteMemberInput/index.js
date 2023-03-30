import React, { useContext } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import AutocompleteInput from "../../molecules/AutocompleteInput";
import { message } from "antd";

const AutocompleteMemberInput = ({ onMemberChange, onChange, ...props }) => {
  const { membersData } = useContext(GlobalsContext);

  function handleChange(value) {
    const member = membersData?.members?.find(
      (member) => member._id === value?.selectedOption?.value
    );

    onMemberChange && onMemberChange(member);
    onChange && onChange(value);
  }

  return (
    <AutocompleteInput
      options={membersData?.members?.map((member) => ({
        value: member._id,
        label: member.name,
      }))}
      {...props}
      onChange={handleChange}
      placeholder="Escolha o nome do membro"
    />
  );
};

export default AutocompleteMemberInput;
