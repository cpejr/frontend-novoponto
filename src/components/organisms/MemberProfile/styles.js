import styled from "styled-components";

const MemberProfileContainer = styled.div`
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

  .message {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .messageBox {
    background-color: #1d1d1d;
    width: 100%;
    min-height: 80px;
    border-radius: 2px;
    padding: 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    border-radius: 2px;
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
`;

export { MemberProfileContainer };
