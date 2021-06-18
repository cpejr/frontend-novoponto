import styled from "styled-components";

const NewsCarouselContainer = styled.div`
  .newsRadio {
    max-height: 342px;
  }

  .newsRow {
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: space-around;
  }

  .defaultNews {
    max-width: 226px;
    max-height: 171px;
  }

  .carousel .slide iframe {
    width: unset;
    margin: unset;
  }
`;

export { NewsCarouselContainer };
