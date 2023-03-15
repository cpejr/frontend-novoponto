import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import watermarkImg from '../../assets/watermark.png';
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import logo from '../../assets/logo.png';
import logoLogin from '../../assets/logoLogin.png';
import LoginButton from "./login"


const Login = () => {
    const { data } = useContext(SessionContext);
    const history = useHistory();

    return (
        <LoginComponent>
            {!data ? (<>
                <img className="watermark" src={watermarkImg}></img>
                <OutlinedBoxContainer className="loginBox">
                    <img className="logo" src={logoLogin}></img>
                    <LoginButton />
                    <a className="text" href="http://cpejr.com.br">Ficou curioso? Saiba mais</a>
                </OutlinedBoxContainer>
            </>
            ) : (
                history.push("/ponto")
            )}
        </LoginComponent>
    );
}

export default Login;
