import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const InputGroup = styled.div`
  & + & {
    margin-top: 16px;
  }
`;

export { FormContainer, InputGroup };
