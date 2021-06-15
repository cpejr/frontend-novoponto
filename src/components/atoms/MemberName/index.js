import React from "react";
import MemberNameContainer from "./styles";

const MemberName = ({ name, ...props }) => {
  return <MemberNameContainer {...props}>{name}</MemberNameContainer>;
};

export default MemberName;
