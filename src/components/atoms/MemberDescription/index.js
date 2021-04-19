import React from "react";
import MemberDescriptionContainer from "./styles";

const MemberDescription = ({ description }) => {
  if (description) {
    return (
      <MemberDescriptionContainer>- "{description}"</MemberDescriptionContainer>
    );
  } else {
    return <MemberDescriptionContainer />;
  }
};

export default MemberDescription;
