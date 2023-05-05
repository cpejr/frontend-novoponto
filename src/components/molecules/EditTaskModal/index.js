import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox } from "../../atoms";
import AutocompleteInput from "../AutocompleteInput";

const EditTaskModal = ({
  content,
  title,
  isVisible,
  handleEditTask,
  handleCancel,
  tasks,
  children,
}) => {
  const tasksOptions = tasks?.map((task) => {
    return { value: task._id, label: task.name };
  });
  const [selectedTask, setSelectedTask] = useState();

  function handleClose() {
    setSelectedTask();
    handleCancel();
  }

  function handleConfirm() {
    setSelectedTask();
    handleEditTask(selectedTask);
  }

  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={handleClose}
      bodyStyle={{ backgroundColor: "#141414" }}
      footer={[
        <Button type="secondary" onClick={handleClose}>
          Cancelar
        </Button>,

        <Button key="submit" type="primary" onClick={handleConfirm}>
          Confirmar
        </Button>,
      ]}
    >
      <ModalContainer>
        <ModalContentSection>
          {content}
          <CommonSelectBox
            placeholder="Nova tarefa"
            optionsList={tasksOptions}
            onChange={(selectedTask) => setSelectedTask(selectedTask)}
            value={selectedTask}
            className="mt-3 mb-3"
          />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default EditTaskModal;
