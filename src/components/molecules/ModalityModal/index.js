import React from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";

const ModalityModal = ({
  content,
  title,
  isVisible,
  handlePresencialLogin,
  handleOnlineLogin,
  handleCancel,
  children,
}) => {
  return (
    <Modal
      title={title}
      visible={isVisible}
      onCancel={handleCancel}
      bodyStyle={{ backgroundColor: "#141414" }}
      footer={[
        <Button key="submit" type="primary" onClick={handleOnlineLogin}>
          Remoto
        </Button>,
        <Button key="submit" type="primary" onClick={handlePresencialLogin}>
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
