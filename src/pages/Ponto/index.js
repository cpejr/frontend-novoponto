import React, { useContext } from "react";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { Carousel } from "react-responsive-carousel";

import defaultNews from "../../assets/defaultNews.svg";

import Sessions from "./Sessions";

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <PontoComponent theme={themeColors}>
      <div className="fullContentPagePoint">
        <div className="newsSection">
          <Carousel infiniteLoop showStatus={false}>
            <div className="newsWrapper">
              <div className="news">
                <img src={defaultNews} alt="Confira as novidades" />
              </div>
              <div className="news">
                <img src={defaultNews} alt="Confira as novidades" />
              </div>
            </div>
            <div className="newsWrapper">
              <div className="news">
                <img src={defaultNews} alt="Confira as novidades" />
              </div>
              <div className="news">
                <img src={defaultNews} alt="Confira as novidades" />
              </div>
            </div>
          </Carousel>
        </div>
        <Sessions />
      </div>
    </PontoComponent>
  );
};

export default Ponto;
