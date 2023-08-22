import React, { /*&useContext, */ useState } from "react";
import { Modal, Button } from "antd";
import { ModalContainer, ModalContentSection } from "./styles";
import { CommonSelectBox, TextArea } from "../../atoms";
//import { ThemeContext } from "styled-components";
import { GET_PROJECTS } from "../../../graphql/Projects";
import { useQuery } from "@apollo/client";

const LoginModal = ({
  content,
  title,
  isVisible,
  handleLogin,
  handleCancel,
  tasks,
  children,
}) => {
  const modalityOptions = [
    {
      value: false,
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

  const { data: dataProjects, loading } = useQuery(GET_PROJECTS);
  const projectOptions =
    loading ||
    dataProjects.projects.map((project) => {
      return { value: project._id, label: project.name };
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
      visible={isVisible}
      onCancel={handleClose}
      bodyStyle={{ backgroundColor: "#141414" }}
      footer={[
        <Button type="secondary" onClick={handleClose}>
          Cancelar
        </Button>,

        <Button
          style={{ color: "white", background: "#8A6B0E" }}
          key="submit"
          // type="primary"
          onClick={handleConfirm}
        >
          Confirmar
        </Button>,
      ]}
    >
      <ModalContainer>
        <ModalContentSection>
          {content}
          <CommonSelectBox
            placeholder="Presencial/Remoto"
            optionsList={modalityOptions}
            onChange={(data) => handleChangeData("isOnline", data)}
            value={formData.isOnline}
            className="mt-3 mb-3"
          />
          O que você pretende fazer neste horário? {children}
          <CommonSelectBox
            placeholder="Tarefa"
            optionsList={tasksOptions}
            onChange={(data) => handleChangeData("selectedTask", data)}
            value={formData.selectedTask}
            className="mt-3 mb-3"
          />
          Você vai trabalhar em algum projeto?
          <CommonSelectBox
            placeholder="Projeto"
            optionsList={projectOptions}
            onChange={(data) => handleChangeData("selectedTask", data)}
            value={formData.selectedTask}
            className="mt-3 mb-3"
          />
          Deseja descrever melhor o que irá fazer?
          <TextArea
            placeholder="Descrição da atividade exercida"
            maxLength={150}
            className="mt-3 mb-3"
            //autoSize={true}
            //showCount
            //onChange={(data) => handleChangeData("description", data)}
            //value={formData.selectedTask}
          />
        </ModalContentSection>
      </ModalContainer>
    </Modal>
  );
};

export default LoginModal;
