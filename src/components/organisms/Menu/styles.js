import styled from "styled-components";

const SidebarMenuContainer = styled.div`
  .ant-layout-header {
    padding: 0 30px;
    height: 102px;
  }

  .logo {
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  .logo > span svg {
    font-size: 25px;
    color: #543471;
    margin-right: 30px;
    transition: color 0.2s;
  }
`;

export { SidebarMenuContainer };
