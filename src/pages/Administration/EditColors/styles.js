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
    min-height: 400px;
  }

  .title {
    font-weight: 600;
    text-align: center;
    font-size: 16px;
  }
`;

export { ProfileComponent };