import React from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LoginComponent } from "./style";
import { SessionContext } from "../../context/SessionProvider";
import watermarkMult from '../../assets/watermarkMult.png';
import OutlinedBoxContainer from "../../components/atoms/OutlinedBox";
import logoCPE from '../../assets/logoCPE.png';
import logoMult from '../../assets/logoMult.png';
import LoginButton from "./login"


const Login = () => {
    const { data } = useContext(SessionContext);
    const history = useHistory();

    return (
        <LoginComponent>
            {!data ? (<>
                <img className="watermark" src={watermarkMult}></img>
                <OutlinedBoxContainer className="loginBox">
                    <img className="logo" src={logoMult}></img>
                    <LoginButton />
                    <a className="text" href="https://consultoriamult.com.br/">Ficou curioso? Saiba mais</a>
                </OutlinedBoxContainer>
            </>
            ) : (
                history.push("/ponto")
            )}
        </LoginComponent>
    );
}

export default Login;
