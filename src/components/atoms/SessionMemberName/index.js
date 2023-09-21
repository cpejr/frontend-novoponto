import React from "react";
import SessionMembernameContainer from "./styles";

const SessionMemberName = ({ name, ...props }) => {
  return (
    <SessionMembernameContainer {...props}>{name}</SessionMembernameContainer>
  );
};

export default SessionMemberName;

