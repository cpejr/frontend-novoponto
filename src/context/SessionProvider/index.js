import { gql, useMutation } from "@apollo/client";
import React, { createContext, useEffect, useState } from "react";

export const SessionContext = createContext();

const MEMBER_FIELDS = gql`
  fragment MEMBER_FIELDS on Member {
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
`;

const LOGIN = gql`
  mutation Login($tokenId: ID!) {
    login(tokenId: $tokenId) {
      accessToken
      member {
        ...MEMBER_FIELDS
      }
    }
  }
  ${MEMBER_FIELDS}
`;

const GET_SESSION_DATA = gql`
  mutation GetSessionData {
    getSessionData {
      ...MEMBER_FIELDS
    }
  }
  ${MEMBER_FIELDS}
`;

const UPDATE_SESSION_DATA = gql`
  mutation updateSelf($data: MemberUpdate!) {
    updateSelf(data: $data) {
      member {
        ...MEMBER_FIELDS
      }
      accessToken
    }
  }
  ${MEMBER_FIELDS}
`;

const SessionContextProvider = (props) => {
  const [storage, setStorage] = useState({
    loading: false,
    error: undefined,
    data: undefined,
  });

  const [getSessionData] = useMutation(GET_SESSION_DATA, {
    update(_, { data }) {
      setStorage({
        loading: false,
        error: undefined,
        data: { ...storage.data, member: data.getSessionData },
      });
    },
    onError,
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
    onError,
  });

  function login(tokenId) {
    setStorage({ ...storage, loading: true });
    return _login({ variables: { tokenId } });
  }

  const [_updateSelf] = useMutation(UPDATE_SESSION_DATA, {
    update(_, { data }) {
      localStorage.setItem("accessToken", data.updateSelf.accessToken);

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

  function logOut() {
    localStorage.removeItem("accessToken");
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
        logOut,
        updateSelf,
      }}
    >
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
