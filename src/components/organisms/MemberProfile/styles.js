import styled from "styled-components";

const MemberProfileContainer = styled.div`
  width: 100%;
  .quote {
    display: flex;
    flex-direction: column;
    position: relative;
    height: auto;
    margin-bottom: 20px;
  }

  .custom_margin {
    gap: 62%;
  }

  .quote textarea {
    width: 80%;
    border-radius: 5px;
    max-width: 100%;
    box-sizing: border-box;
  }

  .quote button {
    position: absolute;
    right: 22%;
    bottom: 2%;
  }

  .message {
    display: flex;
    flex-direction: column;
    position: relative;
    height: 195px;
    margin: 10px 0;
    width: 70%;
  }

  .messageBox {
    background-color: #1d1d1d;
    width: 100%;
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
    width: 100%;
  }

  .message button {
    position: absolute;
    right: 8px;
    bottom: 8px;
  }

  .titulo1 {
    margin-left: 5.5%;
    margin-top: 3%;
    display: flex;
    margin-left: 7.5%;
  }

  .imagemNomeCargo {
    display: flex;
    flex-direction: row;
    gap: 5%;

    @media (max-width: 340px) {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
  }

  .botaoLogOut {
    width: 95%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .messageAndFrase {
    margin-left: 7.5%;
  }

  @media (max-width: 800px) {
    .messageAndFrase {
      flex-direction: column;
      gap: 20px;
    }

    .message,
    .quote {
      width: 100%;
    }

    .quote textarea,
    .message textarea {
      max-width: 100%;
    }

    .messageBox {
      width: 100%;
    }
  }

  @media (max-width: 670px) {
    .botaoLogOut {
      flex-direction: column;
      gap: 20px;
      align-items: center;
    }

    .imagemNomeCargo {
      display: flex;
    }
  }
  .non-resizable-textarea {
    resize: none;
  }

  .BotaoInserirHoras{
    padding: 10px 0px;
  }
`;

export { MemberProfileContainer };

