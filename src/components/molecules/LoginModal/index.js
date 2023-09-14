import React, { useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox } from "../../atoms";

const LoginModal = ({
  content,
  title,
  loading,
  isVisible,
  handleLogin,
  handleCancel,
  tasks,
  children,
}) => {
  const modalityOptions = [
    {
      value: false, // Precisa mesmo ser um objeto? Por que não uma lista simples de strings?
      label: "Remoto",
    },
    {
      value: true,
      label: "Presencial",
    },
  ];
  const tasksOptions = tasks?.map((task) => {
    return { value: task._id, label: task.name };
  });

  const [formData, setFormData] = useState({});

  function handleChangeData(key, data) {
    setFormData({ ...formData, [key]: data });
  }

  function handleClose() {
    setFormData({});
    handleCancel();
  }

  function handleConfirm() {
    setFormData({});
    handleLogin(formData.isOnline, formData.selectedTask);
  }
  return (
    <Modal
      title={title}
      disabled={loading}
      visible={isVisible}
      onCancel={handleClose}
      bodyStyle={{ backgroundColor: "#141414" }}
      footer={[
        <Button type="secondary" onClick={handleClose}>
          Cancelar
        </Button>,

        <Button
          disabled={loading}
          style={{ color: "white" }}
          key="submit"
          type="primary"
          onClick={handleConfirm}
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
            placeholder="Presencial/Remoto"
            optionsList={modalityOptions}
            onChange={(data) => handleChangeData("isOnline", data)}
            value={formData.isOnline}
            className="mt-3 mb-3"
          />
          O que pretende fazer nesse horário?
          {children}
          <CommonSelectBox
            placeholder="Tarefa"
            optionsList={tasksOptions}
            onChange={(data) => handleChangeData("selectedTask", data)}
            value={formData.selectedTask}
            className="mt-3 mb-3"
          />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
