import styled from "styled-components";

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  input {
    border: ${(props) => props.error && "0.7px solid red"};
    max-width: 500px;
  }

  img {
    margin-right: 8px;
  }
`;

export { InputTextContainer };
