import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";
import Lottie from "react-lottie";

import waitLottie from "../../assets/lotties/loading.json";
import errorLottie from "../../assets/lotties/error-girl.json";
import { DefaultText } from "../../components/atoms";
import { Members } from "../../graphql/Member";

export const GlobalsContext = createContext();

const availableRoles = ["Sem Administrador", "Administrador", "Adm Oculto"];

const GlobalsContextProvider = (props) => {
  const {
    loading: membersLoading,
    error: membersError,
    data: membersData,
    refetch: refetchMembers,
  } = useQuery(Members, { variables: { accessArray: [0, 1] } });

  const [menuColapse, setMenuColapse] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 640;
  const isMobile = width < breakpoint;

  useEffect(() => {
    // Favor manter somente 2 iguais
    // eslint-disable-next-line eqeqeq
    const toggle = localStorage.getItem("menuColapse") == "true";

    if (toggle) setMenuColapse(toggle);

    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  function toggleMenu() {
    localStorage.setItem("menuColapse", !menuColapse);

    setMenuColapse(!menuColapse);
  }

  const failedConnection =
    membersError && membersError.message === "Failed to fetch";

  return (
    <GlobalsContext.Provider
      value={{
        membersLoading,
        membersError,
        membersData,
        refetchMembers,
        toggleMenu,
        menuColapse,
        availableRoles,
        width,
        isMobile
      }}
    >
      {!membersLoading && !membersError && props.children}
      {membersLoading && <Loading />}
      {failedConnection && <Error />}
    </GlobalsContext.Provider>
  );
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Loading = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        maxWidth: 600,
        textAlign: "center",
        margin: "auto",
      }}
    >
      <Lottie
        options={{ ...defaultOptions, animationData: waitLottie }}
        height={300}
        width={300}
      />
      <DefaultText style={{ fontSize: 30, marginBottom: 8 }}>
        Aquencendo os motores...
      </DefaultText>
      <DefaultText style={{ opacity: 0.5 }}>
        (isso pode levar um tempo)
      </DefaultText>
    </div>
  );
};

const Error = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
        maxWidth: 600,
        textAlign: "center",
        margin: "auto",
      }}
    >
      <Lottie
        options={{ ...defaultOptions, animationData: errorLottie }}
        height={300}
        width={300}
      />
      <DefaultText style={{ fontSize: 30, marginTop: 16, marginBottom: 8 }}>
        Aparentemente não conseguimos conectar com o back-end
      </DefaultText>
      <DefaultText style={{ opacity: 0.5 }}>
        Acho que alguém vai ter que dar uma olhada no Heroku rsrs...
      </DefaultText>
    </div>
  );
};

export default GlobalsContextProvider;
