import React, { useContext } from "react";

import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import Sessions from "./Sessions";
import NewsCarousel from "../../components/molecules/NewsCarousel";
import NotificationPopUp from "../../components/organisms/NotificationPopUp";
import { NotificationHome } from "./NotificationHome";

const Ponto = () => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <PontoComponent theme={themeColors} className="m-0 mt-lg-3 m-lg-5">
      <NotificationHome />
      <NewsCarousel />
      <Sessions />
    </PontoComponent>
  );
};

export default Ponto;
