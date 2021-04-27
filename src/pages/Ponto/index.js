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
        <div className="newsSection">
          <div className="news">
            <img src={defaultNews} alt="Confira as novidades" />
          </div>
          <div className="news">
            <img src={defaultNews} alt="Confira as novidades" />
          </div>
        </div>
        <Sessions />
      </div>
    </PontoComponent>
  );
};

export default Ponto;
