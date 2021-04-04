import React from "react";
import LogoutPointButtonContainer from "./styles";

import logoutPointIcon from "../../../assets/logoutPointIcon.svg";

const LogoutPointButton = ({ ...props }) => {
  return (
    <LogoutPointButtonContainer color="#1D1D1D" {...props}>
      <img src={logoutPointIcon} alt="Deslogar" />
    </LogoutPointButtonContainer>
  );
};

export default LogoutPointButton;
