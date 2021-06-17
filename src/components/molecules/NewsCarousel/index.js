import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import Ratio from "react-ratio/lib/Ratio";

import { NewsCarouselContainer } from "./styles";
import defaultNews from "../../../assets/defaultNews.svg";
import { NewsItem } from "../../atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";

const news = [
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
  <img src={defaultNews} className="defaultNews" alt="Confira as novidades" />,
];

const NewsCarousel = ({ ...props }) => {
  const { width } = useContext(GlobalsContext);

  const newsPerSlide = width > 1400 ? 2 : 1;

  const newsWrapper = [];

  for (let i = 0; i < news.length; i += newsPerSlide) {
    const newsGroup = [];

    for (let j = 0; j < newsPerSlide; j++) {
      const element = news[j + i];

      if (element)
        newsGroup[j] = <NewsItem key={`ni-${i + j}`}>{element}</NewsItem>;
    }

    newsWrapper.push(
      <Ratio
        key={`n-${i}`}
        ratio={(16 * newsPerSlide) / 9}
        className="newsRadio"
        contentClassName="newsRadio"
      >
        <div className="newsRow">{newsGroup}</div>
      </Ratio>
    );
  }

  return (
    <NewsCarouselContainer {...props}>
      <Carousel infiniteLoop showStatus={false} showThumbs={false}>
        {newsWrapper}
      </Carousel>
    </NewsCarouselContainer>
  );
};

export default NewsCarousel;
