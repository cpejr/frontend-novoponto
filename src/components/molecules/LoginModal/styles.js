import styled from "styled-components";

const ModalContainer = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalContentSection = styled.div`
  width: 100%;
`;

const ModalButtonSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const RequiredDot = styled.p`
  padding: 0;
  margin: 0;
  color: red;
  display: inline;
`;

export { ModalContainer, ModalContentSection, ModalButtonSection, RequiredDot };

