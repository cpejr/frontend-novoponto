import React from "react";
import {InputTextContainer, ErrorMessage} from "./styles";

const InputText = ({ icon, error = false, errorMessage, ...props }) => {
  return (
    <>
      <InputTextContainer error={error}>
        {icon && <img src={icon} alt={props.placeholder} />}
        <input type="text" {...props} />
      </InputTextContainer>
      {error && <ErrorMessage className="errorMessage">{errorMessage}</ErrorMessage>}
    </>
  );
};

export default InputText;
