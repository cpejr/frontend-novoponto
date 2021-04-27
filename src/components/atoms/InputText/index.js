import { Input } from "antd";
import React, { forwardRef } from "react";
import { DefaultText } from "..";
import { InputTextContainer } from "./styles";

const InputText = forwardRef(
  ({ icon, error = false, errorMessage, ...props }, ref) => {
    const prefix = icon ? (
      <img src={icon} alt={props.placeholder} />
    ) : undefined;

    return (
      <InputTextContainer error={error}>
        <Input type="text" prefix={prefix} {...props} ref={ref} />
        {error && <DefaultText error={error}>{errorMessage}</DefaultText>}
      </InputTextContainer>
    );
  }
);

export default InputText;
