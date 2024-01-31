import React, { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UpdateLastAccess } from "../../graphql/Member";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import Sessions from "./Sessions";
import NewsCarousel from "../../components/molecules/NewsCarousel";

const Ponto = () => {
  const [_updateLastAccess] = useMutation(UpdateLastAccess);
  async function loadLastAccess(memberId) {
    memberId = "65b9cbe0834f495a1ce081ec";
    const { data } = await _updateLastAccess({
      variables: { memberId },
    });
    console.log("FOIIIIII");
    console.log(data);
  }
  useEffect(() => {
    loadLastAccess();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { themeColors } = useContext(ThemeContext);

  return (
    <PontoComponent theme={themeColors} className="m-0 mt-lg-3 m-lg-5">
      <NewsCarousel />
      <Sessions />
    </PontoComponent>
  );
};

export default Ponto;
