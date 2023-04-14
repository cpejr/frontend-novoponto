import styled from "styled-components";

const MembersComponent = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  .ant-table-content {
    overflow-x: scroll;
  }
  .iconWithTitle {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 32px;

    .svgIcon {
      font-size: 40px;
      margin-right: 8px;
    }
    h1 {
      font-size: 30px;
      font-weight: 400;
      line-height: 29px;
      color: #ffffff;
    }
  }

  .addAndSearchMemberArea {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    margin-bottom: 48px;
  }

  .editColumn,
  .garbageColumn {
    width: 10%;
    min-width: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    svg {
      font-size: 25px;
      cursor: pointer;
    }
    svg:hover {
      color: #005d9e;
    }
  }

  .garbageColumn {
    svg:hover {
      color: #c70000;
    }
  }

  @media (max-width: 720px) {
    .addAndSearchMemberArea {
      height: 90px;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
    }
    padding-left: 0px;
    padding-right: 0px;
    padding-top: 10px;
    padding-bottom: 5px;
  }
`;
const ActionsDiv = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    font-size: 25px;
    cursor: pointer;
  }
`;

export { MembersComponent, ActionsDiv };
