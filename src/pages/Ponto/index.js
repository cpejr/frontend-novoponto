import React, { useContext, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { UpdateLastAccess } from "../../graphql/Member";
import { PontoComponent } from "./styles";
import { ThemeContext } from "../../context/ThemeProvider";
import { SessionContext } from "../../context/SessionProvider";
import Sessions from "./Sessions";
import NewsCarousel from "../../components/molecules/NewsCarousel";

const Ponto = () => {
  const { data } = useContext(SessionContext);

  //Atualiza a data de acesso do player ao logar o ponto

  const [_updateLastAccess] = useMutation(UpdateLastAccess);
  async function loadLastAccess(memberId) {
    memberId = data?.member?._id;
    await _updateLastAccess({
      variables: { memberId },
    });
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
