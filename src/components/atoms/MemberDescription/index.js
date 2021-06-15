import React from "react";
import MemberDescriptionContainer from "./styles";

const MemberDescription = ({ description, ...props }) => {
  if (description) {
    return (
      <MemberDescriptionContainer {...props}>
        - "{description}"
      </MemberDescriptionContainer>
    );
  } else {
    return <MemberDescriptionContainer />;
  }
};

export default MemberDescription;
