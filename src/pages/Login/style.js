import styled from "styled-components";

const LoginComponent = styled.div`
  .watermark {
    z-index: -1;
    height: 100vh;
    position: fixed;
    left: 50%;
    opacity: 0.05;
  }
  .loginBox {
    background: #0D0C0C;
    border: 2px solid #166D63;
    border-radius: 10px;
    width: 480px;
    height: 450px;
    position: fixed;
    left: 50vw;
    top: 50vh;
    transform: translate(-50%, -50%);
    @media (max-width: 600px) {
      width: 80%;
    }
    .logo {
      position: absolute;
      width: 160px;
      left: 50%;
      top: 8%;
      transform: translateX(-50%);
      @media (max-width: 350px) {
        width: 70%;
      }
    }
    .loginButton {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 60%;
    }
    .text {
      font-size: 11px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 70%;
      text-decoration-line: underline;
      color: #9fbfb9;
    }
  }
`;

export { LoginComponent };
