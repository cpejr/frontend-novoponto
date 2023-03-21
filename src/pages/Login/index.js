import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import watermarkImg from '../../assets/watermark.png';
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import logoEQLog from '../../assets/logoEQLog.png';
import LoginButton from "./login"


const Login = () => {
    const { data } = useContext(SessionContext);
    const history = useHistory();

    return (
        <LoginComponent>
            {!data ? (<>
                <OutlinedBoxContainer className="loginBox">
                    <img className="logo" src={logoEQLog}></img>
                    <LoginButton />
                    <a className="text" href="https://www.equilibrioufrgs.com/">Ficou curioso? Saiba mais</a>
                </OutlinedBoxContainer>
            </>
            ) : (
                history.push("/ponto")
            )}
        </LoginComponent>
    );
}

export default Login;
