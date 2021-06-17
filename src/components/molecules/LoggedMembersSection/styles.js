import styled from "styled-components";

const LoggedMembersContainer = styled.div`
  width: 100%;
  height: 72px;

  display: flex;
  justify-content: flex-start;
  align-items: center;

  .hourControlPart {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;

    justify-content: space-evenly;
  }

  .hourDisplayer + .hourDisplayer {
    margin-left: 20px;
  }

  @media (max-width: 720px) {
    width: auto;
  }
`;

const MemberDataSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  img {
    width: 50px;
    height: 50px;
    margin-right: 15px;
  }

  .nameWithLabelSection {
    min-width: 200px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .nameSection {
      margin: 8px 0px;
      display: flex;
      align-items: center;
    }
  }

  @media (max-width: 720px) {
    width: auto;

    .nameWithLabelSection .nameSection {
      margin: 3px 0px;
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

export { LoggedMembersContainer, MemberDataSection };
