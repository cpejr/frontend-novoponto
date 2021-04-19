import React from "react";
import { Modal, Button } from "antd";
import {
  ModalContainer,
  ModalContentSection,
} from "./styles";

const ConfirmationModal = ({
  content,
  title,
  isVisible,
  handleOk,
  handleCancel,
  children,
}) => {

  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Confirmar
        </Button>,
      ]}
    >
      <ModalContainer>
        <ModalContentSection>{content}{children}</ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmationModal;
