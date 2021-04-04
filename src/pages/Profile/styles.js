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
    min-height: 580px;
  }

  .row {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-bottom: 16px;
  }

  .col-1 {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 16px;
  }

  .exitButton {
    margin-left: auto;
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
`;

export { ProfileComponent };
