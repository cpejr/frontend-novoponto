import styled from "styled-components";

const LoginComponent = styled.div`
    .watermark {
        z-index: -1;
        height: 100vh;
        position: fixed;
        left: 30%;
    }

    .loginBox {
        background: #1F1F1F;
        border: 2px solid #543471;
        border-radius: 10px;
        width: 480px;
        height: 450px;
        position: fixed;
        left: 50vw;
        top: 50vh;
        transform: translate(-50%, -50%);

        @media(max-width: 600px){
            width: 80%;
        }

    .logo {
        position: absolute;
        width: 250px;
        left: 50%;
        top: 5%;
        transform: translateX(-50%);

        @media(max-width: 350px){
            width: 90%;
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
        color: #543471;
    }`;

export { LoginComponent };