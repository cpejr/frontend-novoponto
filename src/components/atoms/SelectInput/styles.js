import styled from "styled-components";

const InputContainer = styled.div`
  background-color: #1d1d1d;
  width: 230px;
  height: 32px;
  border-radius: 2px;

  border: ${(props) => (props.error ? "0.7px solid red" : "none")};

  input {
    width: 100%;
    background-color: #1d1d1d;
    border: none;
    outline: none;
    padding: 3px 8px;
    font-size: 14px;
    line-height: 17px;
    color: #fff;
  }

`;

const ErrorMessage = styled.span`
  color: red;
`;

export { InputContainer, ErrorMessage };
