import styled from "styled-components";

const ProfileComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  background-color: ${(props) => props.theme.appBackground};

  .centralize {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
    flex-direction: column;
  }

  .errorText {
    margin-top: 16px;
    text-align: center;
  }

  .outlinedBox {
    max-width: 400px;
    min-height: 590px;
  }

  .message {
    background-color: #1d1d1d;
    width: 100%;
    min-height: 80px;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .quote {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 120px;
  }

  .quote textarea {
    height: 100%;
  }

  .quote button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 8px;
    margin-right: 8px;
  }
`;

export { ProfileComponent };
