import React from "react";
import MemberDescriptionContainer from "./styles";

const MemberDescription = ({ description, ...props }) => {
  if (description) {
    const text = `- "${description}"`;
    return (
      <MemberDescriptionContainer {...props} title={text}>
        {text}
      </MemberDescriptionContainer>
    );
  } else {
    return <MemberDescriptionContainer />;
  }
};

export default MemberDescription;
