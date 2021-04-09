import React, { useContext, useState, useEffect } from "react";
import { CommonButton, TextArea, OutlinedBox, DefaultLabel } from "../../atoms";
import { ThemeContext } from "../../../context/ThemeProvider";

import {MemberDataADMContainer } from './styles'

const MemberDataADM = ({
  name,
  email,
  responsable,
  role,
  initMessage,
  callback,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const [message, setMessage] = useState();

	useEffect(()=>{
		initMessage ? setMessage(initMessage) : setMessage("");
	}, [initMessage])

  return (
    <MemberDataADMContainer>
      <h1>Dados do Membro</h1>
      <OutlinedBox>
        <p>Nome: {name}</p>
        <p>Assessor: {responsable}</p>
        <p>Mensagem do acompanhamento:</p>
        <div className="roleSquare">
          <DefaultLabel
            labelText={role}
            labelColor="#FFD100"
          />
        </div>
        <TextArea value={message} onChange={(e) => setMessage(e.target.value)} />
        <div className="buttonContainer">
          <CommonButton
            buttonLabel="Salvar"
            color={themeColors.green}
            width="100px"
            onClick={() => callback(message)}
          />
        </div>
      </OutlinedBox>
    </MemberDataADMContainer>
  );
};

export default MemberDataADM;
