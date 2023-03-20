import React from "react";
import MemberRecognitionContainer from "./styles";

import Consultor from "../../../assets/Recognitions/Consultor.svg";


const MemberRecognition = ({ src = Consultor, ...props }) => {
    let _src = src; 
    return (<MemberRecognitionContainer><img style={{width:"100%", height:"100%"}}   src={props}/></MemberRecognitionContainer>);
  };

export default MemberRecognition;