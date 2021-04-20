import React, { useContext } from "react";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import AutocompleteInput from "../../molecules/AutocompleteInput";

const AutocompleteMemberInput = ({ onMemberChange, onChange, ...props }) => {
  const { membersData } = useContext(GlobalsContext);

  function handleChange(value) {
    const member = membersData.members.find((member) => member.name === value);

    onMemberChange && onMemberChange(member);
    onChange && onChange(value);
  }

  return (
    <AutocompleteInput
      options={membersData?.members?.map((member) => member.name)}
      {...props}
      onChange={handleChange}
    />
  );
};

export default AutocompleteMemberInput;
