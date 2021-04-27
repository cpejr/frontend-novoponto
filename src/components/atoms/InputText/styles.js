import styled from "styled-components";

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;

  input {
    border: ${(props) => (props.error ? "0.7px solid red" : "none")};
  }

  img {
    margin-right: 8px;
  }
`;

export { InputTextContainer };
