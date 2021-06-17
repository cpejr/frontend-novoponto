import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";

import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import defaultNews from "../../assets/defaultNews.svg";
import Sessions from "./Sessions";
import { GlobalsContext } from "../../context/GlobalsProvider";

const news = [
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
];

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);
  const { width } = useContext(GlobalsContext);

  const newsPerSlide = width > 1400 ? 2 : 1;

  const newsWrapper = [];

  for (let i = 0; i < news.length; i += newsPerSlide) {
    const newsGroup = [];

    for (let j = 0; j < newsPerSlide; j++) {
      const element = news[j + i];

      if (element) newsGroup[j] = <div className="news">{element}</div>;
    }

    newsWrapper.push(<div className="newsWrapper">{newsGroup}</div>);
  }

  return (
    <PontoComponent theme={themeColors} className="m-0 m-lg-5">
      <div className="newsSection">
        <Carousel infiniteLoop showStatus={false}>
          {newsWrapper}
        </Carousel>
      </div>
      <Sessions />
    </PontoComponent>
  );
};

export default Ponto;
