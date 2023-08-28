import styled from "styled-components";

const MemberProfileContainer = styled.div`
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
    right: 8px;
    bottom: 8px;
    top: 50px;
  }

  .message {
    display: flex;
    flex-direction: column;
    position: relative;
    height: auto;
    margin: 10px 0;
    width: 80%;
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
    justify-content: start;
    margin-left: 0px;
  }

  .imagemNomeCargo {
    margin-left: 30%;
    display: flex;
    flex-direction: row;
    gap: 5%;
    justify-content: start;
    margin-left: 0px;
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

    .messageBox{
      width: 100%;
    }
  }
`;

export { MemberProfileContainer };
