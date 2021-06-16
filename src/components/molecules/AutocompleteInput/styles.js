import styled from "styled-components";

const AutocompleteInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border-radius: 2px;
  flex-grow: 1;
  
  input {
    border: ${(props) => props.error && "0.7px solid red"};
  }
`;

export { AutocompleteInputContainer };
