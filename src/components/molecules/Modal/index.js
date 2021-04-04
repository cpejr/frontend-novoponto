import React, { useContext } from "react";
import { Modal } from "antd";
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

  console.log("entoru");
  return (
    <Modal
      title={title}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ModalContainer>
        <ModalContentSection>{content}</ModalContentSection>
        <ModalButtonSection>
          <CommonButton
            buttonLabel="Cancelar"
            color={themeColors.red}
            width="150px"
          />
          <CommonButton
            buttonLabel="Confirmar"
            color={themeColors.yellow}
            width="150px"
          />
        </ModalButtonSection>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmationModal;
