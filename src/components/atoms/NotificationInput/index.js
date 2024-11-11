import React from "react";
import { ContainerInput, TextAreaMessage } from "./styles";

const MessageInput = ({ title, placeholder, ...rest }) => {
  return (
    <ContainerInput>
      <h3>{title}</h3>
      <TextAreaMessage placeholder={placeholder} {...rest} />
    </ContainerInput>
  );
};

export default MessageInput;
