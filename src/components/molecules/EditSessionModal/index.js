import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox, TextArea } from "../../atoms";

const EditSessionModal = ({
  title,
  isVisible,
  handleEditCall,
  handleCancel,
  tasks,
  projects,
  children,
}) => {
  const tasksOptions = tasks?.map((task) => {
    return { value: task._id, label: task.name };
  });
  const [selectedTask, setSelectedTask] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [description, setDescription] = useState();

  function handleClose() {
    setSelectedTask();
    setSelectedProject();
    setDescription();
    handleCancel();
  }

  function handleConfirm() {
    setSelectedTask();
    setSelectedProject();
    setDescription();
    handleEditCall({ selectedTask, selectedProject, description });
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
          Selecione a nova tarefa
          <CommonSelectBox
            placeholder="Nova tarefa"
            optionsList={tasksOptions}
            onChange={(selectedTask) => setSelectedTask(selectedTask)}
            value={selectedTask}
            className="mt-3 mb-3"
          />
          Selecione o novo projeto
          <CommonSelectBox
            placeholder="Novo projeto"
            optionsList={projects}
            onChange={(project) => setSelectedProject(project)}
            value={selectedProject}
            className="mt-3 mb-3"
          />
          Digite a nova descrição
          <TextArea
            placeholder="Nova descrição"
            maxLength="150"
            onChange={(newDescription) =>
              setDescription(newDescription?.target.value)
            }
            value={description}
            className="mt-3 mb-3"
          />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default EditSessionModal;

