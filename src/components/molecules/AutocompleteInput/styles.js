import styled from "styled-components";

export const AutocompleteInputContainer = styled.div`
  background-color: #1d1d1d;
  width: 230px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2px;

  input {
    border: ${(props) => (props.error ? "0.7px solid red" : "none")};
    width: 100%;
    height: 32px;
    background-color: #1d1d1d;
    outline: none;
    padding: 3px 8px;
    font-size: 14px;
    line-height: 17px;
    color: #fff;
  }

  .no-suggestions {
    color: #999;
    padding: 0.5rem;
  }

  .suggestions {
    border: 1px solid #222;
    border-top-width: 0;
    list-style: none;
    margin-top: 0;
    max-height: 143px;
    overflow-y: auto;
    padding-left: 0;
    width: 230px;

    ::-webkit-scrollbar {
      width: 15px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px grey;
      border-radius: 10px;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
      width: 5px;
      background: #fff;
      border-radius: 10px;
    }
  }

  ul {
    width: 230px;
    z-index: 10;
  }

  .suggestions li {
    padding: 0.5rem;
    background: #2F2F2F;
  }

  .suggestion-active,
  .suggestions li:hover {
    background: #505050;
    color: #fff;
    cursor: pointer;
  }

  .suggestion-active {
    color: #fff;
  }

  .suggestions li:not(:last-of-type) {
    border-bottom: 1px solid #222;
  }

  .errorMessage {
    color: red;
  }
`;
