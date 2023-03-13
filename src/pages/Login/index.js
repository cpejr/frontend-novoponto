import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import watermarkImg from '../../assets/watermark.png';
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import logoEstat from '../../assets/logoEstat.png';
import LoginButton from "./login"


const Login = () => {
    const { data } = useContext(SessionContext);
    const history = useHistory();

    return (
        <LoginComponent>
            {!data ? (<>
                <OutlinedBoxContainer className="loginBox">
                    <img className="logo" src={logoEstat}></img>
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
