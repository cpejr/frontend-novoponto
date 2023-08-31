import React from "react";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import watermarkImg from "../../assets/watermark.png";
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import logoAmarela from "../../assets/logoAmarela.png";
import LoginButton from "./login";
import { DefaultText } from "../../components/atoms";
import Footer from "../../components/molecules/Footer";

const Login = () => {
  const { data, error } = useContext(SessionContext);

  return (
    <LoginComponent>
      {!data ? (
        <>
          <img
            className="watermark"
            src={watermarkImg}
            alt="marca d'água da empresa"
          />
          <OutlinedBoxContainer className="loginBox">
            <img className="logo" src={logoAmarela} alt="logo da empresa"></img>
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
      <div>
        <Footer />
      </div>
    </LoginComponent>
  );
};

export default Login;
