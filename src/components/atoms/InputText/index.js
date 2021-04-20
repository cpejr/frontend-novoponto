import React, { forwardRef } from "react";
import { InputTextContainer, ErrorMessage } from "./styles";

const InputText = forwardRef(
  ({ icon, error = false, errorMessage, ...props }, ref) => {
    return (
      <>
        <InputTextContainer error={error}>
          {icon && <img src={icon} alt={props.placeholder} />}
          <input type="text" {...props} ref={ref} />
        </InputTextContainer>
        {error && (
          <ErrorMessage className="errorMessage">{errorMessage}</ErrorMessage>
        )}
      </>
    );
  }
);

export default InputText;
