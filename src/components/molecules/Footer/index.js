import React from "react";
import logoDoti from "../../../assets/logoDoti.svg";
import logoCPE from '../../../assets/logoCPE.png';
import { 
    FooterContainer, 
    FooterElements, 
    Separator,
    LogoDoti,
    LogoCPE 
} from "./styles";

const Footer = () => {

    return(
        <FooterContainer>
            <FooterElements>
                <LogoDoti>
                    <img src={logoDoti} alt="Doti"/>
                </LogoDoti>
            </FooterElements>

            <Separator />

            <FooterElements>
                <LogoCPE>
                    <img src={logoCPE} alt="Consultoria e Projétos Elétricos Júnior"/>
                </LogoCPE>
            </FooterElements>
        </FooterContainer>
    );
};

export default Footer;