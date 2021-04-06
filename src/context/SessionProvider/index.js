import { gql, useMutation } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const LOGIN = gql`
  mutation Login($tokenId: ID!) {
    login(tokenId: $tokenId) {
      accessToken
      member {
        _id
        name
        status
        message
        imageLink
        responsible {
          _id
          name
        }
        role {
          name
          access
        }
      }
    }
  }
`;

const GET_SESSION_DATA = gql`
  mutation GetSessionData {
    getSessionData {
      _id
      name
      status
      message
      imageLink
      responsible {
        _id
        name
      }
      role {
        name
        access
      }
    }
  }
`;

const SessionContextProvider = (props) => {
  const [storage, setStorage] = useState({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const [_login] = useMutation(LOGIN, {
    update(_, { data }) {
      localStorage.setItem("accessToken", data.login.accessToken);

      setStorage({
        loading: false,
        error: undefined,
        data: { ...data.login },
      });
    },
    onError(error) {
      console.log(error);
      setStorage({ loading: false, error, data: undefined });
    },
  });

  const [getSessionData] = useMutation(GET_SESSION_DATA, {
    update(_, { data }) {
      setStorage({
        loading: false,
        error: undefined,
        data: { ...storage.data, member: data.getSessionData },
      });
    },
    onError(error) {
      console.log(error);
      setStorage({ loading: false, error, data: undefined });
    },
  });

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setStorage({ ...storage, loading: true });
      getSessionData();
    }
  }, []);

  function logOut() {
    localStorage.removeItem("accessToken");
    setStorage({ ...storage, data: undefined });
  }

  function login(tokenId) {
    setStorage({ ...storage, loading: true });
    return _login({ variables: { tokenId } });
  }

  return (
    <SessionContext.Provider
      value={{
        loading: storage.loading,
        error: storage.error,
        data: storage.data,
        login,
        logOut,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;