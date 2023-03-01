import React, {useState} from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox } from "../../atoms";
import AutocompleteInput from "../AutocompleteInput";

const LoginModal = ({
  content,
  title,
  isVisible,
  handlePresencialLogin,
  handleOnlineLogin,
  handleCancel,
  children,
}) => {

  let [tasks, setTasks] = useState([
    {
      value: "0",
      label: "Reunião gerencial"
    },
    {
      value: "1",
      label: "Solda de placas"
    }
  ]);

  let modalityOptions = [
    {
      value: true, // Precisa mesmo ser um objeto? Por que não uma lista simples de strings?
      label: "Remoto"
    },
    {
      value: false,
      label: "Presencial"
    }
  ]

  let [isOnline, setIsOnline] = useState(false);

  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={handleCancel}
      bodyStyle={{ backgroundColor: "#141414" }}
      footer={[
        <Button type="secondary" onClick={handleCancel}>
          Cancelar
        </Button>,
        
        <Button key="submit" type="primary" onClick={isOnline ? handleOnlineLogin : handlePresencialLogin}>
          Confirmar
        </Button>
      ]}
    >
      <ModalContainer>
        <ModalContentSection>
          {content}
          <br/>
          <CommonSelectBox 
          optionsList={modalityOptions} 
          onChange={(isOnline) => setIsOnline(isOnline)}
          className="mt-3 mb-3"/>

          O que pretende fazer nesse horário?

          {children}

        <AutocompleteInput options={tasks} placeholder="Escolha a tarefa" className="mt-3 mb-3" />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
