import React from "react";
import MemberRecognitionContainer from "./styles";

import Consultor from "../../../assets/Recognitions/Consultor.svg";


const MemberRecognition = ({ src = Consultor, ...props }) => {
    let _src = src; 
    return (<MemberRecognitionContainer><img src={Consultor}/></MemberRecognitionContainer>);
  };

export default MemberRecognition;