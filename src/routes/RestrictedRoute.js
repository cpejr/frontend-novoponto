import React, { useContext } from "react";
import { Route } from "react-router";
import { SessionContext } from "../context/SessionProvider";
import Lottie from "react-lottie";
import errorLottie from "../assets/lotties/error-lottie.json";
import waitLottie from "../assets/lotties/relax.json";
import { DefaultText } from "../components/atoms";

const defaultOptions = {
  loop: false,
  autoplay: true,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const RestrictedRoute = ({ minAccessLevel, ...props }) => {
  const { loading, data } = useContext(SessionContext);

  const access = data?.member?.role?.access;
  const isAuthenticated = !!access;

  if (loading)
    return (
      <Route
        {...props}
        component={() => (
          <Lottie
            options={{ ...defaultOptions, animationData: waitLottie }}
            height={200}
            width={200}
          />
        )}
      />
    );

  if (isAuthenticated && (minAccessLevel || access >= minAccessLevel))
    return <Route {...props} />;

  return (
    <Route
      {...props}
      component={() => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Lottie
            options={{ ...defaultOptions, animationData: errorLottie }}
            height={150}
            width={150}
          />
          <DefaultText error style={{ fontSize: "20px" }}>
            Acesso negado
          </DefaultText>
        </div>
      )}
    />
  );
};

export default RestrictedRoute;