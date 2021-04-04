import React from "react";
import InputTextContainer from "./styles";

const InputText = ({ icon, error = false, ...props }) => {
  return (
    <InputTextContainer error={error}>
      {icon && <img src={icon} alt={props.placeholder} />}
      <input type="text" {...props} />
    </InputTextContainer>
  );
};

export default InputText;
