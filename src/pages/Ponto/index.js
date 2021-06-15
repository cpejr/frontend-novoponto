import React, { useContext } from "react";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";

import defaultNews from "../../assets/defaultNews.svg";

import Sessions from "./Sessions";

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <PontoComponent theme={themeColors}>
      <div className="fullContentPagePoint">
        <Sessions />
      </div>
    </PontoComponent>
  );
};

export default Ponto;
