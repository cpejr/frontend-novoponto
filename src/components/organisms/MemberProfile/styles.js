import styled from "styled-components";

const MemberProfileContainer = styled.div`
  .quote {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 120px;
  }

  .quote textarea {
    width: 600px;
    border-radius: 5px;
    max-width: 70%;
  }

  .quote button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 8px;
    margin-right: 8px;
  }

  .message {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 200px;
    margin-left: 5%;
  }

  .messageBox {
    background-color: #1d1d1d;
    width: 400px;
    height: 200px;
    min-height: 80px;
    border-radius: 5px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    white-space: pre-line;
  }

  .message textarea {
    min-height: 80px;
  }

  .message button {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-bottom: 8px;
    margin-right: 8px;
  }

  .messageAndFrase{
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 0;
    gap: 15%;
    margin-left: 5px;
    margin-top: 2px;
  }

  .botaoSalvar{
    margin-left: 89%;
    margin-top: 1.25%;
  }

  .titulo1{
    margin-left: 5.5%;
    margin-top: 3%;
  }

  .imagemNomeCargo{
    margin-left: 30%;
    display: flex;
    flex-direction: row;
    gap: 5%;
  }
`;

export { MemberProfileContainer };
