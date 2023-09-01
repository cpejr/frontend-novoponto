import React, { useContext } from "react";

import { FooterDiv, PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import Sessions from "./Sessions";
import NewsCarousel from "../../components/molecules/NewsCarousel";

import Footer from "../../components/molecules/Footer";

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <PontoComponent theme={themeColors} className="m-0 mt-lg-3 m-lg-5">
      <NewsCarousel />
      <Sessions />
      <FooterDiv>
        <Footer />
      </FooterDiv>
    </PontoComponent>
  );
};

export default Ponto;
