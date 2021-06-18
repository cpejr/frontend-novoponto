import React, { useContext } from "react";
import { Carousel } from "react-responsive-carousel";
import Ratio from "react-ratio/lib/Ratio";

import { NewsCarouselContainer } from "./styles";
import { NewsItem } from "../../atoms";
import { GlobalsContext } from "../../../context/GlobalsProvider";
import parse from "html-react-parser";

const NewsCarousel = ({ news, ...props }) => {
  const { width, newsData } = useContext(GlobalsContext);

  const showNews = news || newsData?.news || [];

  const newsPerSlide = width > 1400 ? 2 : 1;

  const newsWrapper = [];

  for (let i = 0; i < showNews.length; i += newsPerSlide) {
    const newsGroup = [];

    for (let j = 0; j < newsPerSlide; j++) {
      const element = showNews[j + i];
      if (element)
        newsGroup[j] = (
          <NewsItem key={`ni-${i + j}`}>{parse(element.html)}</NewsItem>
        );
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
