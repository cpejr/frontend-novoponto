import React, { useContext } from "react";
import { Modal } from "antd";
import {
  ModalContainer,
  ModalContentSection,
  ModalButtonSection,
} from "./styles";

import { ThemeContext } from "../../../context/ThemeProvider";

import CommonButton from "../../atoms/CommonButton";

const ConfirmationModal = ({ content, title, isVisible, handleOk, handleCancel }) => {

  const { themeColors } = useContext(ThemeContext);

  console.log('entoru')
  return (
    <Modal title={title} visible={isVisible} onOk={handleOk} onCancel={handleCancel}>
      <ModalContainer>
        <ModalContentSection>{content}</ModalContentSection>
        <ModalButtonSection>
          <CommonButton
            buttonLabel="Cancelar"
            buttonColor={themeColors.red}
            buttonColorHover={themeColors.redHover}
            buttonWidth="150px"
          />
          <CommonButton
            buttonLabel="Confirmar"
            buttonColor={themeColors.yellow}
            buttonColorHover={themeColors.yellowHover}
            buttonWidth="150px"
          />
        </ModalButtonSection>
      </ModalContainer>
    </Modal>
  );
};

export default ConfirmationModal;
