import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import watermarkMult from "../../assets/watermarkMult.png";
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import logoMult from "../../assets/logoMult.png";
import LoginButton from "./login";
import { DefaultText } from "../../components/atoms";

const Login = () => {
  const { data, error } = useContext(SessionContext);

  return (
    <LoginComponent>
      {!data ? (
        <>
          <img
            className="watermark"
            src={watermarkMult}
            alt="marca d'água da empresa"
          />
          <OutlinedBoxContainer className="loginBox">
            <img className="logo" src={logoMult} alt="logo da empresa"></img>
            <LoginButton />
            <a
              className="text"
              href="http://cpejr.com.br"
              style={{ display: "block" }}
            >
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
