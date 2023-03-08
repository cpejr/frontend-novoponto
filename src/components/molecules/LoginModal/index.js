import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox } from "../../atoms";
import AutocompleteInput from "../AutocompleteInput";

const LoginModal = ({
  content,
  title,
  isVisible,
  handleLogin,
  handleCancel,
  tasks,
  children,
}) => {
  const modalityOptions = [
    {
      value: true, // Precisa mesmo ser um objeto? Por que não uma lista simples de strings?
      label: "Remoto",
    },
    {
      value: false,
      label: "Presencial",
    },
  ];
  const tasksOptions = tasks?.map((task) => {
    return { value: task._id, label: task.name };
  });

  const [isOnline, setIsOnline] = useState(false);
  const [selectedTask, setSelectedTask] = useState();

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

        <Button
          key="submit"
          type="primary"
          onClick={() => handleLogin(isOnline, selectedTask)}
        >
          Confirmar
        </Button>,
      ]}
    >
      <ModalContainer>
        <ModalContentSection>
          {content}
          <br />
          <CommonSelectBox
            optionsList={modalityOptions}
            onChange={(isOnline) => setIsOnline(isOnline)}
            className="mt-3 mb-3"
          />
          O que pretende fazer nesse horário?
          {children}
          <CommonSelectBox
            optionsList={tasksOptions}
            onChange={(selectedTask) => setSelectedTask(selectedTask)}
            className="mt-3 mb-3"
          />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
