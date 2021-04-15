import styled from "styled-components";

const HourChangesComponent = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.appBackground};

  .outlinedBox {
    max-width: 400px;
    min-height: 580px;
  }

  h1 {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 20px;
    text-align: center;
  }

  .inputGroup + .inputGroup {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-weight: 600;
    text-align: center;
    font-size: 16px;
  }

  .alert {
    margin-top: 16px;
  }
`;

export { HourChangesComponent };
