import React, { useContext } from "react";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";

import Sessions from "./Sessions";

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <PontoComponent theme={themeColors} className="m-0 m-lg-5">
      <Sessions />
    </PontoComponent>
  );
};

export default Ponto;
