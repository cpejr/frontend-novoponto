import React, {useState} from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox } from "../../atoms";

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
      value: 0,
      label: "Reunião gerencial"
    },
    {
      value: 1,
      label: "Solda de placas"
    }
  ]);

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
          <CommonSelectBox optionsList={[{
            value: true, // Precisa mesmo ser um objeto? Por que não uma lista simples de strings?
            label: "Remoto"
          },
          {
            value: false,
            label: "Presencial"
          }
          ]} onChange={(isOnline) => setIsOnline(isOnline)}/>

          O que pretende fazer nesse horário?

          {children}

        <CommonSelectBox optionsList={tasks}/>
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
