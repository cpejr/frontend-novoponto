import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox } from "../../atoms";
import AutocompleteInput from "../AutocompleteInput";

const EditSessionModal = ({
  content,
  title,
  isVisible,
  handleLogin,
  handleCancel,
  tasks,
  children,
}) => {
  const tasksOptions = tasks.map((task) => {
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
          <br />O que pretende fazer nesse horário?
          {children}
          <CommonSelectBox
            optionsList={tasksOptions}
            onChange={(isOnline) => setSelectedTask(isOnline)}
            className="mt-3 mb-3"
          />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default EditSessionModal;
