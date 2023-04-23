import React from "react";
import MemberRecognitionContainer from "./styles";


const MemberRecognition = ({ recognition, ...props }) => {
    if(recognition.length === 0) return (<></>);

    return (<MemberRecognitionContainer><img style={{width:"100%", height:"100%"}}  src={recognition[0].url} alt={recognition[0].name} title={recognition[0].name}/></MemberRecognitionContainer>);
  };

export default MemberRecognition;