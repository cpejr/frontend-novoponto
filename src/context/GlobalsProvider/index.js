import { useQuery } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";

import { Members } from "../../graphql/Member";

export const GlobalsContext = createContext();

const GlobalsContextProvider = (props) => {
  const {
    loading: membersLoading,
    error: membersError,
    data: membersData,
    refetch: refetchMembers,
  } = useQuery(Members);

  const [menuColapse, setMenuColapse] = useState(false);

  useEffect(() => {
    // Favor manter somente 2 iguais
    // eslint-disable-next-line eqeqeq
    const toggle = localStorage.getItem("menuColapse") == "true";

    if (toggle) setMenuColapse(toggle);
  }, []);

  function toggleMenu() {
    localStorage.setItem("menuColapse", !menuColapse);

    setMenuColapse(!menuColapse);
  }

  return (
    <GlobalsContext.Provider
      value={{
        membersLoading,
        membersError,
        membersData,
        refetchMembers,
        toggleMenu,
        menuColapse,
      }}
    >
      {props.children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsContextProvider;
