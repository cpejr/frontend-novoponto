import styled from "styled-components";

const LoginComponent = styled.div`
    .watermark {
        z-index: -1;
        margin-top: 80px;
        height: 90%;
        position: fixed;
        left: 30%;
    }

    .loginBox {
        background: #1F1F1F;
        border: 2px solid #9A9A9C;
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
        width: 25%;
        left: 50%;
        top: 18%;
        transform: translateX(-50%);

        @media(max-width: 350px){
            width: 90%;
        }
    }

    .loginButton {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 65%;
    }

    .text {
        font-size: 11px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 75%;
        text-decoration-line: underline;
        color: #9A9A9C;
    }`;

export { LoginComponent };