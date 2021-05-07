import React from "react";
import CommonButtonContainer from "./styles";

/**
 * Componente criado para servir de botão comum.
 */
const CommonButton = ({ children, buttonLabel, loading, icon, ...props }) => {
  return (
    <CommonButtonContainer color="#454545" {...props}>
      {icon && <span>{icon}</span>}
      {(buttonLabel || children) && (
        <div>
          {buttonLabel}
          {children}
        </div>
      )}
    </CommonButtonContainer>
  );
};

export default CommonButton;