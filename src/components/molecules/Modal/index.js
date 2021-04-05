import React, { useContext } from "react";
import { Modal, Button } from "antd";
import {
  ModalContainer,
  ModalContentSection,
  ModalButtonSection,
} from "./styles";

import { ThemeContext } from "../../../context/ThemeProvider";

import CommonButton from "../../atoms/CommonButton";

const ConfirmationModal = ({
  content,
  title,
  isVisible,
  handleOk,
  handleCancel,
}) => {
  const { themeColors } = useContext(ThemeContext);

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
        <ModalContentSection>{content}</ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmationModal;
