import { useQuery } from "@apollo/client";
import React, { createContext } from "react";

import { Members } from "../../graphql/Member";

export const GlobalsContext = createContext();

const GlobalsContextProvider = (props) => {
  const {
    loading: membersLoading,
    error: membersError,
    data: membersData,
    refetch: refetchMembers,
  } = useQuery(Members);

  return (
    <GlobalsContext.Provider
      value={{
        membersLoading,
        membersError,
        membersData,
        refetchMembers,
      }}
    >
      {props.children}
    </GlobalsContext.Provider>
  );
};

export default GlobalsContextProvider;
