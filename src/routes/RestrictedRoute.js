import React, { useContext } from "react";
import { Route } from "react-router";
import { SessionContext } from "../context/SessionProvider";

const RestrictedRoute = ({ minAccessLevel, ...props }) => {
  const { loading, data } = useContext(SessionContext);

  const access = data?.member?.role?.access;
  const isAuthenticated = !!access;

  if (loading) return <Route {...props} component={() => <p>Loading...</p>} />;

  if (isAuthenticated && (!minAccessLevel || access >= minAccessLevel))
    return <Route {...props} />;

  return <Route {...props} component={() => <p>Acesso restrito</p>} />;
};

export default RestrictedRoute;
