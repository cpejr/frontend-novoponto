import { useMutation } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";

import { Login, GetSessionData, UpdateSelf } from "../../graphql/Member";

export const SessionContext = createContext();

function updateAccessToken(accessToken) {
  if (accessToken) localStorage.setItem("accessToken", accessToken);
  else localStorage.removeItem("accessToken");
}

const SessionContextProvider = (props) => {
  const [storage, setStorage] = useState({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const [getSessionData] = useMutation(GetSessionData, {
    update(_, { data }) {
      const { accessToken, member } = data.getSessionData;

      if (accessToken) updateAccessToken(accessToken);

      setStorage({
        loading: false,
        error: undefined,
        data: { ...storage.data, member },
      });
    },
    onError,
  });

  // Login
  const [_login] = useMutation(Login, {
    update(_, { data }) {
      console.log(data);
      updateAccessToken(data.login.accessToken);

      setStorage({
        loading: false,
        error: undefined,
        data: { ...data.login },
      });
    },
    onError,
  });

  function login(data) {
    setStorage({ ...storage, loading: true });
    return _login({ variables: { data } });
  }

  // UpdateSelf
  const [_updateSelf] = useMutation(UpdateSelf, {
    update(_, { data }) {
      updateAccessToken(data.updateSelf.accessToken);
      setStorage({
        ...storage,
        data: { ...data.updateSelf },
      });
    },
    onError,
  });

  function updateSelf(fields) {
    return _updateSelf({ variables: { data: fields } });
  }

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setStorage({ ...storage, loading: true });
      getSessionData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function logout() {
    updateAccessToken();
    setStorage({ ...storage, data: undefined });
  }

  function onError(error) {
    console.log(error);
    setStorage({ loading: false, error, data: undefined });
  }

  return (
    <SessionContext.Provider
      value={{
        loading: storage.loading,
        error: storage.error,
        data: storage.data,
        login,
        logout,
        updateSelf,
        getSessionData,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
