import React from "react";
import { ContainerInput, TextAreaMessage } from "./styles";

const MessageInput = ({ title, ...rest }) => {
  return (
    <ContainerInput>
      <h3>{title}</h3>
      <TextAreaMessage {...rest} />
    </ContainerInput>
  );
};

export default MessageInput;
