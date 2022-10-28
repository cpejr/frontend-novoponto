import React from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";

const ModalityModal = ({
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
      bodyStyle={{ backgroundColor: "#141414" }}
      footer={[
        <Button key="submit" type="primary" onClick={handleCancel}>
          Online
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Presencial
        </Button>,
      ]}
    >
      <ModalContainer>
        <ModalContentSection>
          {content}
          {children}
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default ModalityModal;
