import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import { DefaultText } from "../../components/atoms";
import logoEstat from "../../assets/logoEstat.png";
import LoginButton from "./login";

const Login = () => {
  const { data, error } = useContext(SessionContext);

  return (
    <LoginComponent>
      {!data ? (
        <>
          <OutlinedBoxContainer className="loginBox">
            <img className="logo" src={logoEstat}></img>
            <LoginButton />
            <a className="text" href="http://cpejr.com.br">
              Ficou curioso? Saiba mais
            </a>
            {error && (
              <DefaultText
                className="errorText"
                style={{ textAlign: "center" }}
              >
                {error?.graphQLErrors[0]?.message}
              </DefaultText>
            )}
          </OutlinedBoxContainer>
        </>
      ) : (
        <Redirect to="/ponto" />
      )}
    </LoginComponent>
  );
};

export default Login;
